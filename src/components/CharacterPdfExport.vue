<template>
	<section class="character-pdf-export" :aria-label="t('ui.pdf.exportAria')">
		<button class="export-button ui-button is-cyan" type="button" :disabled="isExporting" @click="exportCharacterSheet">
			{{ isExporting ? t("ui.pdf.exportingButton") : t("ui.pdf.exportButton") }}
		</button>
	</section>
		<section class="pdf-export-overlay" v-if="isExporting" aria-live="polite">
			<div class="pdf-export-panel">
				<p class="pdf-export-status">{{ exportStatus }}</p>
				<article ref="pdfExportSheet" class="pdf-export-sheet">
					<header class="pdf-sheet-header">
						<div>
							<p class="sheet-eyebrow">{{ t("ui.pdf.sheetTitle") }}</p>
							<h2>{{ characterName }}</h2>
							<p class="generated">{{ t("ui.pdf.generated", { date: pdfExportData.generatedAt }) }}</p>
						</div>
					</header>

					<div class="pdf-grid-two overview-grid">
						<section class="pdf-section">
							<h3>{{ t("ui.pdf.overview") }}</h3>
							<dl class="pdf-stat-list">
								<div class="pdf-stat-row" v-for="row in pdfExportData.coreRows" :key="row.label">
									<dt>{{ row.label }}</dt>
									<dd>{{ row.value }}</dd>
								</div>
							</dl>
						</section>

						<section class="pdf-section">
							<h3>{{ t("ui.pdf.forceSkills") }}</h3>
							<dl class="pdf-stat-list force-list">
								<div class="pdf-stat-row" v-for="row in pdfExportData.forceRows" :key="row.name">
									<dt>{{ row.name }}</dt>
									<dd>{{ row.value }}</dd>
								</div>
							</dl>
						</section>
					</div>

					<section class="pdf-section">
						<h3>{{ t("ui.pdf.trainedSkills") }}</h3>
						<div class="pdf-grid-two trained-skills-grid">
							<ul class="pdf-chip-list" v-for="(column, columnIndex) in pdfExportData.skillColumns"
								:key="`skills-col-${columnIndex}`">
								<li v-for="row in column" :key="`${columnIndex}-${row.skill}-${row.value}`">
									<span>{{ row.skill }}</span>
									<strong>{{ row.value }}</strong>
								</li>
							</ul>
						</div>
						<p class="section-note" v-if="pdfExportData.skillOmitted > 0">
							{{ t("ui.pdf.additionalSkillsOmitted", { count: pdfExportData.skillOmitted }) }}
						</p>
					</section>

					<section class="pdf-section">
						<h3>{{ t("ui.pdf.forcePowerNames") }}</h3>
						<div class="pdf-grid-two power-name-grid">
							<ul class="pdf-name-list" v-for="(column, columnIndex) in pdfExportData.powerNameColumns"
								:key="`power-names-${columnIndex}`">
								<li v-for="name in column" :key="`${columnIndex}-${name}`">{{ name }}</li>
							</ul>
						</div>
					</section>

					<section class="pdf-section power-details-section">
						<h3>{{ t("ui.pdf.forcePowerDetails") }}</h3>
						<article class="pdf-power-card" v-for="row in pdfExportData.powerRows" :key="row.name">
							<header>
								<h4>{{ row.name }}</h4>
								<span>{{ row.time }}</span>
							</header>
							<p class="power-summary" v-if="row.summary">{{ row.summary }}</p>
							<div class="power-detail-grid">
								<div>
									<strong>{{ t("ui.pdf.difficulty") }}</strong>
									<p class="pre-line">{{ row.difficulty }}</p>
								</div>
								<div v-if="row.extras !== '-'">
									<strong>{{ t("ui.pdf.tags") }}</strong>
									<p class="pre-line">{{ row.extras }}</p>
								</div>
							</div>
						</article>
					</section>

				</article>
			</div>
		</section>
</template>

<script>
import { nextTick, ref } from "vue";
import { characters } from "@/assets/characters";
import { getForcePowerSkillName } from "@/assets/power_data";
import { normalizeSkillName } from "@/utils/forcePowerSkills";
import { getUiLanguage, tUi } from "@/utils/uiText";

