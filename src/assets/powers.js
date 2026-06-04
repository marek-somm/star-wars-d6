export const Power = {
	control: 'control',
	sense: 'sense',
	alter: 'alter'
};

export class Skill {
	id;
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
	timeToUseNote;
	timeToUseDetails;
	contentBlocks = [];
	fanMade = false;

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
