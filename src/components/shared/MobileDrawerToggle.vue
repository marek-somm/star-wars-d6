<template>
	<button
		class="mobile-drawer-toggle ui-button"
		type="button"
		:aria-expanded="isOpen"
		:aria-controls="controls"
		@click="$emit('open')"
	>
		<span>{{ currentTitle || fallbackTitle }}</span>
		<strong>{{ countLabel }}</strong>
	</button>
</template>

<script>
export default {
	name: "MobileDrawerToggle",
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
		currentTitle: {
			type: String,
			default: "",
		},
		fallbackTitle: {
			type: String,
			default: "",
		},
		countLabel: {
			type: String,
			required: true,
		},
		controls: {
			type: String,
			required: true,
		},
	},
	emits: ["open"],
};
</script>

<style scoped lang="scss">
.mobile-drawer-toggle {
	display: none;
}

@media (width < 981px) {
	.mobile-drawer-toggle {
		display: flex;
		position: sticky;
		top: 0.65rem;
		z-index: 7;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		width: 100%;
		min-width: 0;
		min-height: 3.1rem;
		padding: 0.65rem 0.8rem;
		border-color: var(--color-border);
		border-radius: var(--radius-panel);
		background: var(--color-panel-soft);
		color: var(--color-text);
		font-weight: 730;
		text-align: left;

		span {
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		strong {
			flex: 0 0 auto;
			max-width: 42%;
			padding: 0.25rem 0.5rem;
			border-radius: var(--radius-sm);
			background: rgba(242, 193, 78, 0.16);
			color: var(--color-accent);
			font-size: 0.82rem;
		}
	}
}

@media (max-width: 520px) {
	.mobile-drawer-toggle {
		top: 0.5rem;
		min-height: 3.3rem;
	}
}
</style>
