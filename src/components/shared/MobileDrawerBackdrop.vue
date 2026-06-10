<template>
	<button class="mobile-drawer-backdrop" type="button" :aria-label="ariaLabel" @click="$emit('close')"></button>
</template>

<script>
export default {
	name: "MobileDrawerBackdrop",
	props: {
		ariaLabel: {
			type: String,
			required: true,
		},
	},
	emits: ["close"],
};
</script>

<style scoped lang="scss">
.mobile-drawer-backdrop {
	display: none;
}

@media (max-width: 980px) {
	.mobile-drawer-backdrop {
		position: fixed;
		inset: 0;
		z-index: 10;
		display: block;
		border: 0;
		background: var(--overlay-backdrop);
		cursor: pointer;
	}
}
</style>
