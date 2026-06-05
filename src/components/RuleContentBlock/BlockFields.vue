<template>
	<dl class="field-list" v-if="fieldEntries.length">
		<template v-for="field in fieldEntries" :key="field.key">
			<dt>{{ field.label }}</dt>
			<dd v-html="field.value"></dd>
		</template>
	</dl>
</template>

<script>
import { formatRuleRichText } from "@/utils/ruleContent";
import { formatRuleLabel } from "@/utils/rules";

export default {
	name: "BlockFields",
	props: {
		fields: {
			type: Object,
			default: () => ({}),
		},
	},
	computed: {
		fieldEntries() {
			return Object.entries(this.fields || {}).map(([key, value]) => ({
				key,
				label: formatRuleLabel(key),
				value: formatRuleRichText(value),
			}));
		},
	},
};
</script>

<style scoped lang="scss">
.field-list {
	display: grid;
	grid-template-columns: minmax(8rem, 13rem) minmax(0, 1fr);
	gap: 0;
	margin: 0 0 0.8rem;
	padding: 0;
	border: 1px solid rgba(244, 239, 229, 0.09);
	border-radius: var(--radius-sm);
	background: rgba(0, 0, 0, 0.08);

	dt,
	dd {
		padding: 0.65rem 0.75rem;
		border-top: 1px solid rgba(244, 239, 229, 0.08);
	}

	dt {
		color: var(--color-accent);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	dd {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.45;
	}

	dt:first-of-type,
	dd:first-of-type {
		border-top: 0;
	}
}

@media (max-width: 620px) {
	.field-list {
		grid-template-columns: 1fr;

		dd {
			padding-top: 0;
			border-top: 0;
		}
	}
}
</style>
