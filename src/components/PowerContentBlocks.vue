<template>
	<section class="power-content" v-if="blocks.length > 0">
		<template v-for="(block, index) in blocks" :key="index">
			<details
				v-if="block.type === 'example'"
				class="block example"
				:class="{ 'with-divider': shouldRenderDivider(index) }"
			>
				<summary>{{ t("ui.content.example") }}</summary>
				<div class="block-text" v-html="formatBlockHtml(block.text)"></div>
			</details>
			<div
				v-else-if="block.type === 'note'"
				class="block note"
				:class="{ 'with-divider': shouldRenderDivider(index) }"
			>
				<p class="note-label">{{ t("ui.content.note") }}</p>
				<div class="block-text" v-html="formatBlockHtml(block.text)"></div>
			</div>
			<div
				v-else-if="block.type === 'warning'"
				class="block warning"
				:class="{ 'with-divider': shouldRenderDivider(index) }"
			>
				<p class="warning-label">{{ t("ui.content.warning") }}</p>
				<div class="block-text" v-html="formatBlockHtml(block.text)"></div>
			</div>
			<div
				v-else-if="block.type === 'special'"
				class="block special"
				:class="{ 'with-divider': shouldRenderDivider(index) }"
			>
				<p class="special-label">{{ t("ui.content.special") }}</p>
				<div class="block-text" v-html="formatBlockHtml(block.text)"></div>
			</div>
			<div
				v-else-if="block.type === 'table'"
				class="block table-block"
				:class="{ 'with-divider': shouldRenderDivider(index) }"
			>
				<p class="table-title" v-if="block.title" v-html="formatRichText(block.title)"></p>
				<p class="table-text" v-if="block.text" v-html="formatRichText(block.text)"></p>
				<div class="table-wrap">
					<table>
						<thead>
							<tr>
								<th
									v-for="(column, columnIndex) in block.columns"
									:key="columnIndex"
									v-html="sanitizeHtml(column)"
								></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
								<td v-for="(column, columnIndex) in block.columns" :key="columnIndex">
									<template v-if="getTableDifficultyCell(block, row, column)">
										<div class="table-difficulty">
											<span class="table-difficulty-chip">
												{{ getTableDifficultyCell(block, row, column).title }}
											</span>
											<span
												v-if="getTableDifficultyCell(block, row, column).increase"
												class="table-difficulty-increase"
												v-html="sanitizeHtml(getTableDifficultyCell(block, row, column).increase)"
											></span>
											<ul
												class="table-tooltip"
												v-if="normalizeHoverList(getTableDifficultyCell(block, row, column).hover).length"
											>
												<li
													v-for="(hoverItem, hoverIndex) in normalizeHoverList(getTableDifficultyCell(block, row, column).hover)"
													:key="hoverIndex"
												>
													{{ hoverItem }}
												</li>
											</ul>
										</div>
									</template>
									<template v-else>
										<span v-html="sanitizeHtml(getTableCellText(row?.[column]))"></span>
									</template>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="table-subtext" v-if="block.subtext" v-html="formatRichText(block.subtext)"></p>
				<p class="table-subnote" v-if="block.subnote" v-html="formatRichText(block.subnote)"></p>
			</div>
			<div
				v-else
				class="block"
				:class="{ 'with-divider': shouldRenderDivider(index) }"
			>
				<div class="block-text" v-html="formatBlockHtml(block.text)"></div>
			</div>
		</template>
	</section>
</template>

<script>
import { sanitizeHtml } from "@/utils/html";
import { defaultPowerLanguage, getForcePowerText } from "@/assets/power_data";
import {
	formatRichText,
	getDifficultyMeta,
	normalizeHoverList,
	toParagraphHtml,
} from "@/utils/powerContent";

