<template>
	<section class="powers--container" @keyup.esc="closeMobileList">
		<button
			class="mobile-list-toggle ui-button"
			type="button"
			:aria-expanded="data.mobileListOpen"
			aria-controls="power-list-panel"
			@click="openMobileList"
		>
			<span>{{ data.currentSkill ? data.currentSkill.name : t("ui.characterPowers.selectPower") }}</span>
			<strong>{{ t("ui.characterPowers.browse") }} {{ filteredPowerCount }}</strong>
		</button>
		<button
			class="mobile-backdrop"
			type="button"
			:aria-label="t('ui.characterPowers.closePowerList')"
			v-if="data.mobileListOpen"
			@click="closeMobileList"
		></button>
		<aside
			id="power-list-panel"
			class="list ui-panel"
			:class="{ 'mobile-open': data.mobileListOpen, collapsed: data.listCollapsed }"
		>
			<button
				class="list-collapse-toggle ui-button"
				type="button"
				:aria-expanded="!data.listCollapsed"
				:aria-label="data.listCollapsed ? t('ui.characterPowers.showPowers') : t('ui.characterPowers.hidePowers')"
				:title="data.listCollapsed ? t('ui.characterPowers.showPowers') : t('ui.characterPowers.hidePowers')"
				@click="toggleListCollapsed"
			>
				<span class="list-collapse-icon" aria-hidden="true"></span>
			</button>
			<div class="list-content">
				<div class="list-header">
					<div>
						<p class="eyebrow">{{ t("ui.characterPowers.titleEyebrow") }}</p>
						<h2>{{ t("ui.characterPowers.title") }}</h2>
					</div>
					<div class="header-actions">
						<PowerLanguageToggle compact />
						<span class="power-count">{{ filteredPowerCount }}/{{ totalPowerCount }}</span>
						<button class="list-close ui-button" type="button" @click="closeMobileList">{{ t("ui.characterPowers.close") }}</button>
					</div>
				</div>
				<div class="list-scroll">
					<input
						class="search"
						:placeholder="t('ui.characterPowers.searchPlaceholder')"
						type="search"
						v-model.trim="data.search"
						:aria-label="t('ui.characterPowers.searchAriaLabel')"
					>
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
							<button
							class="quick-item ui-button"
								:class="{ active: isCurrentSkill(skill) }"
								type="button"
								v-for="skill in recentSkills"
								:key="`recent-${skill.name}`"
								@click="showSkill(skill)"
							>
								{{ skill.name }}
							</button>
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
			</div>
		</aside>
		<section class="skill-panel ui-panel">
			<ForceSkill
				v-if="data.currentSkill"
				:skill="data.currentSkill"
				:search-term="data.search"
				:is-favorite="isFavorite(data.currentSkill)"
				:kept-up-active="isKeptUpActive(data.currentSkill)"
				:language="language"
				class="shown"
				@select-skill="showSkill"
				@toggle-favorite="toggleFavorite"
				@toggle-kept-up="toggleKeptUp"
			/>
		</section>
	</section>
</template>

<script>
import { Power } from "@/assets/powers";
import { getForcePowerSkillName, getForcePowerText } from "@/assets/power_data";
import PowerLanguageToggle from "@/components/PowerLanguageToggle.vue";
import ForceSkill from "./Force Skill";
import { readBoolean, readJson, writeBoolean, writeJson } from "@/utils/storage";

const FAVORITES_STORAGE_KEY = "star-wars-d6:favorites";
const RECENT_STORAGE_KEY = "star-wars-d6:recent-powers";
const KEPT_UP_STORAGE_KEY = "star-wars-d6:kept-up-powers";
const LIST_COLLAPSED_STORAGE_KEY = "star-wars-d6:character-powers-list-collapsed";
const RECENT_LIMIT = 6;

