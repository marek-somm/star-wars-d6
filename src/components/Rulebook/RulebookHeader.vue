<template>
	<header class="rulebook-header ui-reference-header">
		<div>
			<p class="ui-kicker">{{ t("ui.rulebook.titleEyebrow") }}</p>
			<h1 class="ui-page-title">{{ t("ui.rulebook.title") }}</h1>
		</div>
		<div class="header-meta">
			<input :value="search" class="search ui-control" type="search" :placeholder="t('ui.rulebook.searchPlaceholder')"
				:aria-label="t('ui.rulebook.searchAriaLabel')" @input="$emit('update:search', $event.target.value.trim())">
			<p class="count ui-count">{{ filteredCount }} / {{ totalCount }}</p>
		</div>
	</header>
</template>

<script>
import { tUi } from "@/utils/uiText";

export default {
	name: "RulebookHeader",
	props: {
		search: {
			type: String,
			default: "",
		},
		filteredCount: {
			type: Number,
			required: true,
		},
		totalCount: {
			type: Number,
			required: true,
		},
	},
	emits: ["update:search"],
	methods: {
		t: tUi,
	},
};
</script>

<style scoped lang="scss">
.rulebook-header {
	.header-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.search {
		min-height: 2.5rem;
		min-width: min(24rem, 56vw);
		padding: 0.5rem 0.65rem;
	}

	.count {
		margin: 0;
		min-width: 5.5rem;
	}
}

@media (max-width: 980px) {
	.rulebook-header .header-meta {
		display: none;
	}
}

</style>
