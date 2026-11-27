<template>
	<article class="rule-entry ui-panel ui-reading-panel" v-if="rule">
		<header class="entry-header">
			<div>
				<p class="breadcrumb">{{ tocPath }}</p>
				<h2 class="ui-entry-title">{{ rule.title }}</h2>
				<p class="source-line" v-if="sourceLabel">{{ sourceLabel }}</p>
			</div>
			<div class="meta">
				<span class="ui-pill">{{ getRuleTypeLabel(rule.type) }}</span>
			</div>
		</header>

		<RuleSkillDefinition :rule="rule" />

		<section class="content-blocks">
			<RuleContentBlock v-for="(block, index) in bodyBlocks" :key="getBlockKey(block, index)" :block="block" />
		</section>
	</article>
</template>

<script>
import { defineAsyncComponent } from "vue";
import RuleSkillDefinition from "@/components/Rulebook/RuleSkillDefinition.vue";
import { getBlockKey } from "@/utils/rules";
import { getRuleTypeLabel, tUi } from "@/utils/uiText";

const RuleContentBlock = defineAsyncComponent(() => import("@/components/RuleContentBlock.vue"));

export default {
	name: "RuleEntry",
	components: {
		RuleContentBlock,
		RuleSkillDefinition,
	},
	props: {
		rule: {
			type: Object,
			default: null,
		},
		sourceDocument: {
			type: String,
			default: "",
		},
	},
	computed: {
		tocPath() {
			return Array.isArray(this.rule?.path) ? this.rule.path.join(" / ") : "";
		},

		sourceLabel() {
			const pageLabel = this.pageLabel;
			if (!pageLabel) return "";

			return this.sourceDocument
				? this.t("ui.statInfo.sourceWithPage", { source: this.sourceDocument, page: pageLabel })
				: this.t("ui.statInfo.source", { source: pageLabel });
		},

		pageLabel() {
			const start = this.rule?.source?.page_start;
			const end = this.rule?.source?.page_end;
			if (!start) return "";
			return end && end !== start
				? this.t("ui.statInfo.pageRange", { start, end })
				: this.t("ui.statInfo.page", { page: start });
		},

		bodyBlocks() {
			if (!Array.isArray(this.rule?.blocks)) return [];
			if (this.rule?.type !== "skill") return this.rule.blocks;
			return this.rule.blocks.filter((block) => block?.type !== "description");
		},
	},
	methods: {
		getRuleTypeLabel,
		getBlockKey,
		t: tUi,
	},
};
</script>

<style scoped lang="scss">
.entry-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
	padding-bottom: 1rem;
	margin-bottom: 1.15rem;
	border-bottom: 1px solid var(--color-rule);

	.breadcrumb {
		margin: 0 0 0.45rem;
		color: var(--color-muted);
		font-size: 0.78rem;
		font-weight: 600;
	}

	.source-line {
		margin: 0.45rem 0 0;
		color: var(--color-subtle);
		font-size: 0.78rem;
		font-weight: 700;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.35rem;
	}
}

.content-blocks {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

@media (max-width: 620px) {
	.rule-entry {
		padding: 1rem 0.85rem;
	}

	.entry-header {
		flex-direction: column;
		gap: 0.7rem;

		.meta {
			justify-content: flex-start;
		}
	}
}
</style>
