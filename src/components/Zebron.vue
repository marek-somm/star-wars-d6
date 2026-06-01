<template>
	<div class="container">
		<nav class="view-switch" aria-label="App navigation">
			<button
				class="view-button"
				:class="{ active: data.view === 'sheet' }"
				type="button"
				@click="setView('sheet')"
			>
				Charakter-Sheet
			</button>
			<button
				class="view-button"
				:class="{ active: data.view === 'wiki' }"
				type="button"
				@click="setView('wiki')"
			>
				Force-Wiki
			</button>
		</nav>

		<template v-if="data.view === 'sheet'">
			<Dicer />
			<CharacterPdfExport character-name="Zebron Kebino" />
			<Navbar />
		</template>
		<ForceWiki v-else />
	</div>
</template>

<script>
import { onBeforeUnmount, onMounted, reactive } from "vue";
import CharacterPdfExport from "./CharacterPdfExport.vue";
import Dicer from "./Dicer.vue";
import ForceWiki from "./ForceWiki.vue";
import Navbar from "./Navbar.vue";

export default {
	components: {
		CharacterPdfExport,
		Dicer,
		ForceWiki,
		Navbar,
	},
	setup() {
		const data = reactive({
			view: "sheet"
		});

		function parseViewFromHash() {
			if (typeof window === "undefined") return "sheet";
			const hash = String(window.location.hash || "");
			return hash.startsWith("#/wiki") ? "wiki" : "sheet";
		}

		function setView(view) {
			data.view = view;
			if (typeof window === "undefined") return;

			const currentHash = String(window.location.hash || "");
			if (view === "wiki") {
				if (!currentHash.startsWith("#/wiki")) {
					window.location.hash = "#/wiki";
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

		return { data, setView };
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
	min-height: 2.35rem;
	padding: 0.35rem 0.85rem;
	border: 1px solid rgba(244, 239, 229, 0.14);
	border-radius: var(--radius-sm);
	background: var(--color-panel-soft);
	color: var(--color-muted);
	font-weight: 800;
	cursor: pointer;

	&:hover {
		border-color: var(--color-border-strong);
		color: var(--color-text);
	}

	&.active {
		border-color: rgba(242, 193, 78, 0.68);
		background: rgba(242, 193, 78, 0.16);
		color: var(--color-accent);
	}
}

@media (max-width: 560px) {
	.container {
		padding: 0.75rem 0.7rem 2rem;
	}

	.view-button {
		flex: 1 1 calc(50% - 0.55rem);
		min-height: 2.65rem;
	}
}
</style>
