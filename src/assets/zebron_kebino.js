import { createPowerLabelsFromGroups } from "./data.js";

export const points = {
	force: 4,
	force_temp: 2,
	darkside: 0,
	character: 210,
	spent: 197,
};

export const forceStats = {
	control: {
		dice: 6,
		pips: 1,
	},
	sense: {
		dice: 6,
		pips: 0,
	},
	alter: {
		dice: 6,
		pips: 0,
	}
};

export default class Zebron {
	constructor(language = undefined) {
		this.language = language;
		this.labels = createPowerLabelsFromGroups(learnedPowerGroups, learnedPowerIds, language);
	}

	getPowerLabels() { return this.labels; }
}

export const learnedPowerGroups = [
	{
		name: "Combat",
		powerIds: [
			"lightsaber_combat",
			"kinetic_combat",
			"force_push",
			"absorb_dissipate_energy",
			"lesser_force_shield",
			"greater_force_shield",
			"guided_attack"
		],
	},
	{
		name: "Utils",
		powerIds: [
			"telekinesis",
			"contort_escape",
		],
	},
	{
		name: "Buffs",
		powerIds: [
			"concentration",
			"enhance_attribute",
			"force_jump",
			"emptiness",
			"burst_of_speed",
			"empower_force"
		],
	},
	{
		name: "Self-Control",
		powerIds: [
			"control_pain",
			"remain_conscious",
			"hibernation_trance",
			"accelerate_healing",
			"control_breathing"
		],
	},
	{
		name: "Enhance Senses",
		powerIds: [
			"merge_senses",
			"magnify_senses",
			"life_sense",
			"life_detection",
			"danger_sense",
			"combat_sense",
			"direction_sense",
			"farseeing"
		],
	},
	{
		name: "Communication",
		powerIds: [
			"affect_mind",
			"translation",
			"receptive_telepathy",
			"projective_telepathy",
		],
	},
	{
		name: "Party",
		powerIds: [
			"control_another_s_pain",
			"accelerate_another_s_healing",
			"transfer_force",
		],
	},
];

export const learnedPowerIds = [
	...new Set(learnedPowerGroups.flatMap((group) => group.powerIds || [])),
];

export const stats = [
	{
		name: 'Dexterity',
		dice: 3,
		pips: 0,
		skills: {
			Lightsaber: {
				name: 'Lightsaber',
				dice: 1,
				pips: 0,
			},
			'Lightsaber (s)': {
				name: 'Lightsaber',
				root: 'Lightsaber',
				spez: true,
				dice: 4,
				pips: 0,
			},
			Acrobatics: {
				name: 'Acrobatics',
				dice: 1,
				pips: 0,
			},
			Dodge: {
				name: 'Dodge',
				dice: 2,
				pips: 0,
			},
			Sprinting: {
				name: 'Sprinting',
				root: 'Running',
				spez: true,
				dice: 1,
				pips: 0,
			},
		},
	},
	{
		name: 'Perception',
		dice: 3,
		pips: 0,
		skills: [
			{
				name: 'Sneak',
				dice: 1,
				pips: 0,
			},
		],
	},
	{
		name: 'Knowledge',
		dice: 2,
		pips: 0,
		skills: [
			{
				name: 'Cultures',
				dice: 1,
				pips: 0,
			},
		],
	},
	{
		name: 'Strength',
		dice: 3,
		pips: 0,
		skills: [
			{
				name: 'Climbing/Jumping',
				dice: 1,
				pips: 0,
			},
			{
				name: 'Swimming',
				dice: 1,
				pips: 0,
			},
		],
	},
	{
		name: 'Mechanical',
		dice: 2,
		pips: 0,
	},
	{
		name: 'Technical',
		dice: 2,
		pips: 0,
		skills: [
			{
				name: 'Lightsaber Engineering',
				adv: true,
				dice: 1,
				pips: 0,
			},
		],
	},
];

export const family = [
	{
		title: 'John Kebino',
		info: 'Tot',
		label: 'Vater - Mensch',
		content: `John erblickte zum ersten mal auf Coruscant das Licht der Welt. Seine Menschlichen Eltern...`,
	},
	{
		title: 'Damaya Kebino',
		info: 'geb. Tadro',
		label: 'Mutter - Miraluka',
		content: `Damaya ist eine...`,
	},
	{
		title: 'Zira Kebino',
		label: 'Schwester - Miraluka',
		content: `Zira ist meine Schwester.`,
	},
	{
		title: 'Ben / Harland David Sanders',
		info: 'Sebastian',
		label: 'Onkel - Mensch',
		content: '???',
	},
];
