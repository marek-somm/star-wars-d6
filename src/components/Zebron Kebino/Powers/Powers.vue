<template>
	<section class="powers--container">
		<aside class="list">
			<div class="list-header">
				<div>
					<p class="eyebrow">Force Powers</p>
					<h2>Powers</h2>
				</div>
				<span class="power-count">{{ filteredPowerCount }}/{{ totalPowerCount }}</span>
			</div>
			<input
				class="search"
				placeholder="Search powers"
				type="search"
				v-model.trim="data.search"
				aria-label="Search powers"
			>
			<div class="filter-tabs" aria-label="Power type filter">
				<button
					class="filter-tab"
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
					<h3>Favorites</h3>
					<button
						class="quick-item"
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
					<h3>Kept Up</h3>
					<button
						class="quick-item kept"
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
					<h3>Recent</h3>
					<button
						class="quick-item"
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
					class="list-item"
					:class="{ active: isCurrentSkill(forceSkill) }"
					type="button"
					v-for="forceSkill in powerLabel.skills"
					:key="forceSkill.name"
					@click="showSkill(forceSkill)"
				>
					<span class="skill-name">{{ forceSkill.name }}</span>
					<span class="skill-meta">
						<span class="skill-flag favorite" v-if="isFavorite(forceSkill)">Fav</span>
						<span
							class="skill-flag kept"
							:class="{ active: isKeptUpActive(forceSkill) }"
							v-if="isKeptUpPower(forceSkill)"
						>
							Kept
						</span>
						<span class="power-chip" v-for="power in forceSkill.powers" :key="power">
							{{ getPowerShortName(power) }}
						</span>
					</span>
				</button>
			</div>
			<p class="empty-state" v-if="filteredPowerLabels.length === 0">No powers match the current filter.</p>
		</aside>
		<section class="skill-panel">
			<ForceSkill
				v-if="data.currentSkill"
				:skill="data.currentSkill"
				:is-favorite="isFavorite(data.currentSkill)"
				:kept-up-active="isKeptUpActive(data.currentSkill)"
				class="shown"
				@select-skill="showSkill"
				@toggle-favorite="toggleFavorite"
				@toggle-kept-up="toggleKeptUp"
			/>
		</section>
	</section>
</template>

<script>
import Zebron from "@/assets/zebron_kebino.js";
import { Power, PowerName } from "@/assets/powers";
import ForceSkill from "./Force Skill";

const FAVORITES_STORAGE_KEY = "star-wars-d6:favorites";
const RECENT_STORAGE_KEY = "star-wars-d6:recent-powers";
const KEPT_UP_STORAGE_KEY = "star-wars-d6:kept-up-powers";
const RECENT_LIMIT = 6;

