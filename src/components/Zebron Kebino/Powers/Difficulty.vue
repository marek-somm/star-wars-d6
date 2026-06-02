<template>
	<div class="difficulty--container">
		<details class="power" v-for="(group, index) in difficultyGroups" :key="group.key || index" open>
			<summary class="title">
				<span class="name">{{ getGroupPowerLabel(group.powers) }}</span>
				<span class="summary-badges">
					<span class="summary-badge-group" v-for="(item, itemIndex) in group.difficulty.level" :key="itemIndex">
						<template v-for="(pill, pillIndex) in getDifficultyPills(item)" :key="`${itemIndex}-${pillIndex}`">
							<span class="hover-wrap summary-pill">
								<span class="summary-badge" :class="{ optional: isOptionalDifficultyItem(item) }">
									{{ pill.title }}
								</span>
								<ul class="hover-tooltip" v-if="normalizeHoverList(pill.hover).length">
									<li v-for="(hoverItem, hoverIndex) in normalizeHoverList(pill.hover)" :key="hoverIndex">
										{{ hoverItem }}
									</li>
								</ul>
							</span>
							<span class="summary-plus" v-if="pillIndex < getDifficultyPills(item).length - 1">+</span>
						</template>
					</span>
					<span class="summary-badge muted" v-if="hasConditionalDifficulty(group.difficulty)">Conditional</span>
					<span class="summary-badge muted" v-if="hasUpkeepDifficulty(group.difficulty)">Upkeep</span>
					<span class="summary-badge muted" v-if="hasIncreasedDifficulty(group.difficulty)">Increases</span>
					<span class="summary-badge muted" v-if="hasModifiedDifficulty(group.difficulty)">Modifiers</span>
					<span class="summary-badge muted" v-if="!hasBaseDifficulty(group.difficulty)">No base difficulty</span>
				</span>
			</summary>
			<div class="details--container">
				<section class="details-section" v-if="group.difficulty.level.length">
					<h3>Base Difficulty</h3>
					<ul class="level--container">
						<template v-for="(item, index) in group.difficulty.level" :key="index">
							<li class="level-or" v-if="shouldShowOptionalSeparator(group.difficulty.level, index)">OR</li>
							<li class="level-item">
								<div class="level-pills">
									<template v-for="(pill, pillIndex) in getDifficultyPills(item)" :key="pillIndex">
										<div class="level hover-wrap">
											<span class="level-badge" :class="{ optional: isOptionalDifficultyItem(item) }">{{ pill.title }}</span>
											<ul class="hover-tooltip" v-if="normalizeHoverList(pill.hover).length">
												<li v-for="(hoverItem, hoverIndex) in normalizeHoverList(pill.hover)" :key="hoverIndex">
													{{ hoverItem }}
												</li>
											</ul>
										</div>
										<span class="level-plus" v-if="pillIndex < getDifficultyPills(item).length - 1">+</span>
									</template>
								</div>
								<div class="text" v-html="sanitizeHtml(item.text)"></div>
							</li>
						</template>
					</ul>
				</section>
				<section class="details-section" v-if="hasConditionalDifficulty(group.difficulty)">
					<h3>Conditional Difficulty</h3>
					<div class="conditional-description" v-if="getConditionalDescription(group.difficulty)">
						{{ getConditionalDescription(group.difficulty) }}
					</div>
					<div
						class="conditional-table-block"
						v-for="(table, tableIndex) in getConditionalTables(group.difficulty)"
						:key="tableIndex"
					>
						<p class="conditional-title" v-if="table.title">{{ table.title }}</p>
						<div class="conditional-table-wrap">
							<table class="conditional-table">
								<thead>
									<tr>
										<th v-for="(column, columnIndex) in table.columns" :key="columnIndex">{{ column }}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(row, rowIndex) in table.rows" :key="rowIndex">
										<td
											v-for="(column, columnIndex) in table.columns"
											:key="columnIndex"
										>
											<template v-if="getConditionalDifficultyCell(table, row, column)">
												<div class="conditional-difficulty hover-wrap">
													<span class="difficulty-chip">
														{{ getConditionalDifficultyCell(table, row, column).title }}
													</span>
													<ul
														class="hover-tooltip"
														v-if="normalizeHoverList(getConditionalDifficultyCell(table, row, column).hover).length"
													>
														<li
															v-for="(hoverItem, hoverIndex) in normalizeHoverList(getConditionalDifficultyCell(table, row, column).hover)"
															:key="hoverIndex"
														>
															{{ hoverItem }}
														</li>
													</ul>
												</div>
											</template>
											<template v-else>
												{{ getConditionalCellValue(table, row, column) }}
											</template>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</section>
				<section class="details-section" v-if="hasUpkeepDifficulty(group.difficulty)">
					<h3>Upkeep Difficulty</h3>
					<ul class="level--container">
						<li class="level-item" v-for="(item, index) in group.difficulty.upkeep" :key="index">
							<div class="level-pills">
								<template v-for="(pill, pillIndex) in getDifficultyPills(item)" :key="pillIndex">
									<div class="level hover-wrap">
										<span class="level-badge">{{ pill.title }}</span>
										<ul class="hover-tooltip" v-if="normalizeHoverList(pill.hover).length">
											<li v-for="(hoverItem, hoverIndex) in normalizeHoverList(pill.hover)" :key="hoverIndex">
												{{ hoverItem }}
											</li>
										</ul>
									</div>
									<span class="level-plus" v-if="pillIndex < getDifficultyPills(item).length - 1">+</span>
								</template>
							</div>
							<div class="text" v-html="sanitizeHtml(item.text)"></div>
						</li>
					</ul>
				</section>
				<section class="details-section" v-if="hasIncreasedDifficulty(group.difficulty)">
					<h3>Increased Difficulty</h3>
					<ul class="add--container">
						<li class="add-item" v-for="(item, index) in group.difficulty.increased" :key="index">
							<div class="level" v-html="sanitizeHtml(item.add)"></div>
							<div class="text" v-html="sanitizeHtml(item.text)"></div>
						</li>
					</ul>
				</section>
				<section class="details-section" v-if="hasModifiedDifficulty(group.difficulty)">
					<h3>Modifiers</h3>
					<ul class="modifiers--container">
						<li class="modifiers-item" v-for="(item, index) in group.difficulty.modifiers" :key="index">
							<div class="level hover-wrap">
								<span class="level-badge modifier">{{ item.text }}</span>
								<ul class="hover-tooltip" v-if="normalizeHoverList(item.hover).length">
									<li v-for="(hoverItem, hoverIndex) in normalizeHoverList(item.hover)" :key="hoverIndex">
										{{ hoverItem }}
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</section>
			</div>
		</details>
		<ul class="extra" v-if="getExtra().length">
			<li class="list-item" v-for="(item, index) in getExtra()" :key="index">
				<div v-html="sanitizeHtml(item)"></div>
			</li>
		</ul>
		<div class="timeToUse">
			<span class="title">Time to Use: </span>
			<span class="content">{{ getTimeToUse() }}</span>
		</div>
	</div>
