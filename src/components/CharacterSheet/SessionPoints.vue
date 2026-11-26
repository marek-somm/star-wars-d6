<template>
	<section class="session-points ui-panel" aria-labelledby="session-points-title">
		<header class="points-header">
			<h2 id="session-points-title">{{ t("ui.sessionPoints.title") }}</h2>
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
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding-bottom: 1.25rem;
	border-bottom: 1px solid var(--color-rule);

	h2 {
		margin: 0;
		font-size: clamp(1.45rem, 3vw, 2rem);
	}
}

.points-summary {
	display: flex;
	flex-wrap: wrap;
	gap: 0.55rem;
	margin: 0;

	div {
		display: flex;
		align-items: baseline;
		gap: 0.55rem;
		padding: 0.6rem 0.8rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--surface-accent);
	}

	dt {
		color: var(--color-muted);
		font-size: 0.85rem;
	}

	dd {
		margin: 0;
		color: var(--color-accent);
		font-size: 1.2rem;
		font-weight: 900;
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
	gap: 0.5rem;
	margin: 1rem 0 0;
	padding: 0;
	list-style: none;
}

.history-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(5rem, 0.8fr) minmax(4.5rem, auto);
	align-items: center;
	gap: 0.55rem 0.75rem;
	padding: 0.7rem 0.8rem;
	border: 1px solid var(--color-border-muted);
	border-radius: var(--radius-sm);
	background: var(--surface-control);
}

.history-session {
	display: grid;
	justify-items: start;
	gap: 0.2rem;
	overflow-wrap: anywhere;

	span {
		color: var(--color-muted);
		font-size: 0.8rem;
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
	.history-row {
		grid-template-columns: minmax(0, 1fr) auto;
	}

	.history-track {
		grid-column: 1 / -1;
		grid-row: 2;
	}
}
</style>