export default {
	components: {
		ForceSkill
	},
	data() {
		return {
			data: {
				currentSkill: null,
				search: "",
				powerFilter: "all",
				favorites: [],
				recent: [],
				keptUp: []
			},
			zebron: new Zebron()
		};
	},
	created() {
		this.data.favorites = this.loadList(FAVORITES_STORAGE_KEY);
		this.data.recent = this.loadList(RECENT_STORAGE_KEY);
		this.data.keptUp = this.loadList(KEPT_UP_STORAGE_KEY);

		const firstLabel = this.zebron.getPowerLabels().find((powerLabel) => powerLabel.getSkills().length > 0);

		if (firstLabel) {
			this.showSkill(firstLabel.getSkills()[0], { trackRecent: false });
		}
	},
	computed: {
		allSkills() {
			return this.zebron.getPowerLabels().flatMap((powerLabel) => powerLabel.getSkills());
		},

		powerFilters() {
			return [
				{ value: "all", label: "All" },
				{ value: Power.control, label: PowerName[Power.control] },
				{ value: Power.sense, label: PowerName[Power.sense] },
				{ value: Power.alter, label: PowerName[Power.alter] },
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

			return this.zebron.getPowerLabels()
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
		showSkill(skill, options = {}) {
			const resolvedSkill = this.findSkillByName(skill?.name) || skill;

			if (!resolvedSkill) return;

			this.data.currentSkill = resolvedSkill;

			if (options.trackRecent !== false) {
				this.trackRecentSkill(resolvedSkill);
			}
		},

		isCurrentSkill(skill) {
			return this.normalizeSkillName(this.data.currentSkill?.name) === this.normalizeSkillName(skill?.name);
		},

		filterSkills(powerLabel, search) {
			return powerLabel.getSkills().filter((skill) =>
				this.matchesPowerFilter(skill) && this.matchesSearch(skill, powerLabel, search)
			);
		},

		matchesPowerFilter(skill) {
			return this.data.powerFilter === "all" || skill.powers.includes(this.data.powerFilter);
		},

		matchesSearch(skill, powerLabel, search) {
			if (search === "") return true;

			return [
				skill.name,
				skill.effect,
				skill.example,
				powerLabel.getName(),
				...skill.powers.map((power) => PowerName[power] || power),
				...skill.extra,
			].some((value) => String(value || "").toLowerCase().includes(search));
		},

		toggleFavorite(skill) {
			this.data.favorites = this.toggleName(this.data.favorites, skill.name);
			this.saveList(FAVORITES_STORAGE_KEY, this.data.favorites);
		},

		isFavorite(skill) {
			return this.data.favorites
				.some((name) => this.normalizeSkillName(name) === this.normalizeSkillName(skill?.name));
		},

		toggleKeptUp(skill) {
			if (!this.isKeptUpPower(skill)) return;

			this.data.keptUp = this.toggleName(this.data.keptUp, skill.name);
			this.saveList(KEPT_UP_STORAGE_KEY, this.data.keptUp);
		},

		isKeptUpActive(skill) {
			return this.data.keptUp
				.some((name) => this.normalizeSkillName(name) === this.normalizeSkillName(skill?.name));
		},

		isKeptUpPower(skill) {
			return Array.isArray(skill?.extra)
				&& skill.extra.some((item) => String(item || "").toLowerCase().includes("kept up"));
		},

		trackRecentSkill(skill) {
			this.data.recent = [
				skill.name,
				...this.data.recent.filter((name) =>
					this.normalizeSkillName(name) !== this.normalizeSkillName(skill.name)
				)
			].slice(0, RECENT_LIMIT);
			this.saveList(RECENT_STORAGE_KEY, this.data.recent);
		},

		toggleName(list, name) {
			if (list.some((item) => this.normalizeSkillName(item) === this.normalizeSkillName(name))) {
				return list.filter((item) => this.normalizeSkillName(item) !== this.normalizeSkillName(name));
			}

			return [name, ...list];
		},

		getSkillsFromNames(names) {
			return names
				.map((name) => this.findSkillByName(name))
				.filter(Boolean);
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

		getPowerShortName(power) {
			return (PowerName[power] || power).charAt(0);
		},

		loadList(key) {
			if (typeof window === "undefined") return [];

			try {
				const value = JSON.parse(window.localStorage.getItem(key) || "[]");
				return Array.isArray(value) ? value.filter(Boolean) : [];
			} catch {
				return [];
			}
		},

		saveList(key, value) {
			if (typeof window === "undefined") return;

			window.localStorage.setItem(key, JSON.stringify(value));
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
	align-items: start;

	.list {
		display: flex;
		flex-direction: column;
		text-align: left;
		margin: 0;
		padding: 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-panel);
		box-shadow: var(--shadow-panel);
		position: sticky;
		top: 1rem;
		max-height: calc(100vh - 2rem);
		overflow: auto;

		.list-header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 1rem;
			margin-bottom: 0.9rem;

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
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 0.35rem;
			margin-bottom: 1rem;

			.filter-tab {
				min-height: 2.15rem;
				padding: 0.3rem 0.35rem;
				border: 1px solid rgba(244, 239, 229, 0.12);
				border-radius: var(--radius-sm);
				background: rgba(255, 255, 255, 0.04);
				color: var(--color-muted);
				font-size: 0.82rem;
				font-weight: 800;
				cursor: pointer;

				&:hover {
					border-color: var(--color-border-strong);
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
				border-radius: var(--radius-sm);
				background: rgba(255, 255, 255, 0.035);
				color: var(--color-muted);
				font-size: 0.88rem;
				font-weight: 700;
				text-align: left;
				cursor: pointer;

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
			border-radius: var(--radius-sm);
			background: transparent;
			color: var(--color-muted);
			font-size: 0.95rem;
			font-weight: 700;
			text-align: left;
			cursor: pointer;
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
		border-radius: var(--radius-md);
		background: var(--color-panel);
		box-shadow: var(--shadow-panel);
		overflow: hidden;
	}
}

.shown {
	display: flex;
	width: 100%;
}

@media (max-width: 940px) {
	.powers--container {
		grid-template-columns: 1fr;

		.list {
			position: static;
			max-height: none;
		}
	}
}

@media (max-width: 520px) {
	.powers--container {
		.list {
			.filter-tabs {
				grid-template-columns: repeat(2, minmax(0, 1fr));
			}
		}
	}
}
</style>
