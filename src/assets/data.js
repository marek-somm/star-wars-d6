import PowerLabel, { Power, Skill } from "./powers.js";
import { rawPowerItems } from "./power_data.js";

function asArray(value) {
	if (value == null) return [];
	return Array.isArray(value) ? value : [value];
}

function clone(value) {
	if (Array.isArray(value)) return value.map(clone);
	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.entries(value).map(([key, nestedValue]) => [key, clone(nestedValue)])
		);
	}
	return value;
}

function createEmptyDifficulty() {
	return {
		[Power.control]: { level: [] },
		[Power.sense]: { level: [] },
		[Power.alter]: { level: [] },
	};
}

function normalizeDifficulty(rawDifficulty = {}) {
	const difficulty = createEmptyDifficulty();

	Object.entries(rawDifficulty || {}).forEach(([power, value]) => {
		const normalizedModifiers = Array.isArray(value?.modifiers)
			? value.modifiers.map((modifier) => normalizeModifier(modifier))
			: value?.modifiers;

		difficulty[power] = {
			...clone(value),
			level: Array.isArray(value?.level) ? clone(value.level) : [],
			modifiers: normalizedModifiers,
		};
	});

	return difficulty;
}

function normalizeModifier(modifier) {
	if (!modifier || typeof modifier !== "object") return modifier;

	if (typeof modifier.hover === "string") {
		return {
			...clone(modifier),
			hover: [modifier.hover],
		};
	}

	return clone(modifier);
}

function getPowersFromDifficulty(rawDifficulty) {
	return Object.keys(rawDifficulty || {}).filter((power) =>
		Object.values(Power).includes(power)
	);
}

function normalizeExtra(extra) {
	return asArray(extra);
}

function normalizeLongText(value) {
	const cleanText = (input) =>
		String(input || "")
			.replace(/\t+/g, " ")
			.trim();

	if (value == null) return null;
	if (Array.isArray(value)) {
		return value
			.map((entry) => cleanText(entry))
			.filter(Boolean)
			.join("<br>");
	}
	if (typeof value === "string") return cleanText(value);
	return value.long ? cleanText(value.long) : null;
}

function normalizeContentBlocks(rawSkill = {}) {
	if (Array.isArray(rawSkill.content)) {
		return rawSkill.content
			.map((block) => {
				if (typeof block === "string") {
					return { type: "effect", text: normalizeLongText(block) };
				}
				if (!block || typeof block !== "object") return null;

				const type = block.type === "example" ? "example" : "effect";
				const blockTextSource = Array.isArray(block.text)
					? block.text
					: (block.text ?? block.content ?? block.value ?? null);
				const text = normalizeLongText(blockTextSource);

				return text ? { type, text } : null;
			})
			.filter(Boolean);
	}

	const blocks = [];
	const effectText = normalizeLongText(rawSkill.effect);
	const exampleText = normalizeLongText(rawSkill.example);

	if (effectText) blocks.push({ type: "effect", text: effectText });
	if (exampleText) blocks.push({ type: "example", text: exampleText });

	return blocks;
}

export function normalizeSkillKey(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "_")
		.replace(/^_+|_+$/g, "");
}

function getRawSkillId(rawSkill) {
	return rawSkill.id || normalizeSkillKey(rawSkill.name || "");
}

function getOrCreateSkill(skillsByName, name) {
	if (!skillsByName.has(name)) {
		skillsByName.set(name, new Skill(name));
	}
	return skillsByName.get(name);
}

function hydrateRequiredSkills(rawSkill, skill, skillsByName) {
	const required = asArray(rawSkill.required || rawSkill.requires)
		.map((requiredSkill) => {
			if (requiredSkill instanceof Skill) return requiredSkill;

			const name = typeof requiredSkill === "string"
				? requiredSkill
				: requiredSkill?.name;

			return name ? getOrCreateSkill(skillsByName, name) : null;
		})
		.filter(Boolean);

	skill.setRequired(required);
}

function createSkill(rawSkill) {
	const skill = new Skill(rawSkill.name);
	skill.id = getRawSkillId(rawSkill);
	skill.setPowers(getPowersFromDifficulty(rawSkill.difficulty));
	skill.setExtra(normalizeExtra(rawSkill.extra));
	skill.difficulty = normalizeDifficulty(rawSkill.difficulty);
	skill.contentBlocks = normalizeContentBlocks(rawSkill);
	skill.summary = normalizeLongText(rawSkill.summary);
	skill.effect = skill.contentBlocks
		.filter((block) => block.type === "effect")
		.map((block) => block.text)
		.join("<br>");
	skill.effectShort = [];
	skill.example = skill.contentBlocks
		.filter((block) => block.type === "example")
		.map((block) => block.text)
		.join("<br>");
	skill.source = rawSkill.source;
	skill.timeToUse = rawSkill.timeToUse;
	return skill;
}

let powerCatalog = null;

function getPowerCatalog() {
	if (powerCatalog) return powerCatalog;

	const skills = [];
	const skillsByName = new Map();
	const skillsById = new Map();
	const entries = [];

	rawPowerItems.forEach((item) => {
		const skill = createSkill(item);
		skills.push(skill);
		skillsByName.set(skill.name, skill);
		skillsById.set(skill.id, skill);
		entries.push({ rawSkill: item, skill });
	});

	entries.forEach(({ rawSkill, skill }) => {
		hydrateRequiredSkills(rawSkill, skill, skillsByName);
	});

	powerCatalog = { skills, skillsById };
	return powerCatalog;
}

export function getAllPowerIds() {
	return getPowerCatalog().skills.map((skill) => skill.id);
}

export function createPowerSkills(powerIds = null) {
	const catalog = getPowerCatalog();
	const allSkills = catalog.skills;

	if (powerIds == null) return allSkills;

	const normalizedIds = new Set(
		asArray(powerIds)
			.map((powerId) => String(powerId || "").trim())
			.filter(Boolean)
	);

	return allSkills.filter((skill) => normalizedIds.has(skill.id));
}

function createLabel(name, skills = []) {
	const label = new PowerLabel(name);
	for (const skill of skills) {
		label.addSkill(skill);
	}
	return label;
}

export function createPowerLabels() {
	return [createLabel("Powers", createPowerSkills())];
}

export function createPowerLabelsFromIds(powerIds = []) {
	return [createLabel("Powers", createPowerSkills(powerIds))];
}

export function createPowerLabelsFromGroups(groups = [], powerIds = null) {
	const catalog = getPowerCatalog();
	const allowedSkills = createPowerSkills(powerIds);
	const allowedIds = new Set(allowedSkills.map((skill) => skill.id));
	const assignedIds = new Set();
	const labels = [];

	for (const group of asArray(groups)) {
		const groupName = String(group?.name || "").trim();
		if (!groupName) continue;

		const groupPowerIds = asArray(group?.powerIds)
			.map((powerId) => String(powerId || "").trim())
			.filter(Boolean);

		const skills = [];
		for (const powerId of groupPowerIds) {
			const skill = catalog.skillsById.get(powerId);
			if (!skill) continue;
			if (!allowedIds.has(skill.id)) continue;
			if (assignedIds.has(skill.id)) continue;

			assignedIds.add(skill.id);
			skills.push(skill);
		}

		if (skills.length > 0) {
			labels.push(createLabel(groupName, skills));
		}
	}

	return labels;
}

export const powerLabels = createPowerLabels();

export const power = Object.fromEntries(
	createPowerSkills().flatMap((skill) => {
		const aliases = [skill.id, normalizeSkillKey(skill.name)].filter(Boolean);
		return aliases.map((alias) => [alias, skill]);
	})
);
