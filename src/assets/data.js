import PowerLabel, { Power, Skill } from "./powers.js";
import {
	defaultPowerLanguage,
	forcePowerLanguages,
	getForcePowerCatalog,
} from "./power_data.js";

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

const defaultDarkSidePointWarningText = "Using this power grants the user one Dark Side Point.";

function normalizeDifficultyLevels(levels) {
	return asArray(levels)
		.map((item) => {
			if (item == null) return null;
			if (item && typeof item === "object") return clone(item);

			return {
				level: clone(item),
			};
		})
		.filter(Boolean);
}

function normalizeConditionalTables(tables) {
	return asArray(tables)
		.map((table) => {
			if (!table || typeof table !== "object") return null;

			const columns = normalizeTableColumns(table.columns);
			return {
				title: normalizeLongText(table.title) || null,
				subnote: normalizeLongText(table.subnote) || null,
				columns,
				rows: normalizeTableRows(table.rows, columns),
			};
		})
		.filter(Boolean);
}

function normalizeConditionalDifficulty(conditional) {
	if (!conditional || typeof conditional !== "object") return null;

	const description = normalizeLongText(conditional.description) || null;
	const tables = normalizeConditionalTables(conditional.tables);

	if (!description && tables.length === 0) return null;

	return {
		description,
		tables,
	};
}

