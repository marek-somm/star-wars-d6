export async function copyToClipboard(value) {
	const text = String(value ?? "");

	if (
		typeof navigator !== "undefined"
		&& typeof window !== "undefined"
		&& navigator.clipboard
		&& window.isSecureContext
	) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// Fall back to the textarea path below when browser permissions block the async API.
		}
	}

	if (typeof document === "undefined") return false;

	const activeElement = document.activeElement;
	const el = document.createElement("textarea");
	el.value = text;
	el.setAttribute("readonly", "");
	el.style.position = "fixed";
	el.style.opacity = "0";
	document.body.appendChild(el);
	el.select();
	const copied = document.execCommand("copy");
	document.body.removeChild(el);

	if (activeElement && typeof activeElement.focus === "function") {
		activeElement.focus();
	}

	return copied;
}
