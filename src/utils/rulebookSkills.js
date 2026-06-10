import rulebookData from "@/assets/rules/rulebook.json";
import { getChildContentBlocks } from "@/utils/rules";

const SKILL_ALIAS_BY_NORMALIZED_NAME = {
	"lightsaber engineering": "lightsaber repair engineering",
	"lightsaber repair": "lightsaber repair engineering",
};

function normalizeName(value) {
	return String(value || "")
		.normalize("NFKD")
		.toLowerCase()
		.replace(/\(a\)/g, "")
		.replace(/&/g, " and ")
		.replace(/[^a-z0-9]+/g, " ")
		.trim();
}

function normalizeSkillLookupName(value) {
	const normalized = normalizeName(value);
	return SKILL_ALIAS_BY_NORMALIZED_NAME[normalized] || normalized;
}

function getPathTitle(block) {
	return String(block?.title_short || block?.title || "").trim();
}

function getSkillGroupAttribute(parents) {
	const group = parents.find((entry) => entry?.type === "skill_group");
	const title = getPathTitle(group);
	return title.replace(/\s+Skills$/i, "");
}

function flattenSkillRules(rulebook) {
	const entries = [];

	function walk(block, parents = []) {
		if (!block || typeof block !== "object") return;

		if (block.type === "skill") {
			const path = parents
				.map((entry) => getPathTitle(entry))
				.filter(Boolean);

			entries.push({
				...block,
				attribute: getSkillGroupAttribute(parents),
				path,
				blocks: getChildContentBlocks(block),
			});
		}

		for (const child of block.blocks || []) {
			walk(child, [...parents, block]);
		}
	}

	walk(rulebook);
	return entries;
}

const skillRules = flattenSkillRules(rulebookData);
const skillRulesByAttributeAndName = new Map();
const skillRulesByName = new Map();

for (const rule of skillRules) {
	const skillName = normalizeSkillLookupName(rule.title);
	const attributeName = normalizeName(rule.attribute);

	if (skillName) {
		skillRulesByName.set(skillName, rule);
	}

	if (skillName && attributeName) {
		skillRulesByAttributeAndName.set(`${attributeName}:${skillName}`, rule);
	}
}

export const rulebookSkillSourceDocument = rulebookData?.source?.document || "";

export function getRulebookSkillLookupName(skill) {
	return normalizeSkillLookupName(skill?.root || skill?.name || skill);
}

export function findRulebookSkill(stat, skill) {
	const skillName = getRulebookSkillLookupName(skill);
	if (!skillName) return null;

	const attributeName = normalizeName(stat?.name || stat);
	if (attributeName) {
		const attributeMatch = skillRulesByAttributeAndName.get(`${attributeName}:${skillName}`);
		if (attributeMatch) return attributeMatch;
	}

	return skillRulesByName.get(skillName) || null;
}

export function getRulebookSkillSourceLabel(rule) {
	const start = rule?.source?.page_start;
	const end = rule?.source?.page_end;
	if (!start) return "";
	return end && end !== start ? `S. ${start}-${end}` : `S. ${start}`;
}
