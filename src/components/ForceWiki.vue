<template>
	<section class="wiki">
		<div class="mobile-toolbar">
			<MobileDrawerToggle :is-open="data.mobileIndexOpen"
				:current-title="data.currentSkill ? data.currentSkill.name : ''"
				:fallback-title="t('ui.forceWiki.selectPower')"
				:count-label="`${t('ui.forceWiki.browse')} ${filteredSkills.length}`" controls="wiki-index-panel" nested
				@open="openMobileIndex" />
			<PowerLanguageToggle class="mobile-language-toggle" compact />
		</div>
		<MobileDrawerBackdrop v-if="data.mobileIndexOpen" :aria-label="t('ui.forceWiki.closeIndex')"
			@close="closeMobileIndex" />
		<header class="wiki-header ui-panel">
			<div>
				<p class="eyebrow">{{ t("ui.forceWiki.titleEyebrow") }}</p>
				<h1>{{ t("ui.forceWiki.title") }}</h1>
			</div>
			<div class="header-meta">
				<ForcePowerSearch v-model.trim="data.search" class="header-search" :placeholder="t('ui.forceWiki.searchPlaceholder')"
					:aria-label="t('ui.forceWiki.searchAriaLabel')" />
				<p class="count ui-count">{{ filteredSkills.length }} / {{ allSkills.length }}</p>
				<PowerLanguageToggle />
			</div>
		</header>

		<section class="wiki-filters ui-panel" :aria-label="t('ui.forceWiki.filtersAriaLabel')">
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


		<div class="wiki-layout">
			<aside id="wiki-index-panel" class="wiki-index ui-panel"
				:class="{ collapsed: data.indexCollapsed, 'mobile-open': data.mobileIndexOpen }">
				<div class="index-panel-header">
					<div class="index-panel-title">
						<span>{{ t("ui.forceWiki.powerIndex") }}</span>
						<button class="index-close ui-button" type="button" @click="closeMobileIndex">{{ t("ui.forceWiki.close") }}</button>
					</div>
					<ForcePowerSearch v-model.trim="data.search" class="mobile-search"
						:placeholder="t('ui.forceWiki.searchPlaceholder')" :aria-label="t('ui.forceWiki.searchAriaLabel')" />
					<div class="mobile-filters">
						<select class="ui-control" v-model="data.powerFilter">
							<option v-for="filter in powerFilters" :key="filter.value" :value="filter.value">{{
								filter.label }}</option>
						</select>
						<select class="ui-control" v-model="data.traitFilter">
							<option v-for="filter in traitFilters" :key="filter.value" :value="filter.value">{{
								filter.label }}</option>
						</select>
						<select class="ui-control" v-model="data.difficultyFilter">
							<option v-for="filter in difficultyFilters" :key="filter.value" :value="filter.value">{{
								filter.label }}</option>
						</select>
					</div>
				</div>
				<div class="index-heading" :aria-hidden="data.indexCollapsed">
					<span>{{ t("ui.forceWiki.powerIndex") }}</span>
					<strong class="ui-count">{{ filteredSkills.length }}</strong>
				</div>
				<button class="index-toggle ui-button" type="button" :aria-expanded="!data.indexCollapsed"
					:aria-label="data.indexCollapsed ? t('ui.forceWiki.showPowers') : t('ui.forceWiki.hidePowers')"
					:title="data.indexCollapsed ? t('ui.forceWiki.showPowers') : t('ui.forceWiki.hidePowers')"
					@click="data.indexCollapsed = !data.indexCollapsed">
					<span class="index-toggle-icon" aria-hidden="true"></span>
				</button>
				<div class="index-scroll" :aria-hidden="data.indexCollapsed">
					<div class="index-group" v-for="group in groupedSkills" :key="group.letter">
						<h2>{{ group.letter }}</h2>
						<button v-for="skill in group.skills" :key="skill.id || skill.name" class="index-item ui-button"
							:class="{ active: isCurrentSkill(skill) }" type="button" @click="showSkillFromIndex(skill)">
							{{ skill.name }}
						</button>
					</div>
					<p class="empty" v-if="groupedSkills.length === 0">{{ t("ui.forceWiki.noPowersFound") }}</p>
				</div>
			</aside>

			<article class="wiki-entry ui-panel" v-if="data.currentSkill">
				<header class="entry-header">
					<h2>{{ data.currentSkill.name }}</h2>
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
					<Difficulty :skill="data.currentSkill" :language="language" />
				</section>
			</article>
			<section class="wiki-entry wiki-empty-state ui-panel" v-else>
				<p>{{ t("ui.characterPowers.noPowersMatch") }}</p>
			</section>
		</div>
	</section>