const MAX_SKILL_ROWS = 30;
const ATTRIBUTE_SHORTCODE = {
	Dexterity: "DEX",
	Strength: "STR",
	Perception: "PER",
	Knowledge: "KNO",
	Mechanical: "MEC",
	Technical: "TEC",
};

let pdfMakeLoadPromise = null;

function registerPdfFonts(pdfMake, pdfFontsModule) {
	const vfsCandidates = [
		pdfFontsModule?.default?.pdfMake?.vfs,
		pdfFontsModule?.pdfMake?.vfs,
		pdfFontsModule?.default?.vfs,
		pdfFontsModule?.vfs,
		pdfFontsModule?.default,
		pdfFontsModule,
	].filter((candidate) => candidate && typeof candidate === "object");

	for (const vfs of vfsCandidates) {
		if (typeof pdfMake.addVirtualFileSystem === "function") {
			pdfMake.addVirtualFileSystem(vfs);
			return true;
		}

		pdfMake.vfs = vfs;
		return true;
	}

	return false;
}

async function loadPdfMake() {
	if (!pdfMakeLoadPromise) {
		pdfMakeLoadPromise = Promise.all([
			import("pdfmake/build/pdfmake"),
			import("pdfmake/build/vfs_fonts"),
		]).then(([pdfMakeModule, pdfFontsModule]) => {
			const pdfMake = pdfMakeModule?.default || pdfMakeModule;
			registerPdfFonts(pdfMake, pdfFontsModule);
			return pdfMake;
		});
	}

	return pdfMakeLoadPromise;
}

function formatDice(dice, pips) {
	if (!Number.isFinite(dice)) return "-";
	const pipText = Number(pips) > 0 ? `+${pips}` : "";
	return `${dice}D${pipText}`;
}

function formatLocalDateForFilename(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function slugifyFilename(value) {
	return String(value || "character")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "") || "character";
}

function toSkillArray(stat) {
	if (!stat?.skills) return [];
	return Array.isArray(stat.skills) ? stat.skills : Object.values(stat.skills);
}

function getSkillDisplayName(skill) {
	if (!skill) return "";
	if (skill.spez) return `${skill.name} (s)`;
	if (skill.adv) return `${skill.name} (A)`;
	return skill.name;
}

function getAttributeShortCode(name) {
	return ATTRIBUTE_SHORTCODE[name] || String(name || "").slice(0, 3).toUpperCase();
}

function toDiceAndPips(dice, pips) {
	const safeDice = Number.isFinite(dice) ? Number(dice) : 0;
	const safePips = Number.isFinite(pips) ? Number(pips) : 0;
	const totalPips = (safeDice * 3) + safePips;
	const normalizedDice = Math.floor(totalPips / 3);
	const normalizedPips = ((totalPips % 3) + 3) % 3;
	return { dice: normalizedDice, pips: normalizedPips };
}

function sumDice(aDice, aPips, bDice, bPips) {
	const left = toDiceAndPips(aDice, aPips);
	const right = toDiceAndPips(bDice, bPips);
	return toDiceAndPips(left.dice + right.dice, left.pips + right.pips);
}

function getDifficultyLevelTitle(item = {}) {
	let level = Number(item.level);
	let plusSuffix = Boolean(item.and_more);

	if (level > 10) {
		level -= 10;
		plusSuffix = true;
	}

	let title = String(item.level ?? "-");
	if (level === 1) title = tUi("ui.difficulty.veryEasy");
	else if (level === 2) title = tUi("ui.difficulty.easy");
	else if (level === 3) title = tUi("ui.difficulty.moderate");
	else if (level === 4) title = tUi("ui.difficulty.difficult");
	else if (level === 5) title = tUi("ui.difficulty.veryDifficult");
	else if (level === 6) title = tUi("ui.difficulty.heroic");

	return plusSuffix ? `${title}+` : title;
}

