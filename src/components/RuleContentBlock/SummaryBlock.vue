<template>
	<aside class="summary-block">
		<strong>Rule of Thumb</strong>
		<p v-html="safeText"></p>
	</aside>
</template>

<script>
import { formatRuleRichText } from "@/utils/ruleContent";

export default {
	name: "SummaryBlock",
	props: {
		block: {
			type: Object,
			required: true,
		},
	},
	computed: {
		safeText() {
			return formatRuleRichText(this.block.text || "");
		},
	},
};
</script>

<style scoped lang="scss">
.summary-block {
	position: relative;
	padding: 1rem 1.1rem 1rem 1.25rem;
	border: 1px solid rgba(242, 193, 78, 0.32);
	border-radius: var(--radius-sm);
	background: linear-gradient(90deg, rgba(242, 193, 78, 0.15), rgba(242, 193, 78, 0.045) 48%, rgba(242, 193, 78, 0.02));

	&::before {
		content: "";
		position: absolute;
		inset: 0 auto 0 0;
		width: 4px;
		border-radius: var(--radius-sm) 0 0 var(--radius-sm);
		background: var(--color-accent);
	}

	strong {
		display: inline-flex;
		align-items: center;
		min-height: 1.35rem;
		margin-bottom: 0.45rem;
		color: var(--color-accent);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	p {
		margin: 0;
		color: var(--color-text);
		font-weight: 900;
		line-height: 1.5;
	}
}
</style>
