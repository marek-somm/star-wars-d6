<template>
	<section class="rulebook">
		<button class="mobile-list-toggle ui-button" type="button" :aria-expanded="data.mobileIndexOpen"
			aria-controls="rule-index-panel" @click="openMobileIndex">
			<span>{{ data.currentRule ? data.currentRule.title : 'Regel auswaehlen' }}</span>
			<strong>{{ filteredRules.length }}</strong>
		</button>
		<button class="mobile-backdrop" type="button" aria-label="Index schliessen" v-if="data.mobileIndexOpen"
			@click="closeMobileIndex"></button>

		<header class="rulebook-header ui-panel">
			<div>
				<p class="eyebrow">Regelwerk</p>
				<h1>Rules Reference</h1>
			</div>
			<div class="header-meta">
				<input v-model.trim="data.search" class="search" type="search" placeholder="Regeln durchsuchen"
					aria-label="Regeln durchsuchen">
				<p class="count">{{ filteredRules.length }} / {{ allRules.length }}</p>
			</div>
		</header>

		<section class="rule-filters ui-panel" aria-label="Regelfilter">
			<label class="filter-control">
				<span>Typ</span>
				<select class="ui-control" v-model="data.typeFilter">
					<option value="all">Alle Typen</option>
					<option v-for="type in availableTypes" :key="type.value" :value="type.value">
						{{ type.label }} ({{ type.count }})
					</option>
				</select>
			</label>
			<label class="filter-control">
				<span>Kapitel</span>
				<select class="ui-control" v-model="data.chapterFilter">
					<option value="all">Alle Kapitel</option>
					<option v-for="chapter in availableChapters" :key="chapter.value" :value="chapter.value">
						{{ chapter.label }}
					</option>
				</select>
			</label>
			<button class="clear-filters ui-button" type="button" :disabled="!hasActiveFilters" @click="clearFilters">
				Filter loeschen
			</button>
		</section>

		<div class="rulebook-layout">
			<aside id="rule-index-panel" class="rule-index ui-panel" :class="{ 'mobile-open': data.mobileIndexOpen }">
				<div class="index-panel-header">
					<div class="index-panel-title">
						<span>Regelindex</span>
						<button class="index-close ui-button" type="button"
							@click="closeMobileIndex">Schliessen</button>
					</div>
					<input v-model.trim="data.search" class="search mobile-search" type="search"
						placeholder="Regeln durchsuchen" aria-label="Regeln durchsuchen">
					<div class="mobile-filters">
						<select class="ui-control" v-model="data.typeFilter">
							<option value="all">Alle Typen</option>
							<option v-for="type in availableTypes" :key="type.value" :value="type.value">{{ type.label
								}}</option>
						</select>
						<select class="ui-control" v-model="data.chapterFilter">
							<option value="all">Alle Kapitel</option>
							<option v-for="chapter in availableChapters" :key="chapter.value" :value="chapter.value">{{
								chapter.label }}</option>
						</select>
					</div>
				</div>
				<div class="index-heading">
					<span>Regelindex</span>
					<strong>{{ filteredRules.length }}</strong>
				</div>
				<div class="index-scroll">
					<div class="rule-tree" role="tree" aria-label="Regelstruktur">
						<RuleTreeNode v-for="node in ruleTree" :key="node.key" :node="node"
							:expanded-keys="data.expandedTreeKeys" :current-rule-id="data.currentRule?.id || ''"
							@toggle="toggleTreeNode" @select="showRuleFromIndex" />
					</div>
					<p class="empty" v-if="ruleTree.length === 0">Keine Regeln gefunden.</p>
				</div>
			</aside>

			<article class="rule-entry ui-panel" v-if="data.currentRule">
				<header class="entry-header">
					<div>
						<p class="breadcrumb">{{ getTocPath(data.currentRule) }}</p>
						<h2>{{ data.currentRule.title }}</h2>
						<p class="source-line" v-if="getSourceLabel(data.currentRule)">{{ getSourceLabel(data.currentRule) }}</p>
					</div>
					<div class="meta">
						<span class="ui-pill">{{ formatType(data.currentRule.type) }}</span>
					</div>
				</header>

				<section class="skill-definition" v-if="hasSkillDefinition(data.currentRule)" aria-label="Skill definition">
					<div class="definition-fields" v-if="hasSkillMeta(data.currentRule)">
						<div class="definition-field" v-if="getFieldValue(data.currentRule, 'time_taken')">
							<span class="definition-label">Time Taken</span>
							<strong v-html="getFieldValue(data.currentRule, 'time_taken')"></strong>
						</div>
						<div class="definition-field" v-if="getFieldValue(data.currentRule, 'specializations')">
							<span class="definition-label">Specializations</span>
							<p v-html="getFieldValue(data.currentRule, 'specializations')"></p>
						</div>
						<div class="definition-field examples-field" v-if="getExampleItems(data.currentRule).length">
							<span class="definition-label">Examples</span>
							<p>
								<em v-for="(example, index) in getExampleItems(data.currentRule)" :key="example">
									{{ example }}<span v-if="index < getExampleItems(data.currentRule).length - 1">, </span>
								</em>
							</p>
						</div>
					</div>
					<div class="definition-description" v-if="getDefinitionBlocks(data.currentRule).length">
						<RuleContentBlock v-for="(block, index) in getDefinitionBlocks(data.currentRule)"
							:key="getBlockKey(block, index)" :block="block" />
					</div>
				</section>

				<section class="content-blocks">
					<RuleContentBlock v-for="(block, index) in getBodyBlocks(data.currentRule)"
						:key="getBlockKey(block, index)" :block="block" />
				</section>
			</article>
		</div>
	</section>
