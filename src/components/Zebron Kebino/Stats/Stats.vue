<template>
	<div class="stats--container">
		<div class="stats" v-for="(stat, index) in zebron" :key="index">
			<div class="flex-item">
				<div class="name main">{{ getName(stat) }}</div>
				<button class="copy main hover" type="button" @click="copyRoll(stat)">
					{{ getDice(stat) }}
				</button>
			</div>
			<div class="skills">
				<ul class="list">
					<li
						class="list-item"
						v-for="(skill, index) in stat.skills"
						:key="index"
					>
						<button
							class="name hover"
							type="button"
							@click="
								data.currentSkill = skill;
								data.currentStat = stat;
							"
						>
							{{ getName(skill) }}
						</button>
					</li>
				</ul>
				<ul class="list">
					<li
						class="list-item"
						v-for="(skill, index) in stat.skills"
						:key="index"
					>
						<button class="copy hover" type="button" @click="copyRoll(stat, skill)">
							{{ getDice(stat, skill) }}
						</button>
					</li>
				</ul>
			</div>
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

		function getSuffix(skill) {
			if (skill.spez) return "(s)";
			if (skill.adv) return "(A)";
			return "";
		}

		function getName(skill) {
			return `${skill.name} ${getSuffix(skill)}`;
		}

		const copyRoll = (stat, skill) => {
			copyToClipboard(getRollCommand(stat, skill));
		}

		return {
			zebron: zebron.stats,
			data,
			getName,
			getDice,
			getSuffix,
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
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-panel);
		box-shadow: var(--shadow-panel);

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
	}

	.selected-stat {
		grid-column: 1 / -1;
	}
}
</style>
