<template>
	<div class="reference-layout" :class="{ 'is-collapsed': collapsed }" @keydown.esc="closeDrawer">
		<MobileDrawerToggle
			ref="drawerToggle"
			:is-open="drawerVisible"
			:current-title="selectedTitle"
			:fallback-title="fallbackTitle"
			:count-label="browseLabel"
			:controls="panelId"
			@open="drawerOpen = true"
		/>
		<MobileDrawerBackdrop v-if="drawerVisible" :aria-label="closeLabel" @close="closeDrawer" />

		<div class="reference-layout__track">
			<aside :id="panelId" class="reference-layout__sidebar ui-panel" :class="{ 'is-drawer-open': drawerVisible }"
				:aria-label="heading" :inert="!desktop && !drawerVisible">
				<button class="reference-layout__toggle ui-button" type="button"
					:aria-expanded="!collapsed" :aria-controls="`${panelId}-content`" :aria-label="toggleLabel"
					:title="toggleLabel" @click="collapsed = !collapsed">
					<span class="reference-layout__chevron" aria-hidden="true"></span>
				</button>
				<div :id="`${panelId}-content`" class="reference-layout__surface" :inert="desktop && collapsed">
					<header class="reference-layout__heading" :class="{ 'has-eyebrow': eyebrow }">
						<div>
							<p v-if="eyebrow">{{ eyebrow }}</p>
							<h2>{{ heading }}</h2>
						</div>
						<span class="ui-count">{{ count }}</span>
						<button ref="drawerClose" class="reference-layout__close ui-button" type="button" @click="closeDrawer">
							{{ closeLabel }}
						</button>
					</header>
					<div v-if="$slots['drawer-filters']" class="reference-layout__filters">
						<slot name="drawer-filters" />
					</div>
					<div class="reference-layout__scroll">
						<slot name="index" />
					</div>
				</div>
			</aside>
		</div>

		<div class="reference-layout__detail">
			<slot />
		</div>
	</div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import MobileDrawerBackdrop from "./MobileDrawerBackdrop.vue";
import MobileDrawerToggle from "./MobileDrawerToggle.vue";

const props = defineProps({
	panelId: { type: String, required: true },
	heading: { type: String, required: true },
	eyebrow: { type: String, default: "" },
	count: { type: [Number, String], required: true },
	selectedTitle: { type: String, default: "" },
	fallbackTitle: { type: String, required: true },
	browseLabel: { type: String, required: true },
	expandLabel: { type: String, required: true },
	collapseLabel: { type: String, required: true },
	closeLabel: { type: String, required: true },
});

const collapsed = defineModel("collapsed", { type: Boolean, required: true });
const drawerOpen = defineModel("drawerOpen", { type: Boolean, required: true });
const desktop = ref(false);
const drawerToggle = ref(null);
const drawerClose = ref(null);
const drawerVisible = computed(() => !desktop.value && drawerOpen.value);
const toggleLabel = computed(() => collapsed.value ? props.expandLabel : props.collapseLabel);
let desktopQuery;

function closeDrawer() {
	drawerOpen.value = false;
}

function updateViewport() {
	desktop.value = desktopQuery.matches;
	if (desktop.value) closeDrawer();
}

watch(drawerVisible, (visible) => {
	document.body.classList.toggle("mobile-drawer-open", visible);
	if (visible) drawerClose.value?.focus({ preventScroll: true });
	else if (!desktop.value) drawerToggle.value?.$el.focus({ preventScroll: true });
}, { flush: "post" });

onMounted(() => {
	desktopQuery = window.matchMedia("(min-width: 981px)");
	updateViewport();
	desktopQuery.addEventListener("change", updateViewport);
});

onBeforeUnmount(() => {
	desktopQuery?.removeEventListener("change", updateViewport);
	if (drawerVisible.value) document.body.classList.remove("mobile-drawer-open");
});
</script>

<style scoped lang="scss">
.reference-layout {
	--sidebar-gutter: 1rem;
	--sidebar-collapsed-width: 2.75rem;
	--sidebar-toggle-size: 2rem;
	--sidebar-duration: 260ms;

	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 0.8rem;
	min-width: 0;
}

.reference-layout__detail {
	min-width: 0;
}

.reference-layout__track {
	display: contents;
}

.reference-layout__sidebar {
	position: fixed;
	inset: auto 0 0;
	z-index: 11;
	block-size: calc(100dvh - var(--sidebar-gutter) - env(safe-area-inset-top));
	border-radius: var(--radius-panel) var(--radius-panel) 0 0;
	transform: translateY(105%);
	visibility: hidden;
	transition: transform 220ms ease, visibility 0s linear 220ms;

	&.is-drawer-open {
		transform: translateY(0);
		visibility: visible;
		transition-delay: 0s;
	}
}

