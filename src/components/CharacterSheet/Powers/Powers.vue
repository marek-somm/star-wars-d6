<template>
	<ReferenceSidebarLayout
		class="powers--container"
		panel-id="power-list-panel"
		v-model:collapsed="data.listCollapsed"
		v-model:drawer-open="data.mobileListOpen"
		:heading="t('ui.characterPowers.title')"
		:eyebrow="t('ui.characterPowers.titleEyebrow')"
		:count="`${filteredPowerCount}/${totalPowerCount}`"
		:selected-title="data.currentSkill?.name"
		:fallback-title="t('ui.characterPowers.selectPower')"
		:browse-label="`${t('ui.characterPowers.browse')} ${filteredPowerCount}`"
		:expand-label="t('ui.characterPowers.showPowers')"
		:collapse-label="t('ui.characterPowers.hidePowers')"
		:close-label="t('ui.characterPowers.close')"
	>
		<template #index>
			<div class="power-list-items">
				<ForcePowerSearch
					v-model.trim="data.search"
					class="search"
					contained-focus
					:placeholder="t('ui.characterPowers.searchPlaceholder')"
					:aria-label="t('ui.characterPowers.searchAriaLabel')"
				/>
				<div class="filter-tabs" :aria-label="t('ui.characterPowers.filterAriaLabel')">
					<button
						class="filter-tab ui-button"
						:class="{ active: data.powerFilter === filter.value }"
						type="button"
						v-for="filter in powerFilters"
						:key="filter.value"
						:aria-pressed="data.powerFilter === filter.value"
						@click="data.powerFilter = filter.value"
					>
						{{ filter.label }}
					</button>
				</div>
				<div class="quick-sections" v-if="favoriteSkills.length || activeKeptUpSkills.length || recentSkills.length">
					<div class="quick-section" v-if="favoriteSkills.length">
						<h3>{{ t("ui.characterPowers.favorites") }}</h3>
						<button
							class="quick-item ui-button"
							:class="{ active: isCurrentSkill(skill) }"
							type="button"
							v-for="skill in favoriteSkills"
							:key="`favorite-${skill.name}`"
							@click="showSkill(skill)"
						>
							{{ skill.name }}
						</button>
					</div>
					<div class="quick-section" v-if="activeKeptUpSkills.length">
						<h3>{{ t("ui.characterPowers.keptUp") }}</h3>
						<button
							class="quick-item kept ui-button"
							:class="{ active: isCurrentSkill(skill) }"
							type="button"
							v-for="skill in activeKeptUpSkills"
							:key="`kept-${skill.name}`"
							@click="showSkill(skill)"
						>
							{{ skill.name }}
						</button>
					</div>
					<div class="quick-section" v-if="recentSkills.length">
						<h3>{{ t("ui.characterPowers.recent") }}</h3>
						<div
							class="quick-item-row"
							v-for="skill in recentSkills"
							:key="`recent-${skill.name}`"
						>
							<button
								class="quick-item ui-button"
								:class="{ active: isCurrentSkill(skill) }"
								type="button"
								@click="showSkill(skill)"
							>
								{{ skill.name }}
							</button>
							<button
								class="quick-remove ui-button"
								type="button"
								:aria-label="t('ui.characterPowers.removeRecent', { power: skill.name })"
								:title="t('ui.characterPowers.removeRecent', { power: skill.name })"
								@click="removeRecentSkill(skill)"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					</div>
				</div>
				<div class="label-group" v-for="powerLabel in filteredPowerLabels" :key="powerLabel.name">
					<div class="label-title">
						<span>{{ powerLabel.name }}</span>
						<span class="label-count">{{ powerLabel.skills.length }}</span>
					</div>
					<button
						class="list-item ui-button"
						:class="{ active: isCurrentSkill(forceSkill) }"
						type="button"
						v-for="forceSkill in powerLabel.skills"
						:key="forceSkill.name"
						@click="showSkill(forceSkill)"
					>
						<span class="skill-name">{{ forceSkill.name }}</span>
						<span class="skill-meta">
							<span class="skill-flag fan-made" v-if="forceSkill.fanMade">{{ t("ui.characterPowers.fanMade") }}</span>
							<span class="skill-flag favorite" v-if="isFavorite(forceSkill)">{{ t("ui.characterPowers.favoriteShort") }}</span>
							<span
								class="skill-flag kept"
								:class="{ active: isKeptUpActive(forceSkill) }"
								v-if="isKeptUpPower(forceSkill)"
							>
								{{ t("ui.characterPowers.keptShort") }}
							</span>
							<span class="power-chip" v-for="power in forceSkill.powers" :key="power">
								{{ getPowerShortName(power) }}
							</span>
						</span>
					</button>
				</div>
				<p class="empty-state" v-if="filteredPowerLabels.length === 0">{{ t("ui.characterPowers.noPowersMatch") }}</p>
			</div>
		</template>
		<section class="skill-panel ui-panel">
			<ForceSkill
				v-if="data.currentSkill"
				:skill="data.currentSkill"
				:search-term="data.search"
				:is-favorite="isFavorite(data.currentSkill)"
				:kept-up-active="isKeptUpActive(data.currentSkill)"
				:language="language"
				:force-stats="forceStats"
				class="shown"
				@select-skill="showSkill"
				@toggle-favorite="toggleFavorite"
				@toggle-kept-up="toggleKeptUp"
			/>
		</section>
	</ReferenceSidebarLayout>
