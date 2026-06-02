<template>
	<div class="stats--container">
		<div class="stats ui-panel" v-for="stat in zebron" :key="stat.name">
			<div class="flex-item">
				<div class="name main">{{ getName(stat) }}</div>
				<button class="copy main hover" type="button" @click="copyRoll(stat)">
					{{ getDice(stat) }}
				</button>
			</div>
			<div class="skills" v-if="getSkills(stat).length">
				<ul class="list">
					<li
						class="list-item"
						v-for="skill in getSkills(stat)"
						:key="getName(skill)"
					>
						<button
							class="name hover"
							type="button"
							@click="selectSkill(stat, skill)"
						>
							{{ getName(skill) }}
						</button>
					</li>
				</ul>
				<ul class="list">
					<li
						class="list-item"
						v-for="skill in getSkills(stat)"
						:key="getName(skill)"
					>
						<button class="copy hover" type="button" @click="copyRoll(stat, skill)">
							{{ getDice(stat, skill) }}
						</button>
					</li>
				</ul>
			</div>
			<p class="empty-skills" v-else>No trained skills</p>
		</div>
		<StatInfo class="selected-stat" :stat="data.currentStat" :skill="data.currentSkill" v-if="data.currentSkill !== ''"/>
	</div>
</template>

<script>
import * as zebron from "@/assets/zebron_kebino.js";
import { reactive } from "vue";
import StatInfo from "./StatInfo";
import { copyToClipboard } from "@/utils/clipboard";
import { formatDice, getRollCommand } from "@/utils/dice";

export default {
	components: {
		StatInfo
	},
	setup() {
		const data = reactive({
			currentSkill: "",
			currentStat: "",
		});

		function getDice(stat, skill = {}) {
			return formatDice(stat, skill);
		}

		function getSkills(stat) {
			if (!stat.skills) return [];
			return Array.isArray(stat.skills) ? stat.skills : Object.values(stat.skills);
		}

		function getSuffix(skill) {
			if (skill.spez) return "(s)";
			if (skill.adv) return "(A)";
			return "";
		}

		function getName(skill) {
			return `${skill.name} ${getSuffix(skill)}`;
		}

		function selectSkill(stat, skill) {
			data.currentSkill = skill;
			data.currentStat = stat;
		}

		const copyRoll = (stat, skill) => {
			copyToClipboard(getRollCommand(stat, skill));
		};

		return {
			zebron: zebron.stats,
			data,
			getName,
			getDice,
			getSkills,
			getSuffix,
			selectSkill,
			copyRoll,
		};
	},
};
</script>

<style lang="scss" scoped>
.stats--container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	gap: 1rem;
	width: 100%;

	.stats {
		display: flex;
		flex-direction: column;
		text-align: left;
		min-width: 0;
		padding: 1rem;

		.flex-item {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			gap: 0.75rem;
			margin-bottom: 0.8rem;
			align-items: center;
			padding-bottom: 0.75rem;
			border-bottom: 1px solid rgba(244, 239, 229, 0.1);
		}

		.name {
			min-width: 0;
		}

		.main {
			color: var(--color-text);
			font-size: 1.1rem;
			font-weight: 900;
		}

		button {
			border: 0;
			background: transparent;
			text-align: left;
			font: inherit;
		}

		.copy {
			width: max-content;
			min-height: 1.7rem;
			border: 1px solid rgba(103, 213, 200, 0.28);
			border-radius: var(--radius-sm);
			background: rgba(103, 213, 200, 0.09);
			color: var(--color-cyan);
			font-weight: 900;
			padding: 0.18rem 0.45rem;
		}

		.hover {
			cursor: pointer;
			transition:
				color 0.2s ease,
				border-color 0.2s ease,
				background 0.2s ease;

			&:hover {
				border-color: var(--color-accent);
				color: var(--color-accent);
			}
		}

		.skills {
			display: grid;
			grid-template-columns: minmax(0, 1fr) auto;
			gap: 0.75rem;

			.list {
				list-style: none;
				text-align: left;
				margin: 0;
				padding: 0;
				min-width: 0;

				.list-item {
					min-height: 1.75rem;
					padding: 0.18rem 0;

					.name {
						color: var(--color-muted);
						line-height: 1.3;
					}
				}
			}
		}

		.empty-skills {
			margin: 0;
			color: var(--color-subtle);
			font-size: 0.92rem;
			font-style: italic;
		}
	}

	.selected-stat {
		grid-column: 1 / -1;
	}
}

@media (max-width: 560px) {
	.stats--container {
		grid-template-columns: 1fr;
		gap: 0.75rem;

		.stats {
			padding: 0.85rem;

			.flex-item {
				align-items: flex-start;
				flex-direction: column;
				gap: 0.45rem;
			}

			.copy {
				min-height: 2.35rem;
			}

			.skills {
				gap: 0.45rem;

				.list {
					.list-item {
						min-height: 2.45rem;
						padding: 0.2rem 0;

						button {
							min-height: 2.2rem;
							width: 100%;
						}
					}
				}
			}
		}
	}
}
</style>
