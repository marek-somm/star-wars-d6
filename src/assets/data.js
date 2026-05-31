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

function normalizeSkillKey(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "_")
		.replace(/^_+|_+$/g, "");
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

export function createPowerLabels() {
	const labels = [];
	const skillsByName = new Map();
	const entries = [];
	let currentLabel = null;

	rawPowerItems.forEach((item) => {
		if (item.type === "label") {
			currentLabel = item.name ? new PowerLabel(item.name) : null;
			if (currentLabel) labels.push(currentLabel);
			return;
		}

		const skill = createSkill(item);
		skillsByName.set(skill.name, skill);
		entries.push({ rawSkill: item, skill });

		if (currentLabel) {
			currentLabel.addSkill(skill);
		}
	});

	entries.forEach(({ rawSkill, skill }) => {
		hydrateRequiredSkills(rawSkill, skill, skillsByName);
	});

	return labels;
}

export const powerLabels = createPowerLabels();

export const power = Object.fromEntries(
	powerLabels.flatMap((label) =>
		label.getSkills().map((skill) => [normalizeSkillKey(skill.name), skill])
	)
);
