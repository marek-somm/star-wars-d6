<template>
	<div class="container">
		<nav class="view-switch" aria-label="App navigation">
			<div class="view-links">
				<button
					class="view-button ui-button"
					:class="{ active: data.view === 'sheet' }"
					:aria-current="data.view === 'sheet' ? 'page' : undefined"
					type="button"
					@click="setView('sheet')"
				>
					{{ t("ui.app.view.sheet") }}
				</button>
				<button
					class="view-button ui-button"
					:class="{ active: data.view === 'wiki' }"
					:aria-current="data.view === 'wiki' ? 'page' : undefined"
					type="button"
					@click="setView('wiki')"
				>
					{{ t("ui.app.view.wiki") }}
				</button>
				<button
					class="view-button ui-button"
					:class="{ active: data.view === 'rules' }"
					:aria-current="data.view === 'rules' ? 'page' : undefined"
					type="button"
					@click="setView('rules')"
				>
					{{ t("ui.app.view.rules") }}
				</button>
				<button
					v-if="showTimeline"
					class="view-button ui-button"
					:class="{ active: data.view === 'timeline' }"
					:aria-current="data.view === 'timeline' ? 'page' : undefined"
					type="button"
					@click="setView('timeline')"
				>
					{{ t("ui.app.view.timeline") }}
				</button>
			</div>
			<PowerLanguageToggle class="global-language-toggle" />
		</nav>

		<Navbar v-if="data.view === 'sheet'" :character="selectedCharacter">
			<template #actions>
				<select v-if="characters.length > 1" class="character-selector ui-control"
					:aria-label="t('ui.app.characterSelector.aria')" :value="data.characterId"
					@change="selectCharacter($event.target.value)">
					<option v-for="character in characters" :key="character.id" :value="character.id">{{ character.name }}</option>
				</select>
				<CharacterPdfExport :character="selectedCharacter" :character-name="selectedCharacter.name" />
			</template>
			<template #tools><Dicer /></template>
		</Navbar>
		<ForceWiki v-else-if="data.view === 'wiki'" />
		<Rulebook v-else-if="data.view === 'rules'" />
		<CampaignTimeline v-else-if="showTimeline && data.view === 'timeline'" />
	</div>
</template>

<script>
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, reactive } from "vue";
import { characters, getCharacterById } from "@/assets/characters";
import CharacterPdfExport from "./CharacterPdfExport.vue";
import Dicer from "./Dicer.vue";
import Navbar from "./Navbar.vue";
import PowerLanguageToggle from "./PowerLanguageToggle.vue";
import { tUi } from "@/utils/uiText";

const CampaignTimeline = defineAsyncComponent(() => import("./CampaignTimeline.vue"));
const ForceWiki = defineAsyncComponent(() => import("./ForceWiki.vue"));
const Rulebook = defineAsyncComponent(() => import("./Rulebook.vue"));

const SHOW_TIMELINE = true;

export default {
	name: "CharacterSheets",
	components: {
		CampaignTimeline,
		CharacterPdfExport,
		Dicer,
		ForceWiki,
		Navbar,
		PowerLanguageToggle,
		Rulebook,
	},
	setup() {
		const data = reactive({
			view: "sheet",
			characterId: getCharacterById(loadCharacterId()).id,
		});
		const selectedCharacter = computed(() => getCharacterById(data.characterId));

		function parseViewFromHash() {
			if (typeof window === "undefined") return "sheet";
			const hash = String(window.location.hash || "");
			if (hash.startsWith("#/wiki")) return "wiki";
			if (hash.startsWith("#/rules")) return "rules";
			if (SHOW_TIMELINE && hash.startsWith("#/timeline")) return "timeline";
			return "sheet";
		}

		function setView(view) {
			if (view === "timeline" && !SHOW_TIMELINE) {
				view = "sheet";
			}

			data.view = view;
			if (typeof window === "undefined") return;

			const currentHash = String(window.location.hash || "");
			if (view === "wiki") {
				if (!currentHash.startsWith("#/wiki")) {
					window.location.hash = "#/wiki";
				}
				return;
			}

			if (view === "rules") {
				if (!currentHash.startsWith("#/rules")) {
					window.location.hash = "#/rules";
				}
				return;
			}

			if (view === "timeline") {
				if (!currentHash.startsWith("#/timeline")) {
					window.location.hash = "#/timeline";
				}
				return;
			}

			if (currentHash !== "#/sheet") {
				window.location.hash = "#/sheet";
			}
		}

		function loadCharacterId() {
			if (typeof window === "undefined") return "";
			return window.localStorage.getItem("star-wars-d6:selected-character") || "";
		}

		function selectCharacter(characterId) {
			const character = getCharacterById(characterId);
			data.characterId = character.id;
			if (typeof window !== "undefined") {
				window.localStorage.setItem("star-wars-d6:selected-character", character.id);
			}
		}

		function syncViewWithHash() {
			data.view = parseViewFromHash();
		}

		onMounted(() => {
			syncViewWithHash();
			if (typeof window !== "undefined") {
				window.addEventListener("hashchange", syncViewWithHash);
			}
		});

		onBeforeUnmount(() => {
			if (typeof window !== "undefined") {
				window.removeEventListener("hashchange", syncViewWithHash);
			}
		});

		return { characters, data, selectedCharacter, selectCharacter, setView, showTimeline: SHOW_TIMELINE, t: tUi };
	},
};
</script>

<style lang="scss" scoped>
.container {
	width: min(1440px, 100%);
	min-height: 100vh;
	margin: 0 auto;
	padding: 1.25rem var(--page-gutter) 3rem;
}

.view-switch {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.65rem;
	margin-bottom: 1rem;
	padding: 0.3rem;
	border: 1px solid var(--color-border-muted);
	border-radius: var(--radius-panel);
	background: var(--surface-panel-raised);
}

.view-links {
	display: flex;
	flex-wrap: wrap;
	gap: 0.22rem;
	min-width: 0;
}

.view-button {
	min-width: 0;
	min-height: 2.42rem;
	padding: 0.5rem 0.95rem;
	border-color: transparent;
	background: transparent;
	color: var(--color-muted);
	font-size: 0.89rem;
	white-space: normal;

	&:hover {
		border-color: transparent;
		background: var(--surface-hover);
	}

	&.active {
		border-color: var(--color-border);
		background: var(--surface-accent);
		color: var(--color-accent);
	}
}

.character-selector {
	min-width: 0;
	max-width: min(100%, 18rem);
	padding: 0.45rem 0.65rem;
}

@media (max-width: 35rem) {
	.container {
		padding: 0.75rem 0.7rem 2rem;
	}

	.view-switch {
		align-items: start;
		gap: 0.35rem;
	}

	.view-links {
		flex: 1 1 auto;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.view-button {
		padding: 0.4rem 0.25rem;
		font-size: 0.83rem;
	}

	.global-language-toggle {
		min-width: 2.65rem;
		justify-content: center;

		:deep(.language-label) {
			display: none;
		}
	}
}
</style>
