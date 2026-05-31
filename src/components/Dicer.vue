<template>
	<div class="dicer--container">
		<span class="title">Nicer Dicer</span>
		<div class="generator">
			<input
				class="dice"
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
				class="pips"
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
				class="comment"
				id="comment"
				name="comment"
				v-model="generate.comment"
				placeholder="Reason"
				@keyup.enter="generateRoll()"
				aria-label="Roll reason"
			/>
			<button class="generate" type="button" @click="generateRoll()">
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
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: rgba(29, 27, 24, 0.72);

	.title {
		width: auto;
		font-weight: bold;
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
			border: 1px solid rgba(244, 239, 229, 0.12);
			border-radius: var(--radius-sm);
			background: var(--color-panel-soft);
			color: var(--color-text);
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
			border-radius: var(--radius-sm);
			background: var(--color-accent);
			color: #1a1712;
			font-weight: 800;
			padding: 0.35rem 0.85rem;
			cursor: pointer;

			&:hover {
				background: #ffd56a;
			}
		}
	}
}

@media (max-width: 640px) {
	.dicer--container {
		align-items: flex-start;

		.generator {
			justify-content: flex-start;
		}
	}
}
</style>
