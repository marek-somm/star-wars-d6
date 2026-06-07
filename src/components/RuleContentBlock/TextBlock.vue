<template>
	<p class="text-block" :class="`is-${block.type}`" v-html="safeText"></p>
</template>

<script>
import { formatRuleRichText } from "@/utils/ruleContent";

export default {
	name: "TextBlock",
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
.text-block {
	margin: 0;
	color: var(--color-muted);
	font-size: 0.98rem;
	line-height: 1.7;

	&.is-chapter_intro,
	&.is-intro {
		color: rgba(244, 239, 229, 0.82);
		font-size: 1.03rem;
		font-weight: 700;
	}

	&.is-story {
		padding: 0.15rem 0 0.15rem 0.95rem;
		border-left: 3px solid rgba(242, 193, 78, 0.58);
		color: rgba(244, 239, 229, 0.78);
		font-style: italic;
	}
}
</style>