function decodeHtmlEntities(value) {
	const input = String(value || "");
	if (typeof window !== "undefined" && window.document) {
		const textarea = window.document.createElement("textarea");
		textarea.innerHTML = input;
		return textarea.value;
	}
	return input
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/gi, "&")
		.replace(/&lt;/gi, "<")
		.replace(/&gt;/gi, ">")
		.replace(/&quot;/gi, "\"")
		.replace(/&#39;/gi, "'");
}

function htmlToReadableText(value) {
	if (value == null) return "";

	let text = String(value);
	text = text
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/<\/(p|div|section|article|h[1-6]|ul|ol)>/gi, "\n")
		.replace(/<li[^>]*>/gi, "\n")
		.replace(/<\/li>/gi, "\n")
		.replace(/<\/(th|td)>\s*<(th|td)[^>]*>/gi, " | ")
		.replace(/<\/tr>/gi, "\n")
		.replace(/<[^>]+>/g, "");

	text = decodeHtmlEntities(text)
		.replace(/\u00a0/g, " ")
		.replace(/[ \t]+/g, " ")
		.replace(/ *\n */g, "\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();

	return text;
}

function createPowerTagText(item) {
	const readable = htmlToReadableText(item);
	if (!readable) return "";

	const normalized = readable.toLowerCase();
	if (normalized.startsWith("power can be kept up")) {
		const detail = readable.replace(/^Power can be kept up:?\s*/i, "").trim();
		return detail ? `${tUi("ui.pdf.keptUp")}: ${detail}` : tUi("ui.pdf.keptUp");
	}
	if (normalized.includes("may be kept up") || normalized.includes("kept up as long as") || normalized.includes("aufrechterhalten")) return `${tUi("ui.pdf.keptUp")}: ${readable}`;
	if (normalized.includes("target must be in sight") || normalized.includes("ziel muss")) return `${tUi("ui.pdf.requirement")}: ${tUi("ui.pdf.targetMustBeInSight")}`;
	if (normalized.includes("only be used by characters who have been consumed by the dark side") || normalized.includes("nur von charakteren eingesetzt")) return tUi("ui.pdf.darkSideOnly");
	if (normalized.includes("consumed by the dark side") && (normalized.includes("may not use") || normalized.includes("nicht einsetzen"))) return tUi("ui.pdf.lightSideOnly");
	if (normalized.includes("sith discipline") || normalized.includes("sith-disziplin")) return tUi("ui.pdf.sithDiscipline");
	if (normalized.startsWith("homebrew:")) return `${tUi("ui.pdf.homebrew")}: ${readable.replace(/^Homebrew:\s*/i, "").trim()}`;
	if (normalized.includes("must make a new") || normalized.includes("new roll") || normalized.includes("neuer") || normalized.includes("erneut")) return `${tUi("ui.pdf.newRoll")}: ${readable}`;
	if (normalized.includes("can only affect")) return `${tUi("ui.pdf.limitedScope")}: ${readable}`;
	return `${tUi("ui.pdf.note")}: ${readable}`;
}

function formatModifierText(modifier = {}) {
	const label = htmlToReadableText(modifier?.text || "");

	return label.replace(/^Modified by\s+/i, "").replace(/^Modifiziert durch\s+/i, "").trim();
}

function formatPowerDifficulty(skill, forceStats, language) {
	const powers = Array.isArray(skill?.powers) ? skill.powers : [];
	if (powers.length === 0) return "-";

	const parts = powers
		.map((power) => {
			const difficulty = skill?.difficulty?.[power] || {};
			const entries = Array.isArray(difficulty.level) ? difficulty.level : [];
			const modifiers = Array.isArray(difficulty.modifiers) ? difficulty.modifiers : [];
			const increased = Array.isArray(difficulty.increased) ? difficulty.increased : [];

			const base = entries.map((entry) => {
				const label = getDifficultyLevelTitle(entry);
				const description = htmlToReadableText(entry?.text || "");
				return description ? `${label}, ${description}` : label;
			});
			const modifierText = modifiers
				.map((modifier) => formatModifierText(modifier))
				.filter(Boolean);
			const increasedText = increased
				.map((item) => {
					const add = htmlToReadableText(item?.add || "+");
					const text = htmlToReadableText(item?.text || "-");
					return add === "+" && text === "-" ? "" : `Increase|${add}|${text}`;
				})
				.filter(Boolean);

			const segments = [];
			if (base.length > 0) segments.push(...base);
			if (modifierText.length > 0) segments.push(`${tUi("ui.pdf.modifiers")}: ${modifierText.join("; ")}`);
			if (increasedText.length > 0) segments.push(...increasedText);
			if (segments.length === 0) return null;

			return `${getForcePowerSkillName(language, power)} (${formatDice(forceStats?.[power]?.dice, forceStats?.[power]?.pips)})\n${segments.join("\n")}`;
		})
		.filter(Boolean);

	return parts.length > 0 ? parts.join("\n\n") : "-";
}