</template>

<script>
import { Power } from "@/assets/powers";
import { getForcePowerSkillName, getForcePowerText } from "@/assets/power_data";
import ForcePowerSearch from "@/components/ForcePowerSearch.vue";
import ReferenceSidebarLayout from "@/components/shared/ReferenceSidebarLayout.vue";
import ForceSkill from "./Force Skill";
import {
	findSkill,
	findSkillByName,
	findSkillReference,
	getSkillStorageKey,
	getSkillsFromReferences,
	matchesSkillReference,
	normalizeSkillName,
} from "@/utils/forcePowerSkills";
import { readBoolean, readJson, writeBoolean, writeJson } from "@/utils/storage";

const FAVORITES_STORAGE_KEY = "star-wars-d6:favorites";
const RECENT_STORAGE_KEY = "star-wars-d6:recent-powers";
const KEPT_UP_STORAGE_KEY = "star-wars-d6:kept-up-powers";
const LIST_COLLAPSED_STORAGE_KEY = "star-wars-d6:character-powers-list-collapsed";
const RECENT_LIMIT = 6;

function getPowerIdFromHash() {
	if (typeof window === "undefined") return "";

	const hashParts = String(window.location.hash || "")
		.replace(/^#\/?/, "")
		.split("/")
		.filter(Boolean);

	if (hashParts[0] !== "sheet" || hashParts[1] !== "powers") return "";
	return decodeURIComponent(hashParts.slice(2).join("/") || "");
}

function setPowerHash(powerId) {
	if (typeof window === "undefined") return;

	const encodedPowerId = encodeURIComponent(String(powerId || "").trim());
	const nextHash = encodedPowerId ? `#/sheet/powers/${encodedPowerId}` : "#/sheet/powers";
	if (window.location.hash !== nextHash) {
		window.location.hash = nextHash;
	}
}

export default {
	components: {
		ForcePowerSearch,
		ForceSkill,
		ReferenceSidebarLayout,
	},
	props: {
		powerLabels: {
			type: Array,
			default: () => []
		},
		language: {
			type: String,
			default: "en"
		},
		active: {
			type: Boolean,
			default: false
		},
		forceStats: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			data: {
				currentSkill: null,
				search: "",
				powerFilter: "all",
				listCollapsed: readBoolean(LIST_COLLAPSED_STORAGE_KEY, false),
				mobileListOpen: false,
				favorites: [],
				recent: [],
				keptUp: []
			}
		};
	},
	created() {
		this.data.favorites = this.loadNameList(FAVORITES_STORAGE_KEY);
		this.data.recent = this.loadNameList(RECENT_STORAGE_KEY);
		this.data.keptUp = this.normalizeKeptUpList(this.loadNameList(KEPT_UP_STORAGE_KEY));
		this.saveNameList(KEPT_UP_STORAGE_KEY, this.data.keptUp);

		const hashSkill = this.findSkillReference(getPowerIdFromHash());
		const firstLabel = this.resolvedPowerLabels.find((powerLabel) => powerLabel.getSkills().length > 0);

		if (hashSkill) {
			this.showSkill(hashSkill, { trackRecent: false, updateHash: false });
		} else if (firstLabel) {
			this.showSkill(firstLabel.getSkills()[0], { trackRecent: false, updateHash: false });
		}

		if (typeof window !== "undefined") {
			window.addEventListener("hashchange", this.syncSkillWithHash);
		}
	},
	computed: {
		resolvedPowerLabels() {
			return Array.isArray(this.powerLabels) ? this.powerLabels : [];
		},

		allSkills() {
			return this.resolvedPowerLabels.flatMap((powerLabel) => powerLabel.getSkills());
		},

		powerFilters() {
			return [
				{ value: "all", label: this.t("ui.characterPowers.all") },
				{ value: Power.control, label: this.getPowerName(Power.control) },
				{ value: Power.sense, label: this.getPowerName(Power.sense) },
				{ value: Power.alter, label: this.getPowerName(Power.alter) },
				{ value: "fan-made", label: this.t("ui.characterPowers.fanMade") },
			];
		},

		totalPowerCount() {
			return this.allSkills.length;
		},

		filteredPowerCount() {
			return this.filteredPowerLabels
				.reduce((total, powerLabel) => total + powerLabel.skills.length, 0);
		},

		filteredPowerLabels() {
			const search = this.data.search.toLowerCase();

			return this.resolvedPowerLabels
				.map((powerLabel) => ({
					name: powerLabel.getName(),
					skills: this.filterSkills(powerLabel, search),
				}))
				.filter((powerLabel) => powerLabel.skills.length > 0);
		},

		favoriteSkills() {
			return this.getSkillsFromNames(this.data.favorites);
		},

		recentSkills() {
			return this.getSkillsFromNames(this.data.recent)
				.filter((skill) => !this.isCurrentSkill(skill));
		},

		activeKeptUpSkills() {
			return this.getSkillsFromNames(this.data.keptUp)
				.filter((skill) => this.isKeptUpPower(skill));
		}
	},
	methods: {
		t(id, replacements = {}) {
			return getForcePowerText(this.language, id, replacements);
		},

		getPowerName(power) {
			return getForcePowerSkillName(this.language, power);
		},

		showSkill(skill, options = {}) {
			const resolvedSkill = findSkill(this.allSkills, skill) || skill;

			if (!resolvedSkill) return;

			this.data.currentSkill = resolvedSkill;
			this.data.mobileListOpen = false;

			if (options.updateHash !== false && this.active) {
				setPowerHash(getSkillStorageKey(resolvedSkill));
			}

			if (options.trackRecent !== false) {
				this.trackRecentSkill(resolvedSkill);
			}
		},

		syncSkillWithHash() {
			const hashSkillId = getPowerIdFromHash();
			if (!hashSkillId) return;

			const hashSkill = this.findSkillReference(hashSkillId);
			if (!hashSkill || this.isCurrentSkill(hashSkill)) return;

			this.showSkill(hashSkill, { trackRecent: false, updateHash: false });
		},

		isCurrentSkill(skill) {
			return normalizeSkillName(this.data.currentSkill?.name) === normalizeSkillName(skill?.name);
		},

		filterSkills(powerLabel, search) {
			return powerLabel.getSkills().filter((skill) =>
				this.matchesPowerFilter(skill) && this.matchesSearch(skill, search)
			);
		},

		matchesPowerFilter(skill) {
			if (this.data.powerFilter === "all") return true;
			if (this.data.powerFilter === "fan-made") return Boolean(skill.fanMade);
			return skill.powers.includes(this.data.powerFilter);
		},

		matchesSearch(skill, search) {
			if (search === "") return true;

			const name = String(skill.name || "").toLowerCase();
			const summary = String(skill.summary || "").toLowerCase();
			return name.includes(search) || summary.includes(search);
		},

		toggleFavorite(skill) {
			this.data.favorites = this.toggleName(this.data.favorites, getSkillStorageKey(skill));
			this.saveNameList(FAVORITES_STORAGE_KEY, this.data.favorites);
		},

		isFavorite(skill) {
			return this.data.favorites
				.some((item) => matchesSkillReference(skill, item));
		},

		toggleKeptUp(skill) {
			if (!this.isKeptUpPower(skill)) return;

			const isAlreadyActive = this.isKeptUpActive(skill);
			this.data.keptUp = isAlreadyActive ? [] : [getSkillStorageKey(skill)];
			this.saveNameList(KEPT_UP_STORAGE_KEY, this.data.keptUp);
		},

		isKeptUpActive(skill) {
			return this.data.keptUp
				.some((item) => matchesSkillReference(skill, item));
		},

		isKeptUpPower(skill) {
			return Array.isArray(skill?.extra)
				&& skill.extra.some((item) => {
					const text = String(item || "").toLowerCase();
					return text.includes("kept up") || text.includes("aufrechterhalten");
				});
		},

		trackRecentSkill(skill) {
			this.data.recent = [
				getSkillStorageKey(skill),
				...this.data.recent.filter((item) =>
					!matchesSkillReference(skill, item)
				)
			].slice(0, RECENT_LIMIT);
			this.saveNameList(RECENT_STORAGE_KEY, this.data.recent);
		},

		removeRecentSkill(skill) {
			this.data.recent = this.data.recent.filter((item) =>
				!matchesSkillReference(skill, item)
			);
			this.saveNameList(RECENT_STORAGE_KEY, this.data.recent);
		},

		toggleName(list, name) {
			if (list.some((item) => normalizeSkillName(item) === normalizeSkillName(name))) {
				return list.filter((item) => normalizeSkillName(item) !== normalizeSkillName(name));
			}

			return [name, ...list];
		},

		getSkillsFromNames(names) {
			return getSkillsFromReferences(this.allSkills, names);
		},

		findSkillReference(reference) {
			return findSkillReference(this.allSkills, reference);
		},

		findSkill(skill) {
			return findSkill(this.allSkills, skill);
		},

		findSkillByName(name) {
			return findSkillByName(this.allSkills, name);
		},

		getPowerShortName(power) {
			return this.getPowerName(power).charAt(0);
		},

		normalizeKeptUpList(list) {
			const names = Array.isArray(list) ? list : [];
			for (const name of names) {
				const skill = this.findSkillReference(name);
				if (skill && this.isKeptUpPower(skill)) {
					return [getSkillStorageKey(skill)];
				}
			}
			return [];
		},

		loadNameList(key) {
			const value = readJson(key, []);
			return Array.isArray(value) ? value.filter(Boolean) : [];
		},

		saveNameList(key, value) {
			writeJson(key, Array.isArray(value) ? value.filter(Boolean) : []);
		}
	},
	watch: {
		powerLabels() {
			const currentSkill = this.findSkill(this.data.currentSkill);
			if (currentSkill) {
				this.data.currentSkill = currentSkill;
				this.data.keptUp = this.normalizeKeptUpList(this.data.keptUp);
				return;
			}

			const hashSkill = this.findSkillReference(getPowerIdFromHash());
			if (hashSkill) {
				this.data.currentSkill = hashSkill;
				this.data.keptUp = this.normalizeKeptUpList(this.data.keptUp);
				return;
			}

			const firstLabel = this.resolvedPowerLabels.find((powerLabel) => powerLabel.getSkills().length > 0);
			this.data.currentSkill = firstLabel ? firstLabel.getSkills()[0] : null;
			this.data.keptUp = this.normalizeKeptUpList(this.data.keptUp);
		},

		"data.listCollapsed"(isCollapsed) {
			writeBoolean(LIST_COLLAPSED_STORAGE_KEY, isCollapsed);
		},

		active(isActive) {
			if (isActive && this.data.currentSkill) {
				setPowerHash(getSkillStorageKey(this.data.currentSkill));
			}

			if (!isActive) this.data.mobileListOpen = false;
		}
	},
	beforeUnmount() {
		if (typeof window !== "undefined") {
			window.removeEventListener("hashchange", this.syncSkillWithHash);
		}
	}
};
</script>

