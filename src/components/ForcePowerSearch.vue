<template>
	<label class="force-power-search" :class="{ 'contained-focus': containedFocus }">
		<span class="sr-only">{{ ariaLabel }}</span>
		<input
			:value="modelValue"
			class="force-power-search-input"
			type="search"
			:placeholder="placeholder"
			:aria-label="ariaLabel"
			@input="updateValue"
		>
	</label>
</template>

<script>
export default {
	props: {
		modelValue: {
			type: String,
			default: ""
		},
		placeholder: {
			type: String,
			default: ""
		},
		ariaLabel: {
			type: String,
			default: ""
		},
		modelModifiers: {
			type: Object,
			default: () => ({})
		},
		containedFocus: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue"],
	methods: {
		updateValue(event) {
			const value = String(event.target.value || "");
			this.$emit("update:modelValue", this.modelModifiers.trim ? value.trim() : value);
		}
	}
};
</script>

<style scoped lang="scss">
.force-power-search {
	display: block;
	min-width: 0;
	padding: 2px;
}

.force-power-search-input {
	width: 100%;
	min-height: 2.5rem;
	padding: 0.5rem 0.65rem;
	border: 1px solid rgba(244, 239, 229, 0.12);
	border-radius: var(--radius-sm);
	background: var(--color-panel-soft);
	color: var(--color-text);
	font: inherit;

	&::placeholder {
		color: var(--color-subtle);
	}

	&:focus {
		outline: 2px solid rgba(242, 193, 78, 0.42);
		outline-offset: 2px;
	}
}

.contained-focus {
	padding: 0;

	.force-power-search-input:focus {
		outline: none;
		border-color: rgba(242, 193, 78, 0.72);
		box-shadow: inset 0 0 0 1px rgba(242, 193, 78, 0.72);
	}
}

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
</style>
