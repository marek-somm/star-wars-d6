<template>
	<section class="wiki">
		<div class="ui-panel ui-page-banner">
			<header class="wiki-header ui-reference-header">
				<div>
					<p class="ui-kicker">{{ t("ui.forceWiki.titleEyebrow") }}</p>
					<h1 class="ui-page-title">{{ t("ui.forceWiki.title") }}</h1>
				</div>
				<div class="header-meta">
					<ForcePowerSearch v-model.trim="data.search" class="header-search" :placeholder="t('ui.forceWiki.searchPlaceholder')"
						:aria-label="t('ui.forceWiki.searchAriaLabel')" />
					<p class="count ui-count">{{ filteredSkills.length }} / {{ allSkills.length }}</p>
				</div>
			</header>

			<section class="wiki-filters ui-reference-filters" :aria-label="t('ui.forceWiki.filtersAriaLabel')">
				<label class="filter-control">
					<span>{{ t("ui.forceWiki.filterForceSkills") }}</span>
					<select class="ui-control" v-model="data.powerFilter">
						<option v-for="filter in powerFilters" :key="filter.value" :value="filter.value">
							{{ filter.label }}
						</option>
					</select>
				</label>
				<label class="filter-control">
					<span>{{ t("ui.forceWiki.filterProperties") }}</span>
					<select class="ui-control" v-model="data.traitFilter">
						<option v-for="filter in traitFilters" :key="filter.value" :value="filter.value">
							{{ filter.label }}
						</option>
					</select>
				</label>
				<label class="filter-control">
					<span>{{ t("ui.forceWiki.filterDifficulty") }}</span>
					<select class="ui-control" v-model="data.difficultyFilter">
						<option v-for="filter in difficultyFilters" :key="filter.value" :value="filter.value">
							{{ filter.label }}
						</option>
					</select>
				</label>
				<button class="clear-filters ui-button" type="button" :disabled="!hasActiveFilters" @click="clearFilters">
					{{ t("ui.forceWiki.clearFilters") }}
				</button>
			</section>
		</div>
		<ReferenceSidebarLayout
			panel-id="wiki-index-panel"
			v-model:collapsed="data.indexCollapsed"
			v-model:drawer-open="data.mobileIndexOpen"
			:heading="t('ui.forceWiki.powerIndex')"
			:count="filteredSkills.length"
			:selected-title="data.currentSkill?.name"
			:fallback-title="t('ui.forceWiki.selectPower')"
			:browse-label="`${t('ui.forceWiki.browse')} ${filteredSkills.length}`"
			:expand-label="t('ui.forceWiki.showPowers')"
			:collapse-label="t('ui.forceWiki.hidePowers')"
			:close-label="t('ui.forceWiki.close')"
		>
			<template #drawer-filters>
				<ForcePowerSearch v-model.trim="data.search" class="mobile-search"
					:placeholder="t('ui.forceWiki.searchPlaceholder')" :aria-label="t('ui.forceWiki.searchAriaLabel')" />
				<div class="mobile-filters">
					<select class="ui-control" v-model="data.powerFilter" :aria-label="t('ui.forceWiki.filterForceSkills')">
						<option v-for="filter in powerFilters" :key="filter.value" :value="filter.value">{{ filter.label }}</option>
					</select>
					<select class="ui-control" v-model="data.traitFilter" :aria-label="t('ui.forceWiki.filterProperties')">
						<option v-for="filter in traitFilters" :key="filter.value" :value="filter.value">{{ filter.label }}</option>
					</select>
					<select class="ui-control" v-model="data.difficultyFilter" :aria-label="t('ui.forceWiki.filterDifficulty')">
						<option v-for="filter in difficultyFilters" :key="filter.value" :value="filter.value">{{ filter.label }}</option>
					</select>
				</div>
			</template>
			<template #index>
				<div class="wiki-index-items">
					<div class="index-group" v-for="group in groupedSkills" :key="group.letter">
						<h2>{{ group.letter }}</h2>
						<button v-for="skill in group.skills" :key="skill.id || skill.name" class="index-item ui-button"
							:class="{ active: isCurrentSkill(skill) }" type="button" @click="showSkillFromIndex(skill)">
							{{ skill.name }}
						</button>
					</div>
					<p class="empty" v-if="groupedSkills.length === 0">{{ t("ui.forceWiki.noPowersFound") }}</p>
				</div>
			</template>

			<article class="wiki-entry ui-panel ui-reading-panel" v-if="data.currentSkill">
				<header class="entry-header">
					<h2 class="ui-entry-title">{{ data.currentSkill.name }}</h2>
					<div class="meta">
						<span class="pill" v-for="power in data.currentSkill.powers" :key="power">
							{{ getPowerName(power) }}
						</span>
						<span class="pill fan-made" v-if="data.currentSkill.fanMade">{{ t("ui.forceWiki.fanMade") }}</span>
					</div>
					<div class="required" v-if="data.currentSkill.hasRequiredSkills()">
						<span class="required-label">{{ t("ui.forceWiki.requirements") }}</span>
						<div class="required-pills">
							<button type="button" v-for="requiredSkill in data.currentSkill.required"
								:key="requiredSkill.id || requiredSkill.name" class="required-pill ui-button"
								@click="showSkill(requiredSkill)">
								{{ requiredSkill.name }}
							</button>
						</div>
					</div>
				</header>

				<p class="summary" v-if="data.currentSkill.summary" v-html="getSummaryHtml()"></p>

				<PowerContentBlocks :blocks="contentBlocks" :language="language" />

				<section class="difficulty">
					<h3>{{ t("ui.forceWiki.rules") }}</h3>
					<Difficulty :skill="data.currentSkill" :language="language" :show-force-rolls="false" />
				</section>
			</article>
			<section class="wiki-entry wiki-empty-state ui-panel" v-else>
				<p>{{ t("ui.characterPowers.noPowersMatch") }}</p>
			</section>
		</ReferenceSidebarLayout>
	</section>
