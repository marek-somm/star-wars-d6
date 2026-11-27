<template>
	<section class="campaign-timeline">
		<header class="timeline-hero">
			<div class="hero-copy">
				<h1>{{ t("ui.timeline.title") }}</h1>
				<p>{{ t("ui.timeline.description") }}</p>
			</div>
			<div class="hero-stats" :aria-label="t('ui.timeline.overviewAria')">
				<div>
					<strong>{{ sessions.length }}</strong>
					<span>{{ t("ui.timeline.sessions") }}</span>
				</div>
				<div>
					<strong>{{ chapters.length }}</strong>
					<span>{{ t("ui.timeline.chapters") }}</span>
				</div>
				<div>
					<strong>{{ latestSessionDate }}</strong>
					<span>{{ t("ui.timeline.latestSession") }}</span>
				</div>
			</div>
		</header>

		<section class="timeline-grid" :aria-label="t('ui.timeline.timelineAria')">
			<section v-for="chapter in chapters" :key="chapter.id" class="chapter-section">
				<h2 class="chapter-heading">{{ chapter.label }}</h2>

				<div class="session-list">
					<article
						v-for="session in chapter.sessions"
						:key="session.id"
						class="timeline-card session-card"
					>
						<div class="session-content" :class="{ 'has-projection': sessionSketches.has(session.id) }">
							<div class="session-heading">
								<div class="card-meta">
									<span>{{ session.date }}</span>
									<span>{{ t("ui.timeline.sessionPrefix") }} {{ session.numberLabel }}</span>
								</div>
								<h3 v-if="session.title">{{ session.title }}</h3>
							</div>
							<div v-if="sessionSketches.has(session.id)" class="session-projection">
								<SessionHologram :portraits="sessionSketches.get(session.id)" class="projection-stage" />
							</div>
							<div v-if="session.summary || session.highlights?.length" class="session-copy">
								<p v-if="session.summary">{{ session.summary }}</p>
								<ul v-if="session.highlights?.length" class="session-highlights" role="list">
									<li v-for="highlight in session.highlights" :key="highlight">{{ highlight }}</li>
								</ul>
							</div>
						</div>
						<div v-if="sessionAwards.has(session.id)" class="session-awards">
							<span>{{ t("ui.sessionPoints.earned") }}</span>
							<span v-for="{ character, points } in sessionAwards.get(session.id)" :key="character.id" class="ui-pill is-cyan">
								{{ character.name }} · {{ points > 0 ? `+${points}` : points }} {{ t("ui.sessionPoints.unit") }}
							</span>
						</div>
					</article>
					<p v-if="!chapter.sessions.length" class="empty-lane">{{ t("ui.timeline.emptyChapter") }}</p>
				</div>
			</section>
		</section>
	</section>
</template>

<script>
import { computed } from "vue";
import { campaignSessions, getSessionPoints } from "@/assets/campaignSessions";
import timelineData from "@/assets/campaignTimeline.json";
import { characters } from "@/assets/characters";
import { tUi } from "@/utils/uiText";
import SessionHologram from "./SessionHologram.vue";

const sketchFiles = import.meta.glob("../assets/timeline-sketches/*.webp", {
	eager: true,
	query: "?url",
	import: "default",
});

function toRomanNumeral(value) {
	const numerals = [
		[1000, "M"],
		[900, "CM"],
		[500, "D"],
		[400, "CD"],
		[100, "C"],
		[90, "XC"],
		[50, "L"],
		[40, "XL"],
		[10, "X"],
		[9, "IX"],
		[5, "V"],
		[4, "IV"],
		[1, "I"],
	];
	let number = Math.max(0, Number(value) || 0);
	let result = "";

	for (const [amount, numeral] of numerals) {
		while (number >= amount) {
			result += numeral;
			number -= amount;
		}
	}

	return result || String(value || "");
}

