export const TEXT_BLOCK_TYPES = new Set([
	"chapter_intro",
	"intro",
	"paragraph",
	"description",
]);

export const CONTAINER_BLOCK_TYPES = new Set([
	"stat_block",
	"rule",
	"mechanic",
	"subsection",
]);

export const TABLE_BLOCK_TYPES = new Set([
	"table",
]);

export const PAGE_BLOCK_TYPES = new Set([
	"chapter",
	"skill_group",
	"skill",
]);

export function formatRuleLabel(value) {
	const labels = {
		mechanic: "Game Mechanic",
		rule: "Rule",
		subsection: "Subsection",
	};

	if (labels[value]) return labels[value];

	return String(value || "unknown")
		.split("_")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

export function getBlockKey(block, index) {
	return block?.id || `${block?.type || "block"}-${index}`;
}

export function isRulePageBlock(block) {
	return Boolean(block?.title && PAGE_BLOCK_TYPES.has(block.type));
}

export function getChildContentBlocks(block) {
	return Array.isArray(block?.blocks)
		? block.blocks.filter((child) => !isRulePageBlock(child))
		: [];
}
