function toNumber(value) {
	return Number(value) || 0;
}

export function getDiceParts(stat = {}, skill = {}) {
	const diceStat = toNumber(stat.dice);
	const pipsStat = toNumber(stat.pips);
	const diceSkill = toNumber(skill.dice);
	const pipsSkill = toNumber(skill.pips);

	if (skill.adv) {
		return {
			dice: diceSkill,
			pips: pipsSkill,
		};
	}

	return {
		dice: diceSkill + diceStat,
		pips: pipsSkill + pipsStat,
	};
}

export function formatDice(stat = {}, skill = {}) {
	const { dice, pips } = getDiceParts(stat, skill);
	return `${dice}D+${pips}`;
}

export function getRollCommand(stat = {}, skill = {}) {
	const { dice, pips } = getDiceParts(stat, skill);
	const name = skill.name || stat.name || "";
	return getRollCommandFromDice(dice, pips, name);
}

export function getRollCommandFromDice(diceValue, pipsValue = 0, comment = "") {
	const dice = Math.max(toNumber(diceValue), 0);
	const pips = Math.max(toNumber(pipsValue), 0);
	const regularDice = Math.max(dice - 1, 0);
	const pipsText = pips > 0 ? `+${pips}` : "";
	const prefix = regularDice > 0 ? `${regularDice}d6+` : "";

	return `${prefix}1d6ie6${pipsText} !${comment} (${regularDice + 1}D+${pips})`;
}