function buildPowerDifficultyBlocks(difficultyText) {
	const levelTitles = new Set([
		tUi("ui.difficulty.veryEasy"),
		tUi("ui.difficulty.easy"),
		tUi("ui.difficulty.moderate"),
		tUi("ui.difficulty.difficult"),
		tUi("ui.difficulty.veryDifficult"),
		tUi("ui.difficulty.heroic"),
	]);

	return String(difficultyText || "-")
		.split(/\n{2,}/)
		.map((block) => {
			const [title, ...details] = block.split("\n").map((line) => line.trim()).filter(Boolean);
			if (!title) return null;

			return {
				title,
				details: details.map((detail) => {
					const modifiersPrefix = `${tUi("ui.pdf.modifiers")}:`;
					if (detail.startsWith(modifiersPrefix)) {
						return { type: "meta", label: tUi("ui.pdf.modifiers"), text: detail.replace(modifiersPrefix, "").trim() };
					}

					if (detail.startsWith("Increase|")) {
						const [, label = "", text = ""] = detail.split("|");
						return { type: "increase", label: label.trim(), text: text.trim() };
					}

					const commaMatch = detail.match(/^([^,]+),\s*(.+)$/);
					if (commaMatch) {
						return { type: "level", label: commaMatch[1].trim(), text: commaMatch[2].trim() };
					}

					if (levelTitles.has(detail.replace(/\+$/, ""))) {
						return { type: "level", label: detail, text: "" };
					}

					return { type: "note", label: "", text: detail };
				}),
			};
		})
		.filter(Boolean);
}

function splitIntoColumns(items, columnCount = 2) {
	const normalized = Array.isArray(items) ? items : [];
	const safeColumns = Math.max(1, Number(columnCount) || 1);
	const rowsPerColumn = Math.ceil(normalized.length / safeColumns) || 1;
	const columns = [];

	for (let i = 0; i < safeColumns; i += 1) {
		columns.push(normalized.slice(i * rowsPerColumn, (i + 1) * rowsPerColumn));
	}

	return columns;
}