</template>

<script>
import { createPowerSkills, getForcePowerLanguages } from "@/assets/data";
import { getForcePowerSkillName, getForcePowerText } from "@/assets/power_data";
import { Power } from "@/assets/powers";
import ForcePowerSearch from "@/components/ForcePowerSearch.vue";
import MobileDrawerBackdrop from "@/components/shared/MobileDrawerBackdrop.vue";
import MobileDrawerToggle from "@/components/shared/MobileDrawerToggle.vue";
import PowerLanguageToggle from "@/components/PowerLanguageToggle.vue";
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
		MobileDrawerBackdrop,
		MobileDrawerToggle,
		PowerContentBlocks,
		PowerLanguageToggle,
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

		if (typeof document !== "undefined") {
			document.body.classList.remove("mobile-drawer-open");
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

		openMobileIndex() {
			this.data.mobileIndexOpen = true;
		},

		closeMobileIndex() {
			this.data.mobileIndexOpen = false;
		},

		showSkillFromIndex(skill) {
			this.showSkill(skill);
			if (this.data.mobileIndexOpen) this.closeMobileIndex();
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

		"data.mobileIndexOpen"(isOpen) {
			if (typeof document === "undefined") return;

			document.body.classList.toggle("mobile-drawer-open", isOpen);
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

/* mobile controls hidden by default */
.mobile-toolbar,
.index-panel-header {
	display: none;
}

.wiki-header {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 1.2rem;
	background:
		linear-gradient(135deg, rgba(242, 193, 78, 0.08), rgba(103, 213, 200, 0.035)),
		var(--color-panel);

	.eyebrow {
		margin: 0 0 0.35rem;
		color: var(--color-cyan);
		font-size: 0.72rem;
		font-weight: 800;
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

	.language-toggle {
		flex: 0 0 auto;
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
		font-weight: 800;
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

.wiki-layout {
	display: grid;
	grid-template-columns: minmax(14rem, 19rem) minmax(0, 1fr);
	gap: 1rem;
	align-items: stretch;
	transition: grid-template-columns 0.24s ease;

	&:has(.wiki-index.collapsed) {
		grid-template-columns: 2.75rem minmax(0, 1fr);
	}
}

.wiki-index {
	position: relative;
	display: flex;
	flex-direction: column;
	min-height: 0;
	padding: 0.9rem;
	overflow: hidden;
	transition:
		padding 0.24s ease,
		min-height 0.24s ease;

	&.collapsed {
		align-self: stretch;
		min-height: 4rem;
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
			min-width: 2.05rem;
			min-height: 1.45rem;
			padding: 0.1rem 0.45rem;
			font-size: 0.78rem;
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
		padding: 0.15rem 2.35rem 0.4rem 0.25rem;
		overflow: auto;
		opacity: 1;
		visibility: visible;
		scrollbar-color: rgba(242, 193, 78, 0.52) rgba(244, 239, 229, 0.06);
		scrollbar-width: thin;
		transition:
			opacity 0.14s ease 0.12s,
			visibility 0s linear 0.12s;

		&::-webkit-scrollbar {
			width: 0.55rem;
		}

		&::-webkit-scrollbar-track {
			border-radius: 999px;
			background: rgba(244, 239, 229, 0.06);
		}

		&::-webkit-scrollbar-thumb {
			border: 2px solid rgba(24, 22, 18, 0.95);
			border-radius: 999px;
			background: rgba(242, 193, 78, 0.62);
		}

		&::-webkit-scrollbar-thumb:hover {
			background: rgba(242, 193, 78, 0.84);
		}
	}

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

.wiki-entry {
	padding: 1.2rem;
	min-width: 0;
	min-height: max(32rem, calc(100vh - 22rem));
}

.wiki-empty-state {
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
	padding-bottom: 0.9rem;
	margin-bottom: 0.9rem;
	border-bottom: 1px solid rgba(244, 239, 229, 0.16);

	h2 {
		margin: 0;
		font-size: 2.05rem;
	}

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
	margin: 0 0 1rem;
	font-size: 1rem;
	line-height: 1.6;
	font-weight: 800;
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

@media (max-width: 980px) {
	.wiki-header {
		align-items: stretch;
		flex-direction: column;

		.header-meta {
			flex-direction: column;
			align-items: stretch;
		}

		.header-search {
			min-width: 0;
			width: 100%;
		}
	}

	.wiki-filters {
		grid-template-columns: 1fr;
	}

	.wiki-layout {
		grid-template-columns: 1fr;

		&:has(.wiki-index.collapsed) {
			grid-template-columns: 1fr;
		}
	}

	.wiki-index {
		position: static;
		max-height: none;
	}

	.entry-header h2 {
		font-size: 1.8rem;
	}
}

@media (max-width: 980px) {
	.wiki {

		/* hide header search & filter areas on small screens - keep only drawer controls */
		.wiki-header .header-meta {
			display: none;
		}

		.wiki-filters {
			display: none;
		}

		.mobile-toolbar {
			display: grid;
			position: sticky;
			top: 0.65rem;
			z-index: 7;
			grid-template-columns: minmax(0, 1fr) auto;
			gap: 0.55rem;
			align-items: stretch;
		}

		.mobile-language-toggle {
			display: inline-flex;
			position: sticky;
			top: 0;
			z-index: 8;
			justify-content: center;
			width: 4.15rem;
			min-height: 3.1rem;
			padding: 0.55rem;

			.language-label {
				display: none;
			}
		}
	}

	.wiki-index {
		position: fixed;
		inset: auto 0 0;
		z-index: 11;
		width: 100%;
		height: min(86svh, 46rem);
		max-height: 86vh;
		padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
		border-radius: var(--radius-md) var(--radius-md) 0 0;
		overflow: hidden;
		transform: translateY(105%);
		transition: transform 0.22s ease;

		&.mobile-open {
			transform: translateY(0);
		}

		&.collapsed {
			.index-scroll {
				opacity: 1;
				pointer-events: auto;
				visibility: visible;
			}
		}

		.index-toggle {
			display: none;
		}

		.index-scroll {
			flex: 1 1 auto;
			height: auto;
			min-height: 0;
			max-height: none;
			padding-right: 0.25rem;
		}

		.index-heading {
			display: none;
		}
	}

	.index-panel-header {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin-bottom: 0.6rem;
		flex: 0 0 auto;
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

	.index-close {
		min-height: 2.35rem;
		padding: 0.35rem 0.7rem;
		color: var(--color-muted);
		font-size: 0.84rem;
		font-weight: 900;
	}

	.index-panel-header .mobile-search {
		width: 100%;
		font-size: 1rem;
	}

	.index-panel-header .mobile-filters {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.45rem;
		overflow-x: auto;
	}

	@media (max-width: 520px) {
		.index-panel-header .mobile-filters {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 360px) {
		.index-panel-header .mobile-filters {
			grid-template-columns: 1fr;
		}
	}

	.index-panel-header select {
		min-height: 2.35rem;
		padding: 0.35rem 0.45rem;
		width: 100%;
	}

}

@media (max-width: 560px) {
	.wiki {
		gap: 0.75rem;
	}

	.wiki-header {
		padding: 0.8rem 1rem;
		gap: 0.6rem;

		h1 {
			font-size: 1.5rem;
		}

		.header-meta {
			flex-direction: column;
			align-items: stretch;
			gap: 0.4rem;
		}

		.header-search {
			min-width: unset;
			width: 100%;
		}

		.count {
			min-width: unset;
			width: 100%;
		}
	}

	.wiki-filters {
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
		padding: 0.7rem 0.8rem;

		.filter-control span {
			font-size: 0.65rem;
		}

		select,
		.clear-filters {
			min-height: 2.1rem;
			font-size: 0.9rem;
		}

		.clear-filters {
			grid-column: 1 / -1;
		}
	}

	.wiki-layout {
		gap: 0.8rem;
	}

	.wiki-index {
		padding: 0.75rem 0.75rem calc(0.75rem + env(safe-area-inset-bottom));
	}

	.wiki-entry {
		padding: 1rem 0.85rem;
	}

	.entry-header {
		padding-bottom: 0.85rem;
		margin-bottom: 0.85rem;

		h2 {
			font-size: 1.35rem;
			margin-bottom: 0.5rem;
			font-weight: 900;
		}

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
	.wiki .mobile-toolbar {
		top: 0.5rem;
	}

	.wiki .mobile-language-toggle {
		min-height: 3.3rem;
	}

	.wiki-index {
		height: min(90svh, 48rem);
		max-height: 90vh;

		.index-scroll {
			max-height: none;
		}
	}

	.wiki-filters {
		grid-template-columns: 1fr;
	}

	.entry-header {
		h2 {
			font-size: 1.25rem;
		}

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
