<template>
	<div class="stat-info--container">
		<div class="flex-item">
			<div class="title">
				<div class="name">{{ getName(skill) }}</div>
				<a class="dice copy hover" @click="copyRoll(stat, skill)">
					{{ getDice(stat, skill) }}
				</a>
			</div>
			<span class="root" v-if="getRoot()">{{ getRoot() }}</span>
		</div>
		<span class="description" v-html="getDescription()"></span>
	</div>
</template>

<script>
import Stats from "@/assets/skills.js";

export default {
	props: {
		stat: {
			required: true,
		},
		skill: {
			required: true,
		},
	},
	setup(props) {
		const stats = new Stats();

		function getDescription() {
			var stat = props.stat.name;
			var skill = getRoot() ? getRoot() : props.skill.name;
			return stats.getDescription(stat, skill).main;
		}

		function getRoot() {
			console.log(props.skill.root);
			return props.skill.root;
		}

		function getSuffix(skill) {
			if (skill.spez) return "(s)";
			if (skill.adv) return "(A)";
			return "";
		}

		function getName(skill) {
			return `${skill.name} ${getSuffix(skill)}`;
		}

		function getDice(stat, skill = {}) {
			const diceStat = stat.dice ? stat.dice : 0;
			const pipsStat = stat.pips ? stat.pips : 0;
			const diceSkill = skill.dice ? skill.dice : 0;
			const pipsSkill = skill.pips ? skill.pips : 0;
			if (skill.adv) return `${diceSkill}D+${pipsSkill}`;
			return `${diceSkill + diceStat}D+${pipsSkill + pipsStat}`;
		}

		const copyRoll = (stat, skill) => {
			copyToClipboard(getRollCmd(stat, skill));
		};

		function copyToClipboard(str) {
			const el = document.createElement("textarea");
			el.value = str;
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
		}

		function getRollCmd(stat, skill = {}) {
			const diceStat = stat.dice ? stat.dice : 0;
			const pipsStat = stat.pips ? stat.pips : 0;
			const diceSkill = skill.dice ? skill.dice : 0;
			const pipsSkill = skill.pips ? skill.pips : 0;

			const name = skill.name ? skill.name : stat.name;

			var dice = diceSkill;
			var pips = pipsSkill;
			if (!skill.adv) {
				dice += diceStat;
				pips += pipsStat;
			}
			if (dice > 0) dice -= 1;

			var str = "";
			if (dice > 0) str += `${dice}d6+`;
			str += `1d6ie6#PIPS# !${name} (${dice + 1}D+${pips})`;

			str =
				pips > 0
					? str.replace("#PIPS#", `+${pips}`)
					: str.replace("#PIPS#", "");

			return str;
		}

		return {
			getDescription,
			getName,
			getDice,
			getRoot,
			copyRoll,
		};
	},
};
</script>

<style lang="scss" scoped>
.stat-info--container {
	display: flex;
	flex-direction: column;
	text-align: left;
	margin: 0 1rem 0 1rem;
	width: 100%;

	.flex-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: max-content;
		margin: auto;
		margin-bottom: 0.5rem;

		.title {
			display: flex;
			flex-direction: row;
			align-items: flex-end;

			.name {
				font-size: 1.6rem;
			}

			.dice {
				font-size: 1.2rem;
			}

			.copy {
				padding-left: 1rem;
			}

			.hover {
				transition: text-shadow 0.3s;

				&:hover {
					cursor: pointer;
					text-shadow: 1px 1px 2px gray;
				}
			}
		}

		.root {
			font-size: 1rem;
			font-style: italic;
			margin-left: 0.5rem;
		}
	}

	.description {
		margin: 1rem 35% 1rem 35%;
	}
}
</style>