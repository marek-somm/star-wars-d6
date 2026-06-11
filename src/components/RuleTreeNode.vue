<template>
	<div class="tree-node" role="treeitem" :aria-expanded="hasChildren ? isExpanded : undefined">
		<div class="tree-row" :class="{ active: isActive, selectable: node.rule }"
			:style="{ '--tree-depth': node.depth }">
			<button class="tree-toggle" type="button" :disabled="!hasChildren"
				:aria-label="isExpanded ? t('ui.rulebook.closeFolder') : t('ui.rulebook.openFolder')" @click="toggleNode">
				<span aria-hidden="true"></span>
			</button>
			<button class="tree-label" type="button" @click="selectNode">
				<span class="tree-title">{{ node.label }}</span>
				<span class="tree-meta">
					<span v-if="hasChildren">{{ node.count }}</span>
					<span v-if="node.rule">{{ node.typeLabel }}</span>
				</span>
			</button>
		</div>
		<div class="tree-children" v-if="hasChildren && isExpanded" role="group">
			<RuleTreeNode v-for="child in node.children" :key="child.key" :node="child"
				:expanded-keys="expandedKeys" :current-rule-id="currentRuleId" @toggle="$emit('toggle', $event)"
				@select="$emit('select', $event)" />
		</div>
	</div>
</template>

<script>
import { tUi } from "@/utils/uiText";

export default {
	name: "RuleTreeNode",
	props: {
		node: {
			type: Object,
			required: true,
		},
		expandedKeys: {
			type: Object,
			required: true,
		},
		currentRuleId: {
			type: String,
			default: "",
		},
	},
	emits: ["toggle", "select"],
	computed: {
		hasChildren() {
			return Array.isArray(this.node.children) && this.node.children.length > 0;
		},

		isExpanded() {
			return Boolean(this.expandedKeys[this.node.key]);
		},

		isActive() {
			return Boolean(this.node.rule?.id && this.node.rule.id === this.currentRuleId);
		},
	},
	methods: {
		t: tUi,

		toggleNode() {
			if (this.hasChildren) {
				this.$emit("toggle", this.node.key);
			}
		},

		selectNode() {
			if (this.node.rule) {
				this.$emit("select", this.node.rule);
				return;
			}

			this.toggleNode();
		},
	},
};
</script>

<style scoped lang="scss">
.tree-node + .tree-node {
	margin-top: 0.1rem;
}

.tree-row {
	display: grid;
	grid-template-columns: 1.65rem minmax(0, 1fr);
	align-items: center;
	min-height: 2.35rem;
	padding-left: calc(var(--tree-depth, 0) * 0.85rem);
	border-radius: var(--radius-sm);
	transition:
		background 0.2s ease,
		color 0.2s ease;

	&:hover {
		background: rgba(244, 239, 229, 0.04);
	}

	&.active {
		background: rgba(242, 193, 78, 0.12);

		.tree-title {
			color: var(--color-accent);
		}

		.tree-meta span {
			border-color: rgba(242, 193, 78, 0.36);
			color: var(--color-accent);
		}
	}
}

.tree-toggle {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 1.5rem;
	height: 1.5rem;
	padding: 0;
	border: 0;
	background: transparent;
	color: var(--color-muted);
	cursor: pointer;

	span {
		width: 0.42rem;
		height: 0.42rem;
		border: solid currentColor;
		border-width: 0 2px 2px 0;
		transform: rotate(-45deg);
		transition: transform 0.16s ease;
	}

	&:disabled {
		cursor: default;
		opacity: 0.28;
	}
}

.tree-node[aria-expanded="true"] > .tree-row .tree-toggle span {
	transform: rotate(45deg);
}

.tree-label {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	min-width: 0;
	min-height: 2.35rem;
	padding: 0.25rem 0.45rem 0.25rem 0;
	border: 0;
	background: transparent;
	color: inherit;
	text-align: left;
	cursor: pointer;
}

.tree-title {
	min-width: 0;
	overflow: hidden;
	color: var(--color-muted);
	font-size: 0.88rem;
	font-weight: 850;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.tree-meta {
	display: inline-flex;
	gap: 0.25rem;
	align-items: center;

	span {
		display: inline-flex;
		align-items: center;
		min-height: 1.25rem;
		padding: 0.1rem 0.35rem;
		border: 1px solid rgba(244, 239, 229, 0.12);
		border-radius: var(--radius-sm);
		color: var(--color-subtle);
		font-size: 0.66rem;
		font-weight: 900;
	}
}

.tree-children {
	margin: 0.08rem 0 0.15rem;
}

@media (max-width: 480px) {
	.tree-row {
		padding-left: calc(var(--tree-depth, 0) * 0.55rem);
	}

	.tree-label {
		grid-template-columns: minmax(0, 1fr);
		gap: 0.15rem;
	}

	.tree-meta {
		display: none;
	}
}
</style>
