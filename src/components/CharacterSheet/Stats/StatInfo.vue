<template>
	<article class="stat-info--container ui-panel" :class="{ 'has-rulebook-entry': rulebookSkill }">
		<header class="skill-header">
			<div class="skill-heading">
				<p class="eyebrow">{{ statName }} Skill</p>
				<h2>{{ skillName }}</h2>
				<div class="skill-tags">
					<span class="ui-pill is-cyan" v-if="skill?.spez">Specialization</span>
					<span class="ui-pill is-danger" v-if="skill?.adv">Advanced</span>
					<span class="ui-pill" v-if="rootName">Root: {{ rootName }}</span>
					<span class="ui-pill" v-if="rulebookSkill?.attribute">{{ rulebookSkill.attribute }}</span>
				</div>
			</div>

			<button class="dice-button" type="button" @click="copyRoll(stat, skill)">
				{{ getDice(stat, skill) }}
			</button>
		</header>

		<section class="rulebook-summary" v-if="rulebookSkill">
			<div class="source-strip">
				<span>{{ pathLabel }}</span>
				<strong v-if="sourceLabel">{{ sourceLabel }}</strong>
			</div>

			<dl class="meta-grid" v-if="metaFields.length">
				<div class="meta-field" v-for="field in metaFields" :key="field.key">
					<dt>{{ field.label }}</dt>
					<dd v-html="field.value"></dd>
				</div>
				<div class="meta-field examples-field" v-if="examples.length">
					<dt>Examples</dt>
					<dd>
						<em v-for="(example, index) in examples" :key="example">
							{{ example }}<span v-if="index < examples.length - 1">, </span>
						</em>
					</dd>
				</div>
			</dl>
		</section>

		<section class="rule-content" v-if="descriptionBlocks.length">
			<RuleContentBlock v-for="(block, index) in descriptionBlocks" :key="getBlockKey(block, index)" :block="block" />
		</section>

		<details class="more-rules" v-if="additionalBlocks.length">
			<summary>
				<span>Regelwerksdetails</span>
				<strong>{{ additionalBlocks.length }}</strong>
			</summary>
			<div class="rule-content extra-content">
				<RuleContentBlock v-for="(block, index) in additionalBlocks" :key="getBlockKey(block, index)" :block="block" />
			</div>
		</details>

		<p class="missing-rule" v-if="!rulebookSkill">
			Kein Regelwerkseintrag fuer {{ rootName || skillName }} gefunden.
		</p>
	</article>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { copyToClipboard } from "@/utils/clipboard";
import { formatDice, getRollCommand } from "@/utils/dice";
import { formatRuleRichText } from "@/utils/ruleContent";
import { getBlockKey } from "@/utils/rules";
import {
	findRulebookSkill,
	getRulebookSkillSourceLabel,
	rulebookSkillSourceDocument,
} from "@/utils/rulebookSkills";

export default {
	components: {
		RuleContentBlock: defineAsyncComponent(() => import("@/components/RuleContentBlock.vue")),
	},
	props: {
		stat: {
			required: true,
		},
		skill: {
			required: true,
		},
	},
	computed: {
		rulebookSkill() {
			return findRulebookSkill(this.stat, this.skill);
		},

		statName() {
			return this.stat?.name || "";
		},

		rootName() {
			return this.skill?.root || "";
		},

		skillName() {
			return `${this.skill?.name || ""} ${this.getSuffix(this.skill)}`.trim();
		},

		pathLabel() {
			const path = Array.isArray(this.rulebookSkill?.path) ? this.rulebookSkill.path : [];
			const compactPath = path.filter((entry) => entry !== rulebookSkillSourceDocument);
			return compactPath.join(" / ");
		},

		sourceLabel() {
			const pageLabel = getRulebookSkillSourceLabel(this.rulebookSkill);
			if (!pageLabel) return "";
			return rulebookSkillSourceDocument ? `Quelle: ${rulebookSkillSourceDocument}, ${pageLabel}` : `Quelle: ${pageLabel}`;
		},

		metaFields() {
			return [
				{ key: "time_taken", label: "Time Taken" },
				{ key: "specializations", label: "Specializations" },
				{ key: "advanced", label: "Advanced Skill" },
			]
				.map((field) => ({
					...field,
					value: formatRuleRichText(this.rulebookSkill?.fields?.[field.key] || ""),
				}))
				.filter((field) => field.value);
		},

		examples() {
			const rawExamples = String(this.rulebookSkill?.fields?.examples || "").trim();
			if (!rawExamples) return [];

			return rawExamples
				.split(",")
				.map((example) => example.trim())
				.filter(Boolean);
		},

		descriptionBlocks() {
			return this.ruleBlocks.filter((block) => block?.type === "description");
		},

		additionalBlocks() {
			return this.ruleBlocks.filter((block) => block?.type !== "description");
		},

		ruleBlocks() {
			return Array.isArray(this.rulebookSkill?.blocks) ? this.rulebookSkill.blocks : [];
		},
	},
	methods: {
		getBlockKey,

		getSuffix(skill) {
			if (skill?.spez) return "(s)";
			if (skill?.adv) return "(A)";
			return "";
		},

		getDice(stat, skill = {}) {
			return formatDice(stat, skill);
		},

		copyRoll(stat, skill) {
			copyToClipboard(getRollCommand(stat, skill));
		},
	},
};
</script>

