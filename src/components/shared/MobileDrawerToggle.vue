<template>
	<button
		class="mobile-drawer-toggle ui-button"
		:class="{ 'is-nested': nested }"
		type="button"
		:aria-expanded="isOpen"
		:aria-controls="controls"
		@click="$emit('open')"
	>
		<span>{{ currentTitle || fallbackTitle }}</span>
		<strong>{{ resolvedCountLabel }}</strong>
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
		count: {
			type: [Number, String],
			default: "",
		},
		countLabel: {
			type: String,
			default: "",
		},
		controls: {
			type: String,
			required: true,
		},
		nested: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["open"],
	computed: {
		resolvedCountLabel() {
			return this.countLabel || String(this.count);
		},
	},
};
</script>

<style scoped lang="scss">
.mobile-drawer-toggle {
	display: none;
}

@media (max-width: 980px) {
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
		border-color: var(--color-border-strong);
		background: var(--color-panel-soft);
		color: var(--color-text);
		font-weight: 900;
		text-align: left;

		&.is-nested {
			top: 0;
		}

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

		&.is-nested {
			top: 0;
		}
	}
}
</style>