function getChapterLabel(chapter, fallbackLabel) {
	if (String(fallbackLabel || "").match(/^Kapitel\s+[IVXLCDM]+$/i)) {
		return `${tUi("ui.timeline.chapterFallbackPrefix")} ${toRomanNumeral(chapter)}`;
	}

	return fallbackLabel || `${tUi("ui.timeline.chapterFallbackPrefix")} ${toRomanNumeral(chapter)}`;
}

export default {
	name: "CampaignTimeline",
	components: { SessionHologram },
	setup() {
		const sessions = campaignSessions;
		const sessionAwards = new Map();
		const sessionSketches = new Map();
		for (const session of sessions) {
			const entries = characters.map((character) => ({
				character,
				points: getSessionPoints(character, session),
			})).filter(({ points }) => points !== undefined);
			if (entries.length) sessionAwards.set(session.id, entries);

			const sketches = (session.characterIds ?? []).map((id) => ({
				id,
				src: sketchFiles[`../assets/timeline-sketches/${id}.webp`],
			})).filter(({ src }) => src);
			if (sketches.length) sessionSketches.set(session.id, sketches);
		}
		const chapterLabels = new Map(
			timelineData.chapters.map((chapter) => [chapter.chapter, chapter.label])
		);
		const chapterNumbers = Array.from(new Set([
			...timelineData.chapters.map((chapter) => chapter.chapter),
			...sessions.map((session) => session.chapter)
		])).sort((left, right) => right - left);
		const chapters = computed(() => chapterNumbers.map((chapter) => ({
			id: `chapter-${chapter}`,
			chapter,
			label: getChapterLabel(chapter, chapterLabels.get(chapter)),
			sessions: sessions.filter((session) => session.chapter === chapter).reverse()
		})));
		const latestSessionDate = computed(() => sessions.length
			? sessions[sessions.length - 1].date
			: tUi("ui.timeline.latestSessionFallback"));

		return {
			t: tUi,
			sessions,
			sessionAwards,
			sessionSketches,
			latestSessionDate,
			chapters
		};
	}
};
</script>

<style lang="scss" scoped>
.campaign-timeline {
	width: 100%;
}

.timeline-hero {
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(15rem, 20rem);
	align-items: center;
	gap: clamp(1.3rem, 3vw, 2.8rem);
	margin-bottom: clamp(1.35rem, 2.4vw, 2.25rem);
	padding: clamp(1.15rem, 3.1vw, 2.6rem);
	border: 1px solid var(--color-border);
	border-radius: 0.85rem;
	background: var(--page-heading-background);
	box-shadow: var(--shadow-panel);
}

.hero-copy {
	min-width: 0;

	h1 {
		margin: 0;
		color: var(--color-text);
		font-size: clamp(2rem, 4.2vw, 3.75rem);
		line-height: 1.04;
		letter-spacing: -0.04em;
		text-wrap: balance;
		overflow-wrap: anywhere;
	}

	p {
		max-width: 62ch;
		margin: 0.75rem 0 0;
		color: var(--color-muted);
		font-size: 0.97rem;
		line-height: 1.58;
	}
}

.hero-stats {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 0.72rem 1.05rem;
	padding-left: clamp(1.15rem, 2.5vw, 2rem);
	border-left: 1px solid var(--color-rule);

	div {
		display: grid;
		align-content: start;
		gap: 0.24rem;
		min-width: 0;
	}

	div:last-child {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.3rem 0.7rem;
		padding-top: 0.72rem;
		border-top: 1px solid var(--color-rule);

		strong {
			font-size: 1.08rem;
		}
	}

	strong {
		color: var(--color-text);
		font-size: 1.62rem;
		font-variant-numeric: tabular-nums;
		line-height: 1.12;
	}

	span {
		color: var(--color-muted);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.065em;
		line-height: 1.25;
		text-transform: uppercase;
	}
}

.timeline-grid {
	display: grid;
	gap: clamp(1.35rem, 3vw, 2.55rem);
}

