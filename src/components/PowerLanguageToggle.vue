<template>
	<button
		class="language-toggle ui-button"
		type="button"
		:class="{ compact }"
		:title="toggleTitle"
		:aria-label="toggleTitle"
		@click="cyclePowerLanguage"
	>
		<span class="language-code">{{ currentLanguage.shortLabel || currentLanguage.code.toUpperCase() }}</span>
		<span class="language-label" v-if="!compact">{{ currentLanguage.label }}</span>
	</button>
</template>

<script>
import { getForcePowerText } from "@/assets/power_data";
import {
	cyclePowerLanguage,
	getCurrentPowerLanguage,
	getPowerLanguages,
	powerLanguageState,
} from "@/utils/powerLanguage";

export default {
	name: "PowerLanguageToggle",
	props: {
		compact: {
			type: Boolean,
			default: false,
		},
		labelKey: {
			type: String,
			default: "ui.forceWiki.switchLanguageTo",
		},
	},
	computed: {
		languages() {
			return getPowerLanguages();
		},

		currentLanguage() {
			return this.languages.find((language) => language.code === powerLanguageState.language)
				|| this.languages[0]
				|| { code: getCurrentPowerLanguage(), label: "English", shortLabel: "EN" };
		},

		nextLanguage() {
			const currentIndex = this.languages.findIndex((language) => language.code === this.currentLanguage.code);
			const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % this.languages.length : 0;
			return this.languages[nextIndex] || this.currentLanguage;
		},

		toggleTitle() {
			return getForcePowerText(powerLanguageState.language, this.labelKey, {
				language: this.nextLanguage.label,
			});
		},
	},
	methods: {
		cyclePowerLanguage,
	},
};
</script>

<style scoped lang="scss">
.language-toggle {
	display: inline-flex;
	align-items: center;
	gap: 0.45rem;
	min-height: 2.5rem;
	padding: 0.32rem 0.65rem;
	border: 1px solid rgba(242, 193, 78, 0.34);
	background:
		linear-gradient(135deg, rgba(242, 193, 78, 0.14), rgba(103, 213, 200, 0.08)),
		var(--color-panel-soft);
	color: var(--color-text);
	font-weight: 900;
	box-shadow: var(--shadow-control);

	&:hover {
		border-color: rgba(242, 193, 78, 0.58);
		color: var(--color-accent);
	}

	&.compact {
		justify-content: center;
		width: 4.15rem;
		padding: 0.55rem;
	}
}

.language-code {
	color: var(--color-accent);
	font-size: 0.82rem;
	letter-spacing: 0;
}

.language-label {
	color: var(--color-muted);
	font-size: 0.82rem;
}
</style>
