<template>
	<div class="navbar--container">
		<header class="nav">
			<section class="filler force-panel" aria-label="Force skills and points">
				<div class="force-stats">
					<p><span>Control</span>{{ forceStats.control.dice }}D+{{ forceStats.control.pips }}</p>
					<p><span>Sense</span>{{ forceStats.sense.dice }}D+{{ forceStats.sense.pips }}</p>
					<p><span>Alter</span>{{ forceStats.alter.dice }}D+{{ forceStats.alter.pips }}</p>
				</div>
				<div class="right-align points">
					<p><span>Force</span>{{ points.force }}</p>
					<p class="temporary-force">
						<span>Temporary</span>
						<button class="number-button" type="button" @click="addTemporaryForce">+</button>
						<button class="number-button" type="button" @click="removeTemporaryForce">-</button>
						<strong>{{ force_temp }}</strong>
					</p>
					<p><span>Darkside</span>{{ points.darkside }}</p>
				</div>
			</section>
			<section class="main" aria-label="Character navigation">
				<p class="eyebrow">Star Wars D6</p>
				<h1>{{ data.name }}</h1>
				<div class="nav-list">
					<button class="item" :class="{ active: data.stats }" type="button" @click="showStats">Stats</button>
					<button class="item" :class="{ active: data.powers }" type="button" @click="showPowers">Powers</button>
					<button class="item" :class="{ active: data.background }" type="button" @click="showBackground">Background</button>
				</div>
			</section>
			<section class="filler character-panel" aria-label="Character points">
				<div>
					<p><span>Character Points</span>{{ points.character }}</p>
					<p><span>Spent Points</span>{{ points.spent }}</p>
				</div>
			</section>
		</header>
		<main class="content-shell">
			<Stats class="content-item" v-show="data.stats" />
			<Background class="content-item" v-show="data.background" />
			<Powers class="content-item" v-show="data.powers" />
		</main>
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

		function addTemporaryForce() {
			force_temp.value += 1;
		}

		function removeTemporaryForce() {
			if (force_temp.value > 0) {
				force_temp.value -= 1;
			}
		}

		return {
			data,
			points,
			forceStats,
			showStats,
			showPowers,
			showBackground,
			addTemporaryForce,
			removeTemporaryForce,
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
	gap: 1.25rem;

	.nav {
		display: grid;
		grid-template-columns: minmax(18rem, 1fr) minmax(22rem, 0.9fr) minmax(14rem, 0.72fr);
		gap: 1rem;
		width: 100%;
		align-items: stretch;

		.main {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-height: 12rem;
			padding: 1.5rem;
			border: 1px solid var(--color-border-strong);
			border-radius: var(--radius-md);
			background:
				linear-gradient(135deg, rgba(242, 193, 78, 0.14), rgba(103, 213, 200, 0.05)),
				var(--color-panel);
			box-shadow: var(--shadow-panel);

			.eyebrow {
				margin: 0 0 0.5rem;
				color: var(--color-accent);
				font-size: 0.75rem;
				font-weight: 800;
				letter-spacing: 0;
				text-transform: uppercase;
			}

			h1 {
				margin: 0 0 1.25rem;
				color: var(--color-text);
				font-size: 3.2rem;
				line-height: 1;
				text-align: center;
			}

			.nav-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				gap: 0.45rem;
				padding: 0;
				margin: 0;

				.item {
					min-height: 2.4rem;
					padding: 0.45rem 0.9rem;
					border: 1px solid rgba(244, 239, 229, 0.12);
					border-radius: var(--radius-sm);
					background: rgba(255, 255, 255, 0.04);
					color: var(--color-muted);
					font-weight: 700;
					transition:
						background 0.2s ease,
						border-color 0.2s ease,
						color 0.2s ease,
						transform 0.2s ease;

					&:hover {
						cursor: pointer;
						border-color: var(--color-border-strong);
						color: var(--color-text);
						transform: translateY(-1px);
					}

					&.active {
						border-color: rgba(242, 193, 78, 0.78);
						background: var(--color-accent);
						color: #1a1712;
					}
				}
			}
		}

		.filler {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			padding: 1.25rem;
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
			background: var(--color-panel);
			box-shadow: var(--shadow-panel);

			div {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 0.55rem;

				p {
					display: flex;
					align-items: baseline;
					gap: 0.6rem;
					margin: 0;
					color: var(--color-text);
					font-size: 1.05rem;
					font-weight: 800;

					span {
						color: var(--color-muted);
						font-size: 0.76rem;
						font-weight: 800;
						letter-spacing: 0;
						text-transform: uppercase;
					}
				}
			}
		}

		.right-align {
			align-items: flex-end !important;
		}

		.temporary-force {
			display: grid !important;
			grid-template-columns: auto 1.7rem 1.7rem auto;
			align-items: center !important;
			gap: 0.4rem !important;
		}

		.number-button {
			width: 1.7rem;
			height: 1.7rem;
			border: 1px solid rgba(244, 239, 229, 0.14);
			border-radius: var(--radius-sm);
			background: var(--color-panel-soft);
			color: var(--color-text);
			font-weight: 800;
			line-height: 1;
			cursor: pointer;

			&:hover {
				border-color: var(--color-accent);
				color: var(--color-accent);
			}
		}
	}

	.content-shell {
		width: 100%;
		display: flex;
		justify-content: center;
	}
}

@media (max-width: 1120px) {
	.navbar--container {
		.nav {
			grid-template-columns: 1fr 1fr;

			.main {
				grid-column: 1 / -1;
				order: -1;
			}
		}
	}
}

@media (max-width: 760px) {
	.navbar--container {
		gap: 0.85rem;

		.nav {
			grid-template-columns: 1fr;
			gap: 0.75rem;

			.main {
				min-height: auto;
				padding: 1rem;

				h1 {
					font-size: 2.25rem;
				}

				.nav-list {
					display: grid;
					grid-template-columns: repeat(3, minmax(0, 1fr));
					width: 100%;

					.item {
						min-height: 2.75rem;
						margin: 0;
						padding: 0.45rem 0.35rem;
					}
				}
			}

			.filler {
				flex-direction: column;
				align-items: flex-start;
				gap: 0.75rem;
				padding: 1rem;

				.right-align {
					align-items: flex-start !important;
				}
			}
		}
	}
}

@media (max-width: 430px) {
	.navbar--container {
		.nav {
			.main {
				h1 {
					font-size: 1.9rem;
				}
			}

			.filler {
				div {
					width: 100%;

					p {
						justify-content: space-between;
						width: 100%;
					}
				}
			}

			.temporary-force {
				grid-template-columns: 1fr 2rem 2rem auto !important;
				width: 100%;
			}

			.number-button {
				width: 2rem;
				height: 2rem;
			}
		}
	}
}
</style>
