<template>
	<section class="wiki">
		<button class="mobile-list-toggle" type="button" :aria-expanded="data.mobileIndexOpen"
			aria-controls="wiki-index-panel" @click="openMobileIndex">
			<span>{{ data.currentSkill ? data.currentSkill.name : 'Select a power' }}</span>
			<strong>Browse {{ filteredSkills.length }}</strong>
		</button>
		<button class="mobile-backdrop" type="button" aria-label="Close index" v-if="data.mobileIndexOpen"
			@click="closeMobileIndex"></button>
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

		<section class="wiki-filters" aria-label="Force power filters">
			<label class="filter-control">
				<span>Force skills</span>
				<select v-model="data.powerFilter">
					<option v-for="filter in powerFilters" :key="filter.value" :value="filter.value">
						{{ filter.label }}
					</option>
				</select>
			</label>
			<label class="filter-control">
				<span>Properties</span>
				<select v-model="data.traitFilter">
					<option v-for="filter in traitFilters" :key="filter.value" :value="filter.value">
						{{ filter.label }}
					</option>
				</select>
			</label>
			<label class="filter-control">
				<span>Difficulty</span>
				<select v-model="data.difficultyFilter">
					<option v-for="filter in difficultyFilters" :key="filter.value" :value="filter.value">
						{{ filter.label }}
					</option>
				</select>
			</label>
			<button class="clear-filters" type="button" :disabled="!hasActiveFilters" @click="clearFilters">
				Clear filters
			</button>
		</section>


		<div class="wiki-layout">
			<aside id="wiki-index-panel" class="wiki-index"
				:class="{ collapsed: data.indexCollapsed, 'mobile-open': data.mobileIndexOpen }">
				<div class="index-panel-header">
					<input v-model.trim="data.search" class="search mobile-search" type="search"
						placeholder="Search powers" aria-label="Search powers">
					<div class="mobile-filters">
						<select v-model="data.powerFilter">
							<option v-for="filter in powerFilters" :key="filter.value" :value="filter.value">{{
								filter.label }}</option>
						</select>
						<select v-model="data.traitFilter">
							<option v-for="filter in traitFilters" :key="filter.value" :value="filter.value">{{
								filter.label }}</option>
						</select>
						<select v-model="data.difficultyFilter">
							<option v-for="filter in difficultyFilters" :key="filter.value" :value="filter.value">{{
								filter.label }}</option>
						</select>
					</div>
				</div>
				<div class="index-heading" v-show="!data.indexCollapsed">
					<span>Power index</span>
					<strong>{{ filteredSkills.length }}</strong>
				</div>
				<button class="index-toggle" type="button" :aria-expanded="!data.indexCollapsed"
					:aria-label="data.indexCollapsed ? 'Show powers' : 'Hide powers'"
					:title="data.indexCollapsed ? 'Show powers' : 'Hide powers'"
					@click="data.indexCollapsed = !data.indexCollapsed">
					<span class="index-toggle-icon" aria-hidden="true"></span>
				</button>
				<div class="index-scroll" v-show="!data.indexCollapsed">
					<div class="index-group" v-for="group in groupedSkills" :key="group.letter">
						<h2>{{ group.letter }}</h2>
						<button v-for="skill in group.skills" :key="skill.id || skill.name" class="index-item"
							:class="{ active: isCurrentSkill(skill) }" type="button" @click="showSkillFromIndex(skill)">
							{{ skill.name }}
						</button>
					</div>
					<p class="empty" v-if="groupedSkills.length === 0">No powers found.</p>
				</div>
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
							<button type="button" v-for="requiredSkill in data.currentSkill.required"
								:key="requiredSkill.id || requiredSkill.name" class="required-pill"
								@click="showSkill(requiredSkill)">
								{{ requiredSkill.name }}
							</button>
						</div>
					</div>
				</header>

				<p class="summary" v-if="data.currentSkill.summary" v-html="getSummaryHtml()"></p>

				<section class="content" v-if="contentBlocks.length > 0">
					<template v-for="(block, index) in contentBlocks" :key="index">
						<details v-if="block.type === 'example'" class="block example"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }">
							<summary>Example</summary>
							<div v-html="formatBlockHtml(block.text)"></div>
						</details>
						<div v-else-if="block.type === 'note'" class="block note"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }">
							<p class="note-label">Note</p>
							<div v-html="formatBlockHtml(block.text)"></div>
						</div>
						<div v-else-if="block.type === 'warning'" class="block warning"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }">
							<p class="warning-label">Warning</p>
							<div v-html="formatBlockHtml(block.text)"></div>
						</div>
						<div v-else-if="block.type === 'special'" class="block special"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }">
							<p class="special-label">Special</p>
							<div v-html="formatBlockHtml(block.text)"></div>
						</div>
						<div v-else-if="block.type === 'table'" class="block table-block"
							:class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }">
							<p class="table-title" v-if="block.title" v-html="formatRichText(block.title)"></p>
							<p class="table-text" v-if="block.text" v-html="formatRichText(block.text)"></p>
							<div class="table-wrap">
								<table>
									<thead>
										<tr>
											<th v-for="(column, columnIndex) in block.columns" :key="columnIndex"
												v-html="sanitizeHtml(column)"></th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
											<td v-for="(column, columnIndex) in block.columns" :key="columnIndex">
												<template v-if="getTableDifficultyCell(block, row, column)">
													<div class="table-difficulty">
														<span class="table-difficulty-chip">{{
															getTableDifficultyCell(block, row, column).title }}</span>
														<span v-if="getTableDifficultyCell(block, row, column).increase"
															class="table-difficulty-increase"
															v-html="sanitizeHtml(getTableDifficultyCell(block, row, column).increase)"></span>
														<ul class="table-tooltip"
															v-if="normalizeHoverList(getTableDifficultyCell(block, row, column).hover).length">
															<li v-for="(hoverItem, hoverIndex) in normalizeHoverList(getTableDifficultyCell(block, row, column).hover)"
																:key="hoverIndex">
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
						<div v-else class="block" :class="{ 'with-divider': shouldRenderDivider(index, contentBlocks) }"
							v-html="formatBlockHtml(block.text)"></div>
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
import { Power, PowerName } from "@/assets/powers";
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

