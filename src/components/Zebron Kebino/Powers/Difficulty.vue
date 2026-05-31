<template>
	<div class="difficulty--container">
		<details class="power" v-for="(power, index) in skill.powers" :key="index" open>
			<summary class="title">
				<span class="name">{{ PowerName[power] }}</span>
				<span class="summary-badges">
					<span class="summary-badge" v-for="(item, itemIndex) in getDifficulty(power).level" :key="itemIndex">
						{{ getDifficultyLevel(item).title }}
					</span>
					<span class="summary-badge muted" v-if="skill.hasIncreasedDifficulty(power)">Increases</span>
					<span class="summary-badge muted" v-if="skill.hasModifiedDifficulty(power)">Modifiers</span>
					<span class="summary-badge muted" v-if="!getDifficulty(power).level.length">No base difficulty</span>
				</span>
			</summary>
			<div class="details--container">
				<section class="details-section" v-if="getDifficulty(power).level.length">
					<h3>Base Difficulty</h3>
					<ul class="level--container">
						<li class="level-item" v-for="(item, index) in getDifficulty(power).level" :key="index">
							<div class="level hover">
								<span class="level-badge" :title="getDifficultyLevel(item).hover">{{ getDifficultyLevel(item).title }}</span>
							</div>
							<div class="text" v-html="sanitizeHtml(item.text)"></div>
						</li>
					</ul>
				</section>
				<section class="details-section" v-if="skill.hasIncreasedDifficulty(power)">
					<h3>Increased Difficulty</h3>
					<ul class="add--container">
						<li class="add-item" v-for="(item, index) in getDifficulty(power).increased" :key="index">
							<div class="level" v-html="sanitizeHtml(item.add)"></div>
							<div class="text" v-html="sanitizeHtml(item.text)"></div>
						</li>
					</ul>
				</section>
				<section class="details-section" v-if="skill.hasModifiedDifficulty(power)">
					<h3>Modifiers</h3>
					<ul class="modifiers--container">
						<li class="modifiers-item" v-for="(item, index) in getDifficulty(power).modifiers" :key="index">
							<div class="level hover">
								<span class="level-badge modifier" :title="item.hover">{{ item.text }}</span>
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
	methods: {
		sanitizeHtml,

		getDifficulty(power) {
			const difficulty = this.skill.difficulty[power] || { level: [] };

			return {
				...difficulty,
				level: difficulty.level || [],
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
			}

			.level--container,
			.add--container,
			.modifiers--container {
				margin: 0;
				padding: 0;
				list-style: none;

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

					.hover {
						cursor: help;
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
			.title {
				align-items: flex-start;
				flex-direction: column;
				gap: 0.55rem;

				.summary-badges {
					justify-content: flex-start;
				}

				&::before {
					order: initial;
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
