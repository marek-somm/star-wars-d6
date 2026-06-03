<template>
	<p class="text-block" :class="`is-${block.type}`" v-html="safeText"></p>
</template>

<script>
import { sanitizeHtml } from "@/utils/html";

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
			return sanitizeHtml(this.block.text || "");
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
}
</style>