const WIKI_INDEX_COLLAPSED_STORAGE_KEY = "star-wars-d6:wiki-index-collapsed";
const WIKI_FILTERS_STORAGE_KEY = "star-wars-d6:wiki-filters";

const defaultWikiFilters = {
	search: "",
	powerFilter: "all",
	traitFilter: "all",
	difficultyFilter: "all",
};

function loadWikiIndexCollapsed() {
	if (typeof window === "undefined") return false;

	try {
		return window.localStorage.getItem(WIKI_INDEX_COLLAPSED_STORAGE_KEY) === "true";
	} catch {
		return false;
	}
}

function saveWikiIndexCollapsed(value) {
	if (typeof window === "undefined") return;

	try {
		window.localStorage.setItem(WIKI_INDEX_COLLAPSED_STORAGE_KEY, String(Boolean(value)));
	} catch {
		// Ignore storage quota or private-mode errors; the in-memory state is still updated.
	}
}

function loadWikiFilters() {
	if (typeof window === "undefined") return { ...defaultWikiFilters };

	try {
		const value = JSON.parse(window.localStorage.getItem(WIKI_FILTERS_STORAGE_KEY) || "{}");
		if (!value || typeof value !== "object") return { ...defaultWikiFilters };

		return {
			search: typeof value.search === "string" ? value.search : defaultWikiFilters.search,
			powerFilter: typeof value.powerFilter === "string" ? value.powerFilter : defaultWikiFilters.powerFilter,
			traitFilter: typeof value.traitFilter === "string" ? value.traitFilter : defaultWikiFilters.traitFilter,
			difficultyFilter: typeof value.difficultyFilter === "string" ? value.difficultyFilter : defaultWikiFilters.difficultyFilter,
		};
	} catch {
		return { ...defaultWikiFilters };
	}
}

function saveWikiFilters(value) {
	if (typeof window === "undefined") return;

	try {
		window.localStorage.setItem(WIKI_FILTERS_STORAGE_KEY, JSON.stringify({
			search: String(value?.search || ""),
			powerFilter: String(value?.powerFilter || defaultWikiFilters.powerFilter),
			traitFilter: String(value?.traitFilter || defaultWikiFilters.traitFilter),
			difficultyFilter: String(value?.difficultyFilter || defaultWikiFilters.difficultyFilter),
		}));
	} catch {
		// Ignore storage quota or private-mode errors; the in-memory state is still updated.
	}
}