</template>

<script>
import RuleContentBlock from "@/components/RuleContentBlock.vue";
import RuleTreeNode from "@/components/RuleTreeNode.vue";
import rulebookData from "@/assets/rules/rulebook.json";
import { sanitizeHtml } from "@/utils/html";
import { readJson, writeJson } from "@/utils/storage";

const RULE_FILTERS_STORAGE_KEY = "star-wars-d6:rule-filters";

const defaultRuleFilters = {
	search: "",
	typeFilter: "all",
	chapterFilter: "all",
};

const PAGE_BLOCK_TYPES = new Set([
	"chapter",
	"skill_group",
	"skill",
]);

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

export default {
	components: {
		RuleContentBlock,
		RuleTreeNode,
	},
	data() {
		const savedFilters = loadRuleFilters();

		return {
			allRules: [],
			data: {
				search: savedFilters.search,
				typeFilter: savedFilters.typeFilter,
				chapterFilter: savedFilters.chapterFilter,
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
		availableTypes() {
			const counts = new Map();
			for (const rule of this.allRules) {
				counts.set(rule.type, (counts.get(rule.type) || 0) + 1);
			}
			return [...counts.entries()]
				.sort(([a], [b]) => this.formatType(a).localeCompare(this.formatType(b)))
				.map(([value, count]) => ({ value, count, label: this.formatType(value) }));
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
			return Boolean(block?.title && PAGE_BLOCK_TYPES.has(block.type));
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
			return Array.isArray(block.blocks)
				? block.blocks.filter((child) => !this.isPageBlock(child))
				: [];
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

		getBlockKey(block, index) {
			return block?.id || `${block?.type || "block"}-${index}`;
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
						node.typeLabel = this.formatType(rule.type);
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

		getPageLabel(rule) {
			const start = rule?.source?.page_start;
			const end = rule?.source?.page_end;
			if (!start) return "";
			return end && end !== start ? `S. ${start}-${end}` : `S. ${start}`;
		},

		getSourceLabel(rule) {
			const pageLabel = this.getPageLabel(rule);
			if (!pageLabel) return "";

			const document = rulebookData?.source?.document;
			return document ? `Quelle: ${document}, ${pageLabel}` : `Quelle: ${pageLabel}`;
		},

		formatType(type) {
			return String(type || "unknown")
				.split("_")
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join(" ");
		},

		hasSkillMeta(rule) {
			return Boolean(
				this.getFieldValue(rule, "time_taken")
				|| this.getFieldValue(rule, "specializations")
				|| this.getExampleItems(rule).length
			);
		},

		hasSkillDefinition(rule) {
			return Boolean(rule?.type === "skill" && (
				this.hasSkillMeta(rule)
				|| this.getDefinitionBlocks(rule).length
			));
		},

		getDefinitionBlocks(rule) {
			if (rule?.type !== "skill" || !Array.isArray(rule.blocks)) return [];
			return rule.blocks.filter((block) => block?.type === "description");
		},

		getBodyBlocks(rule) {
			if (!Array.isArray(rule?.blocks)) return [];
			if (rule?.type !== "skill") return rule.blocks;
			return rule.blocks.filter((block) => block?.type !== "description");
		},

		getFieldValue(rule, key) {
			return sanitizeHtml(rule?.fields?.[key] || "");
		},

		getExampleItems(rule) {
			const rawExamples = String(rule?.fields?.examples || "").trim();
			if (!rawExamples) return [];

			return rawExamples
				.split(",")
				.map((example) => example.trim())
				.filter(Boolean);
		},

	},
	watch: {
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

.mobile-list-toggle,
.mobile-backdrop,
.index-panel-header {
	display: none;
}

.rulebook-header {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 1.2rem;

	.eyebrow {
		margin: 0 0 0.35rem;
		color: var(--color-cyan);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
	}

	.header-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.search {
		min-height: 2.5rem;
		min-width: min(24rem, 56vw);
		padding: 0.5rem 0.65rem;
		border: 1px solid rgba(244, 239, 229, 0.12);
		border-radius: var(--radius-sm);
		background: var(--color-panel-soft);
		color: var(--color-text);
	}

	.count {
		margin: 0;
		min-width: 5.5rem;
		padding: 0.45rem 0.55rem;
		border: 1px solid rgba(103, 213, 200, 0.28);
		border-radius: var(--radius-sm);
		color: var(--color-cyan);
		font-weight: 900;
		text-align: center;
	}
}

.rule-filters {
	display: grid;
	grid-template-columns: repeat(2, minmax(12rem, 1fr)) auto;
	gap: 0.7rem;
	align-items: end;
	padding: 0.85rem 1rem;

	.filter-control {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-width: 0;

		span {
			color: var(--color-muted);
			font-size: 0.72rem;
			font-weight: 900;
			text-transform: uppercase;
		}
	}

	select,
	.clear-filters {
		width: 100%;
		font-weight: 900;
	}

	select {
		padding: 0.45rem 0.6rem;
	}
}

.rulebook-layout {
	display: grid;
	grid-template-columns: minmax(17rem, 23rem) minmax(0, 1fr);
	gap: 1rem;
	align-items: stretch;
}

.rule-index {
	display: flex;
	flex-direction: column;
	min-height: max(34rem, calc(100vh - 17rem));
	padding: 0.9rem;

	.index-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 2rem;

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

	.index-scroll {
		flex: 1 1 auto;
		height: 0;
		min-height: 0;
		margin-top: 0.55rem;
		padding-right: 0.25rem;
		overflow: auto;
		scrollbar-color: rgba(242, 193, 78, 0.52) rgba(244, 239, 229, 0.06);
		scrollbar-width: thin;
	}

	.index-section+.index-section {
		margin-top: 0.95rem;
	}

	h2 {
		margin: 0 0 0.5rem;
		color: var(--color-accent);
		font-size: 0.86rem;
	}

	.chapter-group {
		padding: 0.55rem 0;
		border-top: 1px solid rgba(244, 239, 229, 0.1);
	}

	.chapter-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.35rem;

		span {
			min-width: 0;
			overflow: hidden;
			color: var(--color-text);
			font-size: 0.78rem;
			font-weight: 900;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		strong {
			flex: 0 0 auto;
			color: var(--color-subtle);
			font-size: 0.74rem;
			font-weight: 900;
		}
	}

	.index-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: 100%;
		min-height: 3rem;
		margin-top: 0.25rem;
		padding: 0.45rem 0.55rem;
		border-color: transparent;
		background: transparent;
		text-align: left;

		.item-title,
		.item-path {
			min-width: 0;
			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.item-title {
			color: var(--color-muted);
			font-size: 0.9rem;
			font-weight: 900;
		}

		.item-path {
			margin-top: 0.16rem;
			color: var(--color-subtle);
			font-size: 0.68rem;
			font-weight: 800;
		}

		&:hover .item-title {
			color: var(--color-text);
		}

		&.active {
			border-color: rgba(242, 193, 78, 0.48);
			background: rgba(242, 193, 78, 0.12);

			.item-title {
				color: var(--color-accent);
			}

			.item-path {
				color: rgba(242, 193, 78, 0.72);
			}
		}
	}
}

.rule-entry {
	min-width: 0;
	min-height: max(34rem, calc(100vh - 17rem));
	padding: 1.35rem;
}

.entry-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
	padding-bottom: 0.9rem;
	margin-bottom: 0.9rem;
	border-bottom: 1px solid rgba(244, 239, 229, 0.16);

	.breadcrumb {
		margin: 0 0 0.45rem;
		color: var(--color-subtle);
		font-size: 0.78rem;
		font-weight: 800;
	}

	.source-line {
		margin: 0.45rem 0 0;
		color: var(--color-subtle);
		font-size: 0.78rem;
		font-weight: 700;
	}

	h2 {
		margin: 0;
		font-size: 2rem;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.35rem;
	}
}

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

.content-blocks {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.rule-heading {
	margin: 0.65rem 0 0;
	color: var(--color-accent);
	font-size: 1.15rem;
}

.rule-paragraph {
	margin: 0;
	color: var(--color-muted);
	line-height: 1.65;
}

.rule-list {
	margin: 0;
	padding-left: 1.25rem;
	color: var(--color-text);
	line-height: 1.55;
}

.callout,
.stat-block {
	border: 1px solid rgba(103, 213, 200, 0.22);
	border-radius: var(--radius-sm);
	background: rgba(103, 213, 200, 0.07);
	padding: 0.75rem 0.85rem;
}

.callout {
	strong {
		display: block;
		margin-bottom: 0.35rem;
		color: var(--color-cyan);
		font-size: 0.78rem;
		text-transform: uppercase;
	}

	p {
		margin: 0;
		line-height: 1.55;
	}
}

.stat-block {
	border-color: rgba(242, 193, 78, 0.22);
	background: rgba(242, 193, 78, 0.07);

	.stat-title {
		margin: 0 0 0.6rem;
		font-weight: 900;
	}

	dl {
		display: grid;
		grid-template-columns: minmax(8rem, 13rem) minmax(0, 1fr);
		gap: 0.35rem 0.75rem;
		margin: 0;
	}

	dt {
		color: var(--color-accent);
		font-weight: 900;
	}

	dd {
		margin: 0;
		color: var(--color-text);
		line-height: 1.45;
	}
}

.empty {
	margin: 0.2rem 0 0;
	color: var(--color-muted);
}

@media (max-width: 980px) {

	.rulebook-header .header-meta,
	.rule-filters {
		display: none;
	}

	.rulebook-layout {
		grid-template-columns: 1fr;
	}

	.rulebook .mobile-list-toggle {
		display: flex;
		position: sticky;
		top: 0.65rem;
		z-index: 7;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		width: 100%;
		min-height: 3.1rem;
		padding: 0.65rem 0.8rem;
		border-color: var(--color-border-strong);
		background: var(--color-panel-soft);
		text-align: left;

		span {
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		strong {
			flex: 0 0 auto;
			padding: 0.25rem 0.5rem;
			border-radius: var(--radius-sm);
			background: rgba(242, 193, 78, 0.16);
			color: var(--color-accent);
			font-size: 0.82rem;
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

		.index-heading {
			display: none;
		}

		.index-scroll {
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

@media (max-width: 620px) {
	.rulebook-header {
		padding: 0.8rem 1rem;

		h1 {
			font-size: 1.5rem;
		}
	}

	.rule-entry {
		padding: 1rem 0.85rem;
	}

	.entry-header {
		flex-direction: column;
		gap: 0.7rem;

		h2 {
			font-size: 1.45rem;
		}

		.meta {
			justify-content: flex-start;
		}
	}

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

	.stat-block dl {
		grid-template-columns: 1fr;
	}
}
</style>
