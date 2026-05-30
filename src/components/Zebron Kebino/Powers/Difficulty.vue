<template>
	<div class="difficulty--container">
		<div class="power" v-for="(power, index) in skill.powers" :key="index">
			<div class="title">
				<span class="name">{{ PowerName[power] }}</span>
			</div>
			<div class="details--container">
				<!-- Base Difficulty -->
				<ul class="level--container">
					<li class="level-item" v-for="(item, index) in getDifficulty(power).level" :key="index">
						<div class="level hover">
							<span :title="getDifficultyLevel(item).hover">{{ getDifficultyLevel(item).title }}</span>
						</div>
						<div class="text" v-html="sanitizeHtml(item.text)"></div>
					</li>
				</ul>
				<!-- Increased Difficulty -->
				<ul class="add--container" v-if="skill.hasIncreasedDifficulty(power)">
					<li class="add-item" v-for="(item, index) in getDifficulty(power).increased" :key="index">
						<div class="level" v-html="sanitizeHtml(item.add)"></div>
						<div class="text" v-html="sanitizeHtml(item.text)"></div>
					</li>
				</ul>
				<!-- Modifiers -->
				<ul class="modifiers--container" v-if="skill.hasModifiedDifficulty(power)">
					<li class="modifiers-item" v-for="(item, index) in getDifficulty(power).modifiers" :key="index">
						<div class="level hover">
							<span :title="item.hover">{{ item.text }}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- Extra -->
		<ul class="extra" v-if="getExtra().length">
			<li class="list-item" v-for="(item, index) in getExtra()" :key="index">
				<div v-html="sanitizeHtml(item)"></div>
			</li>
		</ul>
		<!-- Time to Use -->
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
			return this.skill.difficulty[power] || { level: [] };
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
				levelHover = levelHover.replace(" or", "+ or") + "+";
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
	.power {
		width: 100%;

		.title {
			margin-bottom: 1rem;

			.name {
				width: 100%;
				font-size: 1.2rem;
				font-weight: bold;
				margin-right: 0.4rem;
			}

			.dice {
				font-size: 0.8rem;
				font-weight: bold;
				cursor: pointer;
				transition: text-shadow 0.3s;

				&:hover {
					cursor: pointer;
					text-shadow: 1px 1px 2px gray;
				}
			}
		}

		.details--container {

			.level--container,
			.add--container,
			.modifiers--container {
				margin: 0;
				padding: 0;
				margin-bottom: 1rem;
				//list-style: none;

				.level-item,
				.add-item,
				.modifiers-item {
					display: flex;
					width: 100%;
					padding: 0.2rem 0 0.2rem 1.2rem;

					.level {
						width: 30%;
					}

					.hover {
						cursor: help;
					}

					.text {
						width: 70%;
					}
				}

				.modifiers-item {
					font-style: italic;
				}
			}
		}
	}

	.extra {
		list-style: none;
		padding: 0;
		font-style: italic;
		margin-top: 0;
	}

	.timeToUse {
		.title {
			font-weight: bold;
		}
	}
}
</style>
