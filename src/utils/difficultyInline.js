function escapeHtml(value) {
	return String(value ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function toHoverItems(hover) {
	const raw = String(hover ?? "").trim();
	if (!raw) return [];

	return raw
		.split("||")
		.map((item) => item.trim())
		.filter(Boolean);
}

function getDifficultyMeta(level, hover = null) {
	const raw = String(level ?? "").trim();
	if (!raw) return null;

	let andMore = false;
	let normalized = raw;
	if (normalized.endsWith("+")) {
		andMore = true;
		normalized = normalized.slice(0, -1).trim();
	}

	let parsedLevel = Number(normalized);
	if (!Number.isNaN(parsedLevel) && parsedLevel > 10) {
		parsedLevel -= 10;
		andMore = true;
	}

	let title = "";
	let resolvedHover = hover ? String(hover).trim() : "";

	if (!Number.isNaN(parsedLevel)) {
		if (parsedLevel === 1) {
			title = "Very Easy";
			if (!resolvedHover) resolvedHover = "1-5 or 1D";
		} else if (parsedLevel === 2) {
			title = "Easy";
			if (!resolvedHover) resolvedHover = "6-10 or 2D";
		} else if (parsedLevel === 3) {
			title = "Moderate";
			if (!resolvedHover) resolvedHover = "11-15 or 3D-4D";
		} else if (parsedLevel === 4) {
			title = "Difficult";
			if (!resolvedHover) resolvedHover = "16-20 or 5D-6D";
		} else if (parsedLevel === 5) {
			title = "Very Difficult";
			if (!resolvedHover) resolvedHover = "21-30 or 7D-8D";
		} else if (parsedLevel === 6) {
			title = "Heroic";
			if (!resolvedHover) resolvedHover = "31+ or 9D+";
		}
	}

	if (!title) {
		const label = normalized.toLowerCase();
		if (label === "very easy") title = "Very Easy";
		else if (label === "easy") title = "Easy";
		else if (label === "moderate") title = "Moderate";
		else if (label === "difficult") title = "Difficult";
		else if (label === "very difficult") title = "Very Difficult";
		else if (label === "heroic" || label === "heroic (31+)") title = "Heroic";
	}

	if (!title) return null;

	if (andMore && !title.endsWith("+")) {
		title += "+";
		if (resolvedHover) {
			resolvedHover = resolvedHover.replace(" or", "+ or");
			if (!resolvedHover.endsWith("+")) {
				resolvedHover += "+";
			}
		}
	}

	return {
		title,
		hover: resolvedHover || null,
	};
}

export function injectDifficultyPills(value) {
	const source = String(value ?? "");
	const pattern = /\[\[\s*diff(?:iculty)?\s*:\s*([^\]|]+?)\s*(?:\|\s*([^\]]*?))?\s*\]\]/gi;

	return source.replace(pattern, (match, rawLevel, rawHover) => {
		const meta = getDifficultyMeta(rawLevel, rawHover);
		if (!meta) return match;

		const hoverItems = toHoverItems(meta.hover);
		const tooltip = hoverItems.length
			? `<span class="inline-difficulty-tooltip">${hoverItems.map((item) => `<span class="inline-difficulty-tooltip-item">${escapeHtml(item)}</span>`).join("")}</span>`
			: "";

		return `<span class="inline-difficulty"><span class="inline-difficulty-pill">${escapeHtml(meta.title)}</span>${tooltip}</span>`;
	});
}
