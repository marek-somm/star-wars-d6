<template>
	<div class="skill--container">
		<header class="title">
			<div>
				<p class="eyebrow">Selected Power</p>
				<h1 class="text">{{ skill.name }}</h1>
			</div>
			<div class="meta-row">
				<span class="meta-pill" v-for="power in skill.powers" :key="power">{{ PowerName[power] }}</span>
				<span class="meta-pill source" v-if="skill.source">{{ skill.source }}</span>
			</div>
			<div class="required" v-if="skill.hasRequiredSkills()">
				<span class="required-label">Required</span>
				<span class="required-pill" v-for="(requiredSkill, index) in skill.required" :key="index">
					{{ requiredSkill.name }}
				</span>
			</div>
		</header>
		<div class="content">
			<div class="effect">
				<section class="text-section" v-if="skill.effect">
					<h2>Effect</h2>
					<p class="long" v-html="sanitizeHtml(skill.effect)"></p>
				</section>
				<section class="text-section example" v-if="skill.example">
					<h2>Example</h2>
					<p class="content" v-html="sanitizeHtml(skill.example)"></p>
				</section>
			</div>
			<div class="details">
				<Difficulty :skill="skill" />
			</div>
		</div>
	</div>
</template>

<script>
// import Powers from "@/assets/powers.js";
// import Zebron from "@/assets/zebron_kebino.js";
import Difficulty from "./Difficulty.vue";
import { PowerName, Skill } from '../../../assets/powers';
import { sanitizeHtml } from "@/utils/html";

export default {
	components: {
		Difficulty
	},
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
		sanitizeHtml
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
		border-bottom: 1px solid rgba(244, 239, 229, 0.1);

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
	}

	.content {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(22rem, 1.2fr);
		gap: clamp(1rem, 3vw, 2rem);
		width: 100%;
		align-items: start;

		.effect {
			text-align: left;

			.text-section + .text-section {
				margin-top: 1.4rem;
				padding-top: 1.4rem;
				border-top: 1px solid rgba(244, 239, 229, 0.1);
			}

			h2 {
				margin: 0 0 0.65rem;
				color: var(--color-accent);
				font-size: 0.86rem;
				font-weight: 900;
				letter-spacing: 0;
				text-transform: uppercase;
			}

			.long {
				color: var(--color-muted);
				font-size: 1rem;
				line-height: 1.65;
				margin-bottom: 0;
			}

			.example {
				.content {
					display: block;
					color: var(--color-muted);
					font-size: 1rem;
					line-height: 1.65;
					margin-bottom: 0;
				}
			}
		}

		.details {
			min-width: 0;
			padding-left: clamp(1rem, 2vw, 1.5rem);
			border-left: 1px solid rgba(244, 239, 229, 0.1);
			text-align: left;
		}
	}
}

@media (max-width: 980px) {
	.skill--container {
		.content {
			grid-template-columns: 1fr;

			.details {
				padding-left: 0;
				padding-top: 1.25rem;
				border-left: 0;
				border-top: 1px solid rgba(244, 239, 229, 0.1);
			}
		}
	}
}

@media (max-width: 560px) {
	.skill--container {
		.title {
			.text {
				font-size: 2rem;
			}
		}
	}
}
</style>
