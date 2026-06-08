<template>
	<section class="rulebook">
		<RuleMobileIndexToggle :is-open="data.mobileIndexOpen" :current-title="data.currentRule?.title || ''"
			:filtered-count="filteredRules.length" @open="openMobileIndex" />
		<button class="mobile-backdrop" type="button" aria-label="Index schliessen" v-if="data.mobileIndexOpen"
			@click="closeMobileIndex"></button>

		<RulebookHeader :search="data.search" :filtered-count="filteredRules.length" :total-count="allRules.length"
			@update:search="data.search = $event" />

		<RulebookFilters :type-filter="data.typeFilter" :chapter-filter="data.chapterFilter"
			:available-types="availableTypes" :available-chapters="availableChapters"
			:has-active-filters="hasActiveFilters" @update:type-filter="data.typeFilter = $event"
			@update:chapter-filter="data.chapterFilter = $event" @clear="clearFilters" />

		<div class="rulebook-layout">
			<RuleIndexPanel :rule-tree="ruleTree" :expanded-keys="data.expandedTreeKeys"
				:current-rule-id="data.currentRule?.id || ''" :filtered-count="filteredRules.length"
				:search="data.search" :type-filter="data.typeFilter" :chapter-filter="data.chapterFilter"
				:available-types="availableTypes" :available-chapters="availableChapters"
				:mobile-index-open="data.mobileIndexOpen" :collapsed="data.indexCollapsed"
				@close="closeMobileIndex" @toggle="toggleTreeNode" @toggle-collapse="toggleIndexCollapsed"
				@select="showRuleFromIndex" @update:search="data.search = $event"
				@update:type-filter="data.typeFilter = $event" @update:chapter-filter="data.chapterFilter = $event" />

			<RuleEntry :rule="data.currentRule" :source-document="sourceDocument" />
		</div>
	</section>
</template>

<script>
import RuleEntry from "@/components/Rulebook/RuleEntry.vue";
import RulebookFilters from "@/components/Rulebook/RulebookFilters.vue";
import RulebookHeader from "@/components/Rulebook/RulebookHeader.vue";
import RuleIndexPanel from "@/components/Rulebook/RuleIndexPanel.vue";
import RuleMobileIndexToggle from "@/components/Rulebook/RuleMobileIndexToggle.vue";
import rulebookData from "@/assets/rules/rulebook.json";
import { formatRuleLabel, getChildContentBlocks, isRulePageBlock } from "@/utils/rules";
import { readBoolean, readJson, writeBoolean, writeJson } from "@/utils/storage";

const RULE_FILTERS_STORAGE_KEY = "star-wars-d6:rule-filters";
const RULE_INDEX_COLLAPSED_STORAGE_KEY = "star-wars-d6:rule-index-collapsed";

const defaultRuleFilters = {
	search: "",
	typeFilter: "all",
	chapterFilter: "all",
};

function normalize(value) {
	return String(value || "").toLowerCase().trim();
}