export default {
	props: {
		characterName: {
			type: String,
			required: true,
		},
		character: {
			type: Object,
			default: () => characters[0],
		},
	},
	setup(props) {
		const isExporting = ref(false);
		const exportStatus = ref(tUi("ui.pdf.preparing"));
		const pdfExportSheet = ref(null);
		const pdfExportData = ref(createEmptyExportData());

		function createEmptyExportData() {
			return {
				generatedAt: "",
				coreRows: [],
				forceRows: [],
				skillRows: [],
				skillColumns: [[], []],
				skillOmitted: 0,
				powerNameColumns: [[], []],
				powerRows: [],
			};
		}

		function buildSkillRows() {
			const rows = [];
			for (const stat of props.character?.stats || []) {
				const attributeCode = getAttributeShortCode(stat.name);
				for (const skill of toSkillArray(stat)) {
					const combined = sumDice(stat.dice, stat.pips, skill.dice, skill.pips);
					rows.push({
						skill: `${getSkillDisplayName(skill)} (${attributeCode})`,
						value: formatDice(combined.dice, combined.pips),
					});
				}
			}
			return rows;
		}

		function buildPowerRows() {
			const language = getUiLanguage();
			const powerLabels = props.character?.createPowerProfile?.(language)?.getPowerLabels?.() || [];
			const allPowers = powerLabels.flatMap((label) => label.getSkills());
			const powerByName = new Map();

			for (const skill of allPowers) {
				const normalized = normalizeSkillName(skill?.name);
				if (!normalized || powerByName.has(normalized)) continue;
				powerByName.set(normalized, skill);
			}

			return [...powerByName.values()]
				.sort((a, b) => String(a.name).localeCompare(String(b.name)))
				.map((skill) => ({
					name: htmlToReadableText(skill.name),
					summary: htmlToReadableText(skill.summary || ""),
					difficulty: formatPowerDifficulty(skill, props.character?.forceStats || {}, language),
					time: htmlToReadableText([
						skill.timeToUse || tUi("ui.difficulty.defaultTimeToUse"),
						skill.timeToUseNote,
					].filter(Boolean).join(" - ")),
					extras: Array.isArray(skill.extra) && skill.extra.length > 0
						? skill.extra.map((item) => createPowerTagText(item)).filter(Boolean).join("\n")
						: "-",
				}));
		}

		function buildExportData() {
			const now = new Date();
			const skillRows = buildSkillRows();
			const visibleSkills = skillRows.slice(0, MAX_SKILL_ROWS);
			const skillColumns = splitIntoColumns(visibleSkills, 2);
			const powerRows = buildPowerRows();
			const points = props.character?.points || {};
			const forceStats = props.character?.forceStats || {};
			const language = getUiLanguage();
			const powerNames = powerRows.map((row) => row.name);
			const powerNameColumns = splitIntoColumns(powerNames, 2);

			return {
				generatedAt: now.toLocaleString(),
				coreRows: [
					{ label: tUi("ui.pdf.characterPoints"), value: String(points.character) },
					{ label: tUi("ui.pdf.spentPoints"), value: String(points.spent) },
					{ label: tUi("ui.pdf.forcePoints"), value: String(points.force) },
					{ label: tUi("ui.pdf.temporaryForce"), value: String(points.force_temp ?? "") },
					{ label: tUi("ui.pdf.darkSidePoints"), value: String(points.darkside) },
				],
				forceRows: [
					{ name: getForcePowerSkillName(language, "control"), value: formatDice(forceStats.control?.dice, forceStats.control?.pips) },
					{ name: getForcePowerSkillName(language, "sense"), value: formatDice(forceStats.sense?.dice, forceStats.sense?.pips) },
					{ name: getForcePowerSkillName(language, "alter"), value: formatDice(forceStats.alter?.dice, forceStats.alter?.pips) },
				],
				skillRows: visibleSkills,
				skillColumns,
				skillOmitted: Math.max(0, skillRows.length - visibleSkills.length),
				powerNameColumns,
				powerRows,
			};
		}

		async function waitForRender() {
			await nextTick();
			await new Promise((resolve) => requestAnimationFrame(resolve));
		}

		async function createPdfNative(filenameDate) {
			try {
				console.log("Starting PDF creation...");
				const pdfMake = await loadPdfMake();
				const vfsLoaded = Boolean(pdfMake?.vfs);
				if (!vfsLoaded) console.warn("VFS fonts could not be registered. PDF generation may fail.");

				console.log("pdfMake object ready:", !!pdfMake);

				const sectionTitle = (text, margin = [0, 6, 0, 4], lineWidth = 235) => ({
					stack: [
						{
							canvas: [{ type: "line", x1: 0, y1: 0, x2: lineWidth, y2: 0, lineWidth: 0.5, lineColor: "#d1d5db" }],
							margin: [0, 0, 0, 3],
						},
						{
							text,
							fontSize: 11,
							bold: true,
							color: "#111827",
							characterSpacing: 0.2,
						},
					],
					margin,
				});
				const labelValueLines = (rows) => rows.map((row) => ({
					stack: [
						{
							columns: [
								{ width: 82, text: row.label || row.name, bold: true, fontSize: 9, color: "#111827" },
								{ width: "auto", text: row.value || " ", bold: true, fontSize: 9, color: "#000000" },
							],
							columnGap: 6,
						},
						{
							canvas: [{ type: "line", x1: 0, y1: 0, x2: 145, y2: 0, lineWidth: 0.35, lineColor: "#e5e7eb" }],
							margin: [0, 2, 0, 0],
						},
					],
					margin: [0, 0, 0, 3],
				}));
				const chipLines = (rows) => rows.map((row) => ({
					stack: [
						{
							columns: [
								{ width: 130, text: row.skill, fontSize: 8.5, color: "#111827" },
								{ width: "auto", text: row.value, bold: true, fontSize: 8.5, color: "#000000" },
							],
							columnGap: 6,
						},
						{
							canvas: [{ type: "line", x1: 0, y1: 0, x2: 255, y2: 0, lineWidth: 0.35, lineColor: "#e5e7eb" }],
							margin: [0, 2, 0, 0],
						},
					],
					margin: [0, 0, 0, 2],
				}));
				const powerDifficultyStack = (difficultyText) => buildPowerDifficultyBlocks(difficultyText).flatMap((block) => [
					{
						text: block.title,
						bold: true,
						fontSize: 8,
						color: "#111827",
						margin: [0, 2, 0, 1],
					},
					...block.details.map((detail) => ({
						columns: [
							{
								width: 62,
								text: detail.label,
								bold: Boolean(detail.label),
								fontSize: 7.3,
								color: detail.type === "level" ? "#111827" : "#4b5563",
							},
							{
								width: "*",
								text: detail.text,
								fontSize: 7.3,
								color: "#374151",
							},
						],
						columnGap: 8,
						margin: [10, detail.type === "level" ? 0 : 3, 0, 2],
					})),
				]);
				const powerNameLines = (names) => names.map((name) => ({
					stack: [
						{ text: name, fontSize: 8, color: "#111827" },
						{
							canvas: [{ type: "line", x1: 0, y1: 0, x2: 255, y2: 0, lineWidth: 0.3, lineColor: "#eef0f3" }],
							margin: [0, 2, 0, 0],
						},
					],
					margin: [0, 0, 0, 2],
				}));
				const powerDetailBlocks = pdfExportData.value.powerRows.map((row, index) => ({
					unbreakable: true,
					stack: [
						{
							stack: [
								{
									text: [
										{ text: row.name, bold: true, fontSize: 10.5, color: "#111827" },
										{ text: `   ${row.time}`, fontSize: 7.3, color: "#4b5563" },
									],
									margin: [0, 0, 0, 2],
								},
								...(row.summary
									? [{ text: row.summary, fontSize: 8, color: "#374151", margin: [0, 0, 0, 5] }]
									: []),
								{
									columns: [
										{
											width: "*",
											stack: powerDifficultyStack(row.difficulty),
										},
										{
											width: 135,
											stack: row.extras !== "-"
												? [
													{
														canvas: [{ type: "line", x1: 0, y1: 0, x2: 135, y2: 0, lineWidth: 0.35, lineColor: "#d1d5db" }],
														margin: [0, 4, 0, 3],
													},
													{ text: row.extras, fontSize: 7.2, color: "#4b5563", margin: [0, 0, 0, 0] },
												]
												: [],
										},
									],
									columnGap: 14,
								},
								...(index < pdfExportData.value.powerRows.length - 1
									? [{
										canvas: [{ type: "line", x1: 0, y1: 0, x2: 539, y2: 0, lineWidth: 0.35, lineColor: "#d1d5db" }],
										margin: [0, 6, 0, 0],
									}]
									: []),
							],
							margin: [0, 0, 0, 7],
						},
					],
				}));

				const docDefinition = {
					pageMargins: [28, 26, 28, 26],
					defaultStyle: {
						font: "Roboto",
						size: 11,
						color: "#000000"
					},
					content: [
						{
							text: tUi("ui.pdf.sheetTitle"),
							fontSize: 9,
							color: "#666666",
							margin: [0, 0, 0, 2]
						},
						{
							text: props.characterName,
							fontSize: 18,
							bold: true,
							color: "#000000",
							margin: [0, 0, 0, 3]
						},
						{
							text: tUi("ui.pdf.generated", { date: pdfExportData.value.generatedAt }),
							fontSize: 9,
							color: "#666666",
							margin: [0, 0, 0, 8]
						},
						{
							columns: [
								{
									width: 306,
									stack: [
										sectionTitle(tUi("ui.pdf.overview")),
										...labelValueLines(pdfExportData.value.coreRows),
									]
								},
								{
									width: 223,
									stack: [
										sectionTitle(tUi("ui.pdf.forceSkills"), [0, 6, 0, 4], 205),
										...labelValueLines(pdfExportData.value.forceRows),
									]
								}
							],
							columnGap: 10,
							margin: [0, 0, 0, 6]
						},
						sectionTitle(tUi("ui.pdf.trainedSkills"), [0, 6, 0, 3]),
						{
							columns: pdfExportData.value.skillColumns.map((column) => ({
								width: 264.5,
								stack: chipLines(column),
							})),
							columnGap: 10,
							margin: [0, 0, 0, 3]
						},
						...(pdfExportData.value.skillOmitted > 0
							? [{
								text: tUi("ui.pdf.additionalSkillsOmittedShort", { count: pdfExportData.value.skillOmitted }),
								fontSize: 8,
								color: "#666666",
								margin: [0, 0, 0, 8]
							}]
							: []),
						sectionTitle(tUi("ui.pdf.forcePowerNames"), [0, 6, 0, 2]),
						{
							columns: pdfExportData.value.powerNameColumns.map((column) => ({
								width: 264.5,
								stack: powerNameLines(column),
							})),
							columnGap: 10,
							margin: [0, 0, 0, 4]
						},
						{
							stack: [
								{
									text: tUi("ui.pdf.forcePowerDetails"),
									fontSize: 11,
									bold: true,
									color: "#000000",
								},
								{
									canvas: [{ type: "line", x1: 0, y1: 0, x2: 539, y2: 0, lineWidth: 1.1, lineColor: "#111827" }],
									margin: [0, 4, 0, 0],
								},
							],
							margin: [0, 6, 0, 8],
							pageBreak: "before",
						},
						...powerDetailBlocks,
					]
				};

				const pdf = pdfMake.createPdf(docDefinition);
				console.log("PDF object created:", !!pdf);
				const filename = `${slugifyFilename(props.characterName)}-character-sheet-${filenameDate}.pdf`;
				console.log("Attempting download with filename:", filename);
				const blob = pdf.getBlob.length === 0
					? await pdf.getBlob()
					: await new Promise((resolve) => pdf.getBlob(resolve));
				const url = window.URL.createObjectURL(blob);
				const link = window.document.createElement("a");
				link.href = url;
				link.download = filename;
				link.style.display = "none";
				window.document.body.appendChild(link);
				link.click();
				link.remove();
				window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
				console.log("Blob download method called");
			} catch (error) {
				console.error("PDF creation error:", error);
				throw error;
			}
		}

		async function exportCharacterSheet() {
			if (isExporting.value) return;

			isExporting.value = true;
			exportStatus.value = tUi("ui.pdf.building");

			try {
				const filenameDate = formatLocalDateForFilename(new Date());
				pdfExportData.value = buildExportData();
				await waitForRender();

				exportStatus.value = tUi("ui.pdf.generating");
				await createPdfNative(filenameDate);
			} catch (error) {
				console.error("PDF export failed", error);
				window.alert(tUi("ui.pdf.failedAlert"));
			} finally {
				isExporting.value = false;
				exportStatus.value = tUi("ui.pdf.preparing");
			}
		}

		return {
			exportCharacterSheet,
			pdfExportSheet,
			pdfExportData,
			exportStatus,
			isExporting,
			t: tUi,
		};
	},
};
</script>

