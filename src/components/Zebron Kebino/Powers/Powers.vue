<template>
	<div class="powers--container">
		<div class="list">
			<input class="list-item" placeholder="Search" type="search" v-model.trim="data.search">
			<div class="label" v-for="powerLabel in filteredPowerLabels" :key="powerLabel.name">
				<div class="list-item label">{{ powerLabel.name }}</div>
				<button class="list-item hover" type="button" v-for="forceSkill in powerLabel.skills" :key="forceSkill.name"
					@click="showSkill(forceSkill)">
					{{ forceSkill.name }}
				</button>
			</div>
		</div>
		<ForceSkill v-if="data.currentSkill" :skill="data.currentSkill" class="shown" />
	</div>
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
	computed: {
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

		filterSkills(powerLabel, search) {
			if (search === "") {
				return powerLabel.getSkills();
			}

			return powerLabel.getSkills().filter((skill) =>
				skill.name.toLowerCase().includes(search)
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.hidden {
	color: transparent;
	width: 80%;
}

.shown {
	display: flex;
	width: 100%;
	transition: width 1s ease;
}

.powers--container {
	width: 100%;
	display: flex;
	flex-grow: 1;
	border: 1px solid black;

	.list {
		display: flex;
		flex-direction: column;
		list-style: none;
		text-align: left;
		margin: 0;
		padding: 0.5rem;
		padding-right: 2.5rem;
		background: rgb(219, 219, 219);

		.list-item {
			width: 100%;
			padding: 1rem;
			font-weight: normal;
			font-size: 1rem;
			box-sizing: border-box;
		}

		input {
			border: 0;
		}

		button {
			border: 0;
			background: transparent;
			text-align: left;
		}

		.hover {
			cursor: pointer;
			transition: background 0.2s ease;

			&:hover {
				background: rgb(150, 150, 150);
			}
		}

		.label {
			font-weight: bold;
			font-size: 1.2rem;
		}
	}

	.current-skill {
		width: 100%;
	}
}
</style>
