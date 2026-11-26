import timelineData from "./campaignTimeline.json";

export const campaignSessions = timelineData.sessions.map((session, index) => ({
	...session,
	// Existing session dates are unique. Use an explicit ID for an additional session on the same date.
	id: session.id || session.date,
	numberLabel: index + 1,
}));

export function getSessionPoints(character, session) {
	const points = character.sessionPoints?.[session.id];
	return Number.isSafeInteger(points) && points >= 0 ? points : undefined;
}
