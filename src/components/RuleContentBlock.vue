<template>
	<ContainerBlock v-if="isContainerBlock" :block="block" />
	<TextBlock v-else-if="isTextBlock" :block="block" />
	<SummaryBlock v-else-if="block.type === 'rule_summary'" :block="block" />
	<CalloutBlock v-else-if="block.type === 'note' || block.type === 'example'" :block="block" />
	<TableBlock v-else-if="isTableBlock" :block="block" />

	<p v-else class="text-block is-unknown">{{ fallbackText }}</p>
</template>

<script>
import CalloutBlock from "@/components/RuleContentBlock/CalloutBlock.vue";
import ContainerBlock from "@/components/RuleContentBlock/ContainerBlock.vue";
import SummaryBlock from "@/components/RuleContentBlock/SummaryBlock.vue";
import TableBlock from "@/components/RuleContentBlock/TableBlock.vue";
import TextBlock from "@/components/RuleContentBlock/TextBlock.vue";
import { CONTAINER_BLOCK_TYPES, TABLE_BLOCK_TYPES, TEXT_BLOCK_TYPES } from "@/utils/rules";

export default {
	name: "RuleContentBlock",
	components: {
		CalloutBlock,
		ContainerBlock,
		SummaryBlock,
		TableBlock,
		TextBlock,
	},
	props: {
		block: {
			type: Object,
			required: true,
		},
	},
	computed: {
		isTextBlock() {
			return TEXT_BLOCK_TYPES.has(this.block.type);
		},

		isContainerBlock() {
			return CONTAINER_BLOCK_TYPES.has(this.block.type);
		},

		isTableBlock() {
			return TABLE_BLOCK_TYPES.has(this.block.type);
		},

		fallbackText() {
			return this.block.text || this.block.title || this.block.type;
		},
	},
};
</script>

<style scoped lang="scss">
.text-block {
	margin: 0;
	color: var(--color-muted);
	font-size: 0.98rem;
	line-height: 1.7;
}
</style>
