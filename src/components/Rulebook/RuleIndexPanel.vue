<template>
	<aside id="rule-index-panel" class="rule-index ui-panel" :class="{ collapsed, 'mobile-open': mobileIndexOpen }">
		<div class="index-panel-header">
			<div class="index-panel-title">
				<span>Regelindex</span>
				<button class="index-close ui-button" type="button" @click="$emit('close')">Schliessen</button>
			</div>
			<input :value="search" class="search mobile-search" type="search" placeholder="Regeln durchsuchen"
				aria-label="Regeln durchsuchen" @input="$emit('update:search', $event.target.value.trim())">
			<div class="mobile-filters">
				<select class="ui-control" :value="typeFilter" @change="$emit('update:typeFilter', $event.target.value)">
					<option value="all">Alle Typen</option>
					<option v-for="type in availableTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
				</select>
				<select class="ui-control" :value="chapterFilter" @change="$emit('update:chapterFilter', $event.target.value)">
					<option value="all">Alle Kapitel</option>
					<option v-for="chapter in availableChapters" :key="chapter.value" :value="chapter.value">
						{{ chapter.label }}
					</option>
				</select>
			</div>
		</div>
		<div class="index-heading" :aria-hidden="collapsed">
			<span>Regelindex</span>
			<strong>{{ filteredCount }}</strong>
		</div>
		<button class="index-toggle ui-button" type="button" :aria-expanded="!collapsed"
			:aria-label="collapsed ? 'Regelindex anzeigen' : 'Regelindex ausblenden'"
			:title="collapsed ? 'Regelindex anzeigen' : 'Regelindex ausblenden'" @click="$emit('toggle-collapse')">
			<span class="index-toggle-icon" aria-hidden="true"></span>
		</button>
		<div class="index-scroll" :aria-hidden="collapsed">
			<div class="rule-tree" role="tree" aria-label="Regelstruktur">
				<RuleTreeNode v-for="node in ruleTree" :key="node.key" :node="node"
					:expanded-keys="expandedKeys" :current-rule-id="currentRuleId"
					@toggle="$emit('toggle', $event)" @select="$emit('select', $event)" />
			</div>
			<p class="empty" v-if="ruleTree.length === 0">Keine Regeln gefunden.</p>
		</div>
	</aside>
</template>

<script>
import RuleTreeNode from "@/components/RuleTreeNode.vue";

export default {
	name: "RuleIndexPanel",
	components: {
		RuleTreeNode,
	},
	props: {
		ruleTree: {
			type: Array,
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
		filteredCount: {
			type: Number,
			required: true,
		},
		search: {
			type: String,
			default: "",
		},
		typeFilter: {
			type: String,
			required: true,
		},
		chapterFilter: {
			type: String,
			required: true,
		},
		availableTypes: {
			type: Array,
			required: true,
		},
		availableChapters: {
			type: Array,
			required: true,
		},
		mobileIndexOpen: {
			type: Boolean,
			required: true,
		},
		collapsed: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["close", "select", "toggle", "toggle-collapse", "update:search", "update:typeFilter", "update:chapterFilter"],
};
</script>

<style scoped lang="scss">
.index-panel-header {
	display: none;
}

.rule-index {
	position: relative;
	display: flex;
	flex-direction: column;
	min-height: max(34rem, calc(100vh - 17rem));
	padding: 0.9rem;
	overflow: hidden;
	transition:
		padding 0.24s ease,
		min-height 0.24s ease;

	&.collapsed {
		align-self: stretch;
		padding-inline: 0.5rem;

		.index-heading,
		.index-scroll {
			opacity: 0;
			pointer-events: none;
			transition:
				opacity 0.1s ease,
				visibility 0s linear 0.1s;
			visibility: hidden;
		}
	}

	.index-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 2rem;
		padding-right: 2.65rem;
		opacity: 1;
		overflow: hidden;
		visibility: visible;
		transition:
			opacity 0.14s ease 0.12s,
			visibility 0s linear 0.12s;

		span {
			color: var(--color-muted);
			font-size: 0.72rem;
			font-weight: 900;
			text-transform: uppercase;
		}

		strong {
			color: var(--color-accent);
			font-size: 0.82rem;
		}
	}

	.index-toggle {
		position: absolute;
		top: 0.75rem;
		right: 0.65rem;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		min-height: 0;
		padding: 0;
		border: 1px solid rgba(242, 193, 78, 0.28);
		background: rgba(22, 20, 17, 0.9);
		color: var(--color-accent);
		box-shadow: var(--shadow-control);
		transition:
			right 0.24s ease,
			transform 0.24s ease,
			background 0.18s ease,
			border-color 0.18s ease;

		&:hover {
			border-color: rgba(242, 193, 78, 0.48);
			background: rgba(242, 193, 78, 0.1);
		}

		.index-toggle-icon {
			display: inline-flex;
			width: 0.5rem;
			height: 0.5rem;
			border: solid currentColor;
			border-width: 0 2px 2px 0;
			transform: translateX(0.12rem) rotate(135deg);
			transition: transform 0.24s ease;
		}
	}

	&.collapsed .index-toggle {
		right: 50%;
		transform: translateX(50%);

		.index-toggle-icon {
			transform: translateX(-0.12rem) rotate(-45deg);
		}
	}

	.index-scroll {
		flex: 1 1 auto;
		height: 0;
		min-height: 0;
		margin-top: 0.55rem;
		padding-right: 0.25rem;
		overflow: auto;
		opacity: 1;
		visibility: visible;
		scrollbar-color: rgba(242, 193, 78, 0.52) rgba(244, 239, 229, 0.06);
		scrollbar-width: thin;
		transition:
			opacity 0.14s ease 0.12s,
			visibility 0s linear 0.12s;
	}
}

.empty {
	margin: 0.2rem 0 0;
	color: var(--color-muted);
}

@media (max-width: 980px) {
	.rule-index {
		position: fixed;
		inset: auto 0 0;
		z-index: 11;
		width: 100%;
		height: min(86svh, 46rem);
		min-height: 0;
		padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
		border-radius: var(--radius-md) var(--radius-md) 0 0;
		overflow: hidden;
		transform: translateY(105%);
		transition: transform 0.22s ease;

		&.mobile-open {
			transform: translateY(0);
		}

		&.collapsed {
			padding-inline: 1rem;

			.index-scroll {
				opacity: 1;
				pointer-events: auto;
				visibility: visible;
			}
		}

		.index-toggle {
			display: none;
		}

		.index-heading {
			display: none;
		}

		.index-scroll {
			display: block !important;
			height: auto;
		}
	}

	.index-panel-header {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin-bottom: 0.6rem;
	}

	.index-panel-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;

		span {
			color: var(--color-muted);
			font-size: 0.72rem;
			font-weight: 900;
			text-transform: uppercase;
		}
	}

	.mobile-search,
	.mobile-filters select {
		width: 100%;
		padding: 0.55rem 0.65rem;
	}

	.mobile-filters {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.45rem;
	}
}
</style>
