<template>
	<section class="powers--container">
		<aside class="list">
			<div class="list-header">
				<div>
					<p class="eyebrow">Force Powers</p>
					<h2>Powers</h2>
				</div>
				<span class="power-count">{{ totalPowerCount }}</span>
			</div>
			<input class="search" placeholder="Search powers" type="search" v-model.trim="data.search" aria-label="Search powers">
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
					{{ forceSkill.name }}
				</button>
			</div>
		</aside>
		<section class="skill-panel">
			<ForceSkill v-if="data.currentSkill" :skill="data.currentSkill" class="shown" />
		</section>
	</section>
</template>

<script>
import Zebron from "@/assets/zebron_kebino.js";
import ForceSkill from "./Force Skill";

export default {
	components: {
		ForceSkill
	},
	data() {
		return {
			data: {
				currentSkill: null,
				search: ""
			},
			zebron: new Zebron()
		};
	},
	created() {
		const firstLabel = this.zebron.getPowerLabels().find((powerLabel) => powerLabel.getSkills().length > 0);

		if (firstLabel) {
			this.data.currentSkill = firstLabel.getSkills()[0];
		}
	},
	computed: {
		totalPowerCount() {
			return this.zebron.getPowerLabels()
				.reduce((total, powerLabel) => total + powerLabel.getSkills().length, 0);
		},

		filteredPowerLabels() {
			const search = this.data.search.toLowerCase();

			return this.zebron.getPowerLabels()
				.map((powerLabel) => ({
					name: powerLabel.getName(),
					skills: this.filterSkills(powerLabel, search),
				}))
				.filter((powerLabel) => powerLabel.skills.length > 0);
		}
	},
	methods: {
		showSkill(skill) {
			this.data.currentSkill = skill;
		},

		isCurrentSkill(skill) {
			return this.data.currentSkill?.name === skill.name;
		},

		filterSkills(powerLabel, search) {
			if (search === "") {
				return powerLabel.getSkills();
			}

			return powerLabel.getSkills().filter((skill) =>
				[
					skill.name,
					skill.effect,
					skill.example,
					powerLabel.getName()
				].some((value) => String(value || "").toLowerCase().includes(search))
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.powers--container {
	width: 100%;
	display: grid;
	grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
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
				min-width: 2.35rem;
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
			margin-bottom: 1rem;
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
			min-height: 2.45rem;
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
</style>
