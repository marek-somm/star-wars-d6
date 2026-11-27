<template>
	<div class="navbar--container">
		<header class="sheet-header ui-panel ui-page-banner">
			<div class="sheet-header-row">
				<img v-if="portrait" :src="portrait" alt="" class="sheet-portrait" width="104" height="104" />
				<div class="sheet-title">
					<p class="ui-kicker">Star Wars D6</p>
					<h1 class="ui-page-title">{{ character.name }}</h1>
				</div>
				<div v-if="$slots.actions" class="sheet-actions"><slot name="actions" /></div>
			</div>
			<nav class="nav-list" :aria-label="t('ui.sheet.characterNavigation')">
				<button class="item ui-button" :class="{ active: data.stats }" :aria-pressed="data.stats" type="button" @click="showStats">{{ t("ui.sheet.stats") }}</button>
				<button class="item ui-button" :class="{ active: data.powers }" :aria-pressed="data.powers" type="button" @click="showPowers">{{ t("ui.sheet.powers") }}</button>
				<button class="item ui-button" :class="{ active: data.background }" :aria-pressed="data.background" type="button" @click="showBackground">{{ t("ui.sheet.background") }}</button>
				<button class="item ui-button" :class="{ active: data.sessionPoints }" :aria-pressed="data.sessionPoints" type="button" @click="showSection('sessionPoints')">
					{{ t("ui.sessionPoints.navigation") }}
				</button>
			</nav>
		</header>
		<div class="sheet-overview ui-panel">
			<section class="force-panel" :aria-label="t('ui.sheet.forceSkillsAndPoints')">
				<div class="force-stats">
					<p v-for="forceSkill in forceSkillButtons" :key="forceSkill.power">
						<span>{{ forceSkill.label }}</span>
						<button class="force-copy ui-button is-cyan" type="button" @click="copyForceRoll(forceSkill.power)">
							{{ forceSkill.dice }}
						</button>
					</p>
				</div>
				<div class="points">
					<p><span>{{ t("ui.sheet.force") }}</span>{{ characterPoints.force }}</p>
					<p class="temporary-force">
						<span>{{ t("ui.sheet.temporary") }}</span>
						<span class="temporary-control">
							<button class="number-button ui-button" type="button" @click="removeTemporaryForce">−</button>
							<strong>{{ force_temp }}</strong>
							<button class="number-button ui-button" type="button" @click="addTemporaryForce">+</button>
						</span>
					</p>
					<p><span>{{ t("ui.sheet.darkside") }}</span>{{ characterPoints.darkside }}</p>
				</div>
			</section>
			<section class="character-panel" :aria-label="t('ui.sheet.characterPointsAria')">
				<p><span>{{ t("ui.sheet.characterPoints") }}</span>{{ characterPoints.character }}</p>
				<p><span>{{ t("ui.sheet.spentPoints") }}</span>{{ characterPoints.spent }}</p>
			</section>
		</div>
		<slot name="tools" />
		<main class="content-shell">
			<Stats class="content-item" v-show="data.stats" :stats="character.stats" />
			<Background class="content-item" v-show="data.background" :family="character.family" />
			<Powers class="content-item" v-show="data.powers" :language="powerLanguageState.language"
				:power-labels="characterPowerLabels" :force-stats="characterForceStats" :active="data.powers" />
			<SessionPoints v-if="data.sessionPoints" :character="character" />
		</main>
	</div>
</template>

<script>
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { characters } from "@/assets/characters";
import Stats from "./CharacterSheet/Stats/Stats";
import Background from "./CharacterSheet/Background";
import Powers from "./CharacterSheet/Powers/Powers";
import zebronPortrait from "@/assets/timeline-sketches/zebron-kebino.webp";

import { copyToClipboard } from "@/utils/clipboard";
import { formatDiceParts, getRollCommandFromDice } from "@/utils/dice";
import { readNumber, writeNumber } from "@/utils/storage";
import { powerLanguageState } from "@/utils/powerLanguage";
import { tUi } from "@/utils/uiText";

