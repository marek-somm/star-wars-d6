<template>
	<div class="dicer--container ui-panel">
		<span class="title">Nicer Dicer</span>
		<div class="generator">
			<input
				class="dice ui-control"
				id="dice"
				name="dice"
				type="number"
				v-model.number="generate.dice"
				placeholder="1"
				@keyup.enter="generateRoll()"
				min="1"
				step="1"
				aria-label="Dice"
			/>D+
			<input
				class="pips ui-control"
				id="pips"
				name="pips"
				type="number"
				v-model.number="generate.pips"
				placeholder="0"
				@keyup.enter="generateRoll()"
				min="0"
				max="2"
				step="1"
				aria-label="Pips"
			/>
			<input
				class="comment ui-control"
				id="comment"
				name="comment"
				v-model="generate.comment"
				placeholder="Reason"
				@keyup.enter="generateRoll()"
				aria-label="Roll reason"
			/>
			<button class="generate ui-button" type="button" @click="generateRoll()">
				{{ copyStatus || "Generate" }}
			</button>
		</div>
	</div>
</template>

<script>
import { onBeforeUnmount, reactive, ref } from "vue";
import { copyToClipboard } from "@/utils/clipboard";
import { getRollCommandFromDice } from "@/utils/dice";

export default {
	setup() {
		const generate = reactive({
			dice: "",
			pips: "",
			comment: "",
		});
		const copyStatus = ref("");
		let statusTimeout = null;

		function clearStatusLater() {
			if (statusTimeout) window.clearTimeout(statusTimeout);

			statusTimeout = window.setTimeout(() => {
				copyStatus.value = "";
			}, 1600);
		}

		onBeforeUnmount(() => {
			if (statusTimeout) window.clearTimeout(statusTimeout);
		});

		async function generateRoll() {
			const copied = await copyToClipboard(getRollCommandFromDice(
				generate.dice,
				generate.pips,
				generate.comment
			));

			copyStatus.value = copied ? "Copied" : "Copy failed";
			clearStatusLater();
		}

		return {
			generate,
			generateRoll,
			copyStatus
		};
	},
};
</script>

<style lang="scss" scoped>
.dicer--container {
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 0.8rem;
	margin-bottom: 1.25rem;
	padding: 0.8rem 1rem;
	background: rgba(29, 27, 24, 0.72);

	.title {
		width: auto;
		font-weight: 900;
		font-size: 0.9rem;
		letter-spacing: 0;
		text-transform: uppercase;
		color: var(--color-cyan);
	}

	.generator {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.45rem;
		color: var(--color-muted);

		.dice,
		.pips {
			width: 3rem;
			-webkit-appearance: none;
			-moz-appearance: textfield;
			margin: 0;
		}

		input {
			min-height: 2.25rem;
			padding: 0.35rem 0.55rem;

			&:focus {
				outline: 2px solid rgba(242, 193, 78, 0.42);
				outline-offset: 2px;
			}
		}

		.comment {
			width: min(14rem, 48vw);
		}

		.generate {
			min-width: 6.2rem;
			min-height: 2.25rem;
			border: 1px solid rgba(242, 193, 78, 0.55);
			background: var(--color-accent);
			color: var(--color-on-accent);
			padding: 0.35rem 0.85rem;

			&:hover {
				background: #ffd56a;
				color: var(--color-on-accent);
			}
		}
	}
}

@media (max-width: 640px) {
	.dicer--container {
		align-items: flex-start;

		.generator {
			display: grid;
			grid-template-columns: 3.4rem auto 3.4rem minmax(8rem, 1fr) auto;
			align-items: center;
			justify-content: stretch;
			width: 100%;

			input,
			.generate {
				min-height: 2.75rem;
			}

			.comment {
				width: 100%;
			}
		}
	}
}

@media (max-width: 430px) {
	.dicer--container {
		padding: 0.8rem;

		.generator {
			align-items: stretch;
			grid-template-columns: 3.4rem auto 3.4rem;

			.dice,
			.pips {
				width: 3.4rem;
			}

			.comment,
			.generate {
				grid-column: 1 / -1;
				width: 100%;
			}
		}
	}
}
</style>
