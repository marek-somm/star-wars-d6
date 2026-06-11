<template>
	<section class="rule-filters ui-panel" :aria-label="t('ui.rulebook.filtersAriaLabel')">
		<label class="filter-control">
			<span>{{ t("ui.rulebook.type") }}</span>
			<select class="ui-control" :value="typeFilter" @change="$emit('update:typeFilter', $event.target.value)">
				<option value="all">{{ t("ui.rulebook.allTypes") }}</option>
				<option v-for="type in availableTypes" :key="type.value" :value="type.value">
					{{ type.label }} ({{ type.count }})
				</option>
			</select>
		</label>
		<label class="filter-control">
			<span>{{ t("ui.rulebook.chapter") }}</span>
			<select class="ui-control" :value="chapterFilter" @change="$emit('update:chapterFilter', $event.target.value)">
				<option value="all">{{ t("ui.rulebook.allChapters") }}</option>
				<option v-for="chapter in availableChapters" :key="chapter.value" :value="chapter.value">
					{{ chapter.label }}
				</option>
			</select>
		</label>
		<button class="clear-filters ui-button" type="button" :disabled="!hasActiveFilters" @click="$emit('clear')">
			{{ t("ui.rulebook.clearFilters") }}
		</button>
	</section>
</template>

<script>
import { tUi } from "@/utils/uiText";

export default {
	name: "RulebookFilters",
	props: {
		typeFilter: {
			type: String,
			required: true,
		},
		chapterFilter: {
			type: String,
			required: true,
		},
		availableTypes: {
			type: Array,
			required: true,
		},
		availableChapters: {
			type: Array,
			required: true,
		},
		hasActiveFilters: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["clear", "update:typeFilter", "update:chapterFilter"],
	methods: {
		t: tUi,
	},
};
</script>

<style scoped lang="scss">
.rule-filters {
	display: grid;
	grid-template-columns: repeat(2, minmax(12rem, 1fr)) auto;
	gap: 0.7rem;
	align-items: end;
	padding: 0.85rem 1rem;

	.filter-control {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-width: 0;

		span {
			color: var(--color-muted);
			font-size: 0.72rem;
			font-weight: 900;
			text-transform: uppercase;
		}
	}

	select,
	.clear-filters {
		width: 100%;
		font-weight: 900;
	}

	select {
		padding: 0.45rem 0.6rem;
	}

	.clear-filters {
		padding: 0.45rem 0.75rem;

		&:hover:not(:disabled) {
			border-color: rgba(103, 213, 200, 0.38);
			color: var(--color-cyan);
		}

		&:disabled {
			opacity: 0.45;
			cursor: default;
		}
	}
}

@media (max-width: 980px) {
	.rule-filters {
		display: none;
	}
}
</style>
