import { Power } from "@/assets/powers";

export const FORCE_POWER_ORDER = [Power.control, Power.sense, Power.alter];

export function normalizeSkillName(name) {
	return String(name || "")
		.toLowerCase()
		.replace(/[\u2019']/g, "")
		.replace(/\u00e2\u20ac\u2122/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

export function normalizeSearchText(value) {
	return String(value || "")
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim();
}

export function normalizeSearchTerm(value) {
	const normalized = normalizeSearchText(value);
	return normalized === "altar" ? "alter" : normalized;
}

export function collectSearchText(value) {
	if (Array.isArray(value)) {
		return value.map((entry) => collectSearchText(entry)).join(" ");
	}

	if (value && typeof value === "object") {
		return Object.values(value).map((entry) => collectSearchText(entry)).join(" ");
	}

	return value == null ? "" : String(value);
}

export function getSkillStorageKey(skill) {
	return String(skill?.id || skill?.name || "").trim();
}

export function matchesSkillReference(skill, reference) {
	if (!skill || !reference) return false;
	const value = String(reference || "").trim();
	return Boolean(
		(skill.id && value === skill.id)
		|| normalizeSkillName(value) === normalizeSkillName(skill.name)
	);
}

export function findSkillReference(skills, reference) {
	const value = String(reference || "").trim();
	return (Array.isArray(skills) ? skills : []).find((skill) => matchesSkillReference(skill, value)) || null;
}

export function findSkillByName(skills, name) {
	const normalizedName = normalizeSkillName(name);
	return (Array.isArray(skills) ? skills : []).find((skill) => normalizeSkillName(skill.name) === normalizedName) || null;
}

export function findSkill(skills, skill) {
	if (!skill) return null;
	const skillList = Array.isArray(skills) ? skills : [];

	if (skill.id) {
		const byId = skillList.find((entry) => entry.id === skill.id);
		if (byId) return byId;
	}

	return findSkillByName(skillList, skill.name);
}

export function getSkillsFromReferences(skills, references) {
	return (Array.isArray(references) ? references : [])
		.map((reference) => findSkillReference(skills, reference))
		.filter(Boolean);
}

export function getSkillPowerKey(skill) {
	const powers = Array.isArray(skill?.powers) ? skill.powers : [];
	return FORCE_POWER_ORDER.filter((power) => powers.includes(power)).join("+");
}
