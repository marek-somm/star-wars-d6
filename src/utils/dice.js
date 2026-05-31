function toNumber(value) {
	const number = Number(value);
	return Number.isFinite(number) ? number : 0;
}

function normalizeDiceParts(diceValue, pipsValue, minDice = 0) {
	const dice = Math.max(Math.trunc(toNumber(diceValue)), minDice);
	const pips = Math.max(Math.trunc(toNumber(pipsValue)), 0);

	return {
		dice: dice + Math.floor(pips / 3),
		pips: pips % 3,
	};
}

function formatDiceParts(dice, pips) {
	return pips > 0 ? `${dice}D+${pips}` : `${dice}D`;
}

export function getDiceParts(stat = {}, skill = {}) {
	if (skill.adv) {
		return normalizeDiceParts(skill.dice, skill.pips);
	}

	return normalizeDiceParts(
		toNumber(skill.dice) + toNumber(stat.dice),
		toNumber(skill.pips) + toNumber(stat.pips)
	);
}

export function formatDice(stat = {}, skill = {}) {
	const { dice, pips } = getDiceParts(stat, skill);
	return formatDiceParts(dice, pips);
}

export function getRollCommand(stat = {}, skill = {}) {
	const { dice, pips } = getDiceParts(stat, skill);
	const name = skill.name || stat.name || "";
	return getRollCommandFromDice(dice, pips, name);
}

export function getRollCommandFromDice(diceValue, pipsValue = 0, comment = "") {
	const { dice, pips } = normalizeDiceParts(diceValue, pipsValue, 1);
	const regularDice = dice - 1;
	const pipsText = pips > 0 ? `+${pips}` : "";
	const prefix = regularDice > 0 ? `${regularDice}d6+` : "";
	const label = formatDiceParts(dice, pips);

	return `${prefix}1d6ie6${pipsText} !${comment} (${label})`;
}
