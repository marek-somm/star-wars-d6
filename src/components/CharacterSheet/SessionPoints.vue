<template>
	<section class="session-points ui-panel" aria-labelledby="session-points-title">
		<header class="points-header">
			<h2 id="session-points-title">{{ t("ui.sessionPoints.title") }}</h2>
			<dl class="points-summary">
				<div>
					<dt>{{ t("ui.sessionPoints.total") }}</dt>
					<dd>{{ totalPoints }}</dd>
				</div>
				<div>
					<dt>{{ t("ui.sessionPoints.trackedSessions") }}</dt>
					<dd>{{ history.length }}</dd>
				</div>
			</dl>
		</header>

		<div class="points-content">
			<section class="points-editor">
				<h3>{{ t("ui.sessionPoints.editTitle") }}</h3>
				<p class="points-hint">{{ t("ui.sessionPoints.localStorageHint") }}</p>
				<form v-if="sessions.length" class="points-form" @submit.prevent="commit(pointsInput)">
					<label for="points-session">{{ t("ui.sessionPoints.session") }}</label>
					<select id="points-session" v-model="selectedSessionId" class="ui-control">
						<option v-for="session in sessions" :key="session.id" :value="session.id">
							{{ sessionLabel(session) }}
						</option>
					</select>

					<label for="points-amount">{{ t("ui.sessionPoints.earned") }}</label>
					<input
						id="points-amount"
						ref="amountInput"
						v-model.number="pointsInput"
						class="ui-control"
						type="number"
						min="0"
						step="1"
						:max="Number.MAX_SAFE_INTEGER"
						inputmode="numeric"
						required
						@input="feedback = ''"
					/>

					<div class="form-actions">
						<button type="submit" class="ui-button is-accent">{{ t("ui.sessionPoints.save") }}</button>
						<button v-if="selectedPoints !== null" type="button" class="ui-button" @click="commit(null)">
							{{ t("ui.sessionPoints.remove") }}
						</button>
					</div>
					<p v-if="feedback === 'saveError'" class="points-error" role="alert">
						{{ t("ui.sessionPoints.saveError") }}
					</p>
					<p class="points-status" role="status">
						{{ feedback && feedback !== "saveError" ? t(`ui.sessionPoints.${feedback}`) : "" }}
					</p>
				</form>
				<p v-else class="points-hint">{{ t("ui.sessionPoints.noSessions") }}</p>
			</section>

			<section class="points-history">
				<h3>{{ t("ui.sessionPoints.history") }}</h3>
				<p v-if="!history.length" class="empty-history">{{ t("ui.sessionPoints.empty") }}</p>
				<ul v-else class="history-list">
					<li v-for="{ session, points } in history" :key="session.id" class="history-row">
						<button
							class="history-session"
							type="button"
							:aria-label="t('ui.sessionPoints.editSession', { session: sessionLabel(session) })"
							@click="editSession(session.id)"
						>
							<span>{{ t("ui.timeline.sessionPrefix") }} {{ session.numberLabel }} · {{ session.date }}</span>
							<strong v-if="session.title">{{ session.title }}</strong>
						</button>
						<span class="ui-pill is-cyan">{{ points > 0 ? `+${points}` : points }} {{ t("ui.sessionPoints.unit") }}</span>
						<div class="history-track" aria-hidden="true">
							<div :style="{ width: `${points / largestAward * 100}%` }"></div>
						</div>
					</li>
				</ul>
			</section>
		</div>
	</section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { campaignSessions } from "@/assets/campaignSessions";
import { useSessionPoints } from "@/utils/sessionPoints";
import { tUi as t } from "@/utils/uiText";

const props = defineProps({
	character: { type: Object, required: true },
});

const sessions = [...campaignSessions].reverse();
const { getSessionPoints, saveSessionPoints } = useSessionPoints();
const selectedSessionId = ref(sessions[0]?.id ?? "");
const pointsInput = ref("");
const amountInput = ref(null);
const feedback = ref("");
const selectedPoints = computed(() => getSessionPoints(props.character.id, selectedSessionId.value));
const history = computed(() => sessions
	.map((session) => ({ session, points: getSessionPoints(props.character.id, session.id) }))
	.filter(({ points }) => points !== null));
const totalPoints = computed(() => history.value.reduce((total, { points }) => total + BigInt(points), 0n));
const largestAward = computed(() => Math.max(1, ...history.value.map(({ points }) => points)));

watch([selectedSessionId, selectedPoints], ([sessionId, points], [previousSessionId]) => {
	pointsInput.value = points ?? "";
	if (sessionId !== previousSessionId) feedback.value = "";
}, { immediate: true });

function sessionLabel(session) {
	const dateLabel = `${t("ui.timeline.sessionPrefix")} ${session.numberLabel} · ${session.date}`;
	return session.title ? `${dateLabel} · ${session.title}` : dateLabel;
}

function editSession(sessionId) {
	selectedSessionId.value = sessionId;
	amountInput.value?.focus();
}

function commit(points) {
	if (!saveSessionPoints(props.character.id, selectedSessionId.value, points)) {
		feedback.value = "saveError";
		return;
	}

	feedback.value = points === null ? "removed" : "saved";
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

.points-content {
	display: grid;
	grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr);
	gap: 1.25rem;
	margin-top: 1.25rem;

	h3 {
		margin: 0;
		font-size: 1.05rem;
	}
}

.points-editor {
	padding: 1rem;
	border: 1px solid var(--color-border-muted);
	border-radius: var(--radius-sm);
	background: var(--surface-control);
	align-self: start;
}

.points-hint {
	margin: 0.45rem 0 0;
	color: var(--color-muted);
	font-size: 0.88rem;
}

.points-form {
	display: grid;
	gap: 0.45rem;
	margin-top: 1rem;

	label {
		color: var(--color-muted);
		font-size: 0.88rem;
		font-weight: 800;
	}

	.ui-control {
		width: 100%;
		padding: 0.45rem 0.6rem;
		font: inherit;
	}

	input.ui-control {
		width: min(100%, 13rem);
	}

	select + label {
		margin-top: 0.35rem;
	}
}

.form-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 0.45rem;
	margin-top: 0.4rem;
}

.points-status,
.points-error {
	margin: 0;
	font-size: 0.88rem;
}

.points-status {
	color: var(--color-cyan);
}

.points-error {
	color: #f69a86;
}

.empty-history {
	margin: 0.65rem 0 0;
	padding: 1rem;
	border: 1px dashed var(--color-border-muted);
	border-radius: var(--radius-sm);
	color: var(--color-muted);
	font-size: 0.9rem;
}

.history-list {
	display: grid;
	gap: 0.5rem;
	margin: 0.65rem 0 0;
	padding: 0;
	list-style: none;
}

.history-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
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
	padding: 0;
	border: 0;
	background: none;
	text-align: left;
	cursor: pointer;

	span {
		color: var(--color-muted);
		font-size: 0.8rem;
	}

	&:hover {
		text-decoration: underline;
	}
}

.history-track {
	grid-column: 1 / -1;
	height: 0.2rem;
	overflow: hidden;
	border-radius: var(--radius-sm);
	background: var(--color-rule);

	div {
		height: 100%;
		border-radius: inherit;
		background: var(--color-cyan);
	}
}

@media (max-width: 800px) {
	.points-content {
		grid-template-columns: minmax(0, 1fr);
	}
}
</style>