export default {
	props: {
		blocks: {
			type: Array,
			default: () => [],
		},
		language: {
			type: String,
			default: defaultPowerLanguage,
		},
	},
	methods: {
		sanitizeHtml,
		formatRichText,
		normalizeHoverList,

		t(id, replacements = {}) {
			return getForcePowerText(this.language, id, replacements);
		},

		formatBlockHtml(text) {
			return toParagraphHtml(String(text || ""));
		},

		shouldRenderDivider(index) {
			const blocks = this.blocks;
			if (!Array.isArray(blocks)) return false;

			const currentType = String(blocks[index]?.type || "").toLowerCase();
			if (["note", "warning", "special"].includes(currentType)) return false;

			const firstRegularIndex = blocks.findIndex((block) => {
				const type = String(block?.type || "").toLowerCase();
				return !["note", "warning", "special"].includes(type);
			});
			if (index === firstRegularIndex) return true;
			if (index <= 0) return false;

			const previousType = String(blocks[index - 1]?.type || "").toLowerCase();
			if (["note", "warning", "special"].includes(previousType)) {
				return currentType === "example";
			}

			return true;
		},

		getDifficultyLabelMeta(value) {
			if (typeof value !== "string") return null;
			const normalized = value.trim();
			if (!normalized) return null;

			if (/^very\s+easy$/i.test(normalized)) return getDifficultyMeta(1);
			if (/^easy$/i.test(normalized)) return getDifficultyMeta(2);
			if (/^moderate$/i.test(normalized)) return getDifficultyMeta(3);
			if (/^difficult$/i.test(normalized)) return getDifficultyMeta(4);
			if (/^very\s+difficult$/i.test(normalized)) return getDifficultyMeta(5);
			if (/^heroic(?:\s*\(\s*31\+\s*\))?$/i.test(normalized)) return getDifficultyMeta(6);
			return null;
		},

		shouldParseTableDifficultyCell(table, column) {
			const columnType = String(table?.columnTypes?.[column] || "").trim().toLowerCase();
			if (columnType === "difficulty") return true;
			if (columnType === "plain" || columnType === "text") return false;

			const rows = Array.isArray(table?.rows) ? table.rows : [];
			if (rows.length === 0) return false;

			let hasDifficultyValue = false;
			for (const row of rows) {
				const cell = row?.[column];
				if (cell == null || cell === "") continue;

				if (cell && typeof cell === "object" && cell.level != null) {
					hasDifficultyValue = true;
					continue;
				}

				if (typeof cell === "number" || (typeof cell === "string" && /^\d+$/.test(cell))) {
					const numeric = Number(cell);
					if (numeric >= 1 && numeric <= 6) {
						hasDifficultyValue = true;
						continue;
					}
				}

				return false;
			}

			return hasDifficultyValue;
		},

		getTableDifficultyCell(table, row, column) {
			const cell = row?.[column];
			if (cell == null) return null;
			const parseByColumn = this.shouldParseTableDifficultyCell(table, column);

			if (cell && typeof cell === "object" && cell.level != null && (parseByColumn || cell.difficulty === true)) {
				return {
					...getDifficultyMeta(cell.level, cell.hover ?? null, cell.and_more === true),
					increase: cell.increase != null ? String(cell.increase) : null,
				};
			}

			if (!parseByColumn) return null;
			if (typeof cell === "number" || (typeof cell === "string" && /^\d+$/.test(cell))) {
				return {
					...getDifficultyMeta(Number(cell)),
					increase: null,
				};
			}

			const difficultyLabel = this.getDifficultyLabelMeta(String(cell));
			if (difficultyLabel) {
				return {
					...difficultyLabel,
					increase: null,
				};
			}

			const columnType = String(table?.columnTypes?.[column] || "").trim().toLowerCase();
			if (columnType === "difficulty" && typeof cell === "string") {
				return {
					title: cell.trim(),
					hover: null,
					increase: null,
				};
			}

			return null;
		},

		getTableCellText(value) {
			if (value == null) return "";
			if (value && typeof value === "object") {
				if (Object.prototype.hasOwnProperty.call(value, "text")) return value.text;
				if (Object.prototype.hasOwnProperty.call(value, "label")) return value.label;
				return "";
			}
			return String(value);
		},
	},
};
</script>

