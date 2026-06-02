import { injectDifficultyPills } from "@/utils/difficultyInline";
import { sanitizeHtml } from "@/utils/html";

const BLOCK_TAGS = new Set([
	"article",
	"blockquote",
	"details",
	"div",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"ol",
	"p",
	"section",
	"table",
	"ul",
]);

export function formatRichText(value) {
	return sanitizeHtml(injectDifficultyPills(String(value || "")));
}

export function toParagraphHtml(content) {
	const raw = String(content || "").trim();
	if (!raw) return "";
	const sanitized = formatRichText(raw);

	if (typeof document === "undefined") return sanitized;

	const template = document.createElement("template");
	template.innerHTML = sanitized;
	const container = document.createElement("div");
	let paragraphNodes = [];

	const flushParagraph = () => {
		const hasMeaningfulContent = paragraphNodes.some((node) =>
			node.nodeType !== 3 || String(node.textContent || "").trim() !== ""
		);
		if (!hasMeaningfulContent) {
			paragraphNodes = [];
			return;
		}

		const paragraph = document.createElement("p");
		for (const node of paragraphNodes) {
			paragraph.appendChild(node);
		}
		container.appendChild(paragraph);
		paragraphNodes = [];
	};

	for (const node of Array.from(template.content.childNodes)) {
		if (node.nodeType === 1) {
			const tagName = node.tagName.toLowerCase();
			if (tagName === "br") {
				flushParagraph();
				continue;
			}

			if (BLOCK_TAGS.has(tagName)) {
				flushParagraph();
				container.appendChild(node.cloneNode(true));
				continue;
			}
		}

		paragraphNodes.push(node.cloneNode(true));
	}

	flushParagraph();
	return container.innerHTML;
}

export function normalizeHoverList(hover) {
	if (Array.isArray(hover)) return hover.map((entry) => String(entry ?? ""));
	if (hover == null) return [];
	return [String(hover)];
}

export function getDifficultyMeta(level, hover = null, andMore = false) {
	let levelTitle = "";
	let levelHover = hover;
	let parsedLevel = Number(level);
	let thisAndMore = Boolean(andMore);

	if (!Number.isNaN(parsedLevel) && parsedLevel > 10) {
		parsedLevel -= 10;
		thisAndMore = true;
	}

	if (parsedLevel === 1) {
		levelTitle = "Very Easy";
		levelHover = levelHover ?? "1-5 or 1D";
	} else if (parsedLevel === 2) {
		levelTitle = "Easy";
		levelHover = levelHover ?? "6-10 or 2D";
	} else if (parsedLevel === 3) {
		levelTitle = "Moderate";
		levelHover = levelHover ?? "11-15 or 3D-4D";
	} else if (parsedLevel === 4) {
		levelTitle = "Difficult";
		levelHover = levelHover ?? "16-20 or 5D-6D";
	} else if (parsedLevel === 5) {
		levelTitle = "Very Difficult";
		levelHover = levelHover ?? "21-30 or 7D-8D";
	} else if (parsedLevel === 6) {
		levelTitle = "Heroic";
		levelHover = levelHover ?? "31+ or 9D+";
	} else {
		return null;
	}

	if (thisAndMore) {
		levelTitle += "+";
		levelHover = String(levelHover || "").replace(" or", "+ or") + "+";
	}

	return {
		title: levelTitle,
		hover: levelHover,
	};
}
