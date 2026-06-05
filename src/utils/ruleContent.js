import { injectDifficultyPills } from "@/utils/difficultyInline";
import { sanitizeHtml } from "@/utils/html";

export function formatRuleRichText(value) {
	return sanitizeHtml(injectDifficultyPills(String(value || "")));
}
