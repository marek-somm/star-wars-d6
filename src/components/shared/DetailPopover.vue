<template>
	<span class="detail-popover-anchor">
		<button v-if="lines.length" :id="triggerId" ref="trigger" class="detail-popover-trigger" type="button"
			:aria-expanded="visible" :aria-controls="visible ? panelId : undefined"
			@pointerenter="openOnHover" @pointerleave="closeAfterHover" @focusout="closeIfFocusLeaves"
			@click.stop.prevent="togglePinned">
			<slot />
		</button>
		<slot v-else />
		<Teleport to="body">
			<div v-if="visible" :id="panelId" ref="panel" class="detail-popover" role="region" tabindex="-1"
				:aria-labelledby="triggerId" @pointerenter="cancelClose" @pointerleave="closeAfterHover"
				@focusout="closeIfFocusLeaves">
				<ul>
					<li v-for="(line, index) in lines" :key="index">{{ line }}</li>
				</ul>
			</div>
		</Teleport>
	</span>
</template>

<script>
let closeActivePopover;
</script>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from "vue";
import { normalizeHoverList } from "@/utils/powerContent";

const props = defineProps({ content: { default: null } });
const lines = computed(() => normalizeHoverList(props.content));
const triggerId = useId();
const panelId = `${triggerId}-popover`;
const trigger = ref(null);
const panel = ref(null);
const visible = ref(false);
let pinned = false;
let closeTimer;
let frame;

function cancelClose() {
	window.clearTimeout(closeTimer);
}

function close() {
	if (closeActivePopover === close) closeActivePopover = undefined;
	cancelClose();
	pinned = false;
	visible.value = false;
}

function open() {
	if (closeActivePopover !== close) closeActivePopover?.();
	closeActivePopover = close;
	cancelClose();
	visible.value = true;
}

function openOnHover(event) {
	if (event.pointerType === "mouse") open();
}

function closeAfterHover(event) {
	if (event.pointerType === "mouse" && !pinned) {
		cancelClose();
		closeTimer = window.setTimeout(close, 150);
	}
}

function contains(target) {
	return trigger.value?.contains(target) || panel.value?.contains(target);
}

function closeIfFocusLeaves(event) {
	if (!contains(event.relatedTarget)) close();
}

function togglePinned(event) {
	if (pinned) {
		close();
		return;
	}

	pinned = true;
	open();
	if (event.detail === 0) nextTick(() => panel.value?.focus({ preventScroll: true }));
}

function closeOnOutsideClick(event) {
	if (!contains(event.target)) close();
}

function closeOnEscape(event) {
	if (event.key !== "Escape" || event.defaultPrevented) return;

	if (panel.value?.contains(document.activeElement)) trigger.value?.focus({ preventScroll: true });
	event.preventDefault();
	close();
}

function positionPanel() {
	frame = undefined;
	const popup = panel.value;
	const anchor = trigger.value;
	if (!popup || !anchor) return;

	const viewport = window.visualViewport;
	const leftEdge = viewport?.offsetLeft ?? 0;
	const topEdge = viewport?.offsetTop ?? 0;
	const width = viewport?.width ?? document.documentElement.clientWidth;
	const height = viewport?.height ?? document.documentElement.clientHeight;
	const rect = anchor.getBoundingClientRect();
	if (!rect.width || !rect.height || rect.bottom <= topEdge || rect.top >= topEdge + height
		|| rect.right <= leftEdge || rect.left >= leftEdge + width) {
		close();
		return;
	}

	const margin = 12;
	const gap = 6;
	const topLimit = topEdge + margin;
	const bottomLimit = topEdge + height - margin;
	popup.style.maxWidth = `${Math.max(0, width - 2 * margin)}px`;

	const naturalHeight = popup.scrollHeight + popup.offsetHeight - popup.clientHeight;
	const below = bottomLimit - rect.bottom - gap;
	const above = rect.top - gap - topLimit;
	const placeAbove = below < naturalHeight && above > below;
	const maxHeight = Math.max(placeAbove ? above : below, Math.min(64, bottomLimit - topLimit));
	popup.style.maxHeight = `${maxHeight}px`;

	const left = Math.max(leftEdge + margin, Math.min(rect.left, leftEdge + width - margin - popup.offsetWidth));
	const top = placeAbove ? rect.top - gap - popup.offsetHeight : rect.bottom + gap;
	popup.style.left = `${left}px`;
	popup.style.top = `${Math.max(topLimit, Math.min(top, bottomLimit - popup.offsetHeight))}px`;
	popup.style.visibility = "visible";
}

function schedulePosition() {
	if (frame == null) frame = window.requestAnimationFrame(positionPanel);
}

watch(visible, (isOpen, _, onCleanup) => {
	if (!isOpen) return;

	const anchor = trigger.value;
	if (!anchor || !panel.value) {
		close();
		return;
	}
	positionPanel();
	if (!visible.value) return;

	const viewport = window.visualViewport;
	window.addEventListener("scroll", schedulePosition, { capture: true, passive: true });
	window.addEventListener("resize", schedulePosition);
	viewport?.addEventListener("scroll", schedulePosition);
	viewport?.addEventListener("resize", schedulePosition);
	document.addEventListener("pointerdown", closeOnOutsideClick, true);
	document.addEventListener("keydown", closeOnEscape);
	const anchorObserver = new IntersectionObserver(([entry]) => {
		if (!entry.isIntersecting) close();
	});
	anchorObserver.observe(anchor);

	onCleanup(() => {
		window.removeEventListener("scroll", schedulePosition, true);
		window.removeEventListener("resize", schedulePosition);
		viewport?.removeEventListener("scroll", schedulePosition);
		viewport?.removeEventListener("resize", schedulePosition);
		document.removeEventListener("pointerdown", closeOnOutsideClick, true);
		document.removeEventListener("keydown", closeOnEscape);
		anchorObserver.disconnect();
		window.cancelAnimationFrame(frame);
		frame = undefined;
	});
}, { flush: "post" });

watch(() => lines.value.join("\n"), close);
onBeforeUnmount(close);
</script>

<style scoped>
.detail-popover-anchor,
.detail-popover-trigger {
	display: inline-flex;
	align-items: center;
	min-width: 0;
}

.detail-popover-trigger {
	padding: 0;
	border: 0;
	border-radius: var(--radius-sm);
	background: transparent;
	font: inherit;
	text-align: inherit;
	cursor: help;
}

.detail-popover {
	position: fixed;
	inset: 0 auto auto 0;
	z-index: 9;
	width: 22rem;
	padding: 0.5rem 0.7rem;
	overflow: auto;
	overscroll-behavior: contain;
	scrollbar-width: thin;
	visibility: hidden;
	border: 1px solid var(--color-border-muted);
	border-radius: var(--radius-sm);
	background: var(--color-tooltip);
	box-shadow: var(--shadow-panel);
	color: var(--color-muted);
	font-size: 0.82rem;
	font-weight: 750;
	line-height: 1.4;
	white-space: normal;
	overflow-wrap: anywhere;
}

.detail-popover ul {
	margin: 0;
	padding: 0;
	list-style: none;
}

.detail-popover li + li {
	margin-top: 0.3rem;
}
</style>
