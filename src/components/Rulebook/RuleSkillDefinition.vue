<template>
	<section class="skill-definition" v-if="hasDefinition" aria-label="Skill definition">
		<div class="definition-fields" v-if="hasMeta">
			<div class="definition-field" v-if="timeTaken">
				<span class="definition-label">Time Taken</span>
				<strong v-html="timeTaken"></strong>
			</div>
			<div class="definition-field" v-if="specializations">
				<span class="definition-label">Specializations</span>
				<p v-html="specializations"></p>
			</div>
			<div class="definition-field examples-field" v-if="examples.length">
				<span class="definition-label">Examples</span>
				<p>
					<em v-for="(example, index) in examples" :key="example">
						{{ example }}<span v-if="index < examples.length - 1">, </span>
					</em>
				</p>
			</div>
			<div class="definition-field is-advanced" v-if="advancedRequirements">
				<span class="definition-label">Advanced Skill</span>
				<p v-html="advancedRequirements"></p>
			</div>
		</div>
		<div class="definition-description" v-if="definitionBlocks.length">
			<RuleContentBlock v-for="(block, index) in definitionBlocks" :key="getBlockKey(block, index)" :block="block" />
		</div>
	</section>
</template>

<script>
import RuleContentBlock from "@/components/RuleContentBlock.vue";
import { sanitizeHtml } from "@/utils/html";
import { getBlockKey } from "@/utils/rules";

export default {
	name: "RuleSkillDefinition",
	components: {
		RuleContentBlock,
	},
	props: {
		rule: {
			type: Object,
			required: true,
		},
	},
	computed: {
		timeTaken() {
			return this.getFieldValue("time_taken");
		},

		specializations() {
			return this.getFieldValue("specializations");
		},

		advancedRequirements() {
			return this.getFieldValue("advanced");
		},

		examples() {
			const rawExamples = String(this.rule?.fields?.examples || "").trim();
			if (!rawExamples) return [];

			return rawExamples
				.split(",")
				.map((example) => example.trim())
				.filter(Boolean);
		},

		definitionBlocks() {
			if (this.rule?.type !== "skill" || !Array.isArray(this.rule.blocks)) return [];
			return this.rule.blocks.filter((block) => block?.type === "description");
		},

		hasMeta() {
			return Boolean(this.timeTaken || this.specializations || this.examples.length || this.advancedRequirements);
		},

		hasDefinition() {
			return Boolean(this.rule?.type === "skill" && (this.hasMeta || this.definitionBlocks.length));
		},
	},
	methods: {
		getBlockKey,

		getFieldValue(key) {
			return sanitizeHtml(this.rule?.fields?.[key] || "");
		},
	},
};
</script>

<style scoped lang="scss">
.skill-definition {
	position: relative;
	margin: 0 0 1.05rem;
	padding: 0.95rem 1.05rem 1rem;
	border: 1px solid rgba(242, 193, 78, 0.34);
	border-left-width: 4px;
	border-radius: var(--radius-md);
	background:
		linear-gradient(135deg, rgba(242, 193, 78, 0.17), rgba(242, 193, 78, 0.065) 45%, rgba(103, 213, 200, 0.035));
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);

	.definition-fields {
		display: grid;
		grid-template-columns: max-content minmax(0, 1fr);
		gap: 0.25rem 0.75rem;
	}

	.definition-field {
		display: grid;
		grid-column: 1 / -1;
		grid-template-columns: max-content minmax(0, 1fr);
		gap: 0.75rem;
		align-items: baseline;
		min-width: 0;
	}

	.definition-label {
		color: var(--color-accent);
		font-size: 0.78rem;
		font-style: italic;
		font-weight: 900;
		line-height: 1.4;
		white-space: nowrap;
	}

	.is-advanced .definition-label {
		color: #f29a7f;
	}

	strong,
	p {
		margin: 0;
		color: var(--color-text);
		font-size: 0.93rem;
		line-height: 1.45;
	}

	strong {
		font-weight: 800;
	}

	em {
		color: var(--color-text);
		font-style: italic;
	}

	.definition-description {
		margin-top: 0.7rem;
		padding-left: 1rem;
		border-left: 2px solid rgba(242, 193, 78, 0.3);
	}
}

@media (max-width: 620px) {
	.skill-definition {
		padding: 0.85rem;

		.definition-fields,
		.definition-field {
			grid-template-columns: 1fr;
			gap: 0.15rem;
		}

		.definition-description {
			padding-left: 0.75rem;
		}
	}
}
</style>