<style lang="scss" scoped>
.character-pdf-export {
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin: 0.55rem 0 0.75rem;
}

.export-button {
	min-height: 2.35rem;
	padding: 0.4rem 0.95rem;
	font-size: 0.9rem;

	&:hover {
		border-color: rgba(103, 213, 200, 0.72);
		background: rgba(103, 213, 200, 0.2);
	}

	&:disabled {
		opacity: 0.7;
		cursor: progress;
	}
}

.pdf-export-overlay {
	position: fixed;
	inset: 0;
	z-index: 30;
	display: grid;
	place-items: center;
	padding: 1rem;
	background: rgba(0, 0, 0, 0.72);
	overflow: auto;
}

.pdf-export-panel {
	width: min(100%, 214mm);
}

.pdf-export-status {
	margin: 0 0 0.6rem;
	color: #f4efe5;
	font-size: 0.86rem;
	font-weight: 800;
	letter-spacing: 0;
	text-transform: uppercase;
}

.pdf-export-sheet {
	width: 100%;
	padding: 12mm;
	border-radius: 0;
	background: #ffffff;
	color: #000000;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 13px;
	line-height: 1.48;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
	-webkit-print-color-adjust: exact !important;
	print-color-adjust: exact !important;
	color-adjust: exact !important;
}

