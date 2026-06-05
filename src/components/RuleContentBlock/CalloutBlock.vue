<template>
	<aside class="callout" :class="`is-${block.type}`">
		<strong>{{ block.title || (block.type === 'example' ? 'Example' : 'Note') }}</strong>
		<p v-if="safeText" v-html="safeText"></p>
		<div class="callout-blocks" v-if="childBlocks.length">
			<RuleContentBlock v-for="(child, index) in childBlocks" :key="getBlockKey(child, index)" :block="child" />
		</div>
	</aside>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { formatRuleRichText } from "@/utils/ruleContent";
import { getBlockKey, getChildContentBlocks } from "@/utils/rules";

export default {
	name: "CalloutBlock",
	components: {
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

		safeText() {
			return formatRuleRichText(this.block.text || "");
		},
	},
	methods: {
		getBlockKey,
	},
};
</script>

<style scoped lang="scss">
.callout {
	padding: 0.2rem 0 0.2rem 0.95rem;
	border: 0;
	border-left: 3px solid rgba(103, 213, 200, 0.62);
	border-radius: 0;
	background: transparent;

	&.is-example {
		border-left-color: rgba(242, 193, 78, 0.68);

		strong {
			color: var(--color-accent);
		}
	}

	strong {
		display: block;
		margin-bottom: 0.35rem;
		color: var(--color-cyan);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	p {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.55;
	}

	.callout-blocks {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	p+.callout-blocks {
		margin-top: 0.55rem;
	}
}
</style>
