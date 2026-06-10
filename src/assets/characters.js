import { createPowerLabelsFromGroups } from "./data.js";

const characterFiles = import.meta.glob("./characters/*.json", {
	eager: true,
	import: "default",
});

function getIdFromPath(path) {
	return String(path || "")
		.split("/")
		.pop()
		?.replace(/\.json$/i, "") || "character";
}

function getPowerGroups(character) {
	if (Array.isArray(character?.powers?.groups)) return character.powers.groups;
	if (Array.isArray(character?.learnedPowerGroups)) return character.learnedPowerGroups;
	return [];
}

function getPowerIds(character, powerGroups) {
	if (Array.isArray(character?.powers?.ids)) return character.powers.ids;
	if (Array.isArray(character?.learnedPowerIds)) return character.learnedPowerIds;
	return [...new Set(powerGroups.flatMap((group) => group.powerIds || []))];
}

function normalizeCharacter(character, path) {
	const powerGroups = getPowerGroups(character);
	const powerIds = getPowerIds(character, powerGroups);

	return {
		id: character.id || getIdFromPath(path),
		name: character.name || "Unnamed Character",
		points: {
			force: 0,
			force_temp: 0,
			darkside: 0,
			character: 0,
			spent: 0,
			...(character.points || {}),
		},
		forceStats: character.forceStats || {},
		stats: Array.isArray(character.stats) ? character.stats : [],
		family: Array.isArray(character.family) ? character.family : [],
		powers: {
			...(character.powers || {}),
			groups: powerGroups,
			ids: powerIds,
		},
		createPowerProfile(language) {
			const labels = createPowerLabelsFromGroups(powerGroups, powerIds, language);
			return {
				getPowerLabels() {
					return labels;
				},
			};
		},
	};
}

export const characters = Object.entries(characterFiles)
	.map(([path, character]) => normalizeCharacter(character, path))
	.sort((a, b) => a.name.localeCompare(b.name));

export function getCharacterById(id) {
	return characters.find((character) => character.id === id) || characters[0];
}
