const disclosures = new WeakMap();
const interactiveContent = "a[href], button, input, label, select, textarea, [contenteditable]:not([contenteditable='false'])";

export default {
	mounted(details) {
		const summary = details.querySelector(":scope > summary");
		if (!summary) return;

		const icon = summary.querySelector(":scope > .disclosure-icon");
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const state = { animations: [], expanded: details.open };

		function stopMotion() {
			for (const animation of state.animations) animation.cancel();
			state.animations = [];
		}

		function toggle(event) {
			if (event.defaultPrevented || event.target.closest(interactiveContent)) return;
			const isAnimating = state.animations.length > 0;
			if (!isAnimating && (reducedMotion.matches || !details.animate)) return;

			event.preventDefault();
			const expanded = !(isAnimating ? state.expanded : details.open);
			const startHeight = details.getBoundingClientRect().height;
			const startRotation = icon ? getComputedStyle(icon).transform : null;
			stopMotion();
			state.expanded = expanded;

			details.open = expanded;
			const endHeight = details.getBoundingClientRect().height;
			if (reducedMotion.matches || Math.abs(startHeight - endHeight) < 1) return;

			// Keep the content rendered until the closing animation finishes.
			details.open = true;
			const timing = { duration: 230, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "both" };
			const heightAnimation = details.animate([
				{ height: `${startHeight}px`, overflow: "hidden" },
				{ height: `${endHeight}px`, overflow: "hidden" },
			], timing);
			const animations = [heightAnimation];
			if (icon) {
				animations.push(icon.animate([
					{ transform: startRotation },
					{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" },
				], timing));
			}

			state.animations = animations;
			heightAnimation.onfinish = () => {
				if (state.animations !== animations) return;
				details.open = expanded;
				stopMotion();
			};
		}

		summary.addEventListener("click", toggle);
		disclosures.set(details, { summary, toggle, stopMotion });
	},

	beforeUnmount(details) {
		const disclosure = disclosures.get(details);
		if (!disclosure) return;

		disclosure.summary.removeEventListener("click", disclosure.toggle);
		disclosure.stopMotion();
		disclosures.delete(details);
	},
};