function getRuleIdFromHash() {
	if (typeof window === "undefined") return "";
	const hash = String(window.location.hash || "");
	const match = hash.match(/^#\/rules\/([^/?#]+)/i);
	if (!match?.[1]) return "";

	try {
		return decodeURIComponent(match[1]);
	} catch {
		return match[1];
	}
}

function loadRuleFilters() {
	const value = readJson(RULE_FILTERS_STORAGE_KEY, {});
	if (!value || typeof value !== "object") return { ...defaultRuleFilters };

	return {
		search: typeof value.search === "string" ? value.search : defaultRuleFilters.search,
		typeFilter: typeof value.typeFilter === "string" ? value.typeFilter : defaultRuleFilters.typeFilter,
		chapterFilter: typeof value.chapterFilter === "string" ? value.chapterFilter : defaultRuleFilters.chapterFilter,
	};
}

function saveRuleFilters(value) {
	writeJson(RULE_FILTERS_STORAGE_KEY, {
		search: String(value?.search || ""),
		typeFilter: String(value?.typeFilter || defaultRuleFilters.typeFilter),
		chapterFilter: String(value?.chapterFilter || defaultRuleFilters.chapterFilter),
	});
}

function loadRuleIndexCollapsed() {
	return readBoolean(RULE_INDEX_COLLAPSED_STORAGE_KEY, false);
}

function saveRuleIndexCollapsed(value) {
	writeBoolean(RULE_INDEX_COLLAPSED_STORAGE_KEY, value);
}

export default {
	components: {
		RuleEntry,
		RulebookFilters,
		RulebookHeader,
		RuleIndexPanel,
		RuleMobileIndexToggle,
	},
	data() {
		const savedFilters = loadRuleFilters();

		return {
			allRules: [],
			data: {
				search: savedFilters.search,
				typeFilter: savedFilters.typeFilter,
				chapterFilter: savedFilters.chapterFilter,
				indexCollapsed: loadRuleIndexCollapsed(),
				currentRule: null,
				mobileIndexOpen: false,
				expandedTreeKeys: {},
			}
		};
	},
	created() {
		this.allRules = this.flattenRulebook(rulebookData);
		this.selectRuleFromHash();
		if (!this.data.currentRule) {
			this.showRule(this.filteredRules[0] || this.allRules[0], false);
		}
	},
	mounted() {
		if (typeof window !== "undefined") {
			window.addEventListener("hashchange", this.selectRuleFromHash);
		}
	},
	beforeUnmount() {
		if (typeof window !== "undefined") {
			window.removeEventListener("hashchange", this.selectRuleFromHash);
		}

		if (typeof document !== "undefined") {
			document.body.classList.remove("mobile-drawer-open");
		}
	},
	computed: {
		sourceDocument() {
			return rulebookData?.source?.document || "";
		},

		availableTypes() {
			const counts = new Map();
			for (const rule of this.allRules) {
				counts.set(rule.type, (counts.get(rule.type) || 0) + 1);
			}
			return [...counts.entries()]
				.sort(([a], [b]) => formatRuleLabel(a).localeCompare(formatRuleLabel(b)))
				.map(([value, count]) => ({ value, count, label: formatRuleLabel(value) }));
		},

		availableChapters() {
			return this.allRules
				.filter((entry) => entry.type === "chapter")
				.sort((a, b) => Number(a.number || 0) - Number(b.number || 0))
				.map((chapter) => ({
					value: chapter.id,
					label: chapter.label ? `${chapter.label}: ${this.getPathTitle(chapter)}` : this.getPathTitle(chapter),
				}));
		},

		hasActiveFilters() {
			return Boolean(
				String(this.data.search || "").trim()
				|| this.data.typeFilter !== "all"
				|| this.data.chapterFilter !== "all"
			);
		},

		filteredRules() {
			const search = normalize(this.data.search);

			return this.allRules.filter((rule) => {
				if (this.data.typeFilter !== "all" && rule.type !== this.data.typeFilter) return false;
				if (this.data.chapterFilter !== "all" && !rule.pathIds.includes(this.data.chapterFilter)) return false;
				if (!search) return true;

				return this.getSearchText(rule).includes(search);
			});
		},

		ruleTree() {
			return this.buildRuleTree(this.filteredRules);
		},
	},
	methods: {
		openMobileIndex() {
			this.data.mobileIndexOpen = true;
		},

		closeMobileIndex() {
			this.data.mobileIndexOpen = false;
		},

		clearFilters() {
			this.data.search = defaultRuleFilters.search;
			this.data.typeFilter = defaultRuleFilters.typeFilter;
			this.data.chapterFilter = defaultRuleFilters.chapterFilter;
		},

		showRuleFromIndex(rule) {
			this.showRule(rule);
			if (this.data.mobileIndexOpen) this.closeMobileIndex();
		},

		toggleTreeNode(key) {
			this.data.expandedTreeKeys = {
				...this.data.expandedTreeKeys,
				[key]: !this.data.expandedTreeKeys[key],
			};
		},

		toggleIndexCollapsed() {
			this.data.indexCollapsed = !this.data.indexCollapsed;
		},

		showRule(rule, updateHash = true) {
			if (!rule) return;
			this.data.currentRule = this.allRules.find((entry) => entry.id === rule.id) || rule;

			if (updateHash && this.data.currentRule?.id) {
				this.updateHashForRule(this.data.currentRule.id);
			}

			this.expandPathForRule(this.data.currentRule);
		},

		selectRuleFromHash() {
			const ruleId = getRuleIdFromHash();
			if (!ruleId) return;
			const target = this.allRules.find((rule) => rule.id === ruleId);
			if (target) this.showRule(target, false);
		},

		updateHashForRule(ruleId) {
			if (typeof window === "undefined" || !ruleId) return;
			const nextHash = `#/rules/${encodeURIComponent(ruleId)}`;
			if (window.location.hash !== nextHash) {
				window.location.hash = nextHash;
			}
		},

		isCurrentRule(rule) {
			return Boolean(this.data.currentRule?.id && rule?.id && this.data.currentRule.id === rule.id);
		},

		getSearchText(rule) {
			return normalize([
				rule.title,
				rule.title_short,
				rule.label,
				rule.type,
				...(Array.isArray(rule.tags) ? rule.tags : []),
				this.getTocPath(rule),
				this.getBlockSearchText(rule),
			].join(" "));
		},

		getTocPath(rule) {
			return Array.isArray(rule?.path) ? rule.path.join(" / ") : "";
		},

		flattenRulebook(rulebook) {
			const entries = [];

			const walk = (block, parents = []) => {
				if (!block || typeof block !== "object") return;

				const pathParents = parents.filter((entry) => entry?.title);
				const pathSegment = block.title
					? this.createPathSegment(block, pathParents, entries.length)
					: null;
				const entry = this.isPageBlock(block)
					? this.createRuleEntry(block, pathParents, entries.length)
					: null;

				if (entry) entries.push(entry);

				const nextParents = pathSegment ? [...pathParents, pathSegment] : pathParents;
				for (const child of block.blocks || []) {
					walk(child, nextParents);
				}
			};

			walk(rulebook, []);
			return entries;
		},

		isPageBlock(block) {
			return isRulePageBlock(block);
		},

		createRuleEntry(block, parents, fallbackIndex) {
			const generatedId = this.getBlockId(block, parents, fallbackIndex);
			const path = [...parents.map((entry) => this.getPathTitle(entry)), this.getPathTitle(block)];
			const pathIds = [...parents.map((entry) => entry.id), generatedId];

			return {
				...block,
				id: generatedId,
				path,
				pathIds,
				blocks: this.getDisplayBlocks(block),
			};
		},

		createPathSegment(block, parents, fallbackIndex) {
			return {
				id: this.getBlockId(block, parents, fallbackIndex),
				title: block.title,
				title_short: block.title_short,
				type: block.type,
			};
		},

		getBlockId(block, parents, fallbackIndex) {
			return block.id || `${block.type}.${parents.map((entry) => entry.id).join(".")}.${fallbackIndex}`;
		},

		getDisplayBlocks(block) {
			return getChildContentBlocks(block);
		},

		getBlockSearchText(block) {
			if (!block || typeof block !== "object") return "";

			return [
				block.title,
				block.title_short,
				block.label,
				block.text,
				...Object.values(block.fields || {}),
				...(Array.isArray(block.rows) ? block.rows.flat() : []),
				...(Array.isArray(block.blocks) ? block.blocks.map((child) => this.getBlockSearchText(child)) : []),
			].join(" ");
		},

		buildRuleTree(rules) {
			const root = [];
			const nodesByKey = new Map();

			for (const rule of rules) {
				const path = this.getRulePath(rule);
				let siblings = root;

				path.forEach((label, index) => {
					const key = path.slice(0, index + 1).join(" > ");
					let node = nodesByKey.get(key);

					if (!node) {
						node = {
							key,
							label,
							depth: index,
							children: [],
							count: 0,
							rule: null,
							typeLabel: "",
						};
						nodesByKey.set(key, node);
						siblings.push(node);
					}

					node.count += 1;
					if (index === path.length - 1) {
						node.rule = rule;
						node.typeLabel = formatRuleLabel(rule.type);
					}

					siblings = node.children;
				});
			}

			return root;
		},

		getRulePath(rule) {
			return Array.isArray(rule?.path) && rule.path.length ? rule.path : [String(rule?.title || "Untitled")];
		},

		getPathTitle(block) {
			return String(block?.title_short || block?.title || "Untitled");
		},

		expandPathForRule(rule) {
			if (!rule) return;
			const path = this.getRulePath(rule);
			const nextExpandedKeys = { ...this.data.expandedTreeKeys };

			for (let index = 0; index < path.length - 1; index += 1) {
				nextExpandedKeys[path.slice(0, index + 1).join(" > ")] = true;
			}

			this.data.expandedTreeKeys = nextExpandedKeys;
		},

	},
	watch: {
		"data.indexCollapsed"(isCollapsed) {
			saveRuleIndexCollapsed(isCollapsed);
		},

		"data.search"() {
			saveRuleFilters(this.data);
		},

		"data.typeFilter"() {
			saveRuleFilters(this.data);
		},

		"data.chapterFilter"() {
			saveRuleFilters(this.data);
		},

		"data.mobileIndexOpen"(isOpen) {
			if (typeof document === "undefined") return;
			document.body.classList.toggle("mobile-drawer-open", isOpen);
		},

		filteredRules(list) {
			if (list.length === 0) {
				this.data.currentRule = null;
				return;
			}

			if (!this.data.currentRule || !list.some((rule) => this.isCurrentRule(rule))) {
				this.showRule(list[0], false);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.rulebook {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.mobile-backdrop {
	display: none;
}

.rulebook-layout {
	display: grid;
	grid-template-columns: minmax(17rem, 23rem) minmax(0, 1fr);
	gap: 1rem;
	align-items: stretch;
	transition: grid-template-columns 0.24s ease;

	&:has(.rule-index.collapsed) {
		grid-template-columns: 2.75rem minmax(0, 1fr);
	}
}


@media (max-width: 980px) {
	.rulebook-layout {
		grid-template-columns: 1fr;

		&:has(.rule-index.collapsed) {
			grid-template-columns: 1fr;
		}
	}

	.mobile-backdrop {
		position: fixed;
		inset: 0;
		z-index: 10;
		display: block;
		border: 0;
		background: var(--overlay-backdrop);
	}
}
</style>