.pdf-sheet-header {
	padding-bottom: 0.8rem;
	margin-bottom: 0.8rem;
	border-bottom: 3px solid #1f2937;

	h2 {
		margin: 0.2rem 0 0;
		font-size: 1.8rem;
		line-height: 1.2;
		color: #000000;
		font-weight: 900;
	}

	.sheet-eyebrow {
		margin: 0 0 0.3rem;
		font-size: 0.75rem;
		font-weight: 900;
		text-transform: uppercase;
		color: #333333;
		letter-spacing: 1px;
	}

	.generated {
		margin: 0.4rem 0 0;
		font-size: 0.8rem;
		color: #666666;
	}
}

.pdf-section {
	margin-top: 0.9rem;
	margin-bottom: 0.6rem;
	break-inside: avoid;
	page-break-inside: avoid;

	h3 {
		margin: 0 0 0.4rem;
		padding: 0.26rem 0;
		font-size: 0.9rem;
		font-weight: 900;
		text-transform: uppercase;
		color: #111827;
		border-top: 1px solid #d1d5db;
		letter-spacing: 0.3px;
	}
}

.pdf-grid-two {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.5rem;
}

.pre-line {
	white-space: pre-line;
}

.pdf-stat-list,
.pdf-chip-list,
.pdf-name-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.pdf-stat-row,
.pdf-chip-list li {
	display: flex;
	align-items: baseline;
	justify-content: flex-start;
	gap: 0.65rem;
	padding: 0.24rem 0;
	border-bottom: 1px solid #e5e7eb;
	color: #000000;
}