function normalizeDifficulty(rawDifficulty = {}) {
	const difficulty = createEmptyDifficulty();

	Object.entries(rawDifficulty || {}).forEach(([power, value]) => {
		const normalizedModifiers = asArray(value?.modifiers)
			.map((modifier) => normalizeModifier(modifier))
			.filter((modifier) => modifier && typeof modifier === "object");

		difficulty[power] = {
			...clone(value),
			level: normalizeDifficultyLevels(value?.level),
			conditional: normalizeConditionalDifficulty(value?.conditional),
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

function normalizeTableColumns(columns) {
	return asArray(columns).map((column) => String(column || ""));
}

function normalizeTableRow(row, columns) {
	if (Array.isArray(row)) {
		return Object.fromEntries(
			columns.map((column, index) => [column, clone(row[index] ?? "")])
		);
	}

	if (row && typeof row === "object") {
		return Object.fromEntries(
			columns.map((column, index) => {
				if (Object.prototype.hasOwnProperty.call(row, column)) {
					return [column, clone(row[column])];
				}
				if (Object.prototype.hasOwnProperty.call(row, index)) {
					return [column, clone(row[index])];
				}
				if (Object.prototype.hasOwnProperty.call(row, String(index))) {
					return [column, clone(row[String(index)])];
				}
				return [column, ""];
			})
		);
	}

	if (columns.length === 0) return {};
	return Object.fromEntries(
		columns.map((column, index) => [column, index === 0 ? clone(row ?? "") : ""])
	);
}

function normalizeTableRows(rows, columns) {
	return asArray(rows).map((row) => normalizeTableRow(row, columns));
}

function hasDarkSidePointOnUse(rawSkill = {}) {
	return Boolean(
		rawSkill.grantsDarkSidePointOnUse
		|| rawSkill.darkSidePointOnUse
		|| rawSkill.awardsDarkSidePointOnUse
	);
}

function isFanMade(rawSkill = {}) {
	return Boolean(
		rawSkill.fanMade
		|| rawSkill.isFanMade
		|| rawSkill.homebrew
	);
}

function isDarkSidePointOnUseWarning(text) {
	const value = String(text || "").toLowerCase();
	if (!value.includes("dark side point")) return false;

	return value.includes("uses this")
		|| value.includes("uses this power")
		|| value.includes("activates this power")
		|| value.includes("activates this");
}

function getDarkSidePointWarningText(catalogData) {
	return String(catalogData?.warnings?.darkSidePointOnUseWarning || "").trim()
		|| defaultDarkSidePointWarningText;
}

function withDarkSidePointWarning(blocks = [], rawSkill = {}, catalogData = {}) {
	if (!hasDarkSidePointOnUse(rawSkill)) {
		return blocks;
	}

	const filteredBlocks = blocks.filter((block) =>
		!(block?.type === "warning" && isDarkSidePointOnUseWarning(block.text))
	);

	return [
		{ type: "warning", text: getDarkSidePointWarningText(catalogData) },
		...filteredBlocks,
	];
}

function normalizeContentBlocks(rawSkill = {}, catalogData = {}) {
	if (Array.isArray(rawSkill.content)) {
		const blocks = rawSkill.content
			.map((block) => {
				if (typeof block === "string") {
					return { type: "effect", text: normalizeLongText(block) };
				}
				if (!block || typeof block !== "object") return null;
				if (block.type === "table") {
					const columns = normalizeTableColumns(block.columns);
					const rows = normalizeTableRows(block.rows, columns);
					const columnTypes = block.columnTypes && typeof block.columnTypes === "object"
						? clone(block.columnTypes)
						: null;

					return {
						type: "table",
						title: normalizeLongText(block.title) || null,
						text: normalizeLongText(block.text) || null,
						subtext: normalizeLongText(block.subtext) || null,
						subnote: normalizeLongText(block.subnote) || null,
						columns,
						rows,
						columnTypes,
					};
				}

				const type = block.type === "example"
					? "example"
					: (block.type === "note"
						? "note"
						: (block.type === "warning"
							? "warning"
							: (block.type === "special" ? "special" : "effect")));
				const blockTextSource = Array.isArray(block.text)
					? block.text
					: (block.text ?? block.content ?? block.value ?? null);
				const text = normalizeLongText(blockTextSource);

				return text ? { type, text } : null;
			})
			.filter(Boolean);

		return withDarkSidePointWarning(blocks, rawSkill, catalogData);
	}

	const blocks = [];
	const effectText = normalizeLongText(rawSkill.effect);
	const exampleText = normalizeLongText(rawSkill.example);

	if (effectText) blocks.push({ type: "effect", text: effectText });
	if (exampleText) blocks.push({ type: "example", text: exampleText });

	return withDarkSidePointWarning(blocks, rawSkill, catalogData);
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

function getOrCreateSkill(skillsByName, name, id = null, skillsById = null) {
	if (!skillsByName.has(name)) {
		const skill = new Skill(name);
		if (id) skill.id = id;
		skillsByName.set(name, skill);
		if (id && skillsById) skillsById.set(id, skill);
	}
	return skillsByName.get(name);
}

function hydrateRequiredSkills(rawSkill, skill, skillsByName, skillsById) {
	const required = asArray(rawSkill.required || rawSkill.requires)
		.map((requiredSkill) => {
			if (requiredSkill instanceof Skill) return requiredSkill;

			const id = typeof requiredSkill === "object"
				? String(requiredSkill?.id || "").trim()
				: "";
			if (id && skillsById.has(id)) return skillsById.get(id);

			const name = typeof requiredSkill === "string"
				? requiredSkill
				: requiredSkill?.name;

			return name ? getOrCreateSkill(skillsByName, name, id, skillsById) : null;
		})
		.filter(Boolean);

	skill.setRequired(required);
}

function createSkill(rawSkill, catalogData = {}) {
	const skill = new Skill(rawSkill.name);
	skill.id = getRawSkillId(rawSkill);
	skill.setPowers(getPowersFromDifficulty(rawSkill.difficulty));
	skill.setExtra(normalizeExtra(rawSkill.extra));
	skill.difficulty = normalizeDifficulty(rawSkill.difficulty);
	skill.contentBlocks = normalizeContentBlocks(rawSkill, catalogData);
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
	skill.timeToUseNote = rawSkill.timeToUseNote;
	skill.timeToUseDetails = rawSkill.timeToUseDetails;
	skill.fanMade = isFanMade(rawSkill);
	return skill;
}

const powerCatalogs = new Map();

function getPowerCatalog(language = defaultPowerLanguage) {
	const selectedLanguage = getForcePowerLanguage(language);
	if (powerCatalogs.has(selectedLanguage.code)) return powerCatalogs.get(selectedLanguage.code);

	const catalogSource = getForcePowerCatalog(selectedLanguage.code);
	const catalogData = catalogSource?.data || {};
	const catalogItems = Array.isArray(catalogSource?.items) ? catalogSource.items : [];

	const skills = [];
	const skillsByName = new Map();
	const skillsById = new Map();
	const entries = [];

	catalogItems.forEach((item) => {
		const skill = createSkill(item, catalogData);
		skills.push(skill);
		skillsByName.set(skill.name, skill);
		skillsById.set(skill.id, skill);
		entries.push({ rawSkill: item, skill });
	});

	entries.forEach(({ rawSkill, skill }) => {
		hydrateRequiredSkills(rawSkill, skill, skillsByName, skillsById);
	});

	const catalog = { language: selectedLanguage.code, skills, skillsById };
	powerCatalogs.set(selectedLanguage.code, catalog);
	return catalog;
}

export function getAllPowerIds(language = defaultPowerLanguage) {
	return getPowerCatalog(language).skills.map((skill) => skill.id);
}

export function getForcePowerLanguage(language = defaultPowerLanguage) {
	return forcePowerLanguages.find((entry) => entry.code === String(language || "").toLowerCase())
		|| forcePowerLanguages.find((entry) => entry.code === defaultPowerLanguage);
}

export function getForcePowerLanguages() {
	return forcePowerLanguages.map((language) => ({ ...language }));
}

export function createPowerSkills(powerIds = null, language = defaultPowerLanguage) {
	const catalog = getPowerCatalog(language);
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

export function createPowerLabels(language = defaultPowerLanguage) {
	return [createLabel("Powers", createPowerSkills(null, language))];
}

export function createPowerLabelsFromIds(powerIds = [], language = defaultPowerLanguage) {
	return [createLabel("Powers", createPowerSkills(powerIds, language))];
}

export function createPowerLabelsFromGroups(groups = [], powerIds = null, language = defaultPowerLanguage) {
	const catalog = getPowerCatalog(language);
	const allowedSkills = createPowerSkills(powerIds, language);
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
