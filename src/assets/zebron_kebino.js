import PowerLabel from "./powers.js";
import { power } from "./data.js";

export const points = {
	force: 4,
	force_temp: 2,
	darkside: 0,
	character: 210,
	spent: 167,
};

export default class Zebron {
	constructor() {
		this.labels = [];
		this.initPowers();
	}

	initPowers() {
		const combat = this.addLabel("Combat");
		combat.addSkill(power.lightsaber_combat);
		combat.addSkill(power.kinetic_combat);
		combat.addSkill(power.force_push);
		combat.addSkill(power.absorb_dissipate_energy);
		combat.addSkill(power.lesser_force_shield);

		const utils = this.addLabel("Utils");
		utils.addSkill(power.telekinesis);
		utils.addSkill(power.contort_escape);

		const buffs = this.addLabel("Buffs");
		buffs.addSkill(power.concentration);
	}

	addLabel(labelName) {
		const label = new PowerLabel(labelName);
		this.labels.push(label);
		return label;
	}

	getPowerLabels() { return this.labels; }
}

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