.pdf-stat-row {
	dt,
	dd {
		margin: 0;
	}

	dt {
		width: 9rem;
		font-weight: 900;
		color: #111827;
	}

	dd {
		font-weight: 700;
		text-align: left;
	}
}

.pdf-chip-list li {
	font-size: 0.8rem;

	strong {
		min-width: 3rem;
		text-align: right;
	}
}

.pdf-name-list {
	display: flex;
	flex-direction: column;
	gap: 0.18rem;

	li {
		padding: 0.12rem 0;
		border-bottom: 1px solid #eef0f3;
		font-size: 0.78rem;
	}
}

.pdf-power-card {
	padding: 0.55rem 0;
	border-top: 1px solid #d1d5db;
	break-inside: avoid;
	page-break-inside: avoid;

	header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.22rem;
	}

	h4 {
		margin: 0;
		font-size: 0.92rem;
		line-height: 1.2;
	}

	header span {
		color: #4b5563;
		font-size: 0.74rem;
		font-weight: 800;
		text-align: right;
	}

	.power-summary {
		margin: 0 0 0.4rem;
		color: #374151;
		font-size: 0.78rem;
	}

	.power-detail-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.8fr);
		gap: 0.7rem;

		strong {
			display: block;
			margin-bottom: 0.12rem;
			font-size: 0.72rem;
			text-transform: uppercase;
			color: #111827;
		}

		p {
			margin: 0;
			font-size: 0.72rem;
		}
	}
}

.power-details-section {
	break-before: page;
	page-break-before: always;
}

.section-note {
	margin: 0.3rem 0 0;
	font-size: 0.75rem;
	color: #333333;
	font-style: italic;
}

@media (max-width: 760px) {
	.export-button {
		width: 100%;
	}
}
</style>
