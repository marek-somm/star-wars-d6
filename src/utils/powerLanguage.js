import { reactive } from "vue";
import { defaultPowerLanguage, getForcePowerLanguage, forcePowerLanguages } from "@/assets/power_data";
import { readJson, writeJson } from "@/utils/storage";

const POWER_LANGUAGE_STORAGE_KEY = "star-wars-d6:power-language";
const LEGACY_WIKI_POWER_LANGUAGE_STORAGE_KEY = "star-wars-d6:wiki-power-language";

function normalizePowerLanguage(code) {
	return getForcePowerLanguage(code)?.code || defaultPowerLanguage;
}

function loadPowerLanguage() {
	const saved = readJson(POWER_LANGUAGE_STORAGE_KEY, null);
	if (typeof saved === "string") return normalizePowerLanguage(saved);

	const legacySaved = readJson(LEGACY_WIKI_POWER_LANGUAGE_STORAGE_KEY, null);
	if (typeof legacySaved === "string") return normalizePowerLanguage(legacySaved);

	return defaultPowerLanguage;
}

export const powerLanguageState = reactive({
	language: loadPowerLanguage(),
});

export function getPowerLanguages() {
	return forcePowerLanguages.map((language) => ({ ...language }));
}

export function getCurrentPowerLanguage() {
	return normalizePowerLanguage(powerLanguageState.language);
}

export function setPowerLanguage(code) {
	const language = normalizePowerLanguage(code);
	powerLanguageState.language = language;
	writeJson(POWER_LANGUAGE_STORAGE_KEY, language);
}

export function cyclePowerLanguage() {
	const languages = getPowerLanguages();
	if (languages.length === 0) return getCurrentPowerLanguage();

	const currentIndex = languages.findIndex((language) => language.code === getCurrentPowerLanguage());
	const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % languages.length : 0;
	setPowerLanguage(languages[nextIndex].code);
	return getCurrentPowerLanguage();
}
