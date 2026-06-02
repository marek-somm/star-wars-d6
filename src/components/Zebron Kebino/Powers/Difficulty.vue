<template>
	<div class="difficulty--container">
		<details class="power" v-for="(group, index) in difficultyGroups" :key="group.key || index" open>
			<summary class="title">
				<span class="name">{{ getGroupPowerLabel(group.powers) }}</span>
				<span class="summary-badges">
					<span class="summary-badge-group" v-for="(item, itemIndex) in group.difficulty.level"
						:key="itemIndex">
						<template v-for="(pill, pillIndex) in getDifficultyPills(item)"
							:key="`${itemIndex}-${pillIndex}`">
							<span class="hover-wrap summary-pill">
								<span class="summary-badge" :class="{ optional: isOptionalDifficultyItem(item) }">
									{{ pill.title }}
								</span>
								<ul class="hover-tooltip" v-if="normalizeHoverList(pill.hover).length">
									<li v-for="(hoverItem, hoverIndex) in normalizeHoverList(pill.hover)"
										:key="hoverIndex">
										{{ hoverItem }}
									</li>
								</ul>
							</span>
							<span class="summary-plus" v-if="pillIndex < getDifficultyPills(item).length - 1">+</span>
						</template>
					</span>
					<span class="summary-badge muted"
						v-if="hasConditionalDifficulty(group.difficulty)">Conditional</span>
					<span class="summary-badge muted" v-if="hasUpkeepDifficulty(group.difficulty)">Upkeep</span>
					<span class="summary-badge muted" v-if="hasIncreasedDifficulty(group.difficulty)">Increases</span>
					<span class="summary-badge muted" v-if="hasModifiedDifficulty(group.difficulty)">Modifiers</span>
					<span class="summary-badge muted" v-if="!hasBaseDifficulty(group.difficulty)">No base
						difficulty</span>
				</span>
			</summary>
			<div class="details--container">
				<section class="details-section" v-if="group.difficulty.level.length">
					<h3>Base Difficulty</h3>
					<ul class="level--container">
						<template v-for="(item, index) in group.difficulty.level" :key="index">
							<li class="level-or" v-if="shouldShowOptionalSeparator(group.difficulty.level, index)">OR
							</li>
							<li class="level-item">
								<div class="level-pills">
									<template v-for="(pill, pillIndex) in getDifficultyPills(item)" :key="pillIndex">
										<div class="level hover-wrap">
											<span class="level-badge"
												:class="{ optional: isOptionalDifficultyItem(item) }">{{ pill.title
												}}</span>
											<ul class="hover-tooltip" v-if="normalizeHoverList(pill.hover).length">
												<li v-for="(hoverItem, hoverIndex) in normalizeHoverList(pill.hover)"
													:key="hoverIndex">
													{{ hoverItem }}
												</li>
											</ul>
										</div>
										<span class="level-plus"
											v-if="pillIndex < getDifficultyPills(item).length - 1">+</span>
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
					<div class="conditional-table-block"
						v-for="(table, tableIndex) in getConditionalTables(group.difficulty)" :key="tableIndex">
						<p class="conditional-title" v-if="table.title">{{ table.title }}</p>
						<div class="conditional-table-wrap">
							<table class="conditional-table">
								<thead>
									<tr>
										<th v-for="(column, columnIndex) in table.columns" :key="columnIndex">{{ column
											}}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(row, rowIndex) in table.rows" :key="rowIndex">
										<td v-for="(column, columnIndex) in table.columns" :key="columnIndex">
											<template v-if="getConditionalDifficultyCell(table, row, column)">
												<div class="conditional-difficulty hover-wrap">
													<span class="difficulty-chip">
														{{ getConditionalDifficultyCell(table, row, column).title }}
													</span>
													<ul class="hover-tooltip"
														v-if="normalizeHoverList(getConditionalDifficultyCell(table, row, column).hover).length">
														<li v-for="(hoverItem, hoverIndex) in normalizeHoverList(getConditionalDifficultyCell(table, row, column).hover)"
															:key="hoverIndex">
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
						<p class="conditional-subnote" v-if="table.subnote" v-html="sanitizeHtml(table.subnote)"></p>
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
											<li v-for="(hoverItem, hoverIndex) in normalizeHoverList(pill.hover)"
												:key="hoverIndex">
												{{ hoverItem }}
											</li>
										</ul>
									</div>
									<span class="level-plus"
										v-if="pillIndex < getDifficultyPills(item).length - 1">+</span>
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
									<li v-for="(hoverItem, hoverIndex) in normalizeHoverList(item.hover)"
										:key="hoverIndex">
										{{ hoverItem }}
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</section>
			</div>
		</details>
		<div class="extra-tags" v-if="getExtraTags().length">
			<div class="extra-tag" :class="tag.type" v-for="(tag, index) in getExtraTags()" :key="index">
				<span class="tag-label">{{ tag.label }}</span>
				<span class="tag-text" v-if="tag.text" v-html="sanitizeHtml(tag.text)"></span>
			</div>
		</div>
		<div class="timeToUse" :class="{ detailed: hasTimeToUseDetails() }">
			<div class="timeToUse-header">
				<span class="time-icon" aria-hidden="true"></span>
				<span class="title">Time to Use</span>
				<span class="content">{{ getTimeToUse() }}</span>
			</div>
			<p class="timeToUse-note" v-if="getTimeToUseNote() && !hasTimeToUseDetails()">
				{{ getTimeToUseNote() }}
			</p>
			<div class="timeToUse-details" v-if="hasTimeToUseDetails()">
				<p class="timeToUse-summary" v-if="getTimeToUseDetails().summary">
					{{ getTimeToUseDetails().summary }}
				</p>
				<div class="timeToUse-metrics">
					<div class="timeToUse-metric">
						<span class="metric-label">Base</span>
						<strong>{{ getTimeToUseDetails().baseLabel }}</strong>
					</div>
					<div class="timeToUse-metric">
						<span class="metric-label">Selected</span>
						<strong>{{ getSelectedTimeToUseLabel() }}</strong>
					</div>
					<div class="timeToUse-metric">
						<span class="metric-label">Modifier</span>
						<strong>{{ getSelectedTimeModifierLabel() }}</strong>
					</div>
					<div class="timeToUse-metric">
						<span class="metric-label">Minimum</span>
						<strong>{{ getTimeToUseDetails().minimumLabel }}</strong>
					</div>
				</div>
				<label class="rush-control" v-if="hasRushControl()">
					<span>{{ getRushModifierLabel() }}</span>
					<input v-model.number="rushMinutesCut" type="range" :min="0" :max="getMaxRushMinutesCut()"
						:step="getRushStepMinutes()">
				</label>
			</div>
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
			PowerName,
			rushMinutesCut: 0
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
			const rowValues = Array.isArray(table?.rows)
				? table.rows.map((row) => row?.[column]).filter((value) => value != null)
				: [];
			if (rowValues.length === 0) return false;

			let hasDifficultyValue = false;
			for (const value of rowValues) {
				if (value && typeof value === "object" && value.level != null) {
					hasDifficultyValue = true;
					continue;
				}

				if (typeof value === "number") {
					if (value >= 1 && value <= 6) {
						hasDifficultyValue = true;
						continue;
					}
				}

				if (
					typeof value === "string"
					&& /very easy|easy|moderate|difficult|very difficult|heroic/i.test(value)
				) {
					hasDifficultyValue = true;
					continue;
				}

				return false;
			}

			return hasDifficultyValue;
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

			if (typeof cell === "number") {
				return this.getDifficultyLevel({ level: cell });
			}

			if (cell && typeof cell === "object" && cell.level != null) {
				return this.getDifficultyLevel({
					level: cell.level,
					hover: cell.hover,
					and_more: cell.and_more,
				});
			}

			if (typeof cell === "string") {
				const normalized = cell.trim();
				if (/^very\s+easy$/i.test(normalized)) return this.getDifficultyLevel({ level: 1 });
				if (/^easy$/i.test(normalized)) return this.getDifficultyLevel({ level: 2 });
				if (/^moderate$/i.test(normalized)) return this.getDifficultyLevel({ level: 3 });
				if (/^difficult$/i.test(normalized)) return this.getDifficultyLevel({ level: 4 });
				if (/^very\s+difficult$/i.test(normalized)) return this.getDifficultyLevel({ level: 5 });
				if (/^heroic(?:\s*\(\s*31\+\s*\))?$/i.test(normalized)) {
					return this.getDifficultyLevel({ level: 6 });
				}
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

		getExtraTags() {
			return this.getExtra()
				.map((item) => this.createExtraTag(item))
				.filter(Boolean);
		},

		createExtraTag(item) {
			const html = String(item || "").trim();
			if (!html) return null;

			const text = html
				.replace(/<[^>]*>/g, "")
				.replace(/\s+/g, " ")
				.trim();
			const normalized = text.toLowerCase();

			if (normalized.startsWith("power can be kept up")) {
				const detail = html.replace(/^Power can be kept up:?\s*/i, "").trim();
				return {
					type: "upkeep",
					label: "Kept Up",
					text: detail && detail !== html ? detail : "",
				};
			}

			if (normalized.includes("may be kept up") || normalized.includes("kept up as long as")) {
				return {
					type: "upkeep",
					label: "Kept Up",
					text: html,
				};
			}

			if (normalized.includes("target must be in sight")) {
				return {
					type: "requirement",
					label: "Requirement",
					text: "Target must be in sight",
				};
			}

			if (normalized.includes("only be used by characters who have been consumed by the dark side")) {
				return {
					type: "dark-side",
					label: "Dark Side Only",
					text: "",
				};
			}

			if (normalized.includes("consumed by the dark side") && normalized.includes("may not use")) {
				return {
					type: "light-side",
					label: "Light Side Only",
					text: "",
				};
			}

			if (normalized.includes("sith discipline")) {
				return {
					type: "discipline",
					label: "Sith Discipline",
					text: "",
				};
			}

			if (normalized.startsWith("homebrew:")) {
				return {
					type: "homebrew",
					label: "Homebrew",
					text: html.replace(/^<b>Homebrew:<\/b>\s*/i, "").replace(/^Homebrew:\s*/i, "").trim(),
				};
			}

			if (normalized.includes("must make a new") || normalized.includes("new roll")) {
				return {
					type: "trigger",
					label: "New Roll",
					text: html,
				};
			}

			if (normalized.includes("can only affect")) {
				return {
					type: "restriction",
					label: "Limited Scope",
					text: html,
				};
			}

			return {
				type: "note",
				label: "Note",
				text: html,
			};
		},

		getTimeToUse() {
			if (this.skill.timeToUse != null) {
				return this.skill.timeToUse;
			}
			return TimeToUse.default;
		},

		getTimeToUseNote() {
			return String(this.skill?.timeToUseNote || "").trim();
		},

		getTimeToUseDetails() {
			return this.skill?.timeToUseDetails || {};
		},

		hasTimeToUseDetails() {
			return Object.keys(this.getTimeToUseDetails()).length > 0;
		},

		getRushRule() {
			return this.getTimeToUseDetails().rush || null;
		},

		getRushOptions() {
			return Array.isArray(this.getRushRule()?.options)
				? this.getRushRule().options
				: [];
		},

		getSelectedRushOption() {
			const options = this.getRushOptions();
			if (!options.length) return null;

			const index = Math.min(Math.max(Number(this.rushMinutesCut) || 0, 0), options.length - 1);
			return options[index];
		},

		hasRushControl() {
			if (this.getRushOptions().length > 1) return true;

			const rush = this.getRushRule();
			return Number(rush?.baseMinutes) > Number(rush?.minimumMinutes)
				&& Number(rush?.stepMinutes) > 0;
		},

		getRushStepMinutes() {
			if (this.getRushOptions().length > 1) return 1;
			return Number(this.getRushRule()?.stepMinutes) || 1;
		},

		getMaxRushMinutesCut() {
			const options = this.getRushOptions();
			if (options.length > 1) return options.length - 1;

			const rush = this.getRushRule();
			if (!rush) return 0;
			return Math.max(0, Number(rush.baseMinutes) - Number(rush.minimumMinutes));
		},

		getSelectedMinutes() {
			const option = this.getSelectedRushOption();
			if (option?.minutes != null) return Number(option.minutes);

			const rush = this.getRushRule();
			if (!rush) return null;

			const maxCut = this.getMaxRushMinutesCut();
			const cut = Math.min(Math.max(Number(this.rushMinutesCut) || 0, 0), maxCut);
			return Math.max(Number(rush.minimumMinutes), Number(rush.baseMinutes) - cut);
		},

		formatMinutes(minutes) {
			if (minutes == null) return "";
			return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
		},

		getSelectedTimeToUseLabel() {
			const option = this.getSelectedRushOption();
			if (option?.label) return option.label;

			const selectedMinutes = this.getSelectedMinutes();
			return selectedMinutes == null
				? this.getTimeToUseDetails().baseLabel || this.getTimeToUse()
				: this.formatMinutes(selectedMinutes);
		},

		getSelectedTimeModifierLabel() {
			const option = this.getSelectedRushOption();
			if (option?.modifierLabel) return option.modifierLabel;

			const rush = this.getRushRule();
			if (!rush) return "+0";

			const cut = Math.min(Math.max(Number(this.rushMinutesCut) || 0, 0), this.getMaxRushMinutesCut());
			const steps = cut / this.getRushStepMinutes();
			const modifier = steps * Number(rush.modifierPerStep || 0);
			return modifier > 0 ? `+${modifier}` : "+0";
		},

		getRushModifierLabel() {
			return this.getRushRule()?.modifierLabel || "Rush modifier";
		}
	},
	watch: {
		"skill.id"() {
			this.rushMinutesCut = 0;
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

					li+li {
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

				.conditional-table-block+.conditional-table-block {
					margin-top: 0.75rem;
				}

				.conditional-title {
					margin: 0 0 0.35rem;
					color: var(--color-text);
					font-weight: 800;
				}

				.conditional-subnote {
					margin: 0.4rem 0 0;
					color: var(--color-muted);
					font-size: 0.82rem;
					line-height: 1.45;
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

						li+li {
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

							li+li {
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

	.extra-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		align-items: flex-start;
	}

	.extra-tag {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem;
		max-width: 100%;
		min-height: 1.75rem;
		padding: 0.22rem 0.55rem;
		border: 1px solid rgba(103, 213, 200, 0.26);
		border-radius: var(--radius-sm);
		background: rgba(103, 213, 200, 0.07);
		color: var(--color-muted);
		line-height: 1.35;

		.tag-label {
			color: var(--color-cyan);
			font-size: 0.72rem;
			font-weight: 900;
			text-transform: uppercase;
		}

		.tag-text {
			font-size: 0.84rem;
			font-weight: 700;
		}

		&.upkeep {
			border-color: rgba(153, 123, 255, 0.36);
			background: rgba(153, 123, 255, 0.1);

			.tag-label {
				color: #c7b8ff;
			}
		}

		&.requirement {
			border-color: rgba(242, 193, 78, 0.3);
			background: rgba(242, 193, 78, 0.08);

			.tag-label {
				color: var(--color-accent);
			}
		}

		&.light-side {
			border-color: rgba(244, 239, 229, 0.24);
			background: rgba(244, 239, 229, 0.07);

			.tag-label {
				color: var(--color-text);
			}
		}

		&.dark-side,
		&.restriction,
		&.trigger {
			border-color: rgba(217, 95, 67, 0.38);
			background: rgba(217, 95, 67, 0.1);

			.tag-label {
				color: var(--color-danger);
			}
		}

		&.homebrew {
			border-color: rgba(153, 123, 255, 0.36);
			background: rgba(153, 123, 255, 0.1);

			.tag-label {
				color: #c7b8ff;
			}
		}

		&.discipline {
			border-color: rgba(217, 95, 67, 0.34);
			background: rgba(217, 95, 67, 0.09);

			.tag-label {
				color: var(--color-danger);
			}
		}
	}

	.timeToUse {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		align-items: flex-start;
		width: fit-content;
		max-width: 100%;
		padding: 0.45rem 0.55rem;
		border: 1px solid rgba(103, 213, 200, 0.24);
		border-radius: var(--radius-sm);
		background: rgba(103, 213, 200, 0.055);
		color: var(--color-muted);

		.timeToUse-header {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.45rem;
			width: 100%;
		}

		.time-icon {
			position: relative;
			display: inline-flex;
			flex: 0 0 auto;
			width: 1rem;
			height: 1rem;
			border: 2px solid rgba(103, 213, 200, 0.74);
			border-radius: 50%;

			&::before,
			&::after {
				content: "";
				position: absolute;
				left: 50%;
				top: 50%;
				width: 1.5px;
				border-radius: 999px;
				background: var(--color-cyan);
				transform-origin: 50% 0;
			}

			&::before {
				height: 0.32rem;
				transform: translate(-50%, -100%);
			}

			&::after {
				height: 0.26rem;
				transform: translate(-50%, -0.02rem) rotate(120deg);
			}
		}

		.title {
			color: var(--color-cyan);
			font-size: 0.74rem;
			font-weight: 900;
			text-transform: uppercase;
		}

		.content {
			display: inline-flex;
			align-items: center;
			min-height: 1.55rem;
			padding: 0.16rem 0.5rem;
			border: 1px solid rgba(244, 239, 229, 0.1);
			border-radius: var(--radius-sm);
			background: rgba(255, 255, 255, 0.035);
			color: var(--color-text);
			font-size: 0.86rem;
			font-weight: 800;
			line-height: 1.4;
		}

		.timeToUse-note {
			width: 100%;
			margin: -0.05rem 0 0 1.45rem;
			color: var(--color-muted);
			font-size: 0.78rem;
			font-weight: 700;
			line-height: 1.35;
		}

		&.detailed {
			width: 100%;
			padding: 0.8rem 0.9rem;
			border: 1px solid rgba(103, 213, 200, 0.28);
			border-radius: var(--radius-sm);
			background: rgba(103, 213, 200, 0.06);

			.time-icon {
				border-color: rgba(103, 213, 200, 0.74);

				&::before,
				&::after {
					background: var(--color-cyan);
				}
			}

			.title {
				color: var(--color-cyan);
			}

			.timeToUse-note {
				margin-left: 0;
			}
		}

		.timeToUse-details {
			display: flex;
			flex-direction: column;
			gap: 0.7rem;
			width: 100%;
		}

		.timeToUse-summary {
			margin: 0;
			line-height: 1.45;
		}

		.timeToUse-metrics {
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 0.55rem;
		}

		.timeToUse-metric {
			display: flex;
			flex-direction: column;
			gap: 0.18rem;
			min-width: 0;
			padding: 0.5rem 0.55rem;
			border: 1px solid rgba(244, 239, 229, 0.1);
			border-radius: var(--radius-sm);
			background: rgba(255, 255, 255, 0.035);

			.metric-label {
				color: var(--color-muted);
				font-size: 0.68rem;
				font-weight: 900;
				text-transform: uppercase;
			}

			strong {
				color: var(--color-text);
				font-size: 0.9rem;
				line-height: 1.25;
			}
		}

		.rush-control {
			display: grid;
			grid-template-columns: minmax(9rem, auto) minmax(8rem, 1fr);
			gap: 0.75rem;
			align-items: center;

			span {
				color: var(--color-cyan);
				font-size: 0.8rem;
				font-weight: 900;
			}

			input {
				width: 100%;
				accent-color: var(--color-cyan);
			}
		}
	}
}

@media (max-width: 560px) {
	.difficulty--container {
		.power {
			.title {
				align-items: flex-start;
				flex-direction: column;
				gap: 0.6rem;

				.summary-badges {
					display: none;
				}

				.name {
					width: 100%;
					font-size: 1.15rem;
					font-weight: 900;
					color: var(--color-text);
				}

				&::before {
					display: none;
				}
			}

			.details--container {
				.details-section {
					.conditional-table-wrap {
						overflow-x: auto;
					}

					h3 {
						font-size: 0.7rem;
						font-weight: 900;
						letter-spacing: 0.03em;
						margin-bottom: 0.65rem;
					}

					.level--container,
					.add--container,
					.modifiers--container {

						.level-item,
						.add-item,
						.modifiers-item {
							display: flex;
							flex-direction: column;
							gap: 0.45rem;
							width: 100%;
							padding: 0.6rem 0;
							align-items: flex-start;

							.level-pills {
								display: flex;
								flex-wrap: wrap;
								gap: 0.4rem;
								width: 100%;
							}

							.level-badge,
							.difficulty-chip {
								font-size: 0.85rem;
								padding: 0.25rem 0.55rem;
								min-height: 1.9rem;
								font-weight: 900;
								white-space: nowrap;
								border-radius: var(--radius-sm);
								flex-shrink: 0;
							}

							.level-plus {
								font-size: 0.78rem;
								margin: 0 0.12rem;
								font-weight: 800;
								color: var(--color-accent);
								align-self: center;
							}

							.text {
								font-size: 0.92rem;
								line-height: 1.6;
								color: var(--color-muted);
								width: 100%;
								margin-top: 0.1rem;
							}
						}

						.modifiers-item {
							flex-direction: row;
							align-items: center;
							gap: 0.55rem;

							.level {
								flex-shrink: 0;
							}
						}
					}
				}
			}
		}

		.extra-tags {
			gap: 0.5rem;
			display: flex;
			flex-wrap: wrap;

			.extra-tag {
				font-size: 0.82rem;
				padding: 0.28rem 0.55rem;
				min-height: 1.8rem;
				gap: 0.35rem;
				flex-basis: auto;
				display: inline-flex;
				align-items: center;

				.tag-label {
					font-size: 0.7rem;
					font-weight: 900;
					text-transform: uppercase;
					flex-shrink: 0;
				}

				.tag-text {
					font-size: 0.84rem;
					font-weight: 700;
				}
			}
		}

		.timeToUse {
			flex-direction: column;
			width: 100%;
			padding: 0.6rem 0.6rem;
			gap: 0.45rem;

			.timeToUse-header {
				gap: 0.45rem;
				width: 100%;
			}

			.content {
				font-size: 0.88rem;
				padding: 0.18rem 0.5rem;
				min-height: 1.7rem;
				font-weight: 800;
			}

			.timeToUse-metrics,
			.rush-control {
				grid-template-columns: 1fr;
				gap: 0.6rem;
			}

			.timeToUse-metric {
				padding: 0.55rem 0.55rem;

				.metric-label {
					font-size: 0.7rem;
				}

				strong {
					font-size: 0.9rem;
				}
			}

			&.detailed {
				padding: 0.85rem 0.85rem;
			}
		}
	}
}

@media (max-width: 400px) {
	.difficulty--container {
		.power {
			.title {
				pointer-events: none;
				cursor: default;
			}
		}
	}
}
</style>
