<template>
	<header class="rulebook-header ui-panel">
		<div>
			<p class="eyebrow">{{ t("ui.rulebook.titleEyebrow") }}</p>
			<h1>{{ t("ui.rulebook.title") }}</h1>
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
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 1.2rem;
	background:
		linear-gradient(135deg, rgba(242, 193, 78, 0.08), rgba(103, 213, 200, 0.035)),
		var(--color-panel);

	.eyebrow {
		margin: 0 0 0.35rem;
		color: var(--color-cyan);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
	}

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

@media (max-width: 620px) {
	.rulebook-header {
		padding: 0.8rem 1rem;

		h1 {
			font-size: 1.5rem;
		}
	}
}
</style>
