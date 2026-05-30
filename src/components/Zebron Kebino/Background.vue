<template>
	<div class="background--container">
		<div class="member" v-for="member in family" :key="member">
			<div class="title">
				<span class="name">{{ member.title }}</span>
				<span class="info">{{ member.info }}</span>
				<div class="label">
					<span>{{ member.label }}</span>
				</div>
			</div>
			<div class="content">
				<span v-html="sanitizeHtml(member.content)"></span>
			</div>
		</div>
	</div>
</template>

<script>
import { family } from "@/assets/zebron_kebino.js";
import { sanitizeHtml } from "@/utils/html";

export default {
	setup () {
		return {
			family,
			sanitizeHtml
		}
	}
}
</script>

<style lang="scss" scoped>
.background--container {
	width: 80%;
	border: 1px solid black;
	padding: 1.5rem 5% 1.5rem 5%;

	.member {
		margin-bottom: 2rem;

		.title {
			text-align: left;
			margin-bottom: 0.5rem;

			.name {
				margin-right: 0.4rem;
				font-size: 1.8rem;
				font-weight: bold;
			}

			.info {
				font-size: 1.3rem;
				font-weight: normal;
				font-style: italic;
                color: rgb(114, 114, 114);
			}

			.label {
                margin-right: 1rem;
				font-weight: normal;
				font-style: italic;
				font-size: 1rem;
				color: rgba(51, 51, 51, 0.637);
			}
		}

		.content {
			text-align: left;
			margin-left: 0.5rem;
			font-size: 1.1rem;
		}
	}
}
</style>