const SessionPoints = defineAsyncComponent(() => import("./CharacterSheet/SessionPoints.vue"));
const TEMP_FORCE_STORAGE_KEY = "star-wars-d6:temporary-force-points";
const SHEET_SECTIONS = ["stats", "powers", "background", "sessionPoints"];
const FORCE_SKILL_BUTTONS = [
	{ power: "control" },
	{ power: "sense" },
	{ power: "alter" },
];

function getSheetSectionFromHash() {
	if (typeof window === "undefined") return "stats";

	const hashParts = String(window.location.hash || "")
		.replace(/^#\/?/, "")
		.split("/")
		.filter(Boolean);

	if (hashParts[0] !== "sheet") return "stats";
	return SHEET_SECTIONS.includes(hashParts[1]) ? hashParts[1] : "stats";
}

function setSheetHash(section) {
	if (typeof window === "undefined") return;

	const nextHash = `#/sheet/${section}`;
	if (window.location.hash !== nextHash) {
		window.location.hash = nextHash;
	}
}

export default {
	components: {
		Stats,
		Background,
		Powers,
		SessionPoints,
	},
	props: {
		character: {
			type: Object,
			default: () => characters[0],
		},
	},
	setup(props) {
		const data = reactive({
			stats: true,
			powers: false,
			background: false,
			sessionPoints: false,
		});
		const characterPoints = computed(() => props.character?.points || {});
		const portrait = computed(() => props.character?.id === "zebron-kebino" ? zebronPortrait : "");
		const characterForceStats = computed(() => props.character?.forceStats || {});
		const characterPowerLabels = computed(() =>
			props.character?.createPowerProfile?.(powerLanguageState.language)?.getPowerLabels?.() || []
		);
		const forceSkillButtons = computed(() =>
			FORCE_SKILL_BUTTONS.map((entry) => ({
				...entry,
				label: tUi(`ui.powers.${entry.power}`),
				dice: formatDiceParts(characterForceStats.value[entry.power]?.dice || 0, characterForceStats.value[entry.power]?.pips || 0),
			}))
		);

		const force_temp = ref(loadTemporaryForcePoints(props.character));

		function showSection(section, options = {}) {
			data.stats = section === "stats";
			data.powers = section === "powers";
			data.background = section === "background";
			data.sessionPoints = section === "sessionPoints";

			if (options.updateHash !== false) {
				setSheetHash(section);
			}
		}

		function showStats() {
			showSection("stats");
		}

		function showPowers() {
			showSection("powers");
		}

		function showBackground() {
			showSection("background");
		}

		function syncSectionWithHash() {
			showSection(getSheetSectionFromHash(), { updateHash: false });
		}

		function addTemporaryForce() {
			force_temp.value += 1;
			saveTemporaryForcePoints(force_temp.value);
		}

		function removeTemporaryForce() {
			if (force_temp.value > 0) {
				force_temp.value -= 1;
				saveTemporaryForcePoints(force_temp.value);
			}
		}

		function loadTemporaryForcePoints() {
			const value = readNumber(getTemporaryForceStorageKey(props.character), characterPoints.value.force_temp);
			if (value < 0) {
				return characterPoints.value.force_temp;
			}

			characterPoints.value.force_temp = value;
			return value;
		}

		function saveTemporaryForcePoints(value) {
			characterPoints.value.force_temp = value;
			writeNumber(getTemporaryForceStorageKey(props.character), value);
		}

		function copyForceRoll(power) {
			const stat = characterForceStats.value[power] || {};
			const label = tUi(`ui.powers.${power}`);
			copyToClipboard(getRollCommandFromDice(stat.dice, stat.pips, label));
		}

		function getTemporaryForceStorageKey(character) {
			return `${TEMP_FORCE_STORAGE_KEY}:${character?.id || "default"}`;
		}

		watch(
			() => props.character?.id,
			() => {
				force_temp.value = loadTemporaryForcePoints();
			}
		);

		onMounted(() => {
			syncSectionWithHash();
			if (typeof window !== "undefined") {
				window.addEventListener("hashchange", syncSectionWithHash);
			}
		});

		onBeforeUnmount(() => {
			if (typeof window !== "undefined") {
				window.removeEventListener("hashchange", syncSectionWithHash);
			}
		});

		return {
			data,
			characterPoints,
			portrait,
			characterForceStats,
			forceSkillButtons,
			powerLanguageState,
			characterPowerLabels,
			showStats,
			showPowers,
			showBackground,
			showSection,
			t: tUi,
			copyForceRoll,
			addTemporaryForce,
			removeTemporaryForce,
			force_temp
		};
	},
};
</script>

<style lang="scss" scoped>
.navbar--container {
	display: grid;
	gap: 0.85rem;
	min-width: 0;
}

.sheet-header {
	padding: clamp(0.9rem, 2.2vw, 1.8rem);
}

.sheet-header-row {
	display: flex;
	align-items: center;
	gap: clamp(0.7rem, 2vw, 1.35rem);
	min-width: 0;
}

.sheet-title {
	flex: 1 1 auto;
	min-width: 0;
}

.sheet-portrait {
	flex: 0 0 auto;
	width: clamp(3.5rem, 8vw, 6.2rem);
	height: auto;
	aspect-ratio: 1;
	object-fit: contain;
	border: 1px solid var(--color-border);
	border-radius: 0.6rem;
	background: radial-gradient(ellipse at center, rgba(242, 193, 78, 0.12), rgba(0, 0, 0, 0.15));
}

.sheet-actions {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-end;
	gap: 0.5rem;
	min-width: 0;
}

.nav-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.3rem;
	margin: 1rem 0 0;
	padding-top: 0.8rem;
	border-top: 1px solid var(--color-rule);

	.item {
		min-width: 0;
		padding: 0.42rem 0.85rem;
		border-color: transparent;
		background: transparent;
		color: var(--color-muted);

		&:hover {
			background: var(--surface-hover);
			color: var(--color-text);
		}

		&.active {
			border-color: var(--color-border);
			background: var(--surface-accent);
			color: var(--color-accent);
		}
	}
}

