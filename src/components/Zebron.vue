<template>
	<div class="container">
		<nav class="view-switch" aria-label="App navigation">
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
		</nav>

		<template v-if="data.view === 'sheet'">
			<Dicer />
			<CharacterPdfExport character-name="Zebron Kebino" />
			<Navbar />
		</template>
		<ForceWiki v-else-if="data.view === 'wiki'" />
		<Rulebook v-else-if="data.view === 'rules'" />
		<CampaignTimeline v-else-if="showTimeline && data.view === 'timeline'" />
	</div>
</template>

<script>
import { onBeforeUnmount, onMounted, reactive } from "vue";
import CampaignTimeline from "./CampaignTimeline.vue";
import CharacterPdfExport from "./CharacterPdfExport.vue";
import Dicer from "./Dicer.vue";
import ForceWiki from "./ForceWiki.vue";
import Navbar from "./Navbar.vue";
import Rulebook from "./Rulebook.vue";

const SHOW_TIMELINE = true;

export default {
	components: {
		CampaignTimeline,
		CharacterPdfExport,
		Dicer,
		ForceWiki,
		Navbar,
		Rulebook,
	},
	setup() {
		const data = reactive({
			view: "sheet"
		});

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

		return { data, setView, showTimeline: SHOW_TIMELINE };
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
	gap: 0.55rem;
	margin-bottom: 0.95rem;
}

.view-button {
	min-width: 0;
	padding: 0.35rem 0.85rem;
	color: var(--color-muted);
	white-space: normal;

	&:hover {
		color: var(--color-text);
	}

	&.active {
		color: var(--color-accent);
	}
}

@media (max-width: 560px) {
	.container {
		padding: 0.75rem 0.7rem 2rem;
	}

	.view-switch {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
		width: 100%;
	}

	.view-button {
		width: 100%;
		min-height: 2.65rem;
	}
}
</style>