.chapter-section {
	--card-padding: clamp(0.9rem, 1.65vw, 1.5rem);
	--card-border-width: 1px;
	--rail-offset: 1rem;
	--rail-marker-y: calc(var(--card-padding) + 0.45rem);
	display: grid;
	grid-template-columns: clamp(6rem, 9.5vw, 9rem) minmax(0, 1fr);
	align-items: start;
	column-gap: 1.8rem;
	scroll-margin-top: 1.2rem;
}

.chapter-heading {
	position: sticky;
	top: 1.2rem;
	z-index: 1;
	min-width: 0;
	margin: 0;
	padding: 1.23rem 0 0.65rem;
	color: var(--color-accent);
	font-size: 0.74rem;
	font-weight: 850;
	letter-spacing: 0.13em;
	line-height: 1.35;
	text-align: right;
	text-transform: uppercase;
	overflow-wrap: anywhere;
}

.session-list {
	position: relative;
	display: grid;
	gap: 0.85rem;
	min-width: 0;

	&::before {
		content: "";
		position: absolute;
		inset: calc(var(--rail-marker-y) + var(--card-border-width)) auto 1.45rem calc(-1 * var(--rail-offset));
		width: 1px;
		background: rgba(242, 193, 78, 0.28);
		transform: translateX(-50%);
		pointer-events: none;
	}
}

.empty-lane {
	margin: 0;
	padding: 0.85rem 1rem;
	border: 1px dashed var(--color-border-muted);
	border-radius: var(--radius-sm);
	color: var(--color-muted);
	font-size: 0.88rem;
}

.session-card {
	position: relative;
	container-type: inline-size;
	padding: var(--card-padding);
	border: var(--card-border-width) solid var(--color-border-muted);
	border-radius: 0.75rem;
	background:
		linear-gradient(150deg, rgba(242, 193, 78, 0.028), transparent 48%),
		var(--color-panel);
	box-shadow: var(--shadow-control);

	&::before,
	&::after {
		content: "";
		position: absolute;
		top: var(--rail-marker-y);
		left: calc(-1 * var(--rail-offset) - var(--card-border-width));
		pointer-events: none;
	}

	&::before {
		width: calc(var(--rail-offset) + var(--card-border-width));
		height: 1px;
		background: linear-gradient(to right, rgba(242, 193, 78, 0.57), rgba(242, 193, 78, 0.22));
		transform: translateY(-50%);
	}

	&::after {
		width: 0.36rem;
		height: 0.36rem;
		border-radius: 50%;
		background: #dfb762;
		box-shadow: 0 0 0 2px rgba(242, 193, 78, 0.07);
		transform: translate(-50%, -50%);
	}
}

.session-content {
	display: grid;
	gap: 0.58rem;
	min-width: 0;
}

.session-content.has-projection {
	row-gap: 0.85rem;
}

.session-heading,
.session-copy {
	min-width: 0;
	max-width: 70ch;
}

.session-heading h3 {
	margin: 0.45rem 0 0;
	color: var(--color-text);
	font-size: clamp(1.22rem, 1.1rem + 0.65vw, 1.62rem);
	font-weight: 770;
	letter-spacing: -0.022em;
	line-height: 1.22;
	overflow-wrap: anywhere;
}

.session-copy p {
	margin: 0;
	color: var(--color-muted);
	font-size: 0.96rem;
	line-height: 1.67;
	overflow-wrap: anywhere;
}

.card-meta {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.35rem 0.62rem;
	color: var(--color-muted);
	font-size: 0.7rem;
	font-variant-numeric: tabular-nums;
	font-weight: 730;
	letter-spacing: 0.08em;
	line-height: 1.3;
	text-transform: uppercase;

	span:first-child {
		color: var(--color-accent);
	}

	span + span {
		display: inline-flex;
		align-items: center;
		gap: 0.62rem;

		&::before {
			content: "";
			width: 0.19rem;
			height: 0.19rem;
			border-radius: 50%;
			background: var(--color-subtle);
		}
	}
}

