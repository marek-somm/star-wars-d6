export function readJson(key, fallback) {
	if (typeof window === "undefined") return fallback;

	try {
		const rawValue = window.localStorage.getItem(key);
		if (rawValue == null) return fallback;

		return JSON.parse(rawValue);
	} catch {
		return fallback;
	}
}

export function writeJson(key, value) {
	if (typeof window === "undefined") return;

	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Ignore storage quota or private-mode errors; the in-memory state is still updated.
	}
}

export function readBoolean(key, fallback = false) {
	if (typeof window === "undefined") return fallback;

	try {
		const value = window.localStorage.getItem(key);
		if (value == null) return fallback;
		return value === "true";
	} catch {
		return fallback;
	}
}

export function writeBoolean(key, value) {
	if (typeof window === "undefined") return;

	try {
		window.localStorage.setItem(key, String(Boolean(value)));
	} catch {
		// Ignore storage quota or private-mode errors; the in-memory state is still updated.
	}
}

export function readNumber(key, fallback = 0) {
	if (typeof window === "undefined") return fallback;

	try {
		const value = Number.parseInt(window.localStorage.getItem(key) || "", 10);
		return Number.isNaN(value) ? fallback : value;
	} catch {
		return fallback;
	}
}

export function writeNumber(key, value) {
	if (typeof window === "undefined") return;

	try {
		window.localStorage.setItem(key, String(value));
	} catch {
		// Ignore storage quota or private-mode errors; the in-memory state is still updated.
	}
}
