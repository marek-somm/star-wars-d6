<template>
	<div class="navbar--container">
		<div class="nav">
			<div class="filler">
				<div>
					<p>{{ powersOld.stats.control.name }} {{ powersOld.stats.control.dice }}D+{{ powersOld.stats.control.pips }}
					</p>
					<p>{{ powersOld.stats.sense.name }} {{ powersOld.stats.sense.dice }}D+{{ powersOld.stats.sense.pips }}</p>
					<p>{{ powersOld.stats.alter.name }} {{ powersOld.stats.alter.dice }}D+{{ powersOld.stats.alter.pips }}</p>
				</div>
				<div class="right-align">
					<p>{{ points.force }} Force Points</p>
					<p>
						<button class="number-button" @click="force_temp++">+</button>
						<button class="number-button" @click="() => { if (force_temp > 0) force_temp--; }">-</button>
						{{ force_temp }} Temporary Force Points
					</p>
					<p>{{ points.darkside }} Darkside Points</p>
				</div>
			</div>
			<div class="main">
				<h1>{{ data.name }}</h1>
				<ul class="nav-list">
					<a class="item" @click="showStats()">Stats</a>
					<a class="item" @click="showPowers()">Powers</a>
					<a class="item" @click="showBackground()">Background</a>
				</ul>
			</div>
			<div class="filler">
				<div>
					<p>Character Points {{ points.character }}</p>
					<p>Spent Character Points {{ points.spent }}</p>
				</div>
			</div>
		</div>
		<Stats class="content-item" v-show="data.stats" />
		<Background class="content-item" v-show="data.background" />
		<Powers class="content-item" v-show="data.powers" />
	</div>
</template>

<script>
import { reactive, ref } from "vue";
import Stats from "./Zebron Kebino/Stats/Stats";
import Background from "./Zebron Kebino/Background";
import Powers from "./Zebron Kebino/Powers/Powers";

import { points } from "@/assets/zebron_kebino.js";
import { powersOld } from "@/assets/zebron_kebino.js";

export default {
	components: {
		Stats,
		Background,
		Powers,
	},
	setup() {
		const data = reactive({
			name: "Zebron Kebino",
			stats: true,
			background: false,
		});

		const force_temp = ref(points.force_temp);

		function showStats() {
			data.stats = true;

			data.powers = false;
			data.background = false;
		}

		function showPowers() {
			data.powers = true;

			data.stats = false;
			data.background = false;
		}

		function showBackground() {
			data.background = true;

			data.stats = false;
			data.powers = false;
		}
		return {
			data,
			points,
			powersOld,
			showStats,
			showPowers,
			showBackground,
			force_temp
		};
	},
};
</script>

<style lang="scss" scoped>
.navbar--container {
	display: flex;
	flex-direction: column;
	align-items: center;

	.nav {
		display: flex;
		justify-content: center;
		width: 100%;

		.main {
			width: 30%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.nav-list {
				display: flex;
				flex-direction: row;
				width: max-content;
				padding: 0;
				margin-top: 0;

				.item {
					margin: 0 1rem 0 1rem;
					transition: text-shadow 0.2s;

					&:hover {
						cursor: pointer;
						text-shadow: 1px 1px 2px gray;
					}
				}
			}
		}

		.filler {
			display: flex;
			width: 30%;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			div {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				width: max-content;
				height: max-content;

				p {
					margin: 0.2rem;
				}
			}
		}

		.right-align {
			align-items: flex-end !important;
		}

		.number-button {
			width: 1.3rem;
			height: 1.3rem;
			border: 0;
			border-radius: 0;
			margin: 0 0.1rem;
		}
	}
}
</style>