.session-highlights {
	display: flex;
	flex-wrap: wrap;
	gap: 0.42rem 1.05rem;
	margin: 0.82rem 0 0;
	padding: 0.74rem 0 0;
	border-top: 1px solid var(--color-rule);
	list-style: none;

	li {
		display: flex;
		align-items: baseline;
		gap: 0.43rem;
		min-width: 0;
		color: var(--color-text);
		font-size: 0.81rem;
		font-weight: 600;
		line-height: 1.4;
		overflow-wrap: anywhere;

		&::before {
			content: "";
			flex: 0 0 0.3rem;
			height: 0.3rem;
			border: 1px solid rgba(242, 193, 78, 0.72);
			border-radius: 50%;
			transform: translateY(-0.1em);
		}
	}
}

.session-projection {
	position: relative;
	display: grid;
	align-items: center;
	min-width: 0;
	min-height: 9.4rem;
	padding: 0.45rem 0.25rem;
	border: 1px solid rgba(126, 199, 220, 0.17);
	border-radius: 0.62rem;
	background:
		radial-gradient(ellipse at 50% 84%, rgba(82, 174, 209, 0.105), transparent 69%),
		linear-gradient(160deg, #1a2020, #141818);
	isolation: isolate;

	&::before,
	&::after {
		content: "";
		position: absolute;
		width: 0.58rem;
		height: 0.58rem;
		border-color: rgba(126, 199, 220, 0.36);
		border-style: solid;
		pointer-events: none;
	}

	&::before {
		top: 0.48rem;
		left: 0.48rem;
		border-width: 1px 0 0 1px;
		border-top-left-radius: 2px;
	}

	&::after {
		right: 0.48rem;
		bottom: 0.48rem;
		border-width: 0 1px 1px 0;
		border-bottom-right-radius: 2px;
	}

	.projection-stage {
		margin: 0 auto;
	}
}

.session-awards {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.45rem 0.6rem;
	margin-top: 0.95rem;
	padding-top: 0.76rem;
	border-top: 1px solid var(--color-rule);

	> span:first-child {
		color: var(--color-muted);
		font-size: 0.78rem;
		font-weight: 680;
	}
}

@container (min-width: 43rem) {
	.session-content.has-projection {
		grid-template-columns: minmax(0, 1fr) minmax(16.5rem, 0.76fr);
		grid-template-rows: auto 1fr;
		grid-template-areas:
			"heading projection"
			"copy projection";
		gap: 0.58rem clamp(1.15rem, 2.4cqw, 1.85rem);

		.session-heading {
			grid-area: heading;
		}

		.session-copy {
			grid-area: copy;
		}
	}

	.session-projection {
		grid-area: projection;
		align-self: center;
		min-height: clamp(11.25rem, 19cqw, 14.5rem);
	}
}

@media (max-width: 48rem) {
	.timeline-hero {
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.hero-stats {
		grid-template-columns: repeat(2, minmax(0, 1fr)) minmax(max-content, 1.35fr);
		gap: 0.48rem 0.72rem;
		padding: 0.85rem 0 0;
		border-top: 1px solid var(--color-rule);
		border-left: 0;

		div:last-child {
			grid-column: auto;
			display: grid;
			align-content: start;
			gap: 0.24rem;
			padding: 0;
			border: 0;

			strong {
				font-size: clamp(1rem, 4vw, 1.34rem);
			}
		}

		strong {
			font-size: clamp(1.25rem, 4.6vw, 1.55rem);
		}

		span {
			font-size: 0.65rem;
			letter-spacing: 0.04em;
		}
	}

	.chapter-section {
		--rail-offset: 0.52rem;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.65rem;
		padding-left: 0.32rem;
	}

	.chapter-heading {
		position: static;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0;
		text-align: left;

		&::after {
			content: "";
			flex: 1 1 1rem;
			height: 1px;
			background: linear-gradient(to right, var(--color-border), transparent);
		}
	}
}
</style>
