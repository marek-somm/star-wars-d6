import { onBeforeUnmount, onMounted, ref } from "vue";
import { readJson, writeJson } from "./storage";

const STORAGE_PREFIX = "star-wars-d6:session-points:";

function storageKey(characterId, sessionId) {
	return `${STORAGE_PREFIX}${encodeURIComponent(characterId)}:${encodeURIComponent(sessionId)}`;
}

function isPointAmount(value) {
	return Number.isSafeInteger(value) && value >= 0;
}

export function useSessionPoints() {
	const savedChanges = ref(new Map());

	function getSessionPoints(characterId, sessionId) {
		const key = storageKey(characterId, sessionId);
		const value = savedChanges.value.has(key) ? savedChanges.value.get(key) : readJson(key, null);
		return isPointAmount(value) ? value : null;
	}

	function saveSessionPoints(characterId, sessionId, points) {
		if (points !== null && !isPointAmount(points)) return false;

		const key = storageKey(characterId, sessionId);
		if (!writeJson(key, points)) return false;

		savedChanges.value.set(key, points);
		return true;
	}

	function syncSessionPoints(event) {
		if (event.key === null) {
			savedChanges.value = new Map();
		} else if (event.key.startsWith(STORAGE_PREFIX)) {
			savedChanges.value.set(event.key, readJson(event.key, null));
		}
	}

	onMounted(() => window.addEventListener("storage", syncSessionPoints));
	onBeforeUnmount(() => window.removeEventListener("storage", syncSessionPoints));

	return { getSessionPoints, saveSessionPoints };
}
