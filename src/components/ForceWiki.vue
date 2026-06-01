<template>
	<section class="wiki">
		<header class="wiki-header">
			<div>
				<p class="eyebrow">Force Powers</p>
				<h1>Reference</h1>
			</div>
			<div class="header-meta">
				<input v-model.trim="data.search" class="search" type="search" placeholder="Search powers"
					aria-label="Search powers">
				<p class="count">{{ filteredSkills.length }} / {{ allSkills.length }}</p>
			</div>
		</header>

		<div class="wiki-layout">
			<aside class="wiki-index">
				<div class="index-group" v-for="group in groupedSkills" :key="group.letter">
					<h2>{{ group.letter }}</h2>
					<button v-for="skill in group.skills" :key="skill.id || skill.name" class="index-item"
						:class="{ active: isCurrentSkill(skill) }" type="button" @click="showSkill(skill)">
						{{ skill.name }}
					</button>
				</div>
				<p class="empty" v-if="groupedSkills.length === 0">No powers found.</p>
			</aside>

			<article class="wiki-entry" v-if="data.currentSkill">
				<header class="entry-header">
					<h2>{{ data.currentSkill.name }}</h2>
					<div class="meta">
						<span class="pill" v-for="power in data.currentSkill.powers" :key="power">
							{{ PowerName[power] }}
						</span>
					</div>
				</header>

				<p class="summary" v-if="data.currentSkill.summary" v-html="getSummaryHtml()"></p>

				<div class="required" v-if="data.currentSkill.hasRequiredSkills()">
					<span class="required-label">Requirements</span>
					<ul>
						<li v-for="requiredSkill in data.currentSkill.required"
							:key="requiredSkill.id || requiredSkill.name">
							<button type="button" @click="showSkill(requiredSkill)">{{ requiredSkill.name }}</button>
						</li>
					</ul>
				</div>

				<section class="content" v-if="contentBlocks.length > 0">
					<template v-for="(block, index) in contentBlocks" :key="index">
						<details
							v-if="block.type === 'example'"
							class="block example"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
						>
							<summary>Example</summary>
							<div v-html="formatBlockHtml(block.text)"></div>
						</details>
						<div
							v-else-if="block.type === 'note'"
							class="block note"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
						>
							<p class="note-label">Note</p>
							<div v-html="formatBlockHtml(block.text)"></div>
						</div>
						<div
							v-else-if="block.type === 'warning'"
							class="block warning"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
						>
							<p class="warning-label">Warning</p>
							<div v-html="formatBlockHtml(block.text)"></div>
						</div>
						<div
							v-else
							class="block"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
							v-html="formatBlockHtml(block.text)"
						></div>
					</template>
				</section>

				<section class="difficulty">
					<h3>Rules</h3>
					<Difficulty :skill="data.currentSkill" />
				</section>
			</article>
		</div>
	</section>
</template>

<script>
import { createPowerSkills } from "@/assets/data";
import { PowerName } from "@/assets/powers";
import Difficulty from "./Zebron Kebino/Powers/Difficulty.vue";
import { sanitizeHtml } from "@/utils/html";

