<template>
	<div
		ref="stage"
		class="session-sketches"
		:style="{ '--portrait-count': portraits.length }"
		aria-hidden="true"
		@pointerenter="updateHover"
		@pointerleave="updateHover"
		@pointerdown="startPress"
		@lostpointercapture="endPress"
	>
		<img
			v-for="{ id, src } in portraits"
			:key="id"
			:src="src"
			alt=""
			width="96"
			height="96"
			draggable="false"
			loading="lazy"
			decoding="async"
		/>
	</div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

defineProps({
	portraits: { type: Array, required: true },
});

const fullTurn = 2 * Math.PI;
const normalSpeed = fullTurn / 22;
const hoverSpeed = fullTurn / 48;
const pressSpeed = fullTurn / 6;
const stage = ref(null);
let hovered = false;
let pressedPointer = null;
let pressListeners;
let cleanup;

function updateHover(event) {
	if (event.pointerType !== "touch") hovered = event.type === "pointerenter";
}

function startPress(event) {
	const element = event.currentTarget;
	if (pressedPointer !== null || !event.isPrimary || event.button !== 0 || !element.classList.contains("is-orbiting")) return;
	element.setPointerCapture(event.pointerId);
	pressedPointer = event.pointerId;
	pressListeners = new AbortController();
	const options = { capture: true, signal: pressListeners.signal };
	window.addEventListener("pointerup", endPress, options);
	window.addEventListener("pointercancel", endPress, options);
	window.addEventListener("blur", clearPress, { signal: pressListeners.signal });
}

function clearPress() {
	pressedPointer = null;
	pressListeners?.abort();
	pressListeners = undefined;
}

function endPress(event) {
	if (pressedPointer !== event.pointerId) return;
	clearPress();
	if (event.pointerType !== "touch") {
		const target = document.elementFromPoint(event.clientX, event.clientY);
		hovered = event.type !== "pointercancel" && stage.value.contains(target);
	}
}

onMounted(() => {
	const element = stage.value;
	const images = Array.from(element.querySelectorAll("img"));
	if (images.length < 2) return;

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const step = fullTurn / images.length;
	let angle = 0;
	let speed = normalSpeed;
	let lastTime;
	let frame = null;
	let visible = !window.IntersectionObserver;

	function draw() {
		for (const [index, image] of images.entries()) {
			const position = angle + index * step;
			const depth = (1 + Math.cos(position)) / 2;
			image.style.setProperty("--orbit-x", Math.sin(position).toFixed(4));
			image.style.setProperty("--orbit-depth", depth.toFixed(4));
			image.style.setProperty("--orbit-layer", Math.round(depth * 100));
		}
	}

	function animate(now) {
		const elapsed = Math.min((now - (lastTime ?? now)) / 1000, 0.05);
		lastTime = now;
		let targetSpeed = hovered ? hoverSpeed : normalSpeed;
		if (pressedPointer !== null) targetSpeed = pressSpeed;
		speed += (targetSpeed - speed) * (1 - Math.exp(-4.5 * elapsed));
		angle = (angle + speed * elapsed) % fullTurn;
		draw();
		frame = window.requestAnimationFrame(animate);
	}

	function stop() {
		if (frame !== null) window.cancelAnimationFrame(frame);
		frame = null;
		lastTime = undefined;
	}

	function syncMotion() {
		element.classList.toggle("is-orbiting", !reducedMotion.matches);
		if (reducedMotion.matches || !visible) {
			stop();
		} else if (frame === null) {
			draw();
			frame = window.requestAnimationFrame(animate);
		}
	}

	const observer = window.IntersectionObserver
		? new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (!visible) hovered = false;
			syncMotion();
		}, { rootMargin: "48px" })
		: null;
	observer?.observe(element);
	reducedMotion.addEventListener("change", syncMotion);
	syncMotion();

	cleanup = () => {
		stop();
		observer?.disconnect();
		reducedMotion.removeEventListener("change", syncMotion);
	};
});

onBeforeUnmount(() => {
	clearPress();
	cleanup?.();
});
</script>

<style lang="scss" scoped>
.session-sketches {
	--portrait-overlap: 0.2;
	--span: calc(1 + (var(--portrait-count) - 1) * (1 - var(--portrait-overlap)));
	--portrait-width: calc(100% / var(--span));
	position: relative;
	isolation: isolate;
	display: flex;
	align-items: end;
	width: min(calc(100% - 1rem), calc(var(--span) * 5rem));
	height: clamp(7.25rem, 26vw, 8.35rem);
	margin: 0.7rem auto 0;
	padding-bottom: 1.85rem;

	&::before {
		content: "";
		position: absolute;
		z-index: -1;
		inset: 30% 6% 0.4rem;
		background: radial-gradient(ellipse at 50% 105%, rgba(116, 225, 255, 0.62), rgba(65, 185, 248, 0.15) 32%, transparent 75%);
		clip-path: polygon(0 0, 100% 0, 52% 100%, 48% 100%);
		mask-image: linear-gradient(transparent, #000 64%);
	}

	&::after {
		content: "";
		position: absolute;
		bottom: 0.2rem;
		left: 50%;
		width: 2.35rem;
		height: 0.44rem;
		border-radius: 50%;
		background: radial-gradient(ellipse, #dbfaff 0 8%, #73dfff 24%, rgba(92, 219, 255, 0.22) 55%, transparent 74%);
		box-shadow: 0 0 0.7rem rgba(91, 208, 255, 0.33);
		transform: translateX(-50%);
	}

	img {
		flex: 0 0 var(--portrait-width);
		width: var(--portrait-width);
		min-width: 0;
		height: auto;
		aspect-ratio: 1;
		object-fit: contain;
		opacity: 0.83;
		filter: grayscale(1) sepia(1) hue-rotate(153deg) saturate(1.55) brightness(1.16)
			drop-shadow(0 0 0.18rem rgba(101, 209, 255, 0.37));
		mask-image:
			linear-gradient(to bottom, #000 53%, rgb(0 0 0 / 32%) 100%),
			repeating-linear-gradient(to bottom, #000 0 2px, rgb(0 0 0 / 65%) 2px 3px);
		mask-composite: intersect;
	}

	&:not(.is-orbiting) img + img {
		margin-left: calc(-1 * var(--portrait-width) * var(--portrait-overlap));
	}

	&.is-orbiting {
		--span: min(4.65, calc(1.35 + (var(--portrait-count) - 1) * 0.62));
		width: min(calc(100% - 1rem), calc(var(--span) * 6rem));

		img {
			--depth: var(--orbit-depth, 0);
			position: absolute;
			z-index: var(--orbit-layer, 0);
			bottom: 1.85rem;
			left: 50%;
			opacity: calc(0.12 + var(--depth) * var(--depth) * 0.82 + var(--depth) * 0.05);
			transform: translate3d(
				calc(-50% + var(--orbit-x, 0) * (var(--span) - 1) * 46%),
				calc((var(--depth) - 0.5) * 1.45rem),
				0
			) scale(calc(0.54 + 0.61 * var(--depth)));
			transform-origin: center bottom;
		}
	}
}
</style>
