<template>
	<div class="powers--container">
		<div class="list">
			<input class="list-item" placeholder="Search" :v-bind="data.search">
			<div class="label" v-for="(powerLabel, index) in zebron.getPowerLabels()" :key="index">
				<li class="list-item label">{{ powerLabel.getName() }}</li>
				<li class="list-item hover" v-for="(forceSkill, index) in filterSkills(powerLabel)" :key="index"
					@click="showSkill(forceSkill)">
					{{ forceSkill.name }}
				</li>
			</div>
		</div>
		<ForceSkill v-if="data.currentSkill !== null" :skill="data.currentSkill"
			:class="{ hidden: data.currentSkill === '', shown: data.currentSkill !== '' }" />
	</div>
</template>

<script setup>
import { reactive } from 'vue';

import Zebron from "@/assets/zebron_kebino.js";
import ForceSkill from "./Force Skill";

const data = reactive({
	currentSkill: null,
	search: ""
});

const zebron = new Zebron();

function showSkill(skill) {
	data.currentSkill = skill;
}

function filterSkills(powerLabel) {
	if (data.search == "") {
		return powerLabel.getSkills();
	} else {
		return;
	}
}
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
		}

		input {
			border: 0;
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