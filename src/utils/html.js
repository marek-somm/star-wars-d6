const ALLOWED_TAGS = new Set([
	"b",
	"br",
	"div",
	"em",
	"i",
	"li",
	"ol",
	"p",
	"span",
	"strong",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"tr",
	"u",
	"ul",
]);

const ALLOWED_ATTRIBUTES = new Set([
	"colspan",
	"rowspan",
	"title",
]);

function escapeHtml(value) {
	return String(value ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function unwrapNode(node) {
	while (node.firstChild) {
		node.parentNode.insertBefore(node.firstChild, node);
	}
	node.remove();
}

function sanitizeNode(node) {
	if (node.nodeType === 3) return;

	if (node.nodeType !== 1) {
		node.remove();
		return;
	}

	const tagName = node.tagName.toLowerCase();
	if (!ALLOWED_TAGS.has(tagName)) {
		Array.from(node.childNodes).forEach(sanitizeNode);
		unwrapNode(node);
		return;
	}

	Array.from(node.attributes).forEach((attribute) => {
		if (!ALLOWED_ATTRIBUTES.has(attribute.name.toLowerCase())) {
			node.removeAttribute(attribute.name);
		}
	});

	Array.from(node.childNodes).forEach(sanitizeNode);
}

export function sanitizeHtml(value) {
	if (value == null) return "";
	if (typeof document === "undefined") return escapeHtml(value);

	const template = document.createElement("template");
	template.innerHTML = String(value);
	Array.from(template.content.childNodes).forEach(sanitizeNode);
	return template.innerHTML;
}