.reference-layout__toggle {
	display: none;
}

.reference-layout__surface {
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	block-size: 100%;
	padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
	overflow: hidden;
}

.reference-layout__heading {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	flex: 0 0 auto;
	min-block-size: 2rem;

	> div {
		flex: 1;
		min-width: 0;
	}

	h2,
	p {
		margin: 0;
	}

	h2 {
		color: var(--color-muted);
		font-size: 0.72rem;
		font-weight: 850;
		text-transform: uppercase;
	}

	p {
		margin-bottom: 0.2rem;
		color: var(--color-cyan);
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	&.has-eyebrow h2 {
		color: var(--color-text);
		font-size: 1.6rem;
		line-height: 1.1;
		text-transform: none;
	}

	.ui-count {
		min-width: 2.05rem;
		padding-inline: 0.45rem;
		white-space: nowrap;
	}
}

.reference-layout__close {
	color: var(--color-muted);
	font-size: 0.82rem;
}

.reference-layout__filters {
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	flex: 0 0 auto;
}

.reference-layout__scroll {
	flex: 1 1 auto;
	min-block-size: 0;
	padding: 0.1rem 0.25rem 0.25rem 0;
	overflow: auto;
	scrollbar-color: rgba(242, 193, 78, 0.52) rgba(244, 239, 229, 0.06);
	scrollbar-width: thin;
}

@media (width < 981px) and (max-height: 32rem) {
	.reference-layout__surface {
		overflow: auto;
	}

	.reference-layout__scroll {
		flex: 0 0 auto;
		overflow: visible;
	}
}

@media (min-width: 981px) {
	.reference-layout {
		grid-template-columns: minmax(0, clamp(16rem, 25%, 20rem)) minmax(0, 1fr);
		align-items: stretch;
		gap: 1rem;
		transition: grid-template-columns var(--sidebar-duration) ease;

		&.is-collapsed {
			grid-template-columns: minmax(0, var(--sidebar-collapsed-width)) minmax(0, 1fr);
		}
	}

	.reference-layout__detail {
		min-block-size: var(--sidebar-collapsed-width);
	}

	.reference-layout__track {
		display: block;
		// Let the detail column set the row height and bound the sticky sidebar.
		contain: size;
		min-width: 0;
	}

	.reference-layout__sidebar {
		position: sticky;
		inset: var(--sidebar-gutter) auto auto;
		z-index: auto;
		block-size: min(100%, calc(100dvh - 2 * var(--sidebar-gutter)));
		border-radius: var(--radius-panel);
		transform: none;
		visibility: visible;
		transition: none;
	}

	.reference-layout__surface {
		padding: 0.9rem;
		transition: opacity 150ms ease 80ms, visibility 0s linear;
	}

	.reference-layout__heading {
		padding-right: 2.5rem;
	}

	.reference-layout__close,
	.reference-layout__filters {
		display: none;
	}

	.reference-layout__toggle {
		position: absolute;
		inset: 0.75rem 0.65rem auto auto;
		z-index: 1;
		display: inline-flex;
		inline-size: var(--sidebar-toggle-size);
		block-size: var(--sidebar-toggle-size);
		min-height: 0;
		padding: 0;
		border-color: var(--color-border);
		background: var(--color-panel-soft);
		color: var(--color-accent);
		transition: right var(--sidebar-duration) ease, background 180ms ease, border-color 180ms ease;

		&:hover {
			border-color: var(--color-border-strong);
			background: var(--surface-accent);
		}
	}

	.reference-layout__chevron {
		inline-size: 0.5rem;
		block-size: 0.5rem;
		border: solid currentColor;
		border-width: 0 2px 2px 0;
		transform: translateX(0.12rem) rotate(135deg);
		transition: transform var(--sidebar-duration) ease;
	}

	.is-collapsed {
		.reference-layout__surface {
			opacity: 0;
			visibility: hidden;
			transition: opacity 120ms ease, visibility 0s linear 120ms;
		}

		.reference-layout__toggle {
			right: calc((var(--sidebar-collapsed-width) - var(--sidebar-toggle-size)) / 2 - 1px);
		}

		.reference-layout__chevron {
			transform: translateX(-0.12rem) rotate(-45deg);
		}
	}
}

@media (prefers-reduced-motion: reduce) {
	.reference-layout,
	.reference-layout__sidebar,
	.reference-layout__surface,
	.is-collapsed .reference-layout__surface,
	.reference-layout__toggle,
	.reference-layout__chevron {
		transition: none;
	}
}
</style>
