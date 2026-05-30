<template>
	<div class="navbar--container">
		<div class="nav">
			<div class="filler">
				<div>
					<p>{{ forceStats.control.name }} {{ forceStats.control.dice }}D+{{ forceStats.control.pips }}
					</p>
					<p>{{ forceStats.sense.name }} {{ forceStats.sense.dice }}D+{{ forceStats.sense.pips }}</p>
					<p>{{ forceStats.alter.name }} {{ forceStats.alter.dice }}D+{{ forceStats.alter.pips }}</p>
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
					<button class="item" type="button" @click="showStats">Stats</button>
					<button class="item" type="button" @click="showPowers">Powers</button>
					<button class="item" type="button" @click="showBackground">Background</button>
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
import { forceStats } from "@/assets/powers";

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
			powers: false,
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
			forceStats,
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
					border: 0;
					background: transparent;
					font: inherit;
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
