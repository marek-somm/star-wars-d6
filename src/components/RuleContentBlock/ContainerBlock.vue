<template>
	<section class="block-section" :class="`is-${block.type}`">
		<header class="block-section-header">
			<p class="block-type">{{ formatRuleLabel(block.type) }}</p>
			<h3>{{ block.title }}</h3>
		</header>
		<BlockFields :fields="block.fields" />
		<div class="nested-blocks" v-if="childBlocks.length">
			<RuleContentBlock v-for="(child, index) in childBlocks" :key="getBlockKey(child, index)" :block="child" />
		</div>
	</section>
</template>

<script>
import { defineAsyncComponent } from "vue";
import BlockFields from "@/components/RuleContentBlock/BlockFields.vue";
import { formatRuleLabel, getBlockKey, getChildContentBlocks } from "@/utils/rules";

export default {
	name: "ContainerBlock",
	components: {
		BlockFields,
		RuleContentBlock: defineAsyncComponent(() => import("@/components/RuleContentBlock.vue")),
	},
	props: {
		block: {
			type: Object,
			required: true,
		},
	},
	computed: {
		childBlocks() {
			return getChildContentBlocks(this.block);
		},
	},
	methods: {
		formatRuleLabel,
		getBlockKey,
	},
};
</script>

<style scoped lang="scss">
.block-section {
	position: relative;
	padding: 0.9rem;
	border: 1px solid rgba(244, 239, 229, 0.1);
	border-radius: var(--radius-sm);
	background: rgba(244, 239, 229, 0.025);

	&.is-skill {
		border-color: rgba(103, 213, 200, 0.24);
		background: linear-gradient(180deg, rgba(103, 213, 200, 0.07), rgba(103, 213, 200, 0.025));
	}

	&.is-stat_block {
		padding: 0;
		overflow: hidden;
		border-color: rgba(242, 193, 78, 0.22);
		background: rgba(244, 239, 229, 0.025);

		.block-section-header {
			margin: 0;
			padding: 0.75rem 0.85rem;
			border-bottom: 1px solid rgba(242, 193, 78, 0.16);
			background: rgba(242, 193, 78, 0.07);
		}

		:deep(.field-list) {
			margin: 0;
			border: 0;
			border-radius: 0;
			background: transparent;
		}

		.nested-blocks {
			padding: 0 0.85rem 0.85rem;
		}
	}

	&.is-rule,
	&.is-mechanic {
		display: grid;
		grid-template-columns: minmax(10rem, 14rem) minmax(0, 1fr);
		gap: 1rem;
		align-items: start;
		padding: 0;
		border: 0;
		border-radius: 0;
		background: transparent;

		&+.is-rule,
		&+.is-mechanic {
			margin-top: 0.15rem;
			padding-top: 1rem;
			border-top: 1px solid rgba(244, 239, 229, 0.1);
		}

		.block-section-header {
			position: relative;
			min-height: 100%;
			margin: 0;
			padding: 0.2rem 0 0.2rem 0.85rem;
			border-left: 3px solid rgba(242, 193, 78, 0.68);

			&::before {
				content: "";
				position: absolute;
				left: -0.42rem;
				top: 0.35rem;
				width: 0.62rem;
				height: 0.62rem;
				border: 2px solid var(--color-panel);
				border-radius: 50%;
				background: var(--color-accent);
				box-shadow: 0 0 0 1px rgba(242, 193, 78, 0.5);
			}
		}

		.block-type {
			color: var(--color-accent);
		}

		h3 {
			color: var(--color-text);
			font-size: 1rem;
			line-height: 1.25;
		}

		.nested-blocks {
			gap: 0.55rem;
			padding: 0.15rem 0 0.15rem 0.1rem;
			border: 0;
			background: transparent;
		}
	}
}

.block-section-header {
	margin-bottom: 0.75rem;

	.block-type {
		margin: 0 0 0.25rem;
		color: var(--color-muted);
		font-size: 0.68rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	h3 {
		margin: 0;
		color: var(--color-text);
		font-size: 1.15rem;
	}
}

.nested-blocks {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

@media (max-width: 620px) {
	.block-section.is-rule,
	.block-section.is-mechanic {
		grid-template-columns: 1fr;
		gap: 0.6rem;

		&+.is-rule,
		&+.is-mechanic {
			padding-top: 0.9rem;
		}

		.block-section-header {
			min-height: 0;
			padding-left: 0.75rem;
		}

		.nested-blocks {
			padding: 0;
		}
	}
}
</style>
