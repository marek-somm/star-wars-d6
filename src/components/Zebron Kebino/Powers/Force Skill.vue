<template>
	<div class="skill--container">
		<header class="title">
			<div class="title-top">
				<div>
					<p class="eyebrow">Selected Power</p>
					<h1 class="text">{{ skill.name }}</h1>
				</div>
				<div class="title-actions">
					<button
						class="action-button"
						:class="{ active: isFavorite }"
						type="button"
						:aria-pressed="isFavorite"
						@click="$emit('toggle-favorite', skill)"
					>
						{{ isFavorite ? "Saved" : "Favorite" }}
					</button>
					<button
						class="action-button keep-up"
						:class="{ active: keptUpActive }"
						type="button"
						v-if="canKeepUp"
						:aria-pressed="keptUpActive"
						@click="$emit('toggle-kept-up', skill)"
					>
						{{ keptUpActive ? "Kept up" : "Keep up" }}
					</button>
				</div>
			</div>
			<div class="meta-row">
				<span class="meta-pill" v-for="power in skill.powers" :key="power">{{ PowerName[power] }}</span>
				<span class="meta-pill source" v-if="skill.source">{{ skill.source }}</span>
				<span class="meta-pill kept-up" :class="{ active: keptUpActive }" v-if="canKeepUp">
					{{ keptUpActive ? "Kept up active" : "Can be kept up" }}
				</span>
			</div>
			<div class="required" v-if="skill.hasRequiredSkills()">
				<span class="required-label">Required</span>
				<button
					class="required-pill"
					:class="{ disabled: !canSelectSkill(requiredSkill) }"
					type="button"
					v-for="(requiredSkill, index) in skill.required"
					:key="index"
					:disabled="!canSelectSkill(requiredSkill)"
					@click="$emit('select-skill', requiredSkill)"
				>
					{{ requiredSkill.name }}
				</button>
			</div>
		</header>
		<div class="content">
			<div class="effect">
				<div class="summary" v-if="skill.summary" v-html="getSummaryHtml()"></div>
				<template v-for="(block, index) in contentBlocks" :key="index">
					<details
						v-if="block.type === 'example'"
						class="text-section example"
						:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
						open
					>
						<summary>Example</summary>
						<div class="long" v-html="formatRichText(block.text)"></div>
					</details>
					<div
						v-else-if="block.type === 'note'"
						class="text-section note"
						:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
					>
						<p class="note-label">Note</p>
						<div class="long" v-html="formatRichText(block.text)"></div>
					</div>
					<div
						v-else-if="block.type === 'table'"
						class="text-section table-block"
						:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
					>
						<p class="table-title" v-if="block.title" v-html="formatRichText(block.title)"></p>
						<p class="table-text" v-if="block.text" v-html="formatRichText(block.text)"></p>
						<div class="table-wrap">
							<table>
								<thead>
									<tr>
										<th v-for="(column, columnIndex) in block.columns" :key="columnIndex" v-html="sanitizeHtml(column)"></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
										<td
											v-for="(column, columnIndex) in block.columns"
											:key="columnIndex"
										>
											<template v-if="getTableDifficultyCell(block, row, column)">
												<div class="table-difficulty hover-wrap">
													<span class="table-difficulty-chip">{{ getTableDifficultyCell(block, row, column).title }}</span>
													<ul
														class="hover-tooltip"
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
						v-else-if="block.type === 'warning'"
						class="text-section warning"
						:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
					>
						<p class="warning-label">Warning</p>
						<div class="long" v-html="formatRichText(block.text)"></div>
					</div>
					<div
						v-else
						class="text-section"
						:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
					>
						<div class="long" v-html="formatRichText(block.text)"></div>
					</div>
				</template>
			</div>
			<div class="details">
				<Difficulty :skill="skill" />
			</div>
		</div>
	</div>
</template>

<script>
import Difficulty from "./Difficulty.vue";
import { PowerName, Skill } from "@/assets/powers";
import { sanitizeHtml } from "@/utils/html";
import { injectDifficultyPills } from "@/utils/difficultyInline";

