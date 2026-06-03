<template>
	<button class="mobile-list-toggle ui-button" type="button" :aria-expanded="isOpen"
		aria-controls="rule-index-panel" @click="$emit('open')">
		<span>{{ currentTitle || 'Regel auswaehlen' }}</span>
		<strong>{{ filteredCount }}</strong>
	</button>
</template>

<script>
export default {
	name: "RuleMobileIndexToggle",
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
		currentTitle: {
			type: String,
			default: "",
		},
		filteredCount: {
			type: Number,
			required: true,
		},
	},
	emits: ["open"],
};
</script>

<style scoped lang="scss">
.mobile-list-toggle {
	display: none;
}

@media (max-width: 980px) {
	.mobile-list-toggle {
		display: flex;
		position: sticky;
		top: 0.65rem;
		z-index: 7;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		width: 100%;
		min-height: 3.1rem;
		padding: 0.65rem 0.8rem;
		border-color: var(--color-border-strong);
		background: var(--color-panel-soft);
		text-align: left;

		span {
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		strong {
			flex: 0 0 auto;
			padding: 0.25rem 0.5rem;
			border-radius: var(--radius-sm);
			background: rgba(242, 193, 78, 0.16);
			color: var(--color-accent);
			font-size: 0.82rem;
		}
	}
}
</style>