export default {
	components: {
		ForceSkill,
		PowerLanguageToggle,
	},
	props: {
		powerLabels: {
			type: Array,
			default: () => []
		},
		language: {
			type: String,
			default: "en"
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

		const firstLabel = this.resolvedPowerLabels.find((powerLabel) => powerLabel.getSkills().length > 0);

		if (firstLabel) {
			this.showSkill(firstLabel.getSkills()[0], { trackRecent: false });
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
			const resolvedSkill = this.findSkill(skill) || skill;

			if (!resolvedSkill) return;

			this.data.currentSkill = resolvedSkill;
			this.closeMobileList();

			if (options.trackRecent !== false) {
				this.trackRecentSkill(resolvedSkill);
			}
		},

		openMobileList() {
			this.data.mobileListOpen = true;
		},

		closeMobileList() {
			this.data.mobileListOpen = false;
		},

		toggleListCollapsed() {
			this.data.listCollapsed = !this.data.listCollapsed;
			writeBoolean(LIST_COLLAPSED_STORAGE_KEY, this.data.listCollapsed);
		},

		isCurrentSkill(skill) {
			return this.normalizeSkillName(this.data.currentSkill?.name) === this.normalizeSkillName(skill?.name);
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
			this.data.favorites = this.toggleName(this.data.favorites, this.getSkillStorageKey(skill));
			this.saveNameList(FAVORITES_STORAGE_KEY, this.data.favorites);
		},

		isFavorite(skill) {
			return this.data.favorites
				.some((item) => this.matchesSkillReference(skill, item));
		},

		toggleKeptUp(skill) {
			if (!this.isKeptUpPower(skill)) return;

			const isAlreadyActive = this.isKeptUpActive(skill);
			this.data.keptUp = isAlreadyActive ? [] : [this.getSkillStorageKey(skill)];
			this.saveNameList(KEPT_UP_STORAGE_KEY, this.data.keptUp);
		},

		isKeptUpActive(skill) {
			return this.data.keptUp
				.some((item) => this.matchesSkillReference(skill, item));
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
				this.getSkillStorageKey(skill),
				...this.data.recent.filter((item) =>
					!this.matchesSkillReference(skill, item)
				)
			].slice(0, RECENT_LIMIT);
			this.saveNameList(RECENT_STORAGE_KEY, this.data.recent);
		},

		toggleName(list, name) {
			if (list.some((item) => this.normalizeSkillName(item) === this.normalizeSkillName(name))) {
				return list.filter((item) => this.normalizeSkillName(item) !== this.normalizeSkillName(name));
			}

			return [name, ...list];
		},

		getSkillsFromNames(names) {
			return names
				.map((name) => this.findSkillReference(name))
				.filter(Boolean);
		},

		findSkillReference(reference) {
			const value = String(reference || "").trim();
			return this.allSkills.find((skill) => this.matchesSkillReference(skill, value)) || null;
		},

		findSkill(skill) {
			if (!skill) return null;
			if (skill.id) {
				const byId = this.allSkills.find((entry) => entry.id === skill.id);
				if (byId) return byId;
			}
			return this.findSkillByName(skill.name);
		},

		findSkillByName(name) {
			const normalizedName = this.normalizeSkillName(name);
			return this.allSkills.find((skill) => this.normalizeSkillName(skill.name) === normalizedName);
		},

		normalizeSkillName(name) {
			return String(name || "")
				.toLowerCase()
				.replace(/[\u2019']/g, "")
				.replace(/\u00e2\u20ac\u2122/g, "")
				.replace(/\s+/g, " ")
				.trim();
		},

		getSkillStorageKey(skill) {
			return String(skill?.id || skill?.name || "").trim();
		},

		matchesSkillReference(skill, reference) {
			if (!skill || !reference) return false;
			const value = String(reference || "").trim();
			return Boolean(
				(skill.id && value === skill.id)
				|| this.normalizeSkillName(value) === this.normalizeSkillName(skill.name)
			);
		},

		getPowerShortName(power) {
			return this.getPowerName(power).charAt(0);
		},

		normalizeKeptUpList(list) {
			const names = Array.isArray(list) ? list : [];
			for (const name of names) {
				const skill = this.findSkillReference(name);
				if (skill && this.isKeptUpPower(skill)) {
					return [this.getSkillStorageKey(skill)];
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

			const firstLabel = this.resolvedPowerLabels.find((powerLabel) => powerLabel.getSkills().length > 0);
			this.data.currentSkill = firstLabel ? firstLabel.getSkills()[0] : null;
			this.data.keptUp = this.normalizeKeptUpList(this.data.keptUp);
		},

		"data.mobileListOpen"(isOpen) {
			if (typeof document === "undefined") return;

			document.body.classList.toggle("mobile-drawer-open", isOpen);
		}
	},
	beforeUnmount() {
		if (typeof document !== "undefined") {
			document.body.classList.remove("mobile-drawer-open");
		}
	}
};
</script>

<style lang="scss" scoped>
.powers--container {
	width: 100%;
	display: grid;
	grid-template-columns: minmax(16rem, 23rem) minmax(0, 1fr);
	gap: 1rem;
	align-items: stretch;

	&:has(.list.collapsed) {
		grid-template-columns: 2.75rem minmax(0, 1fr);
	}

	.mobile-list-toggle,
	.mobile-backdrop {
		display: none;
	}

	.list {
		display: flex;
		flex-direction: column;
		text-align: left;
		margin: 0;
		padding: 1rem;
		position: relative;
		min-height: 0;
		overflow: visible;

		&.collapsed {
			min-height: 4rem;
			padding-inline: 0.5rem;

			.list-content {
				display: none;
			}
		}

		.list-collapse-toggle {
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

			&:hover {
				border-color: rgba(242, 193, 78, 0.48);
				background: rgba(242, 193, 78, 0.1);
			}

			.list-collapse-icon {
				display: inline-flex;
				width: 0.5rem;
				height: 0.5rem;
				border: solid currentColor;
				border-width: 0 2px 2px 0;
				transform: translateX(0.12rem) rotate(135deg);
			}
		}

		&.collapsed .list-collapse-toggle {
			right: 50%;
			transform: translateX(50%);

			.list-collapse-icon {
				transform: translateX(-0.12rem) rotate(-45deg);
			}
		}

		.list-content {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			min-height: 0;
		}

		.list-header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 1rem;
			margin-bottom: 0.9rem;
			padding-right: 2.65rem;

			.eyebrow {
				margin: 0 0 0.25rem;
				color: var(--color-cyan);
				font-size: 0.72rem;
				font-weight: 800;
				letter-spacing: 0;
				text-transform: uppercase;
			}

			h2 {
				margin: 0;
				color: var(--color-text);
				font-size: 1.7rem;
				line-height: 1;
			}

			.power-count {
				min-width: 4rem;
				padding: 0.35rem 0.55rem;
				border: 1px solid rgba(103, 213, 200, 0.28);
				border-radius: var(--radius-sm);
				background: rgba(103, 213, 200, 0.1);
				color: var(--color-cyan);
				font-weight: 900;
				text-align: center;
			}

			.header-actions {
				display: flex;
				align-items: center;
				gap: 0.45rem;
			}

			.list-close {
				display: none;
			}
		}

		.list-scroll {
			flex: 1 1 auto;
			height: 0;
			min-height: 0;
			padding-right: 2.35rem;
			overflow: auto;
			scrollbar-color: rgba(242, 193, 78, 0.52) rgba(244, 239, 229, 0.06);
			scrollbar-width: thin;

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

		.search {
			width: 100%;
			min-height: 2.75rem;
			margin-bottom: 0.7rem;
			padding: 0.65rem 0.75rem;
			border: 1px solid rgba(244, 239, 229, 0.12);
			border-radius: var(--radius-sm);
			background: var(--color-panel-soft);
			color: var(--color-text);
			font-size: 1rem;

			&::placeholder {
				color: var(--color-subtle);
			}

			&:focus {
				outline: 2px solid rgba(242, 193, 78, 0.42);
				outline-offset: 2px;
			}
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

				&.kept {
					border-color: rgba(103, 213, 200, 0.18);
					background: rgba(103, 213, 200, 0.07);
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
		border: 1px solid var(--color-border);
		overflow: hidden;
	}
}

.shown {
	display: flex;
	width: 100%;
}

@media (max-width: 980px) {
	.powers--container {
		grid-template-columns: 1fr;
		gap: 0.8rem;

		&:has(.list.collapsed) {
			grid-template-columns: 1fr;
		}

		.mobile-list-toggle {
			position: sticky;
			top: 0.65rem;
			z-index: 7;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.8rem;
			width: 100%;
			min-width: 0;
			min-height: 3.1rem;
			padding: 0.65rem 0.8rem;
			border: 1px solid var(--color-border-strong);
			background: var(--color-panel-soft);
			color: var(--color-text);
			font-weight: 900;
			text-align: left;

			span {
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			strong {
				flex: 0 0 auto;
				max-width: 42%;
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
			cursor: pointer;
		}

		.list {
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
				min-height: 0;
				padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));

				.list-content {
					display: flex;
				}
			}

			.list-collapse-toggle {
				display: none;
			}

			.list-header {
				position: sticky;
				top: -1rem;
				z-index: 2;
				margin: -1rem -1rem 0.9rem;
				padding: 1rem;
				background: var(--color-panel);
				border-bottom: 1px solid rgba(244, 239, 229, 0.1);

				.header-actions {
					align-items: flex-start;
				}

				.list-close {
					display: inline-flex;
					align-items: center;
					min-height: 2.25rem;
					padding: 0.3rem 0.6rem;
					color: var(--color-muted);
					font-size: 0.82rem;
					font-weight: 900;
				}
			}

			.list-scroll {
				flex: 1 1 auto;
				height: auto;
				min-height: 0;
				max-height: none;
				padding-right: 0.25rem;
			}
		}

		.skill-panel {
			border-radius: var(--radius-md);
		}
	}
}

@media (max-width: 520px) {
	.powers--container {
		.mobile-list-toggle {
			top: 0.5rem;
			min-height: 3.3rem;
		}

		.list {
			height: min(90svh, 48rem);
			max-height: 90vh;

			.list-scroll {
				max-height: none;
			}

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
}
</style>