export default {
	components: {
		Difficulty
	},
	emits: ["select-skill", "toggle-favorite", "toggle-kept-up"],
	props: {
		skill: {
			required: true,
			type: Skill
		},
		searchTerm: {
			default: "",
			type: String
		},
		isFavorite: {
			default: false,
			type: Boolean
		},
		keptUpActive: {
			default: false,
			type: Boolean
		}
	},
	data() {
		return {
			PowerName
		};
	},
	computed: {
		canKeepUp() {
			return Array.isArray(this.skill.extra)
				&& this.skill.extra.some((item) => String(item || "").toLowerCase().includes("kept up"));
		},

		contentBlocks() {
			if (Array.isArray(this.skill?.contentBlocks) && this.skill.contentBlocks.length > 0) {
				return this.skill.contentBlocks;
			}

			const fallback = [];
			if (this.skill?.effect) {
				fallback.push({ type: "effect", text: this.skill.effect });
			}
			if (this.skill?.example) {
				fallback.push({ type: "example", text: this.skill.example });
			}
			return fallback;
		}
	},
	methods: {
		sanitizeHtml,

		getSummaryHtml() {
			const summary = String(this.skill?.summary || "");
			const search = String(this.searchTerm || "").trim();
			if (!search) return this.formatRichText(summary);

			const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const pattern = new RegExp(`(${escaped})`, "ig");
			return this.formatRichText(summary.replace(pattern, "<mark>$1</mark>"));
		},

		formatRichText(value) {
			return sanitizeHtml(injectDifficultyPills(String(value || "")));
		},

		shouldRenderDivider(index, blocks) {
			if (!Array.isArray(blocks)) return false;

			const currentType = String(blocks[index]?.type || "").toLowerCase();
			if (currentType === "note" || currentType === "warning") return false;

			const firstRegularIndex = blocks.findIndex((block) => {
				const type = String(block?.type || "").toLowerCase();
				return type !== "note" && type !== "warning";
			});
			if (index === firstRegularIndex) {
				return true;
			}
			if (index <= 0) return false;

			const previousType = String(blocks[index - 1]?.type || "").toLowerCase();
			const previousIsSpecial = previousType === "note" || previousType === "warning";
			if (previousIsSpecial) {
				return currentType === "example";
			}

			return true;
		},

		getDifficultyMeta(level, hover = null, andMore = false) {
			let levelTitle = "";
			let levelHover = hover;
			let parsedLevel = Number(level);
			let thisAndMore = Boolean(andMore);

			if (!Number.isNaN(parsedLevel) && parsedLevel > 10) {
				parsedLevel -= 10;
				thisAndMore = true;
			}

			if (parsedLevel === 1) {
				levelTitle = "Very Easy";
				levelHover = levelHover ?? "1-5 or 1D";
			} else if (parsedLevel === 2) {
				levelTitle = "Easy";
				levelHover = levelHover ?? "6-10 or 2D";
			} else if (parsedLevel === 3) {
				levelTitle = "Moderate";
				levelHover = levelHover ?? "11-15 or 3D-4D";
			} else if (parsedLevel === 4) {
				levelTitle = "Difficult";
				levelHover = levelHover ?? "16-20 or 5D-6D";
			} else if (parsedLevel === 5) {
				levelTitle = "Very Difficult";
				levelHover = levelHover ?? "21-30 or 7D-8D";
			} else if (parsedLevel === 6) {
				levelTitle = "Heroic";
				levelHover = levelHover ?? "31+ or 9D+";
			} else {
				return null;
			}

			if (thisAndMore) {
				levelTitle += "+";
				levelHover = String(levelHover || "").replace(" or", "+ or") + "+";
			}

			return {
				title: levelTitle,
				hover: levelHover,
			};
		},

		normalizeHoverList(hover) {
			if (Array.isArray(hover)) return hover.map((entry) => String(entry ?? ""));
			if (hover == null) return [];
			return [String(hover)];
		},

		getDifficultyLabelMeta(value) {
			if (typeof value !== "string") return null;
			const normalized = value.trim();
			if (!normalized) return null;

			if (/^very\s+easy$/i.test(normalized)) return this.getDifficultyMeta(1);
			if (/^easy$/i.test(normalized)) return this.getDifficultyMeta(2);
			if (/^moderate$/i.test(normalized)) return this.getDifficultyMeta(3);
			if (/^difficult$/i.test(normalized)) return this.getDifficultyMeta(4);
			if (/^very\s+difficult$/i.test(normalized)) return this.getDifficultyMeta(5);
			if (/^heroic(?:\s*\(\s*31\+\s*\))?$/i.test(normalized)) return this.getDifficultyMeta(6);
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
				return this.getDifficultyMeta(cell.level, cell.hover ?? null, cell.and_more === true);
			}

			if (!parseByColumn) return null;
			if (typeof cell === "number" || (typeof cell === "string" && /^\d+$/.test(cell))) {
				return this.getDifficultyMeta(Number(cell));
			}

			const difficultyLabel = this.getDifficultyLabelMeta(String(cell));
			if (difficultyLabel) return difficultyLabel;

			const columnType = String(table?.columnTypes?.[column] || "").trim().toLowerCase();
			if (columnType === "difficulty" && typeof cell === "string") {
				return {
					title: cell.trim(),
					hover: null,
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

		canSelectSkill(skill) {
			return Boolean(
				skill
				&& (
					(Array.isArray(skill.powers) && skill.powers.length > 0)
					|| skill.summary
					|| (Array.isArray(skill.contentBlocks) && skill.contentBlocks.length > 0)
					|| skill.effect
					|| skill.example
				)
			);
		},

	}
};
</script>

<style lang="scss" scoped>
.skill--container {
	flex-direction: column;
	align-items: flex-start;
	padding: clamp(1.25rem, 3vw, 2rem);
	color: var(--color-text);

	.title {
		width: 100%;
		margin-bottom: 1.4rem;
		text-align: left;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid rgba(244, 239, 229, 0.16);

		.title-top {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 1rem;
		}

		.eyebrow {
			margin: 0 0 0.4rem;
			color: var(--color-cyan);
			font-size: 0.72rem;
			font-weight: 800;
			letter-spacing: 0;
			text-transform: uppercase;
		}

		.text {
			width: 100%;
			text-align: left;
			margin: 0;
			font-size: 2.65rem;
			line-height: 1.05;
		}

		.title-actions {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
			gap: 0.45rem;
			min-width: 10rem;
		}

		.action-button {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			min-height: 2.2rem;
			padding: 0.35rem 0.7rem;
			border: 1px solid rgba(244, 239, 229, 0.12);
			border-radius: var(--radius-sm);
			background: var(--color-panel-soft);
			color: var(--color-muted);
			font-weight: 900;
			cursor: pointer;
			transition:
				background 0.2s ease,
				border-color 0.2s ease,
				color 0.2s ease;

			&:hover {
				border-color: var(--color-border-strong);
				color: var(--color-text);
			}

			&.active {
				border-color: rgba(242, 193, 78, 0.7);
				background: rgba(242, 193, 78, 0.16);
				color: var(--color-accent);
			}

			&.keep-up.active {
				border-color: rgba(103, 213, 200, 0.44);
				background: rgba(103, 213, 200, 0.13);
				color: var(--color-cyan);
			}
		}

		.meta-row,
		.required {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.45rem;
			margin-top: 0.75rem;
		}

		.meta-pill,
		.required-pill {
			display: inline-flex;
			align-items: center;
			min-height: 1.8rem;
			padding: 0.25rem 0.6rem;
			border-radius: var(--radius-sm);
			font-size: 0.82rem;
			font-weight: 800;
		}

		.meta-pill {
			border: 1px solid rgba(242, 193, 78, 0.36);
			background: rgba(242, 193, 78, 0.12);
			color: var(--color-accent);
		}

		.source {
			border-color: rgba(103, 213, 200, 0.3);
			background: rgba(103, 213, 200, 0.09);
			color: var(--color-cyan);
		}

		.kept-up {
			border-color: rgba(103, 213, 200, 0.3);
			background: rgba(103, 213, 200, 0.09);
			color: var(--color-cyan);

			&.active {
				border-color: rgba(103, 213, 200, 0.56);
				background: rgba(103, 213, 200, 0.16);
			}
		}

		.required-label {
			color: var(--color-muted);
			font-size: 0.75rem;
			font-weight: 900;
			letter-spacing: 0;
			text-transform: uppercase;
		}

		.required-pill {
			border: 1px solid rgba(244, 239, 229, 0.12);
			background: var(--color-panel-soft);
			color: var(--color-text);
		}

		button.required-pill {
			cursor: pointer;
			transition:
				border-color 0.2s ease,
				color 0.2s ease,
				background 0.2s ease;

			&:hover {
				border-color: var(--color-accent);
				color: var(--color-accent);
			}

			&.disabled {
				cursor: not-allowed;
				opacity: 0.56;
			}
		}
	}

	.content {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(22rem, 1.2fr);
		gap: clamp(1rem, 3vw, 2rem);
		width: 100%;
		align-items: start;

		.effect {
			text-align: left;

			.summary {
				margin: 0 0 1rem;
				color: var(--color-text);
				font-size: 1rem;
				line-height: 1.6;
				font-weight: 700;
			}

			.text-section.with-divider {
				position: relative;
				margin-top: 1.1rem;
				padding-top: 1.1rem;
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
						rgba(244, 239, 229, 0.1) 50%,
						rgba(244, 239, 229, 0.04) 88%,
						transparent 100%
					);
				}
			}

			.text-section.note {
				padding: 0.75rem 0.85rem;
				border: 1px solid rgba(103, 213, 200, 0.34);
				border-radius: var(--radius-sm);
				background: rgba(103, 213, 200, 0.08);
				margin-top: 1.4rem;
				margin-inline: 0.45rem;

				.note-label {
					margin: 0 0 0.35rem;
					color: var(--color-cyan);
					font-size: 0.76rem;
					font-weight: 900;
					text-transform: uppercase;
				}
			}

			.text-section.warning {
				padding: 0.75rem 0.85rem;
				border: 1px solid rgba(217, 95, 67, 0.48);
				border-radius: var(--radius-sm);
				background: rgba(217, 95, 67, 0.11);
				margin-top: 1.4rem;
				margin-inline: 0.45rem;

				.warning-label {
					margin: 0 0 0.35rem;
					color: var(--color-danger);
					font-size: 0.76rem;
					font-weight: 900;
					text-transform: uppercase;
				}
			}

			.text-section.table-block {
				margin-top: 1.1rem;
				margin-inline: 0;
				padding-inline: 0.45rem;

				.table-title {
					margin: 0 0 0.45rem;
					color: var(--color-text);
					font-weight: 900;
					line-height: 1.45;
				}

				.table-text {
					margin: 0 0 0.45rem;
					color: var(--color-muted);
					font-size: 1rem;
					font-weight: 500;
					line-height: 1.5;
					margin-inline: -0.45rem;
				}

				.table-wrap {
					overflow-x: auto;
				}

				table {
					width: max-content;
					min-width: 0;
					display: table;
					overflow: visible;
					border-collapse: collapse;
					border: 1px solid rgba(244, 239, 229, 0.12);
					font-size: 0.86rem;
					background: transparent;
				}

				th,
				td {
					padding: 0.38rem 0.52rem;
					border: 1px solid rgba(244, 239, 229, 0.1);
					text-align: left;
					vertical-align: top;
				}

				th {
					color: var(--color-text);
					font-weight: 900;
					background: rgba(242, 193, 78, 0.08);
				}

				td {
					color: var(--color-muted);
					white-space: nowrap;
				}

				.table-subtext {
					margin: 0.45rem 0 0;
					color: var(--color-muted);
					font-size: 0.95rem;
					line-height: 1.6;
					font-weight: 400;
					margin-inline: -0.45rem;
				}

				.table-subnote {
					margin: 0.45rem 0 0;
					color: var(--color-muted);
					font-size: 0.9rem;
					line-height: 1.55;
				}

				.table-difficulty {
					position: relative;
					display: inline-flex;
					align-items: center;
					cursor: help;

					.hover-tooltip {
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
						background: #151311;
						color: var(--color-muted);
						font-size: 0.82rem;
						line-height: 1.4;
						box-shadow: var(--shadow-panel);
						display: none;

						li + li {
							margin-top: 0.3rem;
						}
					}

					&:hover .hover-tooltip,
					&:focus-within .hover-tooltip {
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
				}
			}

			.text-section.note:first-child,
			.text-section.warning:first-child {
				margin-top: 0;
			}

			.text-section.note + .text-section:not(.with-divider),
			.text-section.warning + .text-section:not(.with-divider) {
				margin-top: 0.95rem;
			}

			summary {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 0.75rem;
				margin: 0 0 0.65rem;
				color: var(--color-accent);
				font-size: 0.86rem;
				font-weight: 900;
				letter-spacing: 0;
				text-transform: uppercase;
				cursor: pointer;
				list-style: none;

				&::-webkit-details-marker {
					display: none;
				}

				&::after {
					content: "Hide";
					padding: 0.14rem 0.45rem;
					border: 1px solid rgba(244, 239, 229, 0.12);
					border-radius: var(--radius-sm);
					color: var(--color-muted);
					font-size: 0.72rem;
					font-weight: 900;
					text-transform: none;
				}
			}

			.text-section:not([open]) {
				summary {
					&::after {
						content: "Show";
					}
				}
			}

			.long {
				color: var(--color-muted);
				font-size: 1rem;
				line-height: 1.65;
				margin-bottom: 0;
				overflow-wrap: anywhere;
			}

			.long :deep(table) {
				width: max-content;
				margin: 0.7rem 0;
				border-collapse: collapse;
				border: 1px solid rgba(244, 239, 229, 0.12);
				font-size: 0.86rem;
				display: block;
				overflow-x: auto;
			}

			.long :deep(th),
			.long :deep(td) {
				padding: 0.38rem 0.52rem;
				border: 1px solid rgba(244, 239, 229, 0.1);
				text-align: left;
				vertical-align: top;
				white-space: nowrap;
			}

			.long :deep(th) {
				color: var(--color-text);
				font-weight: 900;
				background: rgba(242, 193, 78, 0.08);
			}

			.long :deep(td) {
				color: var(--color-muted);
			}
		}

		.details {
			min-width: 0;
			padding-left: clamp(1rem, 2vw, 1.5rem);
			border-left: 1px solid rgba(244, 239, 229, 0.16);
			text-align: left;
		}
	}
}

:deep(mark) {
	background: rgba(103, 213, 200, 0.28);
	color: var(--color-text);
	padding: 0 0.15rem;
	border-radius: 2px;
}

:deep(.inline-difficulty-pill) {
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

:deep(.inline-difficulty) {
	position: relative;
	display: inline-flex;
	align-items: center;
	cursor: help;
}

:deep(.inline-difficulty-tooltip) {
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
	background: #151311;
	color: var(--color-muted);
	font-size: 0.82rem;
	line-height: 1.4;
	box-shadow: var(--shadow-panel);
	display: none;
	flex-direction: column;
}

:deep(.inline-difficulty-tooltip-item + .inline-difficulty-tooltip-item) {
	margin-top: 0.3rem;
}

:deep(.inline-difficulty:hover .inline-difficulty-tooltip),
:deep(.inline-difficulty:focus-within .inline-difficulty-tooltip) {
	display: flex;
}

@media (max-width: 980px) {
	.skill--container {
		.title {
			.title-top {
				flex-direction: column;
			}

			.title-actions {
				justify-content: flex-start;
				min-width: 0;
			}
		}

		.content {
			grid-template-columns: 1fr;

			.details {
				padding-left: 0;
				padding-top: 1.25rem;
				border-left: 0;
				border-top: 1px solid rgba(244, 239, 229, 0.16);
			}
		}
	}
}

@media (max-width: 560px) {
	.skill--container {
		padding: 1rem;

		.title {
			margin-bottom: 1rem;
			padding-bottom: 1rem;

			.text {
				font-size: 2rem;
			}

			.title-actions {
				display: grid;
				grid-template-columns: 1fr;
				width: 100%;
			}

			.action-button {
				width: 100%;
				min-height: 2.75rem;
				justify-content: center;
			}

			.meta-pill,
			.required-pill {
				min-height: 2.35rem;
			}
		}

		.content {
			.effect {
				.long {
					max-height: 18rem;
					overflow: auto;
					padding-right: 0.35rem;
				}

				summary {
					min-height: 2.6rem;
					margin-bottom: 0.45rem;
				}
			}
		}
	}
}
</style>

