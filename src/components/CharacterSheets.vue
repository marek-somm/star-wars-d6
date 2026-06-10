<template>
	<div class="container">
		<nav class="view-switch" aria-label="App navigation">
			<div class="view-links">
				<button
					class="view-button ui-button"
					:class="{ active: data.view === 'sheet' }"
					type="button"
					@click="setView('sheet')"
				>
					Charakter-Sheet
				</button>
				<button
					class="view-button ui-button"
					:class="{ active: data.view === 'wiki' }"
					type="button"
					@click="setView('wiki')"
				>
					Force-Wiki
				</button>
				<button
					class="view-button ui-button"
					:class="{ active: data.view === 'rules' }"
					type="button"
					@click="setView('rules')"
				>
					Regeln
				</button>
				<button
					v-if="showTimeline"
					class="view-button ui-button"
					:class="{ active: data.view === 'timeline' }"
					type="button"
					@click="setView('timeline')"
				>
					Zeitstrahl
				</button>
			</div>
			<PowerLanguageToggle class="global-language-toggle" />
		</nav>

		<template v-if="data.view === 'sheet'">
			<Dicer />
			<section class="character-selector ui-panel" aria-label="Character selection">
				<div>
					<p class="selector-eyebrow">Character Sheets</p>
					<h2>{{ selectedCharacter.name }}</h2>
				</div>
				<div class="character-list" role="list">
					<button
						class="character-button ui-button"
						:class="{ active: character.id === data.characterId }"
						type="button"
						v-for="character in characters"
						:key="character.id"
						@click="selectCharacter(character.id)"
					>
						{{ character.name }}
					</button>
				</div>
			</section>
			<CharacterPdfExport :character="selectedCharacter" :character-name="selectedCharacter.name" />
			<Navbar :character="selectedCharacter" />
		</template>
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

		return { characters, data, selectedCharacter, selectCharacter, setView, showTimeline: SHOW_TIMELINE };
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
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 0.55rem;
	margin-bottom: 0.95rem;
}

.view-links {
	display: flex;
	flex-wrap: wrap;
	gap: 0.55rem;
}

.global-language-toggle {
	flex: 0 0 auto;
}

.view-button {
	min-width: 0;
	padding: 0.45rem 0.9rem;
	border-color: var(--color-border-muted);
	background: var(--surface-panel-raised);
	color: var(--color-muted);
	font-weight: 900;
	white-space: normal;

	&:hover {
		border-color: var(--color-border-strong);
		color: var(--color-text);
	}

	&.active {
		border-color: rgba(242, 193, 78, 0.68);
		background: var(--surface-accent);
		color: var(--color-accent);
	}
}

.character-selector {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	width: 100%;
	margin: 0.75rem 0 0;
	padding: 1rem;
}

.selector-eyebrow {
	margin: 0 0 0.25rem;
	color: var(--color-cyan);
	font-size: 0.72rem;
	font-weight: 900;
	letter-spacing: 0;
	text-transform: uppercase;
}

.character-selector h2 {
	margin: 0;
	color: var(--color-text);
	font-size: 1.45rem;
	line-height: 1.1;
}

.character-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-end;
	gap: 0.45rem;
	min-width: min(28rem, 100%);
}

.character-button {
	min-width: 0;
	padding: 0.4rem 0.85rem;
	border-color: var(--color-border-muted);
	background: var(--surface-control);
	color: var(--color-muted);

	&:hover {
		border-color: var(--color-border-strong);
		color: var(--color-text);
	}

	&.active {
		border-color: rgba(242, 193, 78, 0.64);
		background: var(--surface-accent);
		color: var(--color-accent);
	}
}

@media (max-width: 560px) {
	.container {
		padding: 0.75rem 0.7rem 2rem;
	}

	.view-switch {
		display: grid;
		grid-template-columns: 1fr auto;
		width: 100%;
	}

	.view-links {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
	}

	.view-button {
		width: 100%;
		min-height: 2.65rem;
	}

	.global-language-toggle {
		align-self: stretch;
		justify-content: center;
		width: 4.15rem;
		min-height: 2.65rem;

		:deep(.language-label) {
			display: none;
		}
	}

	.character-selector {
		align-items: stretch;
		flex-direction: column;
		margin-top: 0.75rem;
	}

	.character-list {
		display: grid;
		grid-template-columns: 1fr;
		justify-content: stretch;
		min-width: 0;
	}

	.character-button {
		width: 100%;
		min-height: 2.65rem;
	}
}
</style>