.sheet-overview {
	display: grid;
	grid-template-columns: minmax(0, 3.1fr) minmax(10rem, 1fr);
	gap: clamp(0.65rem, 2vw, 1.35rem);
	padding: clamp(0.65rem, 1.65vw, 1.05rem);
}

.force-panel,
.force-stats,
.points,
.character-panel {
	display: grid;
	gap: 0.65rem;
	min-width: 0;
}

.force-panel {
	grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
}

.force-stats,
.points {
	grid-template-columns: repeat(3, minmax(0, 1fr));
}

.points,
.character-panel {
	padding-left: clamp(0.55rem, 1.8vw, 1.3rem);
	border-left: 1px solid var(--color-rule);
}

.character-panel {
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.sheet-overview p {
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 0.34rem;
	min-width: 0;
	margin: 0;
	color: var(--color-text);
	font-size: 1.13rem;
	font-variant-numeric: tabular-nums;
	font-weight: 750;
	line-height: 1.22;
	overflow-wrap: anywhere;

	> span:first-child {
		color: var(--color-muted);
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
}

.temporary-control {
	display: inline-flex;
	align-items: center;
	gap: 0.32rem;

	strong {
		min-width: 0.85rem;
		text-align: center;
	}
}

.number-button,
.force-copy {
	min-height: 1.8rem;
	min-width: 1.8rem;
	padding: 0.15rem 0.38rem;
	font-weight: 750;
}

.content-shell {
	display: flex;
	justify-content: center;
	width: 100%;
	min-width: 0;
}

@media (max-width: 58rem) {
	.sheet-overview {
		grid-template-columns: 1fr;
	}

	.character-panel {
		padding: 0.62rem 0 0;
		border-left: 0;
		border-top: 1px solid var(--color-rule);
	}
}

@media (max-width: 38rem) {
	.sheet-header-row {
		flex-wrap: wrap;
	}

	.sheet-title {
		flex-basis: 7rem;
	}

	.sheet-actions {
		width: 100%;
		justify-content: flex-start;
	}

	.nav-list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin-top: 0.7rem;

		.item {
			min-height: 2.45rem;
			padding-inline: 0.3rem;
			font-size: 0.85rem;
		}
	}

	.force-panel {
		grid-template-columns: 1fr;
	}

	.points {
		padding: 0.62rem 0 0;
		border-left: 0;
		border-top: 1px solid var(--color-rule);
	}

	.number-button,
	.force-copy {
		min-width: 2.1rem;
		min-height: 2.1rem;
	}
}
</style>
