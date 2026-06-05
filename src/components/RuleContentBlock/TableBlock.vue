<template>
	<section class="table-block" :class="tableClasses">
		<h3 v-if="tableTitle">{{ tableTitle }}</h3>
		<table>
			<thead v-if="hasColumns">
				<tr>
					<th v-for="column in block.columns" :key="column" v-html="getTableCellHtml(column)"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in normalizedRows" :key="index" :class="getRowClass(row)">
					<td v-if="row.type === 'section'" :colspan="columnCount" v-html="getTableCellHtml(row.text)"></td>
					<td v-else-if="row.type === 'note'" :colspan="columnCount" v-html="getTableCellHtml(row.text)"></td>
					<template v-else-if="row.type === 'header'">
						<th v-for="(cell, cellIndex) in row.cells" :key="cellIndex" scope="col"
							v-html="getTableCellHtml(cell)"></th>
					</template>
					<template v-else>
						<td v-for="(cell, cellIndex) in row.cells" :key="cellIndex"
							:class="{ 'strong-label-cell': isStrongLabelTable && cellIndex === 0 }">
							<span v-if="isDifficultyCell(cell)" v-html="getDifficultyCellHtml(cell)"></span>
							<span v-else v-html="getTableCellHtml(cell)"></span>
						</td>
					</template>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import { injectDifficultyPills } from "@/utils/difficultyInline";
import { sanitizeHtml } from "@/utils/html";
import { formatRuleRichText } from "@/utils/ruleContent";

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

		columnCount() {
			if (this.hasColumns) return this.block.columns.length;
			return this.normalizedRows.reduce((count, row) => {
				if (!Array.isArray(row.cells)) return count;
				return Math.max(count, row.cells.length);
			}, 1);
		},

		isStrongLabelTable() {
			return this.block.subtype === "modifier" || !this.block.subtype;
		},

		normalizedRows() {
			if (!Array.isArray(this.block.rows)) return [];

			return this.block.rows.map((row) => {
				if (Array.isArray(row)) {
					return {
						type: "data",
						cells: row,
					};
				}

				if (row && typeof row === "object") {
					if (row.type === "section" || row.type === "note") {
						return {
							type: row.type,
							text: row.text || row.title || "",
						};
					}

					if (row.type === "header" && Array.isArray(row.cells)) {
						return {
							type: "header",
							cells: row.cells,
						};
					}

					if (Array.isArray(row.cells)) {
						return {
							type: "data",
							cells: row.cells,
						};
					}
				}

				return {
					type: "data",
					cells: [row],
				};
			});
		},

		tableClasses() {
			return {
				[`is-${this.block.type}`]: true,
				[`is-${this.block.subtype}`]: Boolean(this.block.subtype),
				"has-title": Boolean(this.tableTitle),
				"has-no-title": !this.tableTitle,
			};
		},

		tableTitle() {
			return String(this.block.title || "").trim();
		},
	},
	methods: {
		isDifficultyCell(value) {
			return Number.isInteger(value);
		},

		getDifficultyCellHtml(value) {
			return sanitizeHtml(injectDifficultyPills(`[[difficulty:${value}]]`));
		},

		getRowClass(row) {
			return {
				"is-section-row": row.type === "section",
				"is-note-row": row.type === "note",
				"is-header-row": row.type === "header",
			};
		},

		getTableCellHtml(value) {
			return formatRuleRichText(value);
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

	.is-section-row td {
		border-top: 0;
		background: rgba(244, 239, 229, 0.035);
		color: var(--color-text);
		font-weight: 900;
		line-height: 1.2;
	}

	.is-section-row:first-child td {
		border-top: 0;
	}

	.is-note-row td {
		background: rgba(244, 239, 229, 0.025);
		color: var(--color-muted);
		font-size: 0.9rem;
		font-style: italic;
		font-weight: 600;
		line-height: 1.4;
		text-align: center;
	}

	.is-header-row th {
		border-top: 1px solid rgba(244, 239, 229, 0.12);
	}

	.is-section-row:hover td {
		background: rgba(244, 239, 229, 0.035);
	}

	.is-note-row:hover td {
		background: rgba(244, 239, 229, 0.025);
	}

	.strong-label-cell {
		color: var(--color-text);
		font-weight: 900;
	}

	&.has-no-title {
		table {
			border-radius: var(--radius-sm);
			overflow: hidden;
		}

		thead:first-child tr:first-child th,
		tbody:first-child tr:first-child th,
		tbody:first-child tr:first-child td {
			border-top: 0;
		}
	}
}
</style>