<style lang="scss" scoped>
.power-content {
	.block.with-divider {
		position: relative;
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 0;

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0.45rem;
			right: 0.45rem;
			height: 1px;
			background: linear-gradient(
				90deg,
				transparent 0%,
				rgba(244, 239, 229, 0.04) 12%,
				var(--color-rule) 50%,
				rgba(244, 239, 229, 0.04) 88%,
				transparent 100%
			);
		}
	}

	.block {
		color: var(--color-muted);
		font-size: 1rem;
		line-height: 1.65;
		overflow-wrap: anywhere;

		:deep(p) {
			margin: 0;
		}

		:deep(p + p) {
			margin-top: 0.5rem;
		}
	}

	.note,
	.warning,
	.special {
		margin-top: 1rem;
		margin-inline: 0.45rem;
		padding: 0.75rem 0.85rem;
		border-radius: var(--radius-sm);
	}

	.note {
		border: 1px solid rgba(103, 213, 200, 0.34);
		background: var(--surface-cyan);
	}

	.warning {
		border: 1px solid rgba(217, 95, 67, 0.48);
		background: var(--surface-danger);
	}

	.special {
		border: 1px solid rgba(153, 123, 255, 0.42);
		background: linear-gradient(135deg, rgba(153, 123, 255, 0.14) 0%, rgba(111, 76, 205, 0.08) 100%);
		box-shadow: inset 0 0 0 1px rgba(196, 181, 253, 0.12);
	}

	.note:first-child,
	.warning:first-child,
	.special:first-child {
		margin-top: 0;
	}

	.note-label,
	.warning-label,
	.special-label {
		margin: 0 0 0.35rem;
		font-size: 0.76rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	.note-label {
		color: var(--color-cyan);
	}

	.warning-label {
		color: var(--color-danger);
	}

	.special-label {
		color: #c7b8ff;
		letter-spacing: 0.04em;
	}

	.example summary {
		margin-bottom: 0;
		color: var(--color-accent);
		font-size: 0.82rem;
		font-weight: 800;
		text-transform: uppercase;
		cursor: pointer;
	}

	.example[open] summary {
		margin-bottom: 0.55rem;
	}

	.table-block {
		margin-top: 1rem;
		margin-inline: 0;
		padding-inline: 0.45rem;

		.table-title {
			margin: 0 0 0.45rem;
			color: var(--color-text);
			font-weight: 900;
			line-height: 1.45;
		}

		.table-text,
		.table-subtext {
			margin-inline: -0.45rem;
			color: var(--color-muted);
			font-size: 1rem;
			line-height: 1.5;
		}

		.table-text {
			margin-top: 0;
			margin-bottom: 0.45rem;
			font-weight: 500;
		}

		.table-subtext {
			margin-top: 0.45rem;
			margin-bottom: 0;
			font-weight: 400;
			line-height: 1.6;
		}

		.table-subnote {
			margin: 0.45rem 0 0;
			color: var(--color-muted);
			font-size: 0.9rem;
			line-height: 1.55;
		}

		.table-wrap {
			overflow-x: auto;
		}
	}

	table,
	:deep(table) {
		width: max-content;
		min-width: 0;
		margin: 0.7rem 0;
		border-collapse: collapse;
		border: 1px solid var(--color-border-muted);
		background: transparent;
		font-size: 0.86rem;
	}

	th,
	td,
	:deep(th),
	:deep(td) {
		padding: 0.38rem 0.52rem;
		border: 1px solid var(--color-rule);
		text-align: left;
		vertical-align: top;
		white-space: nowrap;
	}

	th,
	:deep(th) {
		color: var(--color-text);
		font-weight: 900;
		background: rgba(242, 193, 78, 0.08);
	}

	td,
	:deep(td) {
		color: var(--color-muted);
	}

	.table-difficulty {
		position: relative;
		display: inline-flex;
		align-items: center;
		cursor: help;

		&:hover .table-tooltip,
		&:focus-within .table-tooltip {
			display: block;
		}
	}

	.table-difficulty-chip {
		display: inline-flex;
		align-items: center;
		min-height: 1.55rem;
		padding: 0.12rem 0.48rem;
		border: 1px solid rgba(242, 193, 78, 0.36);
		border-radius: var(--radius-sm);
		background: rgba(242, 193, 78, 0.1);
		color: var(--color-accent);
		font-size: 0.79rem;
		font-weight: 900;
		line-height: 1.2;
		vertical-align: middle;
	}

	.table-difficulty-increase {
		margin-left: 0.4rem;
		color: var(--color-text);
		font-weight: 800;
		line-height: 1.2;
	}

	.table-tooltip {
		position: absolute;
		left: 0;
		top: calc(100% + 0.3rem);
		z-index: 6;
		width: min(22rem, 80vw);
		margin: 0;
		padding: 0.5rem 0.7rem;
		list-style: none;
		border: 1px solid rgba(244, 239, 229, 0.14);
		border-radius: var(--radius-sm);
		background: var(--color-tooltip);
		color: var(--color-muted);
		font-size: 0.82rem;
		line-height: 1.4;
		box-shadow: var(--shadow-panel);
		display: none;
	}

	.table-tooltip li + li {
		margin-top: 0.3rem;
	}
}

@media (max-width: 560px) {
	.power-content {
		.block {
			font-size: 0.9rem;
		}

		table,
		:deep(table) {
			font-size: 0.78rem;
		}

		th,
		td,
		:deep(th),
		:deep(td) {
			padding: 0.3rem 0.35rem;
		}

	}
}
</style>
