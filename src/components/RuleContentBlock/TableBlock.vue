<template>
	<section class="table-block" :class="`is-${block.type}`">
		<h3>{{ tableTitle }}</h3>
		<table>
			<thead v-if="hasColumns">
				<tr>
					<th v-for="column in block.columns" :key="column">{{ column }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in block.rows" :key="index">
					<td v-for="(cell, cellIndex) in row" :key="cellIndex"
						:class="{ 'strong-label-cell': isStrongLabelTable && cellIndex === 0 }">
						<span v-if="isDifficultyCell(cell)" v-html="getDifficultyCellHtml(cell)"></span>
						<span v-else>{{ cell }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import { injectDifficultyPills } from "@/utils/difficultyInline";
import { sanitizeHtml } from "@/utils/html";
import { formatRuleLabel } from "@/utils/rules";

export default {
	name: "TableBlock",
	props: {
		block: {
			type: Object,
			required: true,
		},
	},
	computed: {
		hasColumns() {
			return Array.isArray(this.block.columns) && this.block.columns.length > 0;
		},

		isStrongLabelTable() {
			return this.block.type === "modifier_table" || this.block.type === "outcome_table";
		},

		tableTitle() {
			if (this.block.type === "difficulty_table") return "Difficulty";
			if (this.block.type === "modifier_table") return "Modifiers";
			if (this.block.title) return this.block.title;
			return formatRuleLabel(this.block.type);
		},
	},
	methods: {
		isDifficultyCell(value) {
			return Number.isInteger(value);
		},

		getDifficultyCellHtml(value) {
			return sanitizeHtml(injectDifficultyPills(`[[difficulty:${value}]]`));
		},
	},
};
</script>

<style scoped lang="scss">
.table-block {
	overflow-x: auto;
	padding: 0;
	border: 1px solid rgba(244, 239, 229, 0.1);
	border-radius: var(--radius-sm);
	background: transparent;

	h3 {
		margin: 0;
		padding: 0.65rem 0.75rem;
		border-bottom: 1px solid rgba(244, 239, 229, 0.1);
		background: rgba(242, 193, 78, 0.06);
		color: var(--color-accent);
		font-size: 0.82rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	table {
		width: 100%;
		margin: 0;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 0.62rem 0.75rem;
		border-top: 1px solid rgba(244, 239, 229, 0.08);
		text-align: left;
		vertical-align: top;
	}

	th {
		width: 35%;
		background: rgba(244, 239, 229, 0.035);
		color: var(--color-text);
		font-size: 0.78rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	td {
		color: var(--color-muted);
		line-height: 1.45;
	}

	tbody tr:hover td {
		background: rgba(244, 239, 229, 0.025);
	}

	.strong-label-cell {
		color: var(--color-text);
		font-weight: 900;
	}
}
</style>
