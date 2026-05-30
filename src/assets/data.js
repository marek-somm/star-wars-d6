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

	Object.entries(rawDifficulty).forEach(([power, value]) => {
		difficulty[power] = {
			...clone(value),
			level: Array.isArray(value?.level) ? clone(value.level) : [],
		};
	});

	return difficulty;
}

function normalizeLongText(value) {
	if (value == null) return null;
	if (typeof value === "string") return value;
	return value.long || null;
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
	skill.setPowers(rawSkill.powers || []);
	skill.setExtra(rawSkill.extra || []);
	skill.difficulty = normalizeDifficulty(rawSkill.difficulty);
	skill.effect = normalizeLongText(rawSkill.effect);
	skill.effectShort = rawSkill.effect?.short || [];
	skill.example = normalizeLongText(rawSkill.example);
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
