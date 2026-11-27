<template>
	<section class="session-points ui-panel" aria-labelledby="session-points-title">
		<header class="points-header">
			<h2 id="session-points-title" class="ui-entry-title">{{ t("ui.sessionPoints.title") }}</h2>
			<dl class="points-summary">
				<div v-if="startingBalance !== null">
					<dt>{{ t("ui.sessionPoints.startingBalance") }}</dt>
					<dd>{{ startingBalance }}</dd>
				</div>
				<div>
					<dt>{{ t("ui.sessionPoints.total") }}</dt>
					<dd>{{ character.recordedSessionPoints }}</dd>
				</div>
				<div v-if="startingBalance !== null">
					<dt>{{ t("ui.sessionPoints.overallTotal") }}</dt>
					<dd>{{ character.points.character }}</dd>
				</div>
				<div>
					<dt>{{ t("ui.sessionPoints.trackedSessions") }}</dt>
					<dd>{{ history.length }}</dd>
				</div>
			</dl>
		</header>

		<p v-if="!history.length" class="empty-history">{{ t("ui.sessionPoints.empty") }}</p>
		<ul v-else class="history-list">
			<li v-for="{ session, points } in history" :key="session.id" class="history-row">
				<div class="history-session">
					<span v-if="session.numberLabel">{{ t("ui.timeline.sessionPrefix") }} {{ session.numberLabel }} · {{ session.date }}</span>
					<span v-else>{{ session.date }}</span>
					<strong v-if="session.title">{{ session.title }}</strong>
				</div>
				<span class="history-amount ui-pill is-cyan">
					{{ points > 0 ? `+${points}` : points }} {{ t("ui.sessionPoints.unit") }}
				</span>
				<div class="history-track" aria-hidden="true">
					<div :style="{ width: `${points / largestAward * 100}%` }"></div>
				</div>
			</li>
		</ul>
	</section>
</template>

<script setup>
import { computed } from "vue";
import { campaignSessions } from "@/assets/campaignSessions";
import { tUi as t } from "@/utils/uiText";

const props = defineProps({
	character: { type: Object, required: true },
});

const sessionsById = new Map(campaignSessions.map((session) => [String(session.id), session]));
const history = computed(() => Object.entries(props.character.sessionPoints)
	.map(([id, points]) => ({ session: sessionsById.get(id) ?? { id, date: id }, points }))
	.sort((left, right) => dateSortKey(right.session.date).localeCompare(dateSortKey(left.session.date)) ||
		(right.session.numberLabel ?? 0) - (left.session.numberLabel ?? 0)));
const startingBalance = computed(() => props.character.sessionPointsStart);
const largestAward = computed(() => Math.max(1, ...history.value.map(({ points }) => points)));

function dateSortKey(date) {
	const [day, month, year] = date.split(".");
	return year ? `${year}-${month}-${day}` : "";
}
</script>

<style lang="scss" scoped>
.session-points {
	width: 100%;
	padding: clamp(1rem, 2.8vw, 2rem);
}

.points-header {
	display: grid;
	gap: 1.05rem;
	padding-bottom: 1.25rem;
	border-bottom: 1px solid var(--color-rule);
}

.points-summary {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 8rem), 1fr));
	margin: 0;
	border: 1px solid var(--color-border-muted);
	border-radius: var(--radius-panel);
	background: var(--surface-control);

	div {
		display: grid;
		gap: 0.38rem;
		padding: 0.75rem 0.9rem;
		border-left: 1px solid var(--color-rule);
	}

	div:first-child {
		border-left: 0;
	}

	dt {
		color: var(--color-muted);
		font-size: 0.76rem;
	}

	dd {
		margin: 0;
		color: var(--color-accent);
		font-size: clamp(1.25rem, 2.3vw, 1.6rem);
		font-weight: 760;
		overflow-wrap: anywhere;
		font-variant-numeric: tabular-nums;
	}
}

.empty-history {
	margin: 1rem 0 0;
	padding: 1rem;
	border: 1px dashed var(--color-border-muted);
	border-radius: var(--radius-sm);
	color: var(--color-muted);
	font-size: 0.9rem;
}

.history-list {
	display: grid;
	margin: 1rem 0 0;
	padding: 0;
	list-style: none;
}

.history-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(5rem, 0.8fr) minmax(4.5rem, auto);
	align-items: center;
	gap: 0.55rem 0.75rem;
	padding: 0.75rem 0.25rem;
	border-bottom: 1px solid var(--color-rule);
}

.history-session {
	display: grid;
	justify-items: start;
	gap: 0.2rem;
	overflow-wrap: anywhere;

	span {
		color: var(--color-accent);
		font-size: 0.74rem;
		font-variant-numeric: tabular-nums;
	}
}

.history-amount {
	grid-column: -2;
	grid-row: 1;
	justify-self: end;
}

.history-track {
	grid-column: 2;
	grid-row: 1;
	height: 0.3rem;
	overflow: hidden;
	border-radius: var(--radius-sm);
	background: var(--color-rule);

	div {
		height: 100%;
		border-radius: inherit;
		background: var(--color-cyan);
	}
}

@media (max-width: 560px) {
	.points-summary {
		grid-template-columns: repeat(2, minmax(0, 1fr));

		div:nth-child(odd) {
			border-left: 0;
		}

		div:nth-child(n + 3) {
			border-top: 1px solid var(--color-rule);
		}
	}

	.history-row {
		grid-template-columns: minmax(0, 1fr) auto;
	}

	.history-track {
		grid-column: 1 / -1;
		grid-row: 2;
	}
}
</style>