function normalizeSkillName(name) {
	return String(name || "")
		.toLowerCase()
		.replace(/[\u2019']/g, "")
		.replace(/\u00e2\u20ac\u2122/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

function normalizeSearchTerm(value) {
	const normalized = String(value || "").toLowerCase().trim();
	return normalized === "altar" ? "alter" : normalized;
}

function getSkillIdFromHash() {
	if (typeof window === "undefined") return "";
	const hash = String(window.location.hash || "");
	const match = hash.match(/^#\/wiki\/([^/?#]+)/i);
	if (!match?.[1]) return "";

	try {
		return decodeURIComponent(match[1]);
	} catch {
		return match[1];
	}
}

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

export default {
	components: {
		Difficulty
	},
	data() {
		return {
			PowerName,
			allSkills: [],
			data: {
				search: "",
				currentSkill: null
			}
		};
	},
	created() {
		const allSkills = createPowerSkills()
			.sort((a, b) => String(a.name).localeCompare(String(b.name)));

		this.allSkills = allSkills;
		this.selectSkillFromHash();
		if (!this.data.currentSkill) {
			this.showSkill(allSkills[0], false);
		}
	},
	mounted() {
		if (typeof window !== "undefined") {
			window.addEventListener("hashchange", this.selectSkillFromHash);
		}
	},
	beforeUnmount() {
		if (typeof window !== "undefined") {
			window.removeEventListener("hashchange", this.selectSkillFromHash);
		}
	},
	computed: {
		filteredSkills() {
			const search = normalizeSearchTerm(this.data.search);
			if (!search) return this.allSkills;

			return this.allSkills.filter((skill) => {
				const name = String(skill.name || "").toLowerCase();
				const summary = String(skill.summary || "").toLowerCase();
				const powers = Array.isArray(skill.powers) ? skill.powers : [];
				const powerMatches = powers.some((power) => {
					const key = String(power || "").toLowerCase();
					const label = String(this.PowerName[power] || "").toLowerCase();
					return key.includes(search) || label.includes(search);
				});

				return name.includes(search) || summary.includes(search) || powerMatches;
			});
		},

		groupedSkills() {
			const groups = new Map();

			for (const skill of this.filteredSkills) {
				const firstChar = String(skill.name || "").charAt(0).toUpperCase();
				const letter = /[A-Z]/.test(firstChar) ? firstChar : "#";

				if (!groups.has(letter)) groups.set(letter, []);
				groups.get(letter).push(skill);
			}

			return [...groups.entries()].map(([letter, skills]) => ({ letter, skills }));
		},

		contentBlocks() {
			if (Array.isArray(this.data.currentSkill?.contentBlocks)) {
				return this.data.currentSkill.contentBlocks;
			}
			return [];
		}
	},
	methods: {
		sanitizeHtml,

		getSummaryHtml() {
			const summary = String(this.data.currentSkill?.summary || "");
			const search = String(this.data.search || "").trim();
			if (!search) return this.toParagraphHtml(summary);

			const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const pattern = new RegExp(`(${escaped})`, "ig");
			return this.toParagraphHtml(summary.replace(pattern, "<mark>$1</mark>"));
		},

		formatBlockHtml(text) {
			return this.toParagraphHtml(String(text || ""));
		},

		toParagraphHtml(content) {
			const raw = String(content || "").trim();
			if (!raw) return "";
			const sanitized = sanitizeHtml(raw);

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
		},

		shouldRenderDivider(index, blocks) {
			if (!Array.isArray(blocks) || index <= 0) return false;

			const currentType = String(blocks[index]?.type || "").toLowerCase();
			if (currentType === "note" || currentType === "warning") return false;

			const previousType = String(blocks[index - 1]?.type || "").toLowerCase();
			const previousIsSpecial = previousType === "note" || previousType === "warning";
			if (previousIsSpecial) {
				return index - 1 > 0;
			}

			return true;
		},

		showSkill(skill, updateHash = true) {
			const target = this.allSkills.find((entry) => entry.id === skill.id)
				|| this.allSkills.find((entry) => normalizeSkillName(entry.name) === normalizeSkillName(skill.name));
			this.data.currentSkill = target || this.data.currentSkill;

			if (updateHash && this.data.currentSkill?.id) {
				this.updateHashForSkill(this.data.currentSkill.id);
			}
		},

		selectSkillFromHash() {
			const skillId = getSkillIdFromHash();
			if (!skillId) return;

			const target = this.allSkills.find((skill) => skill.id === skillId);
			if (target) {
				this.showSkill(target, false);
			}
		},

		updateHashForSkill(skillId) {
			if (typeof window === "undefined" || !skillId) return;

			const nextHash = `#/wiki/${encodeURIComponent(skillId)}`;
			if (window.location.hash !== nextHash) {
				window.location.hash = nextHash;
			}
		},

		isCurrentSkill(skill) {
			if (!this.data.currentSkill || !skill) return false;
			if (this.data.currentSkill.id && skill.id) return this.data.currentSkill.id === skill.id;
			return normalizeSkillName(this.data.currentSkill.name) === normalizeSkillName(skill.name);
		},

	},
	watch: {
		filteredSkills(list) {
			if (list.length === 0) {
				this.data.currentSkill = null;
				return;
			}

			if (!this.data.currentSkill || !list.some((skill) => this.isCurrentSkill(skill))) {
				this.showSkill(list[0], false);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.wiki {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.wiki-header {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 1.2rem;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-panel);
	box-shadow: var(--shadow-panel);

	.eyebrow {
		margin: 0 0 0.35rem;
		color: var(--color-cyan);
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
	}

	.header-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.search {
		min-height: 2.5rem;
		min-width: min(22rem, 56vw);
		padding: 0.5rem 0.65rem;
		border: 1px solid rgba(244, 239, 229, 0.12);
		border-radius: var(--radius-sm);
		background: var(--color-panel-soft);
		color: var(--color-text);
	}

	.count {
		margin: 0;
		min-width: 5rem;
		text-align: center;
		padding: 0.45rem 0.55rem;
		border: 1px solid rgba(103, 213, 200, 0.28);
		border-radius: var(--radius-sm);
		color: var(--color-cyan);
		font-weight: 800;
	}
}

.wiki-layout {
	display: grid;
	grid-template-columns: minmax(14rem, 19rem) minmax(0, 1fr);
	gap: 1rem;
}

.wiki-index,
.wiki-entry {
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-panel);
	box-shadow: var(--shadow-panel);
}

.wiki-index {
	position: sticky;
	top: 1rem;
	max-height: calc(100vh - 2rem);
	overflow: auto;
	padding: 0.9rem;

	.index-group+.index-group {
		margin-top: 0.9rem;
	}

	h2 {
		margin: 0 0 0.3rem;
		color: var(--color-accent);
		font-size: 0.8rem;
	}

	.index-item {
		width: 100%;
		min-height: 2.2rem;
		margin-top: 0.25rem;
		padding: 0.35rem 0.55rem;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--color-muted);
		font-weight: 700;
		text-align: left;
		cursor: pointer;

		&:hover {
			border-color: rgba(244, 239, 229, 0.18);
			color: var(--color-text);
		}

		&.active {
			border-color: rgba(242, 193, 78, 0.48);
			background: rgba(242, 193, 78, 0.12);
			color: var(--color-accent);
		}
	}

	.empty {
		margin: 0.2rem 0 0;
		color: var(--color-muted);
	}
}

.wiki-entry {
	padding: 1.2rem;
	min-width: 0;
}

.entry-header {
	padding-bottom: 0.9rem;
	margin-bottom: 0.9rem;
	border-bottom: 1px solid rgba(244, 239, 229, 0.1);

	h2 {
		margin: 0;
		font-size: 2.05rem;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.65rem;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		min-height: 1.6rem;
		padding: 0.2rem 0.5rem;
		border: 1px solid rgba(242, 193, 78, 0.36);
		border-radius: var(--radius-sm);
		background: rgba(242, 193, 78, 0.1);
		color: var(--color-accent);
		font-size: 0.78rem;
		font-weight: 800;
	}
}

.summary {
	margin: 0 0 1rem;
	font-size: 1rem;
	line-height: 1.6;
	font-weight: 800;
}

:deep(mark) {
	background: rgba(103, 213, 200, 0.28);
	color: var(--color-text);
	padding: 0 0.15rem;
	border-radius: 2px;
}

.required {
	margin: 0 0 1rem;

	.required-label {
		font-size: 0.74rem;
		font-weight: 800;
		color: var(--color-muted);
		text-transform: uppercase;
	}

	ul {
		margin: 0.45rem 0 0;
		padding-left: 1rem;
	}

	li {
		margin: 0.25rem 0;
	}

	button {
		border: 0;
		background: transparent;
		color: var(--color-cyan);
		text-decoration: underline;
		cursor: pointer;
		padding: 0;
	}
}

.content {
	.block.with-divider {
		margin-top: 0.95rem;
		padding-top: 0.95rem;
		border-top: 1px solid rgba(244, 239, 229, 0.1);
	}

	.block {
		line-height: 1.6;
		color: var(--color-muted);

		:deep(p) {
			margin: 0;
		}

		:deep(p + p) {
			margin-top: 0.5rem;
		}

	}

	.note {
		padding: 0.75rem 0.85rem;
		border: 1px solid rgba(103, 213, 200, 0.34);
		border-radius: var(--radius-sm);
		background: rgba(103, 213, 200, 0.08);
		margin-top: 0.95rem;
		margin-inline: 0.45rem;

		.note-label {
			margin: 0 0 0.35rem;
			color: var(--color-cyan);
			font-size: 0.76rem;
			font-weight: 900;
			text-transform: uppercase;
		}
	}

	.warning {
		padding: 0.75rem 0.85rem;
		border: 1px solid rgba(217, 95, 67, 0.48);
		border-radius: var(--radius-sm);
		background: rgba(217, 95, 67, 0.11);
		margin-top: 0.95rem;
		margin-inline: 0.45rem;

		.warning-label {
			margin: 0 0 0.35rem;
			color: var(--color-danger);
			font-size: 0.76rem;
			font-weight: 900;
			text-transform: uppercase;
		}
	}

	.note:first-child,
	.warning:first-child {
		margin-top: 0;
	}

	.note + .block:not(.with-divider),
	.warning + .block:not(.with-divider) {
		margin-top: 0.85rem;
	}

	.example summary {
		margin-bottom: 0.55rem;
		color: var(--color-accent);
		font-size: 0.82rem;
		font-weight: 800;
		text-transform: uppercase;
		cursor: pointer;
	}
}

.difficulty {
	margin-top: 1.2rem;
	padding-top: 1rem;
	border-top: 1px solid rgba(244, 239, 229, 0.1);

	h3 {
		margin: 0 0 0.8rem;
		color: var(--color-text);
		font-size: 1.05rem;
	}
}

@media (max-width: 980px) {
	.wiki-header {
		align-items: stretch;
		flex-direction: column;

		.header-meta {
			flex-direction: column;
			align-items: stretch;
		}

		.search {
			min-width: 0;
			width: 100%;
		}
	}

	.wiki-layout {
		grid-template-columns: 1fr;
	}

	.wiki-index {
		position: static;
		max-height: none;
	}

	.entry-header h2 {
		font-size: 1.8rem;
	}
}
</style>
