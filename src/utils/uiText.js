import { getForcePowerText } from "@/assets/power_data";
import { powerLanguageState } from "@/utils/powerLanguage";
import { formatRuleLabel } from "@/utils/rules";

export function tUi(id, replacements = {}) {
	return getForcePowerText(powerLanguageState.language, id, replacements);
}

export function getUiLanguage() {
	return powerLanguageState.language;
}

export function getRuleTypeLabel(type) {
	const key = `ui.ruleTypes.${type}`;
	const translated = tUi(key);
	return translated === key ? formatRuleLabel(type) : translated;
}
