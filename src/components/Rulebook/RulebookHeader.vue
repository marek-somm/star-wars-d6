<template>
	<header class="rulebook-header ui-panel">
		<div>
			<p class="eyebrow">Regelwerk</p>
			<h1>Rules Reference</h1>
		</div>
		<div class="header-meta">
			<input :value="search" class="search" type="search" placeholder="Regeln durchsuchen"
				aria-label="Regeln durchsuchen" @input="$emit('update:search', $event.target.value.trim())">
			<p class="count">{{ filteredCount }} / {{ totalCount }}</p>
		</div>
	</header>
</template>

<script>
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
};
</script>

<style scoped lang="scss">
.rulebook-header {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 1.2rem;

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
		border: 1px solid rgba(244, 239, 229, 0.12);
		border-radius: var(--radius-sm);
		background: var(--color-panel-soft);
		color: var(--color-text);
	}

	.count {
		margin: 0;
		min-width: 5.5rem;
		padding: 0.45rem 0.55rem;
		border: 1px solid rgba(103, 213, 200, 0.28);
		border-radius: var(--radius-sm);
		color: var(--color-cyan);
		font-weight: 900;
		text-align: center;
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