export default {
	components: {
		Difficulty
	},
	data() {
		const savedFilters = loadWikiFilters();

		return {
			PowerName,
			allSkills: [],
			data: {
				search: savedFilters.search,
				powerFilter: savedFilters.powerFilter,
				traitFilter: savedFilters.traitFilter,
				difficultyFilter: savedFilters.difficultyFilter,
				indexCollapsed: loadWikiIndexCollapsed(),
				mobileIndexOpen: false,
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

		if (typeof document !== "undefined") {
			document.body.classList.remove("mobile-drawer-open");
		}
	},

	computed: {
		powerFilters() {
			return [
				{ value: "all", label: "All force skills" },
				{ value: `uses:${Power.control}`, label: "Uses Control" },
				{ value: `uses:${Power.sense}`, label: "Uses Sense" },
				{ value: `uses:${Power.alter}`, label: "Uses Alter" },
				{ value: `exact:${Power.control}`, label: "Control only" },
				{ value: `exact:${Power.sense}`, label: "Sense only" },
				{ value: `exact:${Power.alter}`, label: "Alter only" },
				{ value: `exact:${Power.control}+${Power.sense}`, label: "Control + Sense" },
				{ value: `exact:${Power.control}+${Power.alter}`, label: "Control + Alter" },
				{ value: `exact:${Power.sense}+${Power.alter}`, label: "Sense + Alter" },
				{ value: `exact:${Power.control}+${Power.sense}+${Power.alter}`, label: "All three" },
			];
		},

		traitFilters() {
			return [
				{ value: "all", label: "All properties" },
				{ value: "kept-up", label: "Can be kept up" },
				{ value: "requirements", label: "Has requirements" },
				{ value: "no-requirements", label: "No requirements" },
				{ value: "dark-side-point", label: "Dark Side Point risk" },
				{ value: "light-side-only", label: "Light Side Only" },
				{ value: "dark-side-only", label: "Dark Side Only" },
				{ value: "long-use", label: "Longer than one round" },
				{ value: "fan-made", label: "Fan-made" },
			];
		},

		difficultyFilters() {
			return [
				{ value: "all", label: "Any difficulty" },
				{ value: "low", label: "Easy entry" },
				{ value: "moderate", label: "Up to Moderate" },
				{ value: "difficult", label: "Difficult or harder" },
				{ value: "very-difficult", label: "Very Difficult or harder" },
				{ value: "heroic", label: "Heroic" },
			];
		},

		hasActiveFilters() {
			return Boolean(
				String(this.data.search || "").trim()
				|| this.data.powerFilter !== "all"
				|| this.data.traitFilter !== "all"
				|| this.data.difficultyFilter !== "all"
			);
		},

		filteredSkills() {
			const search = normalizeSearchTerm(this.data.search);

			return this.allSkills.filter((skill) => {
				if (!this.matchesPowerFilter(skill)) return false;
				if (!this.matchesTraitFilter(skill)) return false;
				if (!this.matchesDifficultyFilter(skill)) return false;
				if (!search) return true;

				const name = String(skill.name || "").toLowerCase();
				const summary = String(skill.summary || "").toLowerCase();
				const extras = this.getSkillExtraText(skill).toLowerCase();
				const requirements = Array.isArray(skill.required)
					? skill.required.map((entry) => String(entry?.name || "")).join(" ").toLowerCase()
					: "";
				const powers = Array.isArray(skill.powers) ? skill.powers : [];
				const powerMatches = powers.some((power) => {
					const key = String(power || "").toLowerCase();
					const label = String(this.PowerName[power] || "").toLowerCase();
					return key.includes(search) || label.includes(search);
				});

				return name.includes(search)
					|| summary.includes(search)
					|| extras.includes(search)
					|| requirements.includes(search)
					|| powerMatches;
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

		openMobileIndex() {
			this.data.mobileIndexOpen = true;
		},

		closeMobileIndex() {
			this.data.mobileIndexOpen = false;
		},

		showSkillFromIndex(skill) {
			this.showSkill(skill);
			if (this.data.mobileIndexOpen) this.closeMobileIndex();
		},

		clearFilters() {
			this.data.search = defaultWikiFilters.search;
			this.data.powerFilter = defaultWikiFilters.powerFilter;
			this.data.traitFilter = defaultWikiFilters.traitFilter;
			this.data.difficultyFilter = defaultWikiFilters.difficultyFilter;
		},

		getSkillPowerKey(skill) {
			const order = [Power.control, Power.sense, Power.alter];
			const powers = Array.isArray(skill?.powers) ? skill.powers : [];
			return order.filter((power) => powers.includes(power)).join("+");
		},

		matchesPowerFilter(skill) {
			const filter = String(this.data.powerFilter || "all");
			if (filter === "all") return true;

			const powers = Array.isArray(skill?.powers) ? skill.powers : [];
			if (filter.startsWith("uses:")) {
				return powers.includes(filter.replace("uses:", ""));
			}
			if (filter.startsWith("exact:")) {
				return this.getSkillPowerKey(skill) === filter.replace("exact:", "");
			}
			return true;
		},

		matchesTraitFilter(skill) {
			const filter = String(this.data.traitFilter || "all");
			if (filter === "all") return true;

			if (filter === "kept-up") return this.isKeptUpPower(skill);
			if (filter === "requirements") return skill?.hasRequiredSkills?.() === true;
			if (filter === "no-requirements") return skill?.hasRequiredSkills?.() !== true;
			if (filter === "fan-made") return Boolean(skill?.fanMade);
			if (filter === "dark-side-point") return this.hasDarkSidePointRisk(skill);
			if (filter === "light-side-only") return this.isLightSideOnlyPower(skill);
			if (filter === "dark-side-only") return this.isDarkSideOnlyPower(skill);
			if (filter === "long-use") return this.isLongUsePower(skill);
			return true;
		},

		matchesDifficultyFilter(skill) {
			const filter = String(this.data.difficultyFilter || "all");
			if (filter === "all") return true;

			const maxLevel = this.getMaxDifficultyLevel(skill);
			if (maxLevel == null) return false;
			if (filter === "low") return maxLevel <= 2;
			if (filter === "moderate") return maxLevel <= 3;
			if (filter === "difficult") return maxLevel >= 4;
			if (filter === "very-difficult") return maxLevel >= 5;
			if (filter === "heroic") return maxLevel >= 6;
			return true;
		},

		getSkillExtraText(skill) {
			return Array.isArray(skill?.extra)
				? skill.extra.map((item) => String(item || "")).join(" ").toLowerCase()
				: "";
		},

		getSkillContentText(skill) {
			return Array.isArray(skill?.contentBlocks)
				? skill.contentBlocks.map((block) => String(block?.text || "")).join(" ").toLowerCase()
				: "";
		},

		isKeptUpPower(skill) {
			return this.getSkillExtraText(skill).includes("kept up")
				|| String(skill?.summary || "").toLowerCase().includes("kept up");
		},

		hasDarkSidePointRisk(skill) {
			return this.getSkillContentText(skill).includes("dark side point")
				|| String(skill?.summary || "").toLowerCase().includes("dark side point");
		},

		isLightSideOnlyPower(skill) {
			const extras = this.getSkillExtraText(skill);
			return extras.includes("consumed by the dark side")
				&& extras.includes("may not use");
		},

		isDarkSideOnlyPower(skill) {
			return this.getSkillExtraText(skill)
				.includes("only be used by characters who have been consumed by the dark side");
		},

		isLongUsePower(skill) {
			const timeToUse = String(skill?.timeToUse || "").toLowerCase().trim();
			if (!timeToUse) return false;
			return !/^((one|1)\s+round|\[?1r\]?)/i.test(timeToUse);
		},

		getMaxDifficultyLevel(skill) {
			const levels = [Power.control, Power.sense, Power.alter]
				.flatMap((power) => this.getDifficultyLevels(skill?.difficulty?.[power]?.level));
			if (levels.length === 0) return null;
			return Math.max(...levels);
		},

		getDifficultyLevels(entries) {
			if (!Array.isArray(entries)) return [];

			return entries
				.map((entry) => {
					const rawLevel = entry && typeof entry === "object" ? entry.level : entry;
					if (rawLevel == null || rawLevel === "") return null;
					const parsedLevel = Number(rawLevel);
					if (Number.isNaN(parsedLevel)) return null;
					return parsedLevel > 10 ? parsedLevel - 10 : parsedLevel;
				})
				.filter((level) => level != null);
		},

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
		"data.indexCollapsed"(isCollapsed) {
			saveWikiIndexCollapsed(isCollapsed);
		},

		"data.search"() {
			saveWikiFilters(this.data);
		},

		"data.powerFilter"() {
			saveWikiFilters(this.data);
		},

		"data.traitFilter"() {
			saveWikiFilters(this.data);
		},

		"data.difficultyFilter"() {
			saveWikiFilters(this.data);
		},

		"data.mobileIndexOpen"(isOpen) {
			if (typeof document === "undefined") return;

			document.body.classList.toggle("mobile-drawer-open", isOpen);
		},

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

/* mobile controls hidden by default */
.mobile-list-toggle,
.mobile-backdrop,
.index-panel-header {
	display: none;
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

.wiki-filters {
	display: grid;
	grid-template-columns: repeat(3, minmax(10rem, 1fr)) auto;
	gap: 0.7rem;
	align-items: end;
	padding: 0.85rem 1rem;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-panel);
	box-shadow: var(--shadow-panel);

	.filter-control {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-width: 0;

		span {
			color: var(--color-muted);
			font-size: 0.72rem;
			font-weight: 900;
			text-transform: uppercase;
		}
	}

	select,
	.clear-filters {
		min-height: 2.35rem;
		border: 1px solid rgba(244, 239, 229, 0.12);
		border-radius: var(--radius-sm);
		background: var(--color-panel-soft);
		color: var(--color-text);
		font-weight: 800;
	}

	select {
		width: 100%;
		padding: 0.45rem 0.6rem;
	}

	.clear-filters {
		padding: 0.45rem 0.75rem;
		cursor: pointer;

		&:hover:not(:disabled) {
			border-color: rgba(103, 213, 200, 0.38);
			color: var(--color-cyan);
		}

		&:disabled {
			opacity: 0.45;
			cursor: default;
		}
	}
}

.wiki-layout {
	display: grid;
	grid-template-columns: minmax(14rem, 19rem) minmax(0, 1fr);
	gap: 1rem;
	align-items: stretch;

	&:has(.wiki-index.collapsed) {
		grid-template-columns: 2.75rem minmax(0, 1fr);
	}
}

.wiki-index,
.wiki-entry {
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-panel);
	box-shadow: var(--shadow-panel);
}

.wiki-index {
	position: relative;
	display: flex;
	flex-direction: column;
	min-height: 0;
	padding: 0.9rem;
	overflow: visible;

	&.collapsed {
		align-self: stretch;
		min-height: 4rem;
		padding-inline: 0.5rem;
	}

	.index-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 2rem;
		padding-right: 2.65rem;

		span {
			color: var(--color-muted);
			font-size: 0.72rem;
			font-weight: 900;
			text-transform: uppercase;
		}

		strong {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			min-width: 1.9rem;
			min-height: 1.45rem;
			padding: 0 0.4rem;
			border: 1px solid rgba(242, 193, 78, 0.26);
			border-radius: var(--radius-sm);
			color: var(--color-accent);
			font-size: 0.78rem;
			font-weight: 900;
		}
	}

	.index-toggle {
		position: absolute;
		top: 0.75rem;
		right: 0.65rem;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: 1px solid rgba(242, 193, 78, 0.28);
		border-radius: var(--radius-sm);
		background: rgba(22, 20, 17, 0.9);
		color: var(--color-accent);
		cursor: pointer;
		box-shadow: 0 0.45rem 1rem rgba(0, 0, 0, 0.22);

		&:hover {
			border-color: rgba(242, 193, 78, 0.48);
			background: rgba(242, 193, 78, 0.1);
		}

		.index-toggle-icon {
			display: inline-flex;
			width: 0.5rem;
			height: 0.5rem;
			border: solid currentColor;
			border-width: 0 2px 2px 0;
			transform: translateX(0.12rem) rotate(135deg);
		}
	}

	&.collapsed .index-toggle {
		right: 50%;
		transform: translateX(50%);

		.index-toggle-icon {
			transform: translateX(-0.12rem) rotate(-45deg);
		}
	}

	.index-scroll {
		flex: 1 1 auto;
		height: 0;
		min-height: 0;
		margin-top: 0.55rem;
		padding: 0.15rem 2.35rem 0.4rem 0.25rem;
		overflow: auto;
		scrollbar-color: rgba(242, 193, 78, 0.52) rgba(244, 239, 229, 0.06);
		scrollbar-width: thin;

		&::-webkit-scrollbar {
			width: 0.55rem;
		}

		&::-webkit-scrollbar-track {
			border-radius: 999px;
			background: rgba(244, 239, 229, 0.06);
		}

		&::-webkit-scrollbar-thumb {
			border: 2px solid rgba(24, 22, 18, 0.95);
			border-radius: 999px;
			background: rgba(242, 193, 78, 0.62);
		}

		&::-webkit-scrollbar-thumb:hover {
			background: rgba(242, 193, 78, 0.84);
		}
	}

	.index-group+.index-group {
		margin-top: 0.9rem;
	}

	h2 {
		margin: 0 0 0.3rem;
		color: var(--color-accent);
		font-size: 0.8rem;
	}

	.index-item {
		box-sizing: border-box;
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

		&:focus-visible {
			outline: none;
			border-color: rgba(242, 193, 78, 0.72);
			box-shadow: inset 0 0 0 1px rgba(242, 193, 78, 0.72);
		}

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
	min-height: max(32rem, calc(100vh - 22rem));
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
			background: linear-gradient(90deg,
					transparent 0%,
					rgba(244, 239, 229, 0.04) 12%,
					rgba(244, 239, 229, 0.1) 50%,
					rgba(244, 239, 229, 0.04) 88%,
					transparent 100%);
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

				li+li {
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

	.note+.block:not(.with-divider),
	.warning+.block:not(.with-divider),
	.special+.block:not(.with-divider) {
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

	.wiki-filters {
		grid-template-columns: 1fr;
	}

	.wiki-layout {
		grid-template-columns: 1fr;

		&:has(.wiki-index.collapsed) {
			grid-template-columns: 1fr;
		}
	}

	.wiki-index {
		position: static;
		max-height: none;
	}

	.entry-header h2 {
		font-size: 1.8rem;
	}
}

@media (max-width: 940px) {
	.wiki {

		/* hide header search & filter areas on small screens - keep only drawer controls */
		.wiki-header .header-meta {
			display: none;
		}

		.wiki-filters {
			display: none;
		}

		.mobile-list-toggle,
		.mobile-backdrop {
			display: none;
		}

		.mobile-list-toggle {
			display: flex;
			position: sticky;
			top: 0.65rem;
			z-index: 7;
			align-items: center;
			justify-content: space-between;
			gap: 0.8rem;
			width: 100%;
			min-height: 3.1rem;
			padding: 0.65rem 0.8rem;
			border: 1px solid var(--color-border-strong);
			border-radius: var(--radius-md);
			background: var(--color-panel-soft);
			box-shadow: var(--shadow-panel);
			color: var(--color-text);
			font-weight: 900;
			text-align: left;
			cursor: pointer;

			span {
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			/* hide header search/filters in mobile; moved into the drawer - actual hide rules below */
		}

		strong {
			flex: 0 0 auto;
			padding: 0.25rem 0.5rem;
			border-radius: var(--radius-sm);
			background: rgba(242, 193, 78, 0.16);
			color: var(--color-accent);
			font-size: 0.82rem;
		}
	}

	.mobile-backdrop {
		position: fixed;
		inset: 0;
		z-index: 10;
		display: block;
		border: 0;
		background: rgba(0, 0, 0, 0.58);
		cursor: pointer;
	}

	.wiki-index {
		position: fixed;
		inset: auto 0 0;
		z-index: 11;
		width: 100%;
		max-height: 86vh;
		padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
		border-radius: var(--radius-md) var(--radius-md) 0 0;
		overflow: hidden;
		transform: translateY(105%);
		transition: transform 0.22s ease;

		&.mobile-open {
			transform: translateY(0);
		}

		.index-toggle {
			display: none;
		}

		.index-scroll {
			height: auto;
			max-height: calc(86vh - 6.6rem);
			padding-right: 0.25rem;
		}
	}

	.index-panel-header {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin-bottom: 0.6rem;
	}

	.index-panel-header .mobile-search {
		width: 100%;
		min-height: 2.75rem;
		padding: 0.65rem 0.75rem;
		border: 1px solid rgba(244, 239, 229, 0.12);
		border-radius: var(--radius-sm);
		background: var(--color-panel-soft);
		color: var(--color-text);
		font-size: 1rem;
	}

	.index-panel-header .mobile-filters {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.45rem;
		overflow-x: auto;
	}

	@media (max-width: 520px) {
		.index-panel-header .mobile-filters {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 360px) {
		.index-panel-header .mobile-filters {
			grid-template-columns: 1fr;
		}
	}

	.index-panel-header select {
		min-height: 2.35rem;
		padding: 0.35rem 0.45rem;
		border: 1px solid rgba(244, 239, 229, 0.12);
		border-radius: var(--radius-sm);
		background: var(--color-panel-soft);
		color: var(--color-text);
		width: 100%;
	}

}

@media (max-width: 560px) {
	.wiki {
		gap: 0.75rem;
	}

	.wiki-header {
		padding: 0.8rem 1rem;
		gap: 0.6rem;

		h1 {
			font-size: 1.5rem;
		}

		.header-meta {
			flex-direction: column;
			align-items: stretch;
			gap: 0.4rem;
		}

		.search {
			min-width: unset;
			width: 100%;
		}

		.count {
			min-width: unset;
			width: 100%;
		}
	}

	.wiki-filters {
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
		padding: 0.7rem 0.8rem;

		.filter-control span {
			font-size: 0.65rem;
		}

		select,
		.clear-filters {
			min-height: 2.1rem;
			font-size: 0.9rem;
		}

		.clear-filters {
			grid-column: 1 / -1;
		}
	}

	.wiki-layout {
		gap: 0.8rem;
	}

	.wiki-index {
		padding: 0.75rem 0.75rem calc(0.75rem + env(safe-area-inset-bottom));
	}

	.wiki-entry {
		padding: 1rem 0.85rem;
	}

	.entry-header {
		padding-bottom: 0.85rem;
		margin-bottom: 0.85rem;

		h2 {
			font-size: 1.35rem;
			margin-bottom: 0.5rem;
			font-weight: 900;
		}

		.required {
			margin-top: 0.65rem;
		}

		.required-label {
			font-size: 0.72rem;
			font-weight: 900;
		}

		.required-pills {
			gap: 0.35rem;
			margin-top: 0.35rem;
			display: flex;
			flex-wrap: wrap;
		}

		.required-pill {
			font-size: 0.78rem;
			padding: 0.2rem 0.48rem;
			min-height: 1.6rem;
			white-space: nowrap;
			font-weight: 800;
		}
	}

	.summary {
		font-size: 0.95rem;
		line-height: 1.55;
		margin: 0 0 1rem;
		font-weight: 700;
	}

	:deep(.inline-difficulty-pill) {
		font-size: 0.78rem;
		padding: 0.15rem 0.42rem;
		min-height: 1.5rem;
		font-weight: 800;
	}

	.content {
		.block {
			font-size: 0.9rem;

			:deep(table) {
				font-size: 0.78rem;
			}

			:deep(th),
			:deep(td) {
				padding: 0.3rem 0.35rem;
			}
		}
	}
}

@media (max-width: 520px) {
	.wiki .mobile-list-toggle {
		top: 0.5rem;
		min-height: 3.3rem;
	}

	.wiki-index {
		max-height: 90vh;

		.index-scroll {
			max-height: calc(90vh - 6.6rem);
		}
	}

	.wiki-filters {
		grid-template-columns: 1fr;
	}

	.entry-header {
		h2 {
			font-size: 1.25rem;
		}

		.required-pill {
			font-size: 0.75rem;
			padding: 0.18rem 0.42rem;
			min-height: 1.5rem;
		}

		.required-pills {
			gap: 0.3rem;
		}
	}
}
</style>
