<template>
	<section v-if="isContainerBlock" class="block-section" :class="`is-${block.type}`">
		<header class="block-section-header">
			<p class="block-type">{{ formatType(block.type) }}</p>
			<h3>{{ block.title }}</h3>
		</header>
		<dl class="field-list" v-if="fieldEntries.length">
			<template v-for="field in fieldEntries" :key="field.key">
				<dt>{{ field.label }}</dt>
				<dd v-html="field.value"></dd>
			</template>
		</dl>
		<div class="nested-blocks" v-if="childBlocks.length">
			<RuleContentBlock v-for="(child, index) in childBlocks" :key="getBlockKey(child, index)" :block="child" />
		</div>
	</section>

	<p v-else-if="isTextBlock" class="text-block" :class="`is-${block.type}`" v-html="safeText"></p>

	<aside v-else-if="block.type === 'rule_summary'" class="summary-block">
		<strong>Rule of Thumb</strong>
		<p v-html="safeText"></p>
	</aside>

	<aside v-else-if="block.type === 'note' || block.type === 'example'" class="callout" :class="`is-${block.type}`">
		<strong>{{ block.title || (block.type === 'example' ? 'Example' : 'Note') }}</strong>
		<p v-if="safeText" v-html="safeText"></p>
		<div class="callout-blocks" v-if="childBlocks.length">
			<RuleContentBlock v-for="(child, index) in childBlocks" :key="getBlockKey(child, index)" :block="child" />
		</div>
	</aside>

	<section v-else-if="isTableBlock" class="table-block" :class="`is-${block.type}`">
		<h3>{{ getTableTitle() }}</h3>
		<table>
			<thead v-if="hasColumns">
				<tr>
					<th v-for="column in block.columns" :key="column">{{ column }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in block.rows" :key="index">
					<td v-for="(cell, cellIndex) in row" :key="cellIndex"
						:class="{ 'strong-label-cell': isStrongLabelTable && cellIndex === 0 }">
						<span v-if="isDifficultyCell(cell)" v-html="getDifficultyCellHtml(cell)"></span>
						<span v-else>{{ cell }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</section>

	<p v-else class="text-block is-unknown">{{ fallbackText }}</p>
</template>

<script>
import { injectDifficultyPills } from "@/utils/difficultyInline";
import { sanitizeHtml } from "@/utils/html";

const TEXT_BLOCK_TYPES = new Set([
	"chapter_intro",
	"intro",
	"paragraph",
	"description",
]);

const CONTAINER_BLOCK_TYPES = new Set([
	"stat_block",
	"rule_section",
	"rule",
]);

const PAGE_BLOCK_TYPES = new Set([
	"chapter",
	"skill_group",
	"skill",
]);

export default {
	name: "RuleContentBlock",
	props: {
		block: {
			type: Object,
			required: true,
		},
	},
	computed: {
		isTextBlock() {
			return TEXT_BLOCK_TYPES.has(this.block.type);
		},

		isContainerBlock() {
			return CONTAINER_BLOCK_TYPES.has(this.block.type);
		},

		isTableBlock() {
			return [
				"difficulty_table",
				"modifier_table",
				"outcome_table",
			].includes(this.block.type);
		},

		hasColumns() {
			return Array.isArray(this.block.columns) && this.block.columns.length > 0;
		},

		isStrongLabelTable() {
			return this.block.type === "modifier_table" || this.block.type === "outcome_table";
		},

		childBlocks() {
			return Array.isArray(this.block.blocks)
				? this.block.blocks.filter((child) => !PAGE_BLOCK_TYPES.has(child.type))
				: [];
		},

		fieldEntries() {
			return Object.entries(this.block.fields || {}).map(([key, value]) => ({
				key,
				label: this.formatFieldName(key),
				value: sanitizeHtml(value),
			}));
		},

		safeText() {
			return sanitizeHtml(this.block.text || "");
		},

		fallbackText() {
			return this.block.text || this.block.title || this.formatType(this.block.type);
		},
	},
	methods: {
		getBlockKey(block, index) {
			return block?.id || `${block?.type || "block"}-${index}`;
		},

		formatType(type) {
			return String(type || "unknown")
				.split("_")
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join(" ");
		},

		formatFieldName(key) {
			return String(key || "")
				.split("_")
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join(" ");
		},

		getTableTitle() {
			if (this.block.type === "difficulty_table") return "Difficulty";
			if (this.block.type === "modifier_table") return "Modifiers";
			if (this.block.title) return this.block.title;
			return this.formatType(this.block.type);
		},

		isDifficultyCell(value) {
			return Number.isInteger(value);
		},

		getDifficultyCellHtml(value) {
			return sanitizeHtml(injectDifficultyPills(`[[difficulty:${value}]]`));
		},
	},
};
</script>

<style scoped lang="scss">
.text-block {
	margin: 0;
	color: var(--color-muted);
	font-size: 0.98rem;
	line-height: 1.7;

	&.is-chapter_intro,
	&.is-intro {
		color: rgba(244, 239, 229, 0.82);
		font-size: 1.03rem;
		font-weight: 700;
	}
}

.summary-block,
.callout,
.block-section,
.table-block {
	border: 1px solid rgba(244, 239, 229, 0.1);
	border-radius: var(--radius-sm);
	background: rgba(244, 239, 229, 0.025);
	padding: 0.9rem;
}

.summary-block {
	position: relative;
	padding: 1rem 1.1rem 1rem 1.25rem;
	border-color: rgba(242, 193, 78, 0.32);
	background: linear-gradient(90deg, rgba(242, 193, 78, 0.15), rgba(242, 193, 78, 0.045) 48%, rgba(242, 193, 78, 0.02));

	&::before {
		content: "";
		position: absolute;
		inset: 0 auto 0 0;
		width: 4px;
		border-radius: var(--radius-sm) 0 0 var(--radius-sm);
		background: var(--color-accent);
	}

	strong {
		display: inline-flex;
		align-items: center;
		min-height: 1.35rem;
		margin-bottom: 0.45rem;
		color: var(--color-accent);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	p {
		margin: 0;
		color: var(--color-text);
		font-weight: 900;
		line-height: 1.5;
	}
}

.callout {
	padding: 0.2rem 0 0.2rem 0.95rem;
	border: 0;
	border-left: 3px solid rgba(103, 213, 200, 0.62);
	border-radius: 0;
	background: transparent;

	&.is-example {
		border-left-color: rgba(242, 193, 78, 0.68);

		strong {
			color: var(--color-accent);
		}
	}

	strong {
		display: block;
		margin-bottom: 0.35rem;
		color: var(--color-cyan);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	p {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.55;
	}

	.callout-blocks {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	p+.callout-blocks {
		margin-top: 0.55rem;
	}
}

.block-section {
	position: relative;

	&.is-skill {
		border-color: rgba(103, 213, 200, 0.24);
		background: linear-gradient(180deg, rgba(103, 213, 200, 0.07), rgba(103, 213, 200, 0.025));
	}

	&.is-stat_block {
		padding: 0;
		overflow: hidden;
		border-color: rgba(242, 193, 78, 0.22);
		background: rgba(244, 239, 229, 0.025);

		.block-section-header {
			margin: 0;
			padding: 0.75rem 0.85rem;
			border-bottom: 1px solid rgba(242, 193, 78, 0.16);
			background: rgba(242, 193, 78, 0.07);
		}

		.field-list {
			margin: 0;
			border: 0;
			border-radius: 0;
			background: transparent;
		}

		.nested-blocks {
			padding: 0 0.85rem 0.85rem;
		}
	}

	&.is-rule {
		border-color: rgba(103, 213, 200, 0.18);
		background: rgba(103, 213, 200, 0.035);
	}

	&.is-rule_section {
		display: grid;
		grid-template-columns: minmax(10rem, 14rem) minmax(0, 1fr);
		gap: 1rem;
		align-items: start;
		padding: 0;
		border: 0;
		border-radius: 0;
		background: transparent;

		&+.is-rule_section {
			margin-top: 0.15rem;
			padding-top: 1rem;
			border-top: 1px solid rgba(244, 239, 229, 0.1);
		}

		.block-section-header {
			position: relative;
			min-height: 100%;
			margin: 0;
			padding: 0.2rem 0 0.2rem 0.85rem;
			border-left: 3px solid rgba(242, 193, 78, 0.68);

			&::before {
				content: "";
				position: absolute;
				left: -0.42rem;
				top: 0.35rem;
				width: 0.62rem;
				height: 0.62rem;
				border: 2px solid var(--color-panel);
				border-radius: 50%;
				background: var(--color-accent);
				box-shadow: 0 0 0 1px rgba(242, 193, 78, 0.5);
			}
		}

		.block-type {
			color: var(--color-accent);
		}

		h3 {
			color: var(--color-text);
			font-size: 1rem;
			line-height: 1.25;
		}

		.nested-blocks {
			gap: 0.55rem;
			padding: 0.15rem 0 0.15rem 0.1rem;
			border: 0;
			background: transparent;
		}
	}
}

.block-section-header {
	margin-bottom: 0.75rem;

	.block-type {
		margin: 0 0 0.25rem;
		color: var(--color-muted);
		font-size: 0.68rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	h3 {
		margin: 0;
		color: var(--color-text);
		font-size: 1.15rem;
	}
}

.field-list {
	display: grid;
	grid-template-columns: minmax(8rem, 13rem) minmax(0, 1fr);
	gap: 0;
	margin: 0 0 0.8rem;
	padding: 0;
	border: 1px solid rgba(244, 239, 229, 0.09);
	border-radius: var(--radius-sm);
	background: rgba(0, 0, 0, 0.08);

	dt,
	dd {
		padding: 0.65rem 0.75rem;
		border-top: 1px solid rgba(244, 239, 229, 0.08);
	}

	dt {
		color: var(--color-accent);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	dd {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.45;
	}

	dt:first-of-type,
	dd:first-of-type {
		border-top: 0;
	}
}

.nested-blocks {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.table-block {
	overflow-x: auto;
	padding: 0;
	border-color: rgba(244, 239, 229, 0.1);
	background: transparent;

	h3 {
		margin: 0;
		padding: 0.65rem 0.75rem;
		border-bottom: 1px solid rgba(244, 239, 229, 0.1);
		background: rgba(242, 193, 78, 0.06);
		color: var(--color-accent);
		font-size: 0.82rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	table {
		width: 100%;
		margin: 0;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 0.62rem 0.75rem;
		border-top: 1px solid rgba(244, 239, 229, 0.08);
		text-align: left;
		vertical-align: top;
	}

	th {
		width: 35%;
		background: rgba(244, 239, 229, 0.035);
		color: var(--color-text);
		font-size: 0.78rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	td {
		color: var(--color-muted);
		line-height: 1.45;
	}

	tbody tr:hover td {
		background: rgba(244, 239, 229, 0.025);
	}

	.strong-label-cell {
		color: var(--color-text);
		font-weight: 900;
	}
}

@media (max-width: 620px) {
	.field-list {
		grid-template-columns: 1fr;

		dd {
			padding-top: 0;
			border-top: 0;
		}
	}

	.block-section.is-rule_section {
		grid-template-columns: 1fr;
		gap: 0.6rem;

		&+.is-rule_section {
			padding-top: 0.9rem;
		}

		.block-section-header {
			min-height: 0;
			padding-left: 0.75rem;
		}

		.nested-blocks {
			padding: 0;
		}
	}
}
</style>