<style lang="scss" scoped>
.stat-info--container {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	text-align: left;
	width: 100%;
	margin: 0;
	padding: 1.25rem;
	overflow: hidden;
}

.skill-header {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 1rem;
	align-items: start;
	padding-bottom: 0.9rem;
	border-bottom: 1px solid rgba(244, 239, 229, 0.12);
}

.skill-heading {
	min-width: 0;

	.eyebrow {
		margin: 0 0 0.35rem;
		color: var(--color-cyan);
		font-size: 0.76rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	h2 {
		margin: 0;
		color: var(--color-text);
		font-size: clamp(1.45rem, 2.5vw, 2rem);
		line-height: 1.1;
	}
}

.skill-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.35rem;
	margin-top: 0.75rem;
}

.ui-pill.is-danger {
	border-color: rgba(217, 95, 67, 0.38);
	background: var(--surface-danger);
	color: #f29a7f;
}

.dice-button {
	min-width: 4.4rem;
	min-height: 2.65rem;
	border: 1px solid rgba(103, 213, 200, 0.34);
	border-radius: var(--radius-sm);
	background: rgba(103, 213, 200, 0.1);
	color: var(--color-cyan);
	font: inherit;
	font-size: 1.15rem;
	font-weight: 900;
	cursor: pointer;
	transition:
		border-color 0.2s ease,
		background 0.2s ease,
		color 0.2s ease;

	&:hover {
		border-color: var(--color-accent);
		background: rgba(242, 193, 78, 0.12);
		color: var(--color-accent);
	}
}

.rulebook-summary {
	display: flex;
	flex-direction: column;
	gap: 0.85rem;
}

.source-strip {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 0.45rem 1rem;
	padding: 0.65rem 0;
	border-top: 1px solid rgba(244, 239, 229, 0.08);
	border-bottom: 1px solid rgba(244, 239, 229, 0.08);
	color: var(--color-subtle);
	font-size: 0.78rem;
	font-weight: 800;

	strong {
		color: var(--color-muted);
		font-weight: 900;
	}
}

.meta-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
	gap: 0;
	margin: 0;
	border: 1px solid rgba(244, 239, 229, 0.1);
	border-radius: var(--radius-sm);
	overflow: hidden;
}

.meta-field {
	min-width: 0;
	padding: 0.75rem;
	border-right: 1px solid rgba(244, 239, 229, 0.08);
	border-bottom: 1px solid rgba(244, 239, 229, 0.08);
	background: rgba(244, 239, 229, 0.025);

	dt {
		margin: 0 0 0.25rem;
		color: var(--color-accent);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	dd {
		margin: 0;
		color: var(--color-text);
		font-size: 0.92rem;
		font-weight: 800;
		line-height: 1.45;
	}

	em {
		color: var(--color-text);
		font-style: italic;
	}
}

.rule-content {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	width: min(64rem, 100%);
}

.more-rules {
	border-top: 1px solid rgba(244, 239, 229, 0.1);
	padding-top: 0.35rem;

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		min-height: 2.4rem;
		color: var(--color-accent);
		font-weight: 900;
		cursor: pointer;
		list-style: none;

		&::-webkit-details-marker {
			display: none;
		}

		&::before {
			content: ">";
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 1.3rem;
			height: 1.3rem;
			border: 1px solid rgba(242, 193, 78, 0.34);
			border-radius: var(--radius-sm);
			margin-right: 0.1rem;
			color: var(--color-accent);
			transition: transform 0.2s ease;
		}

		span {
			margin-right: auto;
		}

		strong {
			color: var(--color-cyan);
			font-size: 0.82rem;
		}
	}

	&[open] summary::before {
		transform: rotate(90deg);
	}

	.extra-content {
		margin-top: 0.7rem;
	}
}

.missing-rule {
	margin: 0;
	color: var(--color-muted);
	font-size: 0.96rem;
	line-height: 1.55;
}

@media (max-width: 620px) {
	.stat-info--container {
		padding: 1rem;
	}

	.skill-header {
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	.dice-button {
		width: fit-content;
		min-height: 2.5rem;
	}

	.source-strip {
		flex-direction: column;
	}

	.meta-grid {
		grid-template-columns: 1fr;
	}
}
</style>
