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
						<span class="pill fan-made" v-if="data.currentSkill.fanMade">Fan-made</span>
					</div>
					<div class="required" v-if="data.currentSkill.hasRequiredSkills()">
						<span class="required-label">Requirements</span>
						<div class="required-pills">
							<button
								type="button"
								v-for="requiredSkill in data.currentSkill.required"
								:key="requiredSkill.id || requiredSkill.name"
								class="required-pill"
								@click="showSkill(requiredSkill)"
							>
								{{ requiredSkill.name }}
							</button>
						</div>
					</div>
				</header>

				<p class="summary" v-if="data.currentSkill.summary" v-html="getSummaryHtml()"></p>

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
							v-else-if="block.type === 'special'"
							class="block special"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
						>
							<p class="special-label">Special</p>
							<div v-html="formatBlockHtml(block.text)"></div>
						</div>
						<div
							v-else-if="block.type === 'table'"
							class="block table-block"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
						>
							<p class="table-title" v-if="block.title" v-html="formatRichText(block.title)"></p>
							<p class="table-text" v-if="block.text" v-html="formatRichText(block.text)"></p>
							<div class="table-wrap">
								<table>
									<thead>
										<tr>
											<th v-for="(column, columnIndex) in block.columns" :key="columnIndex" v-html="sanitizeHtml(column)"></th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
											<td
												v-for="(column, columnIndex) in block.columns"
												:key="columnIndex"
											>
												<template v-if="getTableDifficultyCell(block, row, column)">
													<div class="table-difficulty">
														<span class="table-difficulty-chip">{{ getTableDifficultyCell(block, row, column).title }}</span>
														<span
															v-if="getTableDifficultyCell(block, row, column).increase"
															class="table-difficulty-increase"
															v-html="sanitizeHtml(getTableDifficultyCell(block, row, column).increase)"
														></span>
														<ul
															class="table-tooltip"
															v-if="normalizeHoverList(getTableDifficultyCell(block, row, column).hover).length"
														>
															<li
																v-for="(hoverItem, hoverIndex) in normalizeHoverList(getTableDifficultyCell(block, row, column).hover)"
																:key="hoverIndex"
															>
																{{ hoverItem }}
															</li>
														</ul>
													</div>
												</template>
												<template v-else>
													<span v-html="sanitizeHtml(getTableCellText(row?.[column]))"></span>
												</template>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<p class="table-subtext" v-if="block.subtext" v-html="formatRichText(block.subtext)"></p>
							<p class="table-subnote" v-if="block.subnote" v-html="formatRichText(block.subnote)"></p>
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
import { injectDifficultyPills } from "@/utils/difficultyInline";

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

		formatRichText(value) {
			return sanitizeHtml(injectDifficultyPills(String(value || "")));
		},

		formatBlockHtml(text) {
			return this.toParagraphHtml(String(text || ""));
		},

		toParagraphHtml(content) {
			const raw = String(content || "").trim();
			if (!raw) return "";
			const sanitized = this.formatRichText(raw);

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
			if (!Array.isArray(blocks)) return false;

			const currentType = String(blocks[index]?.type || "").toLowerCase();
			if (currentType === "note" || currentType === "warning" || currentType === "special") return false;

			const firstRegularIndex = blocks.findIndex((block) => {
				const type = String(block?.type || "").toLowerCase();
				return type !== "note" && type !== "warning" && type !== "special";
			});
			if (index === firstRegularIndex) {
				return true;
			}
			if (index <= 0) return false;

			const previousType = String(blocks[index - 1]?.type || "").toLowerCase();
			const previousIsSpecial = previousType === "note" || previousType === "warning" || previousType === "special";
			if (previousIsSpecial) {
				return currentType === "example";
			}

			return true;
		},

		getDifficultyMeta(level, hover = null, andMore = false) {
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
		},

		normalizeHoverList(hover) {
			if (Array.isArray(hover)) return hover.map((entry) => String(entry ?? ""));
			if (hover == null) return [];
			return [String(hover)];
		},

		getDifficultyLabelMeta(value) {
			if (typeof value !== "string") return null;
			const normalized = value.trim();
			if (!normalized) return null;

			if (/^very\s+easy$/i.test(normalized)) return this.getDifficultyMeta(1);
			if (/^easy$/i.test(normalized)) return this.getDifficultyMeta(2);
			if (/^moderate$/i.test(normalized)) return this.getDifficultyMeta(3);
			if (/^difficult$/i.test(normalized)) return this.getDifficultyMeta(4);
			if (/^very\s+difficult$/i.test(normalized)) return this.getDifficultyMeta(5);
			if (/^heroic(?:\s*\(\s*31\+\s*\))?$/i.test(normalized)) return this.getDifficultyMeta(6);
			return null;
		},

		shouldParseTableDifficultyCell(table, column) {
			const columnType = String(table?.columnTypes?.[column] || "").trim().toLowerCase();
			if (columnType === "difficulty") return true;
			if (columnType === "plain" || columnType === "text") return false;

			const rows = Array.isArray(table?.rows) ? table.rows : [];
			if (rows.length === 0) return false;

			let hasDifficultyValue = false;
			for (const row of rows) {
				const cell = row?.[column];
				if (cell == null || cell === "") continue;

				if (cell && typeof cell === "object" && cell.level != null) {
					hasDifficultyValue = true;
					continue;
				}

				if (typeof cell === "number" || (typeof cell === "string" && /^\d+$/.test(cell))) {
					const numeric = Number(cell);
					if (numeric >= 1 && numeric <= 6) {
						hasDifficultyValue = true;
						continue;
					}
				}

				return false;
			}

			return hasDifficultyValue;
		},

		getTableDifficultyCell(table, row, column) {
			const cell = row?.[column];
			if (cell == null) return null;
			const parseByColumn = this.shouldParseTableDifficultyCell(table, column);

			if (cell && typeof cell === "object" && cell.level != null && (parseByColumn || cell.difficulty === true)) {
				return {
					...this.getDifficultyMeta(cell.level, cell.hover ?? null, cell.and_more === true),
					increase: cell.increase != null ? String(cell.increase) : null,
				};
			}

			if (!parseByColumn) return null;
			if (typeof cell === "number" || (typeof cell === "string" && /^\d+$/.test(cell))) {
				return {
					...this.getDifficultyMeta(Number(cell)),
					increase: null,
				};
			}

			const difficultyLabel = this.getDifficultyLabelMeta(String(cell));
			if (difficultyLabel) {
				return {
					...difficultyLabel,
					increase: null,
				};
			}

			const columnType = String(table?.columnTypes?.[column] || "").trim().toLowerCase();
			if (columnType === "difficulty" && typeof cell === "string") {
				return {
					title: cell.trim(),
					hover: null,
					increase: null,
				};
			}

			return null;
		},

		getTableCellText(value) {
			if (value == null) return "";
			if (value && typeof value === "object") {
				if (Object.prototype.hasOwnProperty.call(value, "text")) return value.text;
				if (Object.prototype.hasOwnProperty.call(value, "label")) return value.label;
				return "";
			}
			return String(value);
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
	border-bottom: 1px solid rgba(244, 239, 229, 0.16);

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

		&.fan-made {
			border-color: rgba(103, 213, 200, 0.3);
			background: rgba(103, 213, 200, 0.09);
			color: var(--color-cyan);
		}
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

:deep(.inline-difficulty-pill) {
	display: inline-flex;
	align-items: center;
	min-height: 1.55rem;
	padding: 0.12rem 0.48rem;
	border: 1px solid rgba(242, 193, 78, 0.36);
	border-radius: var(--radius-sm);
	background: rgba(242, 193, 78, 0.1);
	color: var(--color-accent);
	font-size: 0.79rem;
	font-weight: 900;
	line-height: 1.2;
	vertical-align: middle;
}

:deep(.inline-difficulty) {
	position: relative;
	display: inline-flex;
	align-items: center;
	cursor: help;
}

:deep(.inline-difficulty-tooltip) {
	position: absolute;
	left: 0;
	top: calc(100% + 0.3rem);
	z-index: 6;
	width: min(22rem, 80vw);
	margin: 0;
	padding: 0.5rem 0.7rem;
	list-style: none;
	border: 1px solid rgba(244, 239, 229, 0.14);
	border-radius: var(--radius-sm);
	background: #151311;
	color: var(--color-muted);
	font-size: 0.82rem;
	line-height: 1.4;
	box-shadow: var(--shadow-panel);
	display: none;
	flex-direction: column;
}

:deep(.inline-difficulty-tooltip-item + .inline-difficulty-tooltip-item) {
	margin-top: 0.3rem;
}

:deep(.inline-difficulty:hover .inline-difficulty-tooltip),
:deep(.inline-difficulty:focus-within .inline-difficulty-tooltip) {
	display: flex;
}

.required {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.45rem;
	margin: 0.75rem 0 0;

	.required-label {
		color: var(--color-muted);
		font-size: 0.75rem;
		font-weight: 900;
		letter-spacing: 0;
		text-transform: uppercase;
	}

	.required-pills {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem;
		margin-top: 0;
	}

	.required-pill {
		display: inline-flex;
		align-items: center;
		min-height: 1.8rem;
		padding: 0.25rem 0.6rem;
		border-radius: var(--radius-sm);
		font-size: 0.82rem;
		font-weight: 800;
		border: 1px solid rgba(244, 239, 229, 0.12);
		background: var(--color-panel-soft);
		color: var(--color-text);
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			color 0.2s ease,
			background 0.2s ease;

		&:hover {
			border-color: var(--color-accent);
			color: var(--color-accent);
		}

	}
}

.content {
	.block.with-divider {
		position: relative;
		margin-top: 0.95rem;
		padding-top: 0.95rem;
		border-top: 0;

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0.45rem;
			right: 0.45rem;
			height: 1px;
			background: linear-gradient(
				90deg,
				transparent 0%,
				rgba(244, 239, 229, 0.04) 12%,
				rgba(244, 239, 229, 0.1) 50%,
				rgba(244, 239, 229, 0.04) 88%,
				transparent 100%
			);
		}
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

		:deep(table) {
			width: max-content;
			margin: 0.7rem 0;
			border-collapse: collapse;
			border: 1px solid rgba(244, 239, 229, 0.12);
			font-size: 0.86rem;
			display: block;
			overflow-x: auto;
		}

		:deep(th),
		:deep(td) {
			padding: 0.38rem 0.52rem;
			border: 1px solid rgba(244, 239, 229, 0.1);
			text-align: left;
			vertical-align: top;
			white-space: nowrap;
		}

		:deep(th) {
			color: var(--color-text);
			font-weight: 900;
			background: rgba(242, 193, 78, 0.08);
		}

		:deep(td) {
			color: var(--color-muted);
		}
	}

	.table-block {
		margin-top: 0.95rem;
		margin-inline: 0;
		padding-inline: 0.45rem;

		.table-title {
			margin: 0 0 0.45rem;
			color: var(--color-text);
			font-weight: 900;
			line-height: 1.45;
		}

		.table-text {
			margin: 0 0 0.45rem;
			color: var(--color-muted);
			font-size: 1rem;
			font-weight: 500;
			line-height: 1.5;
			margin-inline: -0.45rem;
		}

		.table-wrap {
			overflow-x: auto;
		}

		.table-subtext {
			margin: 0.45rem 0 0;
			color: var(--color-muted);
			font-size: 1rem;
			line-height: 1.6;
			font-weight: 400;
			margin-inline: -0.45rem;
		}

		.table-subnote {
			margin: 0.45rem 0 0;
			color: var(--color-muted);
			font-size: 0.9rem;
			line-height: 1.55;
		}

		table {
			width: max-content;
			min-width: 0;
			display: table;
			overflow: visible;
			border-collapse: collapse;
			border: 1px solid rgba(244, 239, 229, 0.12);
			font-size: 0.86rem;
			background: transparent;
		}

		th,
		td {
			padding: 0.38rem 0.52rem;
			border: 1px solid rgba(244, 239, 229, 0.1);
			text-align: left;
			vertical-align: top;
		}

		th {
			color: var(--color-text);
			font-weight: 900;
			background: rgba(242, 193, 78, 0.08);
		}

		td {
			color: var(--color-muted);
			white-space: nowrap;
		}

		.table-difficulty {
			position: relative;
			display: inline-flex;
			align-items: center;
			cursor: help;

			.table-tooltip {
				position: absolute;
				left: 0;
				bottom: calc(100% + 0.3rem);
				z-index: 6;
				width: min(22rem, 80vw);
				margin: 0;
				padding: 0.5rem 0.7rem;
				list-style: none;
				border: 1px solid rgba(244, 239, 229, 0.14);
				border-radius: var(--radius-sm);
				background: #151311;
				color: var(--color-muted);
				font-size: 0.82rem;
				line-height: 1.4;
				box-shadow: var(--shadow-panel);
				display: none;

				li + li {
					margin-top: 0.3rem;
				}
			}

			&:hover .table-tooltip,
			&:focus-within .table-tooltip {
				display: block;
			}
		}

		.table-difficulty-chip {
			display: inline-flex;
			align-items: center;
			min-height: 1.55rem;
			padding: 0.12rem 0.48rem;
			border: 1px solid rgba(242, 193, 78, 0.36);
			border-radius: var(--radius-sm);
			background: rgba(242, 193, 78, 0.1);
			color: var(--color-accent);
			font-size: 0.79rem;
			font-weight: 900;
			line-height: 1.2;
		}

		.table-difficulty-increase {
			margin-left: 0.4rem;
			color: var(--color-text);
			font-weight: 800;
			line-height: 1.2;
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

	.special {
		padding: 0.8rem 0.9rem;
		border: 1px solid rgba(153, 123, 255, 0.42);
		border-radius: var(--radius-sm);
		background:
			linear-gradient(135deg, rgba(153, 123, 255, 0.14) 0%, rgba(111, 76, 205, 0.08) 100%);
		box-shadow: inset 0 0 0 1px rgba(196, 181, 253, 0.12);
		margin-top: 0.95rem;
		margin-inline: 0.45rem;

		.special-label {
			margin: 0 0 0.35rem;
			color: #c7b8ff;
			font-size: 0.76rem;
			font-weight: 900;
			letter-spacing: 0.04em;
			text-transform: uppercase;
		}
	}

	.note:first-child,
	.warning:first-child,
	.special:first-child {
		margin-top: 0;
	}

	.note + .block:not(.with-divider),
	.warning + .block:not(.with-divider),
	.special + .block:not(.with-divider) {
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
	border-top: 1px solid rgba(244, 239, 229, 0.16);

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

