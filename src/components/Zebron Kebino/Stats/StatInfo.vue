<template>
	<div class="stat-info--container">
		<div class="flex-item">
			<div class="title">
				<div class="name">{{ getName(skill) }}</div>
				<button class="dice copy hover" type="button" @click="copyRoll(stat, skill)">
					{{ getDice(stat, skill) }}
				</button>
			</div>
			<span class="root" v-if="getRoot()">{{ getRoot() }}</span>
		</div>
		<span class="description" v-html="sanitizeHtml(getDescription())"></span>
	</div>
</template>

<script>
import Stats from "@/assets/skills.js";
import { copyToClipboard } from "@/utils/clipboard";
import { formatDice, getRollCommand } from "@/utils/dice";
import { sanitizeHtml } from "@/utils/html";

export default {
	props: {
		stat: {
			required: true,
		},
		skill: {
			required: true,
		},
	},
	setup(props) {
		const stats = new Stats();

		function getDescription() {
			var stat = props.stat.name;
			var skill = getRoot() ? getRoot() : props.skill.name;
			return stats.getDescription(stat, skill).main;
		}

		function getRoot() {
			return props.skill.root;
		}

		function getSuffix(skill) {
			if (skill.spez) return "(s)";
			if (skill.adv) return "(A)";
			return "";
		}

		function getName(skill) {
			return `${skill.name} ${getSuffix(skill)}`;
		}

		function getDice(stat, skill = {}) {
			return formatDice(stat, skill);
		}

		const copyRoll = (stat, skill) => {
			copyToClipboard(getRollCommand(stat, skill));
		}

		return {
			getDescription,
			getName,
			getDice,
			getRoot,
			copyRoll,
			sanitizeHtml,
		};
	},
};
</script>

<style lang="scss" scoped>
.stat-info--container {
	display: flex;
	flex-direction: column;
	text-align: left;
	margin: 0;
	width: 100%;
	padding: 1.25rem;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-panel);
	box-shadow: var(--shadow-panel);

	.flex-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		margin-bottom: 0.75rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid rgba(244, 239, 229, 0.1);

		.title {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			width: 100%;

			.name {
				color: var(--color-text);
				font-size: 1.8rem;
				font-weight: 900;
			}

			.dice {
				font-size: 1.2rem;
			}

			.copy {
				width: max-content;
				border: 1px solid rgba(103, 213, 200, 0.28);
				border-radius: var(--radius-sm);
				background: rgba(103, 213, 200, 0.09);
				color: var(--color-cyan);
				font-weight: 900;
				padding: 0.25rem 0.55rem;
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

			button {
				font: inherit;
			}
		}

		.root {
			color: var(--color-muted);
			font-size: 0.95rem;
			font-style: italic;
			margin-top: 0.35rem;
		}
	}

	.description {
		width: min(56rem, 100%);
		color: var(--color-muted);
		font-size: 1rem;
		line-height: 1.65;
	}
}

@media (max-width: 560px) {
	.stat-info--container {
		.flex-item {
			.title {
				align-items: flex-start;
				flex-direction: column;
				gap: 0.5rem;

				.name {
					font-size: 1.45rem;
				}
			}
		}
	}
}
</style>
