<template>
	<div class="background--container">
		<div class="member ui-panel" v-for="member in family" :key="member.title">
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
import { sanitizeHtml } from "@/utils/html";

export default {
	props: {
		family: {
			type: Array,
			default: () => [],
		},
	},
	setup () {
		return {
			sanitizeHtml
		}
	}
}
</script>

<style lang="scss" scoped>
.background--container {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	gap: 1rem;

	.member {
		min-width: 0;
		padding: 1.25rem;

		.title {
			text-align: left;
			margin-bottom: 0.85rem;
			padding-bottom: 0.85rem;
			border-bottom: 1px solid rgba(244, 239, 229, 0.1);

			.name {
				margin-right: 0.4rem;
				color: var(--color-text);
				font-size: 1.8rem;
				font-weight: 900;
			}

			.info {
				font-size: 1rem;
				font-weight: normal;
				font-style: italic;
				color: var(--color-muted);
			}

			.label {
				margin-top: 0.35rem;
				margin-right: 1rem;
				font-weight: normal;
				font-style: italic;
				font-size: 0.95rem;
				color: var(--color-subtle);
			}
		}

		.content {
			text-align: left;
			color: var(--color-muted);
			font-size: 1rem;
			line-height: 1.65;
		}
	}
}

@media (max-width: 560px) {
	.background--container {
		grid-template-columns: 1fr;

		.member {
			.title {
				.name {
					font-size: 1.45rem;
				}
			}
		}
	}
}
</style>