</template>

<script>
import { createPowerSkills, getForcePowerLanguages } from "@/assets/data";
import { getForcePowerSkillName, getForcePowerText } from "@/assets/power_data";
import { Power } from "@/assets/powers";
import ForcePowerSearch from "@/components/ForcePowerSearch.vue";
import ReferenceSidebarLayout from "@/components/shared/ReferenceSidebarLayout.vue";
import Difficulty from "./CharacterSheet/Powers/Difficulty.vue";
import PowerContentBlocks from "@/components/PowerContentBlocks.vue";
import { toParagraphHtml } from "@/utils/powerContent";
import {
	collectSearchText,
	getSkillPowerKey,
	normalizeSearchTerm,
	normalizeSearchText,
	normalizeSkillName,
} from "@/utils/forcePowerSkills";
import { readBoolean, readJson, writeBoolean, writeJson } from "@/utils/storage";
import { powerLanguageState } from "@/utils/powerLanguage";

function getSkillIdFromHash() {
	if (typeof window === "undefined") return "";
	const hash = String(window.location.hash || "");
	const match = hash.match(/^#\/wiki\/([^/?#]+)/i);
	if (!match?.[1]) return "";

	try {
		return decodeURIComponent(match[1]);
	} catch {
		return match[1];
	}
}

const WIKI_INDEX_COLLAPSED_STORAGE_KEY = "star-wars-d6:wiki-index-collapsed";
const WIKI_FILTERS_STORAGE_KEY = "star-wars-d6:wiki-filters";

const defaultWikiFilters = {
	search: "",
	powerFilter: "all",
	traitFilter: "all",
	difficultyFilter: "all",
};

function loadWikiIndexCollapsed() {
	return readBoolean(WIKI_INDEX_COLLAPSED_STORAGE_KEY, false);
}

function saveWikiIndexCollapsed(value) {
	writeBoolean(WIKI_INDEX_COLLAPSED_STORAGE_KEY, value);
}

function loadWikiFilters() {
	const value = readJson(WIKI_FILTERS_STORAGE_KEY, {});
	if (!value || typeof value !== "object") return { ...defaultWikiFilters };

	return {
		search: typeof value.search === "string" ? value.search : defaultWikiFilters.search,
		powerFilter: typeof value.powerFilter === "string" ? value.powerFilter : defaultWikiFilters.powerFilter,
		traitFilter: typeof value.traitFilter === "string" ? value.traitFilter : defaultWikiFilters.traitFilter,
		difficultyFilter: typeof value.difficultyFilter === "string" ? value.difficultyFilter : defaultWikiFilters.difficultyFilter,
	};
}

function saveWikiFilters(value) {
	writeJson(WIKI_FILTERS_STORAGE_KEY, {
		search: String(value?.search || ""),
		powerFilter: String(value?.powerFilter || defaultWikiFilters.powerFilter),
		traitFilter: String(value?.traitFilter || defaultWikiFilters.traitFilter),
		difficultyFilter: String(value?.difficultyFilter || defaultWikiFilters.difficultyFilter),
	});
}

export default {
	components: {
		Difficulty,
		ForcePowerSearch,
		ReferenceSidebarLayout,
		PowerContentBlocks,
	},
	data() {
		const savedFilters = loadWikiFilters();

		return {
			allSkills: [],
			searchTextBySkillId: new Map(),
			data: {
				search: savedFilters.search,
				powerFilter: savedFilters.powerFilter,
				traitFilter: savedFilters.traitFilter,
				difficultyFilter: savedFilters.difficultyFilter,
				indexCollapsed: loadWikiIndexCollapsed(),
				mobileIndexOpen: false,
				currentSkill: null
			}
		};
	},
	created() {
		this.loadPowerSkills();
	},
	mounted() {
		if (typeof window !== "undefined") {
			window.addEventListener("hashchange", this.selectSkillFromHash);
		}
	},
	beforeUnmount() {
		if (typeof window !== "undefined") {
			window.removeEventListener("hashchange", this.selectSkillFromHash);
		}
	},

	computed: {
		powerFilters() {
			return [
				{ value: "all", label: this.t("ui.filters.allForceSkills") },
				{ value: `uses:${Power.control}`, label: this.t("ui.filters.usesControl") },
				{ value: `uses:${Power.sense}`, label: this.t("ui.filters.usesSense") },
				{ value: `uses:${Power.alter}`, label: this.t("ui.filters.usesAlter") },
				{ value: `exact:${Power.control}`, label: this.t("ui.filters.controlOnly") },
				{ value: `exact:${Power.sense}`, label: this.t("ui.filters.senseOnly") },
				{ value: `exact:${Power.alter}`, label: this.t("ui.filters.alterOnly") },
				{ value: `exact:${Power.control}+${Power.sense}`, label: this.t("ui.filters.controlSense") },
				{ value: `exact:${Power.control}+${Power.alter}`, label: this.t("ui.filters.controlAlter") },
				{ value: `exact:${Power.sense}+${Power.alter}`, label: this.t("ui.filters.senseAlter") },
				{ value: `exact:${Power.control}+${Power.sense}+${Power.alter}`, label: this.t("ui.filters.allThree") },
			];
		},

		traitFilters() {
			return [
				{ value: "all", label: this.t("ui.filters.allProperties") },
				{ value: "kept-up", label: this.t("ui.filters.keptUp") },
				{ value: "requirements", label: this.t("ui.filters.hasRequirements") },
				{ value: "no-requirements", label: this.t("ui.filters.noRequirements") },
				{ value: "dark-side-point", label: this.t("ui.filters.darkSidePointRisk") },
				{ value: "light-side-only", label: this.t("ui.filters.lightSideOnly") },
				{ value: "dark-side-only", label: this.t("ui.filters.darkSideOnly") },
				{ value: "long-use", label: this.t("ui.filters.longerThanOneRound") },
				{ value: "fan-made", label: this.t("ui.filters.fanMade") },
			];
		},

		difficultyFilters() {
			return [
				{ value: "all", label: this.t("ui.filters.anyDifficulty") },
				{ value: "low", label: this.t("ui.filters.easyEntry") },
				{ value: "moderate", label: this.t("ui.filters.upToModerate") },
				{ value: "difficult", label: this.t("ui.filters.difficultOrHarder") },
				{ value: "very-difficult", label: this.t("ui.filters.veryDifficultOrHarder") },
				{ value: "heroic", label: this.t("ui.filters.heroic") },
			];
		},

		hasActiveFilters() {
			return Boolean(
				String(this.data.search || "").trim()
				|| this.data.powerFilter !== "all"
				|| this.data.traitFilter !== "all"
				|| this.data.difficultyFilter !== "all"
			);
		},

		filteredSkills() {
			const search = normalizeSearchTerm(this.data.search);

			return this.allSkills.filter((skill) => {
				if (!this.matchesPowerFilter(skill)) return false;
				if (!this.matchesTraitFilter(skill)) return false;
				if (!this.matchesDifficultyFilter(skill)) return false;
				if (!search) return true;

				const searchText = this.getSkillSearchText(skill);
				const powers = Array.isArray(skill.powers) ? skill.powers : [];
				const powerMatches = powers.some((power) => {
					const key = normalizeSearchText(power);
					const label = normalizeSearchText(this.getPowerName(power));
					return key.includes(search) || label.includes(search);
				});

				return searchText.includes(search)
					|| powerMatches;
			});
		},

		groupedSkills() {
			const groups = new Map();

			for (const skill of this.filteredSkills) {
				const firstChar = String(skill.name || "").charAt(0).toUpperCase();
				const letter = /[A-Z]/.test(firstChar) ? firstChar : "#";

				if (!groups.has(letter)) groups.set(letter, []);
				groups.get(letter).push(skill);
			}

			return [...groups.entries()].map(([letter, skills]) => ({ letter, skills }));
		},

		contentBlocks() {
			if (Array.isArray(this.data.currentSkill?.contentBlocks)) {
				return this.data.currentSkill.contentBlocks;
			}
			return [];
		},

		language() {
			return powerLanguageState.language;
		},
	},
	methods: {
		t(id, replacements = {}) {
			return getForcePowerText(this.language, id, replacements);
		},

		getPowerName(power) {
			return getForcePowerSkillName(this.language, power);
		},

		showSkillFromIndex(skill) {
			this.showSkill(skill);
			this.data.mobileIndexOpen = false;
		},

		clearFilters() {
			this.data.search = defaultWikiFilters.search;
			this.data.powerFilter = defaultWikiFilters.powerFilter;
			this.data.traitFilter = defaultWikiFilters.traitFilter;
			this.data.difficultyFilter = defaultWikiFilters.difficultyFilter;
		},

		matchesPowerFilter(skill) {
			const filter = String(this.data.powerFilter || "all");
			if (filter === "all") return true;

			const powers = Array.isArray(skill?.powers) ? skill.powers : [];
			if (filter.startsWith("uses:")) {
				return powers.includes(filter.replace("uses:", ""));
			}
			if (filter.startsWith("exact:")) {
				return getSkillPowerKey(skill) === filter.replace("exact:", "");
			}
			return true;
		},

		matchesTraitFilter(skill) {
			const filter = String(this.data.traitFilter || "all");
			if (filter === "all") return true;

			if (filter === "kept-up") return this.isKeptUpPower(skill);
			if (filter === "requirements") return skill?.hasRequiredSkills?.() === true;
			if (filter === "no-requirements") return skill?.hasRequiredSkills?.() !== true;
			if (filter === "fan-made") return Boolean(skill?.fanMade);
			if (filter === "dark-side-point") return this.hasDarkSidePointRisk(skill);
			if (filter === "light-side-only") return this.isLightSideOnlyPower(skill);
			if (filter === "dark-side-only") return this.isDarkSideOnlyPower(skill);
			if (filter === "long-use") return this.isLongUsePower(skill);
			return true;
		},

		matchesDifficultyFilter(skill) {
			const filter = String(this.data.difficultyFilter || "all");
			if (filter === "all") return true;

			const maxLevel = this.getMaxDifficultyLevel(skill);
			if (maxLevel == null) return false;
			if (filter === "low") return maxLevel <= 2;
			if (filter === "moderate") return maxLevel <= 3;
			if (filter === "difficult") return maxLevel >= 4;
			if (filter === "very-difficult") return maxLevel >= 5;
			if (filter === "heroic") return maxLevel >= 6;
			return true;
		},

		getSkillExtraText(skill) {
			return Array.isArray(skill?.extra)
				? skill.extra.map((item) => String(item || "")).join(" ").toLowerCase()
				: "";
		},

		getSkillContentText(skill) {
			return Array.isArray(skill?.contentBlocks)
				? normalizeSearchText(skill.contentBlocks.map((block) => String(block?.text || "")).join(" "))
				: "";
		},

		getSkillSearchText(skill) {
			if (!skill?.id) return this.buildSkillSearchText(skill);
			return this.searchTextBySkillId.get(skill.id) || this.buildSkillSearchText(skill);
		},

		buildSkillSearchText(skill) {
			const requirements = Array.isArray(skill?.required)
				? skill.required.map((entry) => entry?.name).join(" ")
				: "";
			const text = [
				skill?.name,
				skill?.summary,
				this.getSkillExtraText(skill),
				requirements,
				collectSearchText(skill?.contentBlocks),
				collectSearchText(skill?.difficulty),
				skill?.timeToUse,
				skill?.timeToUseNote,
				skill?.timeToUseDetails,
			].join(" ");

			return normalizeSearchText(text);
		},

		buildAllLanguageSearchIndex() {
			const searchTextBySkillId = new Map();

			for (const language of getForcePowerLanguages()) {
				for (const skill of createPowerSkills(null, language.code)) {
					if (!skill?.id) continue;
					const existingText = searchTextBySkillId.get(skill.id) || "";
					searchTextBySkillId.set(skill.id, `${existingText} ${this.buildSkillSearchText(skill)}`);
				}
			}

			this.searchTextBySkillId = searchTextBySkillId;
		},

		isKeptUpPower(skill) {
			return this.getSkillExtraText(skill).includes("kept up")
				|| normalizeSearchText(skill?.summary).includes("kept up");
		},

		hasDarkSidePointRisk(skill) {
			return this.getSkillContentText(skill).includes("dark side point")
				|| normalizeSearchText(skill?.summary).includes("dark side point");
		},

		isLightSideOnlyPower(skill) {
			const extras = this.getSkillExtraText(skill);
			return extras.includes("consumed by the dark side")
				&& extras.includes("may not use");
		},

		isDarkSideOnlyPower(skill) {
			return this.getSkillExtraText(skill)
				.includes("only be used by characters who have been consumed by the dark side");
		},

		isLongUsePower(skill) {
			const timeToUse = String(skill?.timeToUse || "").toLowerCase().trim();
			if (!timeToUse) return false;
			return !/^((one|1)\s+round|\[?1r\]?)/i.test(timeToUse);
		},

		getMaxDifficultyLevel(skill) {
			const levels = [Power.control, Power.sense, Power.alter]
				.flatMap((power) => this.getDifficultyLevels(skill?.difficulty?.[power]?.level));
			if (levels.length === 0) return null;
			return Math.max(...levels);
		},

		getDifficultyLevels(entries) {
			if (!Array.isArray(entries)) return [];

			return entries
				.map((entry) => {
					const rawLevel = entry && typeof entry === "object" ? entry.level : entry;
					if (rawLevel == null || rawLevel === "") return null;
					const parsedLevel = Number(rawLevel);
					if (Number.isNaN(parsedLevel)) return null;
					return parsedLevel > 10 ? parsedLevel - 10 : parsedLevel;
				})
				.filter((level) => level != null);
		},

		getSummaryHtml() {
			const summary = String(this.data.currentSkill?.summary || "");
			const search = String(this.data.search || "").trim();
			if (!search) return toParagraphHtml(summary);

			const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const pattern = new RegExp(`(${escaped})`, "ig");
			return toParagraphHtml(summary.replace(pattern, "<mark>$1</mark>"));
		},

		loadPowerSkills() {
			const currentSkillId = this.data.currentSkill?.id || getSkillIdFromHash();
			this.buildAllLanguageSearchIndex();
			const allSkills = createPowerSkills(null, this.language)
				.sort((a, b) => String(a.name).localeCompare(String(b.name)));

			this.allSkills = allSkills;
			this.data.currentSkill = null;

			if (currentSkillId) {
				const target = allSkills.find((skill) => skill.id === currentSkillId);
				if (target) this.showSkill(target, false);
			}

			if (!this.data.currentSkill) {
				this.selectSkillFromHash();
			}

			if (!this.data.currentSkill) {
				this.showSkill(allSkills[0]);
			}
		},

		showSkill(skill, updateHash = true) {
			const target = this.allSkills.find((entry) => entry.id === skill.id)
				|| this.allSkills.find((entry) => normalizeSkillName(entry.name) === normalizeSkillName(skill.name));
			this.data.currentSkill = target || this.data.currentSkill;

			if (updateHash && this.data.currentSkill?.id) {
				this.updateHashForSkill(this.data.currentSkill.id);
			}
		},

		selectSkillFromHash() {
			const skillId = getSkillIdFromHash();
			if (!skillId) return;

			const target = this.allSkills.find((skill) => skill.id === skillId);
			if (target) {
				this.showSkill(target, false);
			}
		},

		updateHashForSkill(skillId) {
			if (typeof window === "undefined" || !skillId) return;

			const nextHash = `#/wiki/${encodeURIComponent(skillId)}`;
			if (window.location.hash !== nextHash) {
				window.location.hash = nextHash;
			}
		},

		isCurrentSkill(skill) {
			if (!this.data.currentSkill || !skill) return false;
			if (this.data.currentSkill.id && skill.id) return this.data.currentSkill.id === skill.id;
			return normalizeSkillName(this.data.currentSkill.name) === normalizeSkillName(skill.name);
		},

	},
	watch: {
		"data.indexCollapsed"(isCollapsed) {
			saveWikiIndexCollapsed(isCollapsed);
		},

		"data.search"() {
			saveWikiFilters(this.data);
		},

		"data.powerFilter"() {
			saveWikiFilters(this.data);
		},

		"data.traitFilter"() {
			saveWikiFilters(this.data);
		},

		"data.difficultyFilter"() {
			saveWikiFilters(this.data);
		},

		language() {
			this.loadPowerSkills();
		},

		filteredSkills(list) {
			if (list.length === 0) {
				this.data.currentSkill = null;
				return;
			}

			if (!this.data.currentSkill || !list.some((skill) => this.isCurrentSkill(skill))) {
				this.showSkill(list[0]);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.wiki {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.wiki-header {
	.header-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.header-search {
		min-width: min(22rem, 56vw);
	}

	.count {
		margin: 0;
		min-width: 5.4rem;
	}
}

.wiki-filters {
	display: grid;
	grid-template-columns: repeat(3, minmax(10rem, 1fr)) auto;
	gap: 0.7rem;
	align-items: end;

	.filter-control {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-width: 0;

		span {
			color: var(--color-muted);
			font-size: 0.72rem;
			font-weight: 700;
			letter-spacing: 0.05em;
			text-transform: uppercase;
		}
	}

	select,
	.clear-filters {
		font-weight: 650;
	}

	select {
		width: 100%;
		padding: 0.45rem 0.6rem;
	}

	.clear-filters {
		padding: 0.45rem 0.75rem;

		&:hover:not(:disabled) {
			border-color: rgba(103, 213, 200, 0.38);
			color: var(--color-cyan);
		}

		&:disabled {
			opacity: 0.45;
			cursor: default;
		}
	}
}

.wiki-index-items {
	.index-group+.index-group {
		margin-top: 0.9rem;
	}

	h2 {
		margin: 0 0 0.3rem;
		color: var(--color-accent);
		font-size: 0.8rem;
	}

	.index-item {
		box-sizing: border-box;
		width: 100%;
		min-height: 2.2rem;
		margin-top: 0.25rem;
		padding: 0.35rem 0.55rem;
		border: 1px solid transparent;
		background: transparent;
		color: var(--color-muted);
		font-weight: 700;
		text-align: left;
		justify-content: flex-start;

		&:focus-visible {
			outline: none;
			border-color: rgba(242, 193, 78, 0.72);
			box-shadow: inset 0 0 0 1px rgba(242, 193, 78, 0.72);
		}

		&:hover {
			border-color: rgba(244, 239, 229, 0.18);
			color: var(--color-text);
		}

		&.active {
			border-color: rgba(242, 193, 78, 0.48);
			background: rgba(242, 193, 78, 0.12);
			color: var(--color-accent);
		}
	}

	.empty {
		margin: 0.2rem 0 0;
		color: var(--color-muted);
	}
}

.wiki-empty-state {
	min-height: 10rem;
	padding: 2rem 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--color-muted);
	font-size: 0.95rem;
	line-height: 1.5;
	text-align: center;

	p {
		margin: 0;
	}
}

.entry-header {
	padding-bottom: 1rem;
	margin-bottom: 1.15rem;
	border-bottom: 1px solid var(--color-rule);

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.65rem;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		min-height: 1.6rem;
		padding: 0.2rem 0.5rem;
		border: 1px solid rgba(242, 193, 78, 0.36);
		border-radius: var(--radius-sm);
		background: rgba(242, 193, 78, 0.1);
		color: var(--color-accent);
		font-size: 0.78rem;
		font-weight: 800;

		&.fan-made {
			border-color: rgba(103, 213, 200, 0.3);
			background: rgba(103, 213, 200, 0.09);
			color: var(--color-cyan);
		}

	}
}

.summary {
	max-width: 72ch;
	margin: 0 0 1rem;
	font-size: 1rem;
	line-height: 1.68;
	font-weight: 650;
}

.required {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.45rem;
	margin: 0.75rem 0 0;

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
		align-items: center;
		gap: 0.45rem;
		margin-top: 0;
	}

	.required-pill {
		display: inline-flex;
		align-items: center;
		min-height: 1.8rem;
		padding: 0.25rem 0.6rem;
		font-size: 0.82rem;
		font-weight: 800;
		color: var(--color-text);
		justify-content: flex-start;

		&:hover {
			border-color: var(--color-accent);
			color: var(--color-accent);
		}

	}
}

.difficulty {
	margin-top: 1.2rem;
	padding-top: 1rem;
	border-top: 1px solid rgba(244, 239, 229, 0.16);

	h3 {
		margin: 0 0 0.8rem;
		color: var(--color-text);
		font-size: 1.05rem;
	}
}

@media (width < 981px) {
	.wiki {
		.wiki-header .header-meta,
		.wiki-filters {
			display: none;
		}
	}

	.mobile-search,
	.mobile-filters select {
		width: 100%;
		font-size: 1rem;
	}

	.mobile-filters {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.45rem;

		select {
			padding: 0.35rem 0.45rem;
		}
	}
}

@media (max-width: 520px) {
	.mobile-filters {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}

@media (max-width: 360px) {
	.mobile-filters {
		grid-template-columns: minmax(0, 1fr);
	}
}

@media (max-width: 560px) {
	.wiki {
		gap: 0.75rem;
	}

	.wiki-entry {
		padding: 1rem 0.85rem;
	}

	.entry-header {
		padding-bottom: 0.85rem;
		margin-bottom: 0.85rem;

		.required {
			margin-top: 0.65rem;
		}

		.required-label {
			font-size: 0.72rem;
			font-weight: 900;
		}

		.required-pills {
			gap: 0.35rem;
			margin-top: 0.35rem;
			display: flex;
			flex-wrap: wrap;
		}

		.required-pill {
			font-size: 0.78rem;
			padding: 0.2rem 0.48rem;
			min-height: 1.6rem;
			white-space: nowrap;
			font-weight: 800;
		}
	}

	.summary {
		font-size: 0.95rem;
		line-height: 1.55;
		margin: 0 0 1rem;
		font-weight: 700;
	}

}

@media (max-width: 520px) {
	.entry-header {
		.required-pill {
			font-size: 0.75rem;
			padding: 0.18rem 0.42rem;
			min-height: 1.5rem;
		}

		.required-pills {
			gap: 0.3rem;
		}
	}
}
</style>
