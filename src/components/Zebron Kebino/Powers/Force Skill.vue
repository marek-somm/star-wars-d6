<template>
	<div class="skill--container">
		<div class="title">
			<h1 class="text">{{ skill.name }}</h1>
			<span class="required" v-if="skill.hasRequiredSkills()">
				Required:
				<span v-for="(requiredSkill, index) in skill.required" :key="index">
					{{ index > 0 ? ", " : "" }}
					{{ requiredSkill.name }}
				</span>
			</span>
		</div>
		<div class="content">
			<div class="effect">
				<!-- <ul class="short list">
					<li class="list-item" v-for="(item, index) in getEffectShort()" :key="index">
						{{ typeof item === "string" ? item : item[0] }}
						<ul v-if="(typeof item !== 'string')">
							<li v-for="i in item.length - 1" :key="i">
								{{ item[i] }}
							</li>
						</ul>
					</li>
				</ul> -->
				<div v-if="skill.effect">
					<h3>Effect</h3>
					<p class="long" v-html="skill.effect"></p>
				</div>
				<div class="example" v-if="skill.example">
					<h3>Example</h3>
					<p class="content" v-html="skill.example"></p>
				</div>
			</div>
			<div class="details">
				<Difficulty :skill="skill" />
			</div>
		</div>
	</div>
</template>

<script>
// import Powers from "@/assets/powers.js";
// import Zebron from "@/assets/zebron_kebino.js";
import Difficulty from "./Difficulty.vue";
import { Skill } from '../../../assets/powers';

export default {
	components: {
		Difficulty
	},
	props: {
		skill: {
			required: true,
			type: Skill
		},
	}
};
</script>

<style lang="scss" scoped>
.skill--container {
	flex-direction: column;
	align-items: flex-start;
	padding: 1rem 3rem 2.5rem 3rem;

	.title {
		margin-bottom: 1rem;
		text-align: left;

		.text {
			width: 100%;
			text-align: left;
			margin-bottom: 0;
		}

		.required {
			font-style: italic;
			font-size: .8rem;
			margin-left: 0;
			padding-left: 1rem;
		}
	}

	.content {
		display: flex;
		flex-direction: row;
		width: 100%;

		.effect {
			text-align: left;
			width: 40%;

			.short {
				font-size: 1.2rem;
				margin-top: 0.6rem;

				.list-item {
					padding: 0.1rem 0 0.1rem 0;
				}
			}

			.long {
				font-size: 1.1rem;
				margin-bottom: 0;
			}

			.example {
				.content {
					font-size: 1.1rem;
					margin-bottom: 0;
				}
			}
		}

		.details {
			width: 60%;
			margin-left: 3rem;
			text-align: left;
		}
	}
}
</style>
