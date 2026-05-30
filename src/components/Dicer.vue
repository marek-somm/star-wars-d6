<template>
	<div class="dicer--container">
		<span class="title">Nicer Dicer</span>
		<div class="generator">
			<input
				class="dice"
				id="dice"
				name="dice"
				type="number"
				v-model="generate.dice"
				placeholder="1"
				@keyup.enter="generateRoll()"
				min="1"
				step="1"
			/>D+
			<input
				class="pips"
				id="pips"
				name="pips"
				type="number"
				v-model="generate.pips"
				placeholder="0"
				@keyup.enter="generateRoll()"
				min="0"
				max="2"
				step="1"
			/>
			<input
				class="comment"
				id="comment"
				name="comment"
				v-model="generate.comment"
				placeholder="Reason"
				@keyup.enter="generateRoll()"
			/>
			<button class="generate" @click="generateRoll()">Generate</button>
		</div>
	</div>
</template>

<script>
import { reactive } from 'vue';
import { copyToClipboard } from "@/utils/clipboard";
import { getRollCommandFromDice } from "@/utils/dice";

export default {
	setup() {
		const generate = reactive({
			dice: "",
			pips: "",
			comment: "",
		});

		function generateRoll() {
			copyToClipboard(getRollCommandFromDice(
				generate.dice,
				generate.pips,
				generate.comment
			));
		}

		return {
			generate,
			generateRoll
		};
	},
};
</script>

<style lang="scss" scoped>
.dicer--container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 2rem;

	.title {
		width: 100%;
		font-weight: bold;
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
	}

	.generator {
		border: 1px solid rgb(170, 170, 170);
		padding: 0.5rem;
		border-radius: 10px;

		.dice,
		.pips {
			width: 1rem;
			-webkit-appearance: none;
			-moz-appearance: textfield;
			margin: 0;
		}

		.comment {
			margin-left: 1rem;
			width: 7rem;
		}

		.generate {
			margin-left: 2rem;
		}
	}
}
</style>
