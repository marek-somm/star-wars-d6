<template>
	<section class="rule-filters" :class="drawer ? 'is-drawer' : 'ui-reference-filters'" :aria-label="t('ui.rulebook.filtersAriaLabel')">
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
		<button v-if="!drawer || hasActiveFilters" class="clear-filters ui-button" type="button"
			:disabled="!hasActiveFilters" @click="$emit('clear')">
			{{ t("ui.rulebook.clearFilters") }}
		</button>
	</section>
</template>

<script>
import { tUi } from "@/utils/uiText";

export default {
	name: "RulebookFilters",
	props: {
		drawer: Boolean,
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

	.filter-control {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-width: 0;

		span {
			color: var(--color-muted);
			font-size: 0.72rem;
			font-weight: 700;
			letter-spacing: 0.05em;
			text-transform: uppercase;
		}
	}

	select,
	.clear-filters {
		width: 100%;
		font-weight: 650;
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

@media (width < 981px) {
	.rule-filters:not(.is-drawer) {
		display: none;
	}

	.rule-filters.is-drawer {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.45rem;

		.clear-filters {
			grid-column: 1 / -1;
		}
	}
}
</style>
