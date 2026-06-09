<template>
	<section class="campaign-timeline">
		<header class="timeline-hero">
			<div class="hero-copy">
				<p class="eyebrow">Kampagnenchronik</p>
				<h1>Zeitstrahl der Crew</h1>
				<p>
					Reale Spielabende der Kampagne, nach Kapiteln sortiert. Der Fokus liegt aktuell auf
					den gespielten Sessions und ihren Mitschnitten.
				</p>
			</div>
			<div class="hero-stats" aria-label="Timeline overview">
				<div>
					<strong>{{ sessions.length }}</strong>
					<span>Sessions</span>
				</div>
				<div>
					<strong>{{ chapters.length }}</strong>
					<span>Kapitel</span>
				</div>
				<div>
					<strong>{{ latestSessionDate }}</strong>
					<span>Letzte Session</span>
				</div>
			</div>
		</header>

		<section class="timeline-grid" aria-label="Session timeline">
			<div class="lane-header">
				<span>Spielabende</span>
			</div>

			<template v-for="chapter in chapters" :key="chapter.id">
				<div class="chapter-heading">
					<span>{{ chapter.label }}</span>
				</div>

				<article class="session-list">
					<div
						v-for="session in chapter.sessions"
						:key="session._key"
						class="timeline-card session-card"
					>
						<div class="card-meta">
							<span>{{ session.date }}</span>
							<span>Session {{ session.numberLabel }}</span>
						</div>
						<h2 v-if="session.title">{{ session.title }}</h2>
						<p v-if="session.summary">{{ session.summary }}</p>
						<ul v-if="session.highlights?.length">
							<li v-for="highlight in session.highlights" :key="highlight">{{ highlight }}</li>
						</ul>
					</div>
					<p v-if="!chapter.sessions.length" class="empty-lane">Keine Session eingetragen</p>
				</article>
			</template>
		</section>
	</section>
</template>

<script>
import timelineData from "@/assets/campaignTimeline.json";

export default {
	name: "CampaignTimeline",
	setup() {
		const sessions = timelineData.sessions.map((session, index) => ({
			...session,
			numberLabel: index + 1,
			_key: `session-${session.chapter}-${index}`
		}));
		const chapterLabels = new Map(
			timelineData.chapters.map((chapter) => [chapter.chapter, chapter.label])
		);
		const chapterNumbers = Array.from(new Set([
			...timelineData.chapters.map((chapter) => chapter.chapter),
			...sessions.map((session) => session.chapter)
		])).sort((left, right) => left - right);
		const chapters = chapterNumbers.map((chapter) => ({
			id: `chapter-${chapter}`,
			chapter,
			label: chapterLabels.get(chapter) || `Kapitel ${chapter}`,
			sessions: sessions.filter((session) => session.chapter === chapter)
		}));
		const latestSessionDate = sessions.length ? sessions[sessions.length - 1].date : "-";

		return {
			sessions,
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
	grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.36fr);
	gap: 1rem;
	margin-bottom: 1rem;
	padding: clamp(1.1rem, 2.5vw, 2rem);
	border: 1px solid var(--color-border-strong);
	border-radius: var(--radius-md);
	background:
		linear-gradient(135deg, rgba(242, 193, 78, 0.16), rgba(103, 213, 200, 0.08)),
		var(--color-panel);
	box-shadow: var(--shadow-panel);
}

.hero-copy {
	display: flex;
	flex-direction: column;
	justify-content: center;

	.eyebrow {
		margin: 0 0 0.45rem;
		color: var(--color-accent);
		font-size: 0.78rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		color: var(--color-text);
		font-size: clamp(2rem, 4vw, 4rem);
		line-height: 1;
	}

	p:last-child {
		max-width: 56rem;
		margin: 0.85rem 0 0;
		color: var(--color-muted);
		font-size: 1rem;
		line-height: 1.6;
	}
}

.hero-stats {
	display: grid;
	grid-template-columns: 1fr;
	gap: 0.65rem;

	div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.85rem 1rem;
		border: 1px solid var(--color-border-muted);
		border-radius: var(--radius-sm);
		background: rgba(0, 0, 0, 0.16);
	}

	strong {
		color: var(--color-text);
		font-size: 1.6rem;
		line-height: 1;
	}

	span {
		color: var(--color-muted);
		font-size: 0.78rem;
		font-weight: 900;
		text-transform: uppercase;
	}
}

.timeline-grid {
	display: grid;
	grid-template-columns: minmax(7rem, 0.16fr) minmax(0, 1fr);
	column-gap: 1rem;
	row-gap: 0.8rem;
	align-items: start;
}

.lane-header {
	position: sticky;
	top: 0;
	z-index: 2;
	grid-column: 2;

	span {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		min-height: 2.4rem;
		padding: 0 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: rgba(29, 27, 24, 0.96);
		color: var(--color-text);
		font-weight: 900;
	}
}

.session-list {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding-bottom: 1rem;
}

.chapter-heading {
	position: sticky;
	top: 3.05rem;
	z-index: 1;
	display: flex;
	justify-content: flex-end;
	padding-top: 0.15rem;

	span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.35rem;
		width: 100%;
		padding: 0.25rem 0.65rem;
		border: 1px solid rgba(244, 239, 229, 0.18);
		border-radius: var(--radius-sm);
		background:
			linear-gradient(135deg, rgba(242, 193, 78, 0.16), rgba(29, 27, 24, 0.94)),
			var(--color-panel);
		color: var(--color-accent);
		font-size: 0.76rem;
		font-weight: 900;
		line-height: 1.2;
		text-align: center;
		text-transform: uppercase;
		overflow-wrap: anywhere;
	}
}

.empty-lane {
	padding: 0.8rem 1rem;
	border: 1px dashed var(--color-border-muted);
	border-radius: var(--radius-sm);
	color: var(--color-subtle);
	font-size: 0.9rem;
	font-weight: 800;
	text-align: center;
}

.timeline-card {
	padding: 1rem;
	border: 1px solid var(--color-border-muted);
	border-radius: var(--radius-md);
	background: var(--color-panel);
	box-shadow: var(--shadow-control);

	h2 {
		margin: 0.45rem 0 0.45rem;
		color: var(--color-text);
		font-size: 1.15rem;
		line-height: 1.25;
	}

	p {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.55;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0.75rem 0 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: inline-flex;
		align-items: center;
		min-height: 1.55rem;
		padding: 0.18rem 0.5rem;
		border-radius: var(--radius-sm);
		font-size: 0.78rem;
		font-weight: 900;
	}
}

.session-card {
	border-left: 3px solid var(--color-accent);
}

.card-meta {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 0.45rem;
	color: var(--color-subtle);
	font-size: 0.78rem;
	font-weight: 900;
	text-transform: uppercase;
}

.session-card li {
	border: 1px solid rgba(242, 193, 78, 0.28);
	background: rgba(242, 193, 78, 0.09);
	color: var(--color-accent);
}

@media (max-width: 860px) {
	.timeline-hero {
		grid-template-columns: 1fr;
	}

	.hero-stats {
		grid-template-columns: repeat(3, minmax(0, 1fr));

		div {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.35rem;
		}
	}

	.timeline-grid {
		grid-template-columns: 1fr;
	}

	.lane-header {
		display: none;
	}

	.chapter-heading {
		position: relative;
		top: auto;
		justify-content: flex-start;
		padding-top: 0.35rem;
	}
}

@media (max-width: 560px) {
	.hero-stats {
		grid-template-columns: 1fr;
	}

	.timeline-card {
		padding: 0.9rem;
	}
}
</style>
