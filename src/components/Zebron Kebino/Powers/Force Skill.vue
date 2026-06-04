<template>
	<div class="skill--container">
		<header class="title">
			<div class="title-top">
				<div>
					<p class="eyebrow">{{ t("ui.characterPowers.selectedPower") }}</p>
					<h1 class="text">{{ skill.name }}</h1>
				</div>
				<div class="title-actions">
					<button class="action-button ui-button" :class="{ active: isFavorite }" type="button"
						:aria-pressed="isFavorite" @click="$emit('toggle-favorite', skill)">
						{{ isFavorite ? t("ui.characterPowers.saved") : t("ui.characterPowers.favorite") }}
					</button>
					<button class="action-button keep-up ui-button" :class="{ active: keptUpActive }" type="button"
						v-if="canKeepUp" :aria-pressed="keptUpActive" @click="$emit('toggle-kept-up', skill)">
						{{ keptUpActive ? t("ui.characterPowers.keptUpActionActive") : t("ui.characterPowers.keepUpAction") }}
					</button>
				</div>
			</div>
			<div class="meta-row">
				<span class="meta-pill" v-for="power in skill.powers" :key="power">{{ PowerName[power] }}</span>
				<span class="meta-pill fan-made" v-if="skill.fanMade">{{ t("ui.characterPowers.fanMade") }}</span>
				<span class="meta-pill source" v-if="skill.source">{{ skill.source }}</span>
				<span class="meta-pill kept-up" :class="{ active: keptUpActive }" v-if="canKeepUp">
					{{ keptUpActive ? t("ui.characterPowers.keptUpActive") : t("ui.characterPowers.canBeKeptUp") }}
				</span>
			</div>
			<div class="required" v-if="skill.hasRequiredSkills()">
				<span class="required-label">{{ t("ui.characterPowers.required") }}</span>
				<div class="required-pills">
					<button class="required-pill ui-button" :class="{ disabled: !canSelectSkill(requiredSkill) }" type="button"
						v-for="(requiredSkill, index) in skill.required" :key="index"
						:disabled="!canSelectSkill(requiredSkill)" @click="$emit('select-skill', requiredSkill)">
						{{ requiredSkill.name }}
					</button>
				</div>
			</div>
		</header>
		<div class="content">
			<div class="effect">
				<div class="summary" v-if="skill.summary" v-html="getSummaryHtml()"></div>
				<PowerContentBlocks :blocks="contentBlocks" :language="language" />
			</div>
			<div class="details">
				<Difficulty :skill="skill" :language="language" />
			</div>
		</div>
	</div>
</template>

<script>
import Difficulty from "./Difficulty.vue";
import PowerContentBlocks from "@/components/PowerContentBlocks.vue";
import { PowerName, Skill } from "@/assets/powers";
import { defaultPowerLanguage, getForcePowerText } from "@/assets/power_data";
import { formatRichText as formatPowerRichText } from "@/utils/powerContent";

export default {
	components: {
		Difficulty,
		PowerContentBlocks
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
		},
		language: {
			default: defaultPowerLanguage,
			type: String
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
				&& this.skill.extra.some((item) => {
					const text = String(item || "").toLowerCase();
					return text.includes("kept up") || text.includes("aufrechterhalten");
				});
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
		t(id, replacements = {}) {
			return getForcePowerText(this.language, id, replacements);
		},

		getSummaryHtml() {
			const summary = String(this.skill?.summary || "");
			const search = String(this.searchTerm || "").trim();
			if (!search) return this.formatRichText(summary);

			const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const pattern = new RegExp(`(${escaped})`, "ig");
			return this.formatRichText(summary.replace(pattern, "<mark>$1</mark>"));
		},

		formatRichText(value) {
			return formatPowerRichText(value);
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
			color: var(--color-muted);

			&:hover {
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

		.fan-made {
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

		.required-pills {
			display: flex;
			flex-wrap: wrap;
			gap: 0.45rem;
		}

		.required-pill {
			border: 1px solid rgba(244, 239, 229, 0.12);
			background: var(--color-panel-soft);
			color: var(--color-text);
		}

		button.required-pill {
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
		}

		.details {
			min-width: 0;
			padding-left: clamp(1rem, 2vw, 1.5rem);
			border-left: 1px solid rgba(244, 239, 229, 0.16);
			text-align: left;
		}
	}
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
		padding: 0.95rem;

		.title {
			margin-bottom: 0.95rem;
			padding-bottom: 0.95rem;

			.text {
				font-size: 1.8rem;
				font-weight: 900;
			}

			.title-actions {
				display: grid;
				grid-template-columns: 1fr;
				width: 100%;
				gap: 0.35rem;
			}

			.action-button {
				width: 100%;
				min-height: 2.65rem;
				justify-content: center;
				font-size: 0.9rem;
				font-weight: 800;
			}

			.meta-pill,
			.required-pill {
				min-height: 1.95rem;
				font-size: 0.78rem;
				line-height: 1.25;
			}

			.required {
				margin-top: 0.65rem;
				align-items: flex-start;
				flex-direction: column;
				gap: 0.4rem;
			}

			.required-label {
				font-size: 0.72rem;
				font-weight: 900;
				margin-bottom: 0.35rem;
			}

			.required-pills {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem;
			}
		}

		.content {
			grid-template-columns: 1fr;

			.details {
				padding-left: 0;
				padding-top: 0.95rem;
				border-left: 0;
				border-top: 1px solid rgba(244, 239, 229, 0.16);
			}

		}
	}
}
</style>
