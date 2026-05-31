export const Extra = {
	inSight: 'Target must be in sight of the Jedi',
	keptUp: 'Power can be kept up',
	ignorePain: 'Character can ignore pain of injuries for a long period of time',
	newRollWhenInjured: 'Whenever character is injured again, must make a new Control pain roll',
	notUsableWhenDarkside: 'Characters who are consumed by the dark side of the Force may not use this power.'
};

export const Modifier = {
	proximity: {
		text: 'Modified by Proximity',
		hover: 'Touching +0\nLine of sight (not touching) +2\nNot line of site, at 1-100 meters +5\n101 meters, to 10 kilometers +7\n11 to 1,000 kilometers +10\nSame planet more than 1,000 kilometers +15\nSame star system, different planet +20\nNot in same star system +20'
	},
	relationship: {
		text: 'Modified by Relationship',
		hover: 'Close relatives (married, siblings, parent and child, etc) +0\nClose friends +2\nFriends +5\nAcquaintances +7\nSlight acquaintances +10\nMet once +12\nNever met, but know each other by reputation +15\nComplete strangers +20\nComplete strangers and not of the same species +30'
	},
};

export const Power = {
	control: 'control',
	sense: 'sense',
	alter: 'alter'
};

export const PowerName = {
	control: "Control",
	sense: "Sense",
	alter: "Alter"
};

export const TimeToUse = {
	default: 'One round [1R]',
	minute: 'One minute [12R]',
	minutePlus: 'At least one minute [12R]',
	threeRounds: 'Three rounds [3R]',
};

export const forceStats = {
	control: {
		name: PowerName.control,
		dice: 6,
		pips: 1,
	},
	sense: {
		name: PowerName.sense,
		dice: 5,
		pips: 2,
	},
	alter: {
		name: PowerName.alter,
		dice: 5,
		pips: 1,
	},
};

export class Skill {
	name;
	powers = [];
	source;
	required = [];
	extra = [];
	difficulty = {
		control: { level: [] },
		sense: { level: [] },
		alter: { level: [] },
	};
	effect;
	example;
	summary;
	contentBlocks = [];

	constructor(skillName) {
		this.name = skillName;
	}

	setPowers(powers) {
		if (typeof powers === "string") powers = [powers];
		this.powers = powers;
	}
	setSource(source) { this.source = source; }
	setRequired(required) {
		if (!Array.isArray(required)) required = [required];
		this.required = required;
	}
	setExtra(extra) {
		if (typeof extra === "string") extra = [extra];
		this.extra = extra;
	}
	addDifficulty(power, level, text = null, hover = null) {
		let difficulty = {
			level: level
		};
		if (text != null) difficulty.text = text;
		if (hover != null) difficulty.hover = hover;
		this.difficulty[power].level.push(difficulty);
	}
	addIncrement(power, add, text) {
		if (!this.difficulty[power].increased) {
			this.difficulty[power]['increased'] = [];
		}
		this.difficulty[power].increased.push({
			add: add,
			text: text
		});
	}
	setModifiers(power, modifiers) {
		if (!this.difficulty[power].modifiers) {
			this.difficulty[power]['modifiers'] = [];
		}
		if (!Array.isArray(modifiers)) modifiers = [modifiers];
		this.difficulty[power].modifiers = modifiers;
	}
	setEffect(effect) { this.effect = effect; }
	setExample(example) { this.example = example; }

	hasRequiredSkills() { return Array.isArray(this.required) && this.required.length > 0; }
	hasIncreasedDifficulty(power) {
		const increased = this.difficulty[power]?.increased;
		return Array.isArray(increased) && increased.length > 0;
	}
	hasModifiedDifficulty(power) {
		const modifiers = this.difficulty[power]?.modifiers;
		return Array.isArray(modifiers) && modifiers.length > 0;
	}
}

export default class PowerLabel {
	constructor(labelName) {
		this.name = labelName;
		this.skills = [];
	}

	addSkill(skill) {
		this.skills.push(skill);
	}

	getName() { return this.name; }
	getSkills() { return this.skills; }
}