</template>

<script>
import { Skill, PowerName, TimeToUse } from '../../../assets/powers';
import { sanitizeHtml } from "@/utils/html";

export default {
	props: {
		skill: {
			required: true,
			type: Skill
		},
	},
	data() {
		return {
			PowerName
		};
	},
	computed: {
		difficultyGroups() {
			const powers = Array.isArray(this.skill?.powers) ? this.skill.powers : [];
			const groupsBySignature = new Map();

			powers.forEach((power) => {
				const difficulty = this.getDifficulty(power);
				const signature = this.createDifficultySignature(difficulty);
				const existing = groupsBySignature.get(signature);

				if (existing) {
					existing.powers.push(power);
					return;
				}

				groupsBySignature.set(signature, {
					key: `${power}-${signature}`,
					powers: [power],
					difficulty,
				});
			});

			return Array.from(groupsBySignature.values());
		},
	},
	methods: {
		sanitizeHtml,

		getDifficulty(power) {
			const difficulty = this.skill.difficulty[power] || { level: [] };

			return {
				...difficulty,
				level: difficulty.level || [],
			};
		},

		createDifficultySignature(difficulty) {
			const normalized = {
				level: Array.isArray(difficulty?.level) ? difficulty.level : [],
				conditional: difficulty?.conditional || null,
				upkeep: Array.isArray(difficulty?.upkeep) ? difficulty.upkeep : [],
				increased: Array.isArray(difficulty?.increased) ? difficulty.increased : [],
				modifiers: Array.isArray(difficulty?.modifiers) ? difficulty.modifiers : [],
			};
			return JSON.stringify(normalized);
		},

		getGroupPowerLabel(powers = []) {
			return powers
				.map((power) => this.PowerName[power] || power)
				.join(" + ");
		},

		hasIncreasedDifficulty(difficulty = {}) {
			return Array.isArray(difficulty.increased) && difficulty.increased.length > 0;
		},

		hasModifiedDifficulty(difficulty = {}) {
			return Array.isArray(difficulty.modifiers) && difficulty.modifiers.length > 0;
		},

		hasUpkeepDifficulty(difficulty = {}) {
			return Array.isArray(difficulty.upkeep) && difficulty.upkeep.length > 0;
		},

		hasConditionalDifficulty(difficulty = {}) {
			return this.getConditionalTables(difficulty).length > 0;
		},

		hasBaseDifficulty(difficulty = {}) {
			return (Array.isArray(difficulty.level) && difficulty.level.length > 0)
				|| this.hasConditionalDifficulty(difficulty);
		},

		isOptionalDifficultyItem(item) {
			return Boolean(item && typeof item === "object" && item.optional === true);
		},

		shouldShowOptionalSeparator(items, index) {
			if (!Array.isArray(items) || index <= 0) return false;
			return this.isOptionalDifficultyItem(items[index]) && !this.isOptionalDifficultyItem(items[index - 1]);
		},

		getConditionalDescription(difficulty = {}) {
			return String(difficulty?.conditional?.description || "").trim();
		},

		getConditionalTables(difficulty = {}) {
			return Array.isArray(difficulty?.conditional?.tables)
				? difficulty.conditional.tables
				: [];
		},

		shouldParseConditionalDifficultyCell(table, column) {
			const columnTypes = table?.columnTypes && typeof table.columnTypes === "object"
				? table.columnTypes
				: null;
			if (columnTypes) {
				const columnType = String(columnTypes[column] || "").trim().toLowerCase();
				if (columnType === "difficulty") return true;
				if (columnType === "text" || columnType === "plain") return false;
			}

			const rowValues = Array.isArray(table?.rows)
				? table.rows.map((row) => row?.[column]).filter((value) => value != null)
				: [];
			const hasExplicitDifficultyObject = rowValues.some((value) =>
				value && typeof value === "object" && value.level != null
			);
			if (hasExplicitDifficultyObject) return true;

			const hasDifficultyLabel = rowValues.some((value) =>
				typeof value === "string"
				&& /very easy|easy|moderate|difficult|very difficult|heroic/i.test(value)
			);
			if (hasDifficultyLabel) return true;

			return false;
		},

		getConditionalCellValue(table, row, column) {
			if (!row || typeof row !== "object") return "";
			const cell = row[column];
			if (cell == null) return "";

			return String(cell);
		},

		getConditionalDifficultyCell(table, row, column) {
			if (!row || typeof row !== "object") return null;
			if (!this.shouldParseConditionalDifficultyCell(table, column)) return null;

			const cell = row[column];
			if (cell == null) return null;

			if (typeof cell === "number" || (typeof cell === "string" && /^\d+$/.test(cell))) {
				return this.getDifficultyLevel({ level: Number(cell) });
			}

			if (cell && typeof cell === "object" && cell.level != null) {
				return this.getDifficultyLevel({
					level: cell.level,
					hover: cell.hover,
					and_more: cell.and_more,
				});
			}

			return {
				title: String(cell),
				hover: null,
			};
		},

		getDifficultyLevel(item) {
			let levelTitle = "";
			let levelHover = "";
			let level = item.level;
			let thisAndMore = false;

			if (item.and_more) {
				thisAndMore = true;
			}

			if (level > 10) {
				level -= 10;
				thisAndMore = true;
			}

			if (level === 1) {
				levelTitle = "Very Easy";
				levelHover = item.hover ? item.hover : "1-5 or 1D";
			} else if (level === 2) {
				levelTitle = "Easy";
				levelHover = item.hover ? item.hover : "6-10 or 2D";
			} else if (level === 3) {
				levelTitle = "Moderate";
				levelHover = item.hover ? item.hover : "11-15 or 3D-4D";
			} else if (level === 4) {
				levelTitle = "Difficult";
				levelHover = item.hover ? item.hover : "16-20 or 5D-6D";
			} else if (level === 5) {
				levelTitle = "Very Difficult";
				levelHover = item.hover ? item.hover : "21-30 or 7D-8D";
			} else if (level === 6) {
				levelTitle = "Heroic";
				levelHover = item.hover ? item.hover : "31+ or 9D+";
			} else {
				levelTitle = item.level;
				levelHover = item.hover;
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

		getDifficultyPills(item) {
			const rawPills = Array.isArray(item?.levels) && item.levels.length > 0
				? item.levels
				: [item?.level];

			return rawPills.map((entry) => {
				if (entry && typeof entry === "object") {
					return this.getDifficultyLevel({
						level: entry.level,
						hover: entry.hover,
						and_more: entry.and_more,
					});
				}

				return this.getDifficultyLevel({
					level: entry,
					hover: item?.hover,
					and_more: item?.and_more,
				});
			});
		},

		normalizeHoverList(hover) {
			if (Array.isArray(hover)) {
				return hover.map((entry) => String(entry ?? ""));
			}
			if (hover == null) {
				return [];
			}
			return [String(hover)];
		},

		getExtra() {
			if (this.skill != null) {
				return this.skill.extra;
			}
			return [];
		},

		getTimeToUse() {
			if (this.skill.timeToUse != null) {
				return this.skill.timeToUse;
			}
			return TimeToUse.default;
		}
	}
};
</script>

<style lang="scss" scoped>
.difficulty--container {
	display: flex;
	flex-direction: column;
	gap: 1.1rem;

	.power {
		width: 100%;
		padding-bottom: 1.1rem;
		border-bottom: 1px solid rgba(244, 239, 229, 0.1);

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			min-height: 2.7rem;
			margin-bottom: 0.8rem;
			cursor: pointer;
			list-style: none;

			&::-webkit-details-marker {
				display: none;
			}

			&::before {
				content: "Show";
				min-width: 3.3rem;
				order: 3;
				padding: 0.16rem 0.4rem;
				border: 1px solid rgba(244, 239, 229, 0.12);
				border-radius: var(--radius-sm);
				color: var(--color-muted);
				font-size: 0.72rem;
				font-weight: 900;
				text-align: center;
			}

			.name {
				color: var(--color-text);
				font-size: 1.25rem;
				font-weight: bold;
				margin-right: 0.4rem;
			}

			.summary-badges {
				display: flex;
				flex: 1;
				flex-wrap: wrap;
				justify-content: flex-end;
				gap: 0.35rem;
			}

			.summary-badge-group {
				display: inline-flex;
				align-items: center;
				gap: 0.25rem;
			}

			.summary-plus {
				color: var(--color-muted);
				font-size: 0.72rem;
				font-weight: 900;
			}

			.summary-pill {
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

			.summary-badge {
				display: inline-flex;
				align-items: center;
				min-height: 1.5rem;
				padding: 0.14rem 0.45rem;
				border: 1px solid rgba(242, 193, 78, 0.3);
				border-radius: var(--radius-sm);
				background: rgba(242, 193, 78, 0.09);
				color: var(--color-accent);
				font-size: 0.74rem;
				font-weight: 900;

				&.optional {
					border-color: rgba(242, 193, 78, 0.44);
					background:
						linear-gradient(90deg, rgba(242, 193, 78, 0.13) 0%, rgba(242, 193, 78, 0.09) 100%);
					box-shadow: inset 0 0 0 1px rgba(103, 213, 200, 0.34);
				}

				&.muted {
					border-color: rgba(244, 239, 229, 0.12);
					background: rgba(255, 255, 255, 0.035);
					color: var(--color-muted);
				}
			}
		}

		&[open] {
			.title {
				&::before {
					content: "Hide";
				}
			}
		}

		.details--container {
			display: flex;
			flex-direction: column;
			gap: 0.85rem;

			.details-section {
				h3 {
					margin: 0 0 0.5rem;
					color: var(--color-muted);
					font-size: 0.72rem;
					font-weight: 900;
					letter-spacing: 0;
					text-transform: uppercase;
				}

				.conditional-description {
					margin: 0 0 0.55rem;
					color: var(--color-muted);
					line-height: 1.5;
				}

				.conditional-table-block + .conditional-table-block {
					margin-top: 0.75rem;
				}

				.conditional-title {
					margin: 0 0 0.35rem;
					color: var(--color-text);
					font-weight: 800;
				}

				.conditional-table-wrap {
					overflow: visible;
				}

				.conditional-table {
					width: 100%;
					border-collapse: collapse;
					border: 1px solid rgba(244, 239, 229, 0.12);
					font-size: 0.86rem;

					th,
					td {
						padding: 0.38rem 0.52rem;
						border: 1px solid rgba(244, 239, 229, 0.1);
						text-align: left;
					}

					th {
						color: var(--color-text);
						font-weight: 900;
						background: rgba(242, 193, 78, 0.08);
					}

					td {
						color: var(--color-muted);
					}
				}

				.conditional-difficulty {
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

				.difficulty-chip {
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

			.level--container,
			.add--container,
			.modifiers--container {
				margin: 0;
				padding: 0;
				list-style: none;

				.level-or {
					margin: 0.15rem 0;
					padding: 0.1rem 0;
					color: var(--color-muted);
					font-size: 0.72rem;
					font-weight: 900;
					letter-spacing: 0;
					text-transform: uppercase;
				}

				.level-item,
				.add-item,
				.modifiers-item {
					display: grid;
					grid-template-columns: minmax(8rem, 0.8fr) minmax(0, 1.2fr);
					gap: 0.8rem;
					align-items: start;
					width: 100%;
					padding: 0.45rem 0;

					.level {
						color: var(--color-text);
						font-weight: 800;
					}

					.level-pills {
						display: inline-flex;
						flex-wrap: wrap;
						align-items: center;
						gap: 0.35rem;
					}

					.level-plus {
						color: var(--color-muted);
						font-weight: 900;
					}

					.hover-wrap {
						position: relative;
						display: inline-flex;
						flex-direction: column;
						align-items: flex-start;
						gap: 0.25rem;
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

					.text {
						color: var(--color-muted);
						line-height: 1.55;
					}
				}

				.level-badge {
					display: inline-flex;
					align-items: center;
					min-height: 1.7rem;
					padding: 0.2rem 0.55rem;
					border: 1px solid rgba(242, 193, 78, 0.36);
					border-radius: var(--radius-sm);
					background: rgba(242, 193, 78, 0.1);
					color: var(--color-accent);
					font-size: 0.82rem;
					font-weight: 900;

					&.optional {
						border-color: rgba(242, 193, 78, 0.44);
						background:
							linear-gradient(90deg, rgba(242, 193, 78, 0.13) 0%, rgba(242, 193, 78, 0.09) 100%);
						box-shadow: inset 0 0 0 1px rgba(103, 213, 200, 0.34);
					}

					&.modifier {
						border-color: rgba(103, 213, 200, 0.3);
						background: rgba(103, 213, 200, 0.09);
						color: var(--color-cyan);
					}
				}

				.modifiers-item {
					grid-template-columns: 1fr;
				}
			}
		}
	}

	.extra {
		list-style: none;
		padding: 0;
		margin-top: 0;
		margin-bottom: 0;
		color: var(--color-muted);
		line-height: 1.55;

		.list-item {
			padding: 0.4rem 0 0.4rem 1rem;
			border-left: 3px solid rgba(103, 213, 200, 0.36);
		}
	}

	.timeToUse {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		align-items: center;
		color: var(--color-muted);

		.title {
			color: var(--color-text);
			font-weight: bold;
		}
	}
}

@media (max-width: 560px) {
	.difficulty--container {
		.power {
			.details--container {
				.details-section {
					.conditional-table-wrap {
						overflow-x: auto;
					}
				}
			}
		}

		.power {
			.title {
				align-items: flex-start;
				flex-direction: column;
				gap: 0.55rem;

				.summary-badges {
					justify-content: flex-start;
				}

				&::before {
					order: 3;
					min-height: 2rem;
				}
			}

			.details--container {
				.level--container,
				.add--container {
					.level-item,
					.add-item {
						grid-template-columns: 1fr;
						gap: 0.35rem;
					}
				}
			}
		}
	}
}
</style>