<style lang="scss" scoped>
.power-list-items {
	.search {
		width: 100%;
		margin-bottom: 0.7rem;
		font-size: 1rem;
	}

	.filter-tabs {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(5.7rem, 1fr));
		gap: 0.35rem;
		margin-bottom: 1rem;

		.filter-tab {
			min-width: 0;
			min-height: 2.35rem;
			padding: 0.35rem 0.45rem;
			background: var(--surface-control);
			color: var(--color-muted);
			font-size: 0.78rem;
			font-weight: 800;
			line-height: 1.15;
			overflow-wrap: anywhere;
			text-align: center;
			white-space: normal;

			&:hover {
				color: var(--color-text);
			}

			&:focus-visible {
				outline: none;
				border-color: rgba(242, 193, 78, 0.72);
				box-shadow: inset 0 0 0 1px rgba(242, 193, 78, 0.72);
			}

			&.active {
				border-color: rgba(242, 193, 78, 0.72);
				background: rgba(242, 193, 78, 0.16);
				color: var(--color-accent);
			}
		}
	}

	.quick-sections {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(244, 239, 229, 0.1);

		.quick-section {
			h3 {
				margin: 0 0 0.35rem;
				color: var(--color-muted);
				font-size: 0.72rem;
				font-weight: 900;
				letter-spacing: 0;
				text-transform: uppercase;
			}
		}

		.quick-item {
			width: 100%;
			min-height: 2rem;
			padding: 0.35rem 0.55rem;
			border: 1px solid transparent;
			background: rgba(255, 255, 255, 0.035);
			color: var(--color-muted);
			font-size: 0.88rem;
			font-weight: 700;
			text-align: left;
			justify-content: flex-start;

			&:hover,
			&.active {
				border-color: rgba(242, 193, 78, 0.45);
				color: var(--color-accent);
			}

			&:focus-visible {
				outline: none;
				border-color: rgba(242, 193, 78, 0.72);
				box-shadow: inset 0 0 0 1px rgba(242, 193, 78, 0.72);
			}

			&.kept {
				border-color: rgba(103, 213, 200, 0.18);
				background: rgba(103, 213, 200, 0.07);
			}
		}

		.quick-item-row {
			display: grid;
			grid-template-columns: minmax(0, 1fr) 2rem;
			gap: 0.35rem;
			align-items: stretch;
			margin-top: 0.25rem;

			.quick-item {
				margin-top: 0;
			}
		}

		.quick-remove {
			width: 2rem;
			min-height: 2rem;
			padding: 0;
			border-color: rgba(244, 239, 229, 0.1);
			background: rgba(255, 255, 255, 0.025);
			color: var(--color-subtle);
			font-size: 1.1rem;
			font-weight: 900;
			line-height: 1;

			&:hover,
			&:focus-visible {
				border-color: rgba(217, 95, 67, 0.52);
				background: var(--surface-danger);
				color: var(--color-danger);
			}
		}
	}

	.label-group + .label-group {
		margin-top: 1rem;
	}

	.label-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.75rem;
		margin: 0 0 0.35rem;
		color: var(--color-accent);
		font-size: 0.78rem;
		font-weight: 900;
		letter-spacing: 0;
		text-transform: uppercase;

		.label-count {
			min-width: 1.5rem;
			color: var(--color-muted);
			text-align: right;
		}
	}

	.list-item {
		width: 100%;
		min-height: 2.8rem;
		padding: 0.55rem 0.7rem;
		border: 1px solid transparent;
		background: transparent;
		color: var(--color-muted);
		font-size: 0.95rem;
		font-weight: 700;
		text-align: left;
		justify-content: flex-start;
		transition:
			background 0.18s ease,
			border-color 0.18s ease,
			color 0.18s ease;

		.skill-name {
			display: block;
			line-height: 1.25;
		}

		.skill-meta {
			display: flex;
			flex-wrap: wrap;
			gap: 0.3rem;
			margin-top: 0.35rem;
		}

		.skill-flag,
		.power-chip {
			display: inline-flex;
			align-items: center;
			min-height: 1.25rem;
			padding: 0.1rem 0.35rem;
			border: 1px solid rgba(244, 239, 229, 0.12);
			border-radius: var(--radius-sm);
			background: rgba(255, 255, 255, 0.035);
			color: var(--color-subtle);
			font-size: 0.68rem;
			font-weight: 900;
		}

		.skill-flag.favorite {
			border-color: rgba(242, 193, 78, 0.3);
			background: rgba(242, 193, 78, 0.11);
			color: var(--color-accent);
		}

		.skill-flag.fan-made {
			border-color: rgba(103, 213, 200, 0.3);
			background: rgba(103, 213, 200, 0.1);
			color: var(--color-cyan);
		}

		.skill-flag.kept.active {
			border-color: rgba(103, 213, 200, 0.35);
			background: rgba(103, 213, 200, 0.12);
			color: var(--color-cyan);
		}

		&:hover {
			border-color: rgba(244, 239, 229, 0.14);
			background: rgba(244, 239, 229, 0.06);
			color: var(--color-text);
		}

		&:focus-visible {
			outline: none;
			border-color: rgba(242, 193, 78, 0.72);
			box-shadow: inset 0 0 0 1px rgba(242, 193, 78, 0.72);
		}

		&.active {
			border-color: rgba(242, 193, 78, 0.52);
			background: rgba(242, 193, 78, 0.14);
			color: var(--color-accent);
		}
	}

	.empty-state {
		margin: 1rem 0 0;
		color: var(--color-muted);
		font-size: 0.95rem;
		line-height: 1.5;
	}
}

.skill-panel {
	min-width: 0;
	width: 100%;
	overflow: hidden;
}

.shown {
	display: flex;
	width: 100%;
}


@media (max-width: 520px) {
	.power-list-items {
		.filter-tabs {
			grid-template-columns: repeat(2, minmax(0, 1fr));

			.filter-tab {
				min-height: 2.65rem;
			}
		}

		.quick-sections {
			.quick-item {
				min-height: 2.65rem;
			}
		}

		.list-item {
			min-height: 3.25rem;
		}
	}
}
</style>
