import englishPowerStrings from "./force_powers/en.json";
import germanPowerStrings from "./force_powers/de.json";

export const defaultPowerLanguage = "en";

export const forcePowerLanguages = [
	{ code: "en", label: "English", shortLabel: "EN", fallbackCode: null },
	{ code: "de", label: "Deutsch", shortLabel: "DE", fallbackCode: "en" },
];

const data = {
	"modifiers": {
		"proximity": {
			"text": "data.modifiers.proximity.text",
			"hover": [
				"data.modifiers.proximity.hover.0",
				"data.modifiers.proximity.hover.1",
				"data.modifiers.proximity.hover.2",
				"data.modifiers.proximity.hover.3",
				"data.modifiers.proximity.hover.4",
				"data.modifiers.proximity.hover.5",
				"data.modifiers.proximity.hover.6",
				"data.modifiers.proximity.hover.7"
			]
		},
		"relationship": {
			"text": "data.modifiers.relationship.text",
			"hover": [
				"data.modifiers.relationship.hover.0",
				"data.modifiers.relationship.hover.1",
				"data.modifiers.relationship.hover.2",
				"data.modifiers.relationship.hover.3",
				"data.modifiers.relationship.hover.4",
				"data.modifiers.relationship.hover.5",
				"data.modifiers.relationship.hover.6",
				"data.modifiers.relationship.hover.7",
				"data.modifiers.relationship.hover.8"
			]
		},
		"inverseRelationship": {
			"text": "data.modifiers.inverseRelationship.text",
			"hover": [
				"data.modifiers.inverseRelationship.hover.0",
				"data.modifiers.inverseRelationship.hover.1",
				"data.modifiers.inverseRelationship.hover.2",
				"data.modifiers.inverseRelationship.hover.3",
				"data.modifiers.relationship.hover.4",
				"data.modifiers.inverseRelationship.hover.5",
				"data.modifiers.inverseRelationship.hover.6",
				"data.modifiers.inverseRelationship.hover.7",
				"data.modifiers.inverseRelationship.hover.8"
			]
		},
		"astrogation": {
			"text": "data.modifiers.astrogation.text"
		},
		"meteorological": {
			"text": "data.modifiers.meteorological.text"
		},
		"severity": {
			"text": "data.modifiers.severity.text",
			"hover": [
				"data.modifiers.severity.hover.0",
				"data.modifiers.severity.hover.1"
			]
		}
	},
	"extra": {
		"inSight": "data.extra.inSight",
		"keptUp": "data.extra.keptUp",
		"ignorePain": "data.extra.ignorePain",
		"newRollWhenInjured": "data.extra.newRollWhenInjured",
		"usableWhenLightSide": "data.extra.usableWhenLightSide",
		"usableWhenDarkSide": "data.extra.usableWhenDarkSide",
		"sithDiscipline": "data.extra.sithDiscipline"
	},
	"time": {
		"minutes": {
			"1": "data.time.minutes.1",
			"5": "data.time.minutes.5",
			"1+": "data.time.minutes.1+",
			"30+": "data.time.minutes.30+"
		},
		"rounds": {
			"3": "data.time.rounds.3",
			"6": "data.time.rounds.6"
		},
		"days": {
			"2+": "data.time.days.2+"
		},
		"notes": {
			"12R": "data.time.notes.12R",
			"disease": "data.time.notes.disease"
		}
	},
	"warnings": {
		"darkSidePointOnUseWarning": "data.warnings.darkSidePointOnUseWarning"
	},
	"level": {
		"perception": {
			"level": "data.level.perception.level",
			"hover": "data.level.hide.hover"
		},
		"willpowerAlter": {
			"level": "data.level.willpowerAlter.level",
			"hover": "data.level.hide.hover"
		},
		"willpowerControl": {
			"level": "data.level.willpowerControl.level",
			"hover": "data.level.hide.hover"
		},
		"hide": {
			"level": "data.level.hide.level",
			"hover": "data.level.hide.hover"
		},
		"brawlingParry": {
			"level": "data.level.brawlingParry.level",
			"hover": "data.level.hide.hover"
		},
		"strengthControl": {
			"level": "data.level.strengthControl.level",
			"hover": "data.level.hide.hover"
		},
		"description": {
			"level": "data.level.description.level"
		},
		"dodge": {
			"level": "data.level.dodge.level",
			"text": "data.level.dodge.text"
		},
		"strength": {
			"level": "data.level.strength.level"
		},
		"control": {
			"level": "data.level.control.level"
		}
	}
};

export const rawPowerItemStructures = [
	{
		"name": "powers.absorb_dissipate_energy.name",
		"extra": "powers.absorb_dissipate_energy.extra",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "powers.absorb_dissipate_energy.difficulty.control.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.absorb_dissipate_energy.difficulty.control.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.absorb_dissipate_energy.difficulty.control.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.absorb_dissipate_energy.difficulty.control.level.3.text"
					}
				],
				"increased": [
					{
						"add": "powers.absorb_dissipate_energy.difficulty.control.increased.0.add",
						"text": "powers.absorb_dissipate_energy.difficulty.control.increased.0.text"
					},
					{
						"add": "powers.absorb_dissipate_energy.difficulty.control.increased.1.add",
						"text": "powers.absorb_dissipate_energy.difficulty.control.increased.1.text"
					},
					{
						"add": "powers.translation.difficulty.sense.increased.1.add",
						"text": "powers.absorb_dissipate_energy.difficulty.control.increased.2.text"
					}
				]
			}
		},
		"summary": "powers.absorb_dissipate_energy.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.absorb_dissipate_energy.content.0.text.0",
					"powers.absorb_dissipate_energy.content.0.text.1",
					"powers.absorb_dissipate_energy.content.0.text.2"
				]
			},
			{
				"type": "example",
				"text": [
					"powers.absorb_dissipate_energy.content.1.text.0",
					"powers.absorb_dissipate_energy.content.1.text.1"
				]
			}
		]
	},
	{
		"name": "powers.accelerate_another_s_healing.name",
		"required": [
			"powers.control_another_s_pain.name",
			"powers.control_pain.name"
		],
		"timeToUse": data.time.minutes["1"],
		"timeToUseNote": data.time.notes["12R"],
		"difficulty": {
			"control": {
				"level": 1,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": 1
			}
		},
		"summary": "powers.accelerate_another_s_healing.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.accelerate_another_s_healing.content.0.text"
			}
		]
	},
	{
		"name": "powers.accelerate_healing.name",
		"timeToUse": data.time.minutes["1"],
		"timeToUseNote": data.time.notes["12R"],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2,
						"text": "powers.accelerate_healing.difficulty.control.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.reduce_injury.difficulty.control.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.reduce_injury.difficulty.control.level.1.text"
					}
				]
			}
		},
		"summary": "powers.accelerate_healing.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.accelerate_healing.content.0.text.0",
					"powers.accelerate_healing.content.0.text.1"
				]
			},
			{
				"type": "example",
				"text": [
					"powers.accelerate_healing.content.1.text.0",
					"powers.accelerate_healing.content.1.text.1",
					"powers.accelerate_healing.content.1.text.2",
					"powers.accelerate_healing.content.1.text.3"
				]
			}
		]
	},
	{
		"name": "powers.affect_mind.name",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "powers.affect_mind.difficulty.control.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.affect_mind.difficulty.control.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.affect_mind.difficulty.control.level.2.text"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"sense": {
				"level": [
					data.level.perception
				]
			},
			"alter": {
				"level": [
					{
						"level": 1,
						"text": "powers.affect_mind.difficulty.alter.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.affect_mind.difficulty.alter.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.affect_mind.difficulty.alter.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.affect_mind.difficulty.alter.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.affect_mind.difficulty.alter.level.4.text"
					}
				]
			}
		},
		"summary": "powers.affect_mind.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.affect_mind.content.0.text.0",
					"powers.affect_mind.content.0.text.1",
					"powers.affect_mind.content.0.text.2",
					"powers.affect_mind.content.0.text.3"
				]
			}
		]
	},
	{
		"name": "powers.burst_of_speed.name",
		"required": "powers.enhance_attribute.name",
		"difficulty": {
			"control": {
				"level": 3
			}
		},
		"summary": "powers.burst_of_speed.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.burst_of_speed.content.0.text"
			},
			{
				"type": "table",
				"columns": [
					"powers.force_jump.content.0.columns.0",
					"powers.burst_of_speed.content.1.columns.1",
					"powers.sith_sorcery.content.1.columns.2"
				],
				"rows": [
					[
						"powers.force_weapon.content.2.rows.0.0",
						"powers.telekinesis.difficulty.alter.increased.0.add",
						"powers.burst_of_speed.content.1.rows.0.2"
					],
					[
						"powers.burst_of_speed.content.1.rows.1.0",
						"powers.postcognition.difficulty.sense.increased.0.add",
						"powers.burst_of_speed.content.1.rows.1.2"
					],
					[
						"powers.force_push.content.2.rows.4.0",
						"powers.transfer_life.difficulty.sense.increased.0.add",
						"powers.burst_of_speed.content.1.rows.2.2"
					]
				]
			}
		]
	},
	{
		"name": "powers.combat_sense.name",
		"required": [
			"powers.danger_sense.name",
			"powers.life_detection.name"
		],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "powers.combat_sense.difficulty.sense.level.0.text"
					}
				],
				"increased": [
					{
						"add": "powers.force_push.difficulty.alter.increased.0.add",
						"text": "powers.combat_sense.difficulty.sense.increased.0.text"
					}
				]
			}
		},
		"summary": "powers.combat_sense.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.combat_sense.content.0.text.0",
					"powers.combat_sense.content.0.text.1",
					"powers.combat_sense.content.0.text.2"
				]
			}
		]
	},
	{
		"name": "powers.concentration.name",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2,
						"text": "powers.concentration.difficulty.control.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.concentration.difficulty.control.level.1.text"
					},
					{
						"level": 5,
						"text": "powers.concentration.difficulty.control.level.2.text"
					}
				]
			}
		},
		"summary": "powers.concentration.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.concentration.content.0.text.0",
					"powers.concentration.content.0.text.1",
					"powers.concentration.content.0.text.2"
				]
			},
			{
				"type": "example",
				"text": [
					"powers.concentration.content.1.text.0",
					"powers.concentration.content.1.text.1",
					"powers.concentration.content.1.text.2"
				]
			}
		]
	},
	{
		"name": "powers.contort_escape.name",
		"required": [
			"powers.concentration.name",
			"powers.control_pain.name",
			"powers.enhance_attribute.name"
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "powers.contort_escape.difficulty.control.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.contort_escape.difficulty.control.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.contort_escape.difficulty.control.level.2.text"
					},
					{
						"level": 4,
						"and_more": true,
						"text": "powers.contort_escape.difficulty.control.level.3.text"
					}
				]
			}
		},
		"summary": "powers.contort_escape.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.contort_escape.content.0.text"
			}
		]
	},
	{
		"name": "powers.control_another_s_pain.name",
		"required": "powers.control_pain.name",
		"difficulty": {
			"control": {
				"level": 1,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "powers.accelerate_healing.difficulty.control.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.reduce_injury.difficulty.control.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.reduce_injury.difficulty.control.level.1.text"
					}
				]
			}
		},
		"summary": "powers.control_another_s_pain.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.control_another_s_pain.content.0.text"
			}
		]
	},
	{
		"name": "powers.control_breathing.name",
		"required": [
			"powers.concentration.name",
			"powers.hibernation_trance.name",
			"powers.telekinesis.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3
			},
			"alter": {
				"level": 5
			}
		},
		"summary": "powers.control_breathing.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.control_breathing.content.0.text.0",
					"powers.control_breathing.content.0.text.1",
					"powers.control_breathing.content.0.text.2"
				]
			}
		]
	},
	{
		"name": "powers.control_pain.name",
		"extra": [
			data.extra.keptUp,
			data.extra.ignorePain,
			data.extra.newRollWhenInjured
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "powers.control_pain.difficulty.control.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.control_pain.difficulty.control.level.1.text"
					},
					{
						"level": 4,
						"text": "powers.control_pain.difficulty.control.level.2.text"
					}
				]
			}
		},
		"summary": "powers.control_pain.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.control_pain.content.0.text.0",
					"powers.control_pain.content.0.text.1"
				]
			},
			{
				"type": "example",
				"text": "powers.control_pain.content.1.text"
			}
		]
	},
	{
		"name": "powers.danger_sense.name",
		"required": "powers.life_detection.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3
					},
					{
						"level": data.level.control,
						"optional": true
					}
				]
			}
		},
		"summary": "powers.danger_sense.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.danger_sense.content.0.text.0",
					"powers.danger_sense.content.0.text.1",
					"powers.danger_sense.content.0.text.2"
				]
			}
		]
	},
	{
		"name": "powers.direction_sense.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 2,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.direction_sense.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.direction_sense.content.0.text.0",
					"powers.direction_sense.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.emptiness.name",
		"required": "powers.hibernation_trance.name",
		"extra": data.extra.usableWhenLightSide,
		"difficulty": {
			"control": {
				"level": 3
			}
		},
		"summary": "powers.emptiness.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.emptiness.content.0.text.0",
					"powers.emptiness.content.0.text.1",
					"powers.emptiness.content.0.text.2",
					"powers.emptiness.content.0.text.3",
					"powers.emptiness.content.0.text.4",
					"powers.emptiness.content.0.text.5"
				]
			}
		]
	},
	{
		"name": "powers.enhance_attribute.name",
		"difficulty": {
			"control": {
				"level": 3
			}
		},
		"summary": "powers.enhance_attribute.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.enhance_attribute.content.0.text.0",
					"powers.enhance_attribute.content.0.text.1",
					"powers.enhance_attribute.content.0.text.2"
				]
			},
			{
				"type": "table",
				"columns": [
					"powers.enhance_attribute.content.1.columns.0",
					"powers.enhance_attribute.content.1.columns.1",
					"powers.sith_sorcery.content.1.columns.2"
				],
				"rows": [
					[
						"powers.enhance_attribute.content.1.rows.0.0",
						"powers.force_jump.content.0.rows.0.1",
						"powers.burst_of_speed.content.1.rows.1.2"
					],
					[
						"powers.enhance_attribute.content.1.rows.1.0",
						"powers.force_jump.content.0.rows.1.1",
						"powers.burst_of_speed.content.1.rows.2.2"
					],
					[
						"powers.enhance_attribute.content.1.rows.2.0",
						"powers.force_jump.content.0.rows.2.1",
						"powers.enhance_attribute.content.1.rows.2.2"
					]
				]
			}
		]
	},
	{
		"name": "powers.farseeing.name",
		"required": "powers.life_sense.name",
		"timeToUse": data.time.minutes["1"],
		"timeToUseNote": data.time.notes["12R"],
		"difficulty": {
			"control": {
				"level": 1,
				"increased": [
					{
						"add": "powers.farseeing.difficulty.control.increased.0.add",
						"text": "powers.farseeing.difficulty.control.increased.0.text"
					},
					{
						"add": "powers.farseeing.difficulty.control.increased.1.add",
						"text": "powers.farseeing.difficulty.control.increased.1.text"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "powers.farseeing.difficulty.sense.level.0.text"
					},
					{
						"level": data.level.perception.level,
						"text": "powers.farseeing.difficulty.sense.level.1.text",
						"hover": data.level.hide.hover
					}
				],
				"modifiers": data.modifiers.relationship
			}
		},
		"summary": "powers.farseeing.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.farseeing.content.0.text"
			},
			{
				"type": "table",
				"text": "powers.farseeing.content.1.text",
				"columns": [
					"powers.farseeing.content.1.columns.0",
					"powers.farseeing.content.1.columns.1",
					"powers.farseeing.content.1.columns.2"
				],
				"rows": [
					[
						"powers.farseeing.content.1.rows.0.0",
						"powers.farseeing.content.1.rows.0.1",
						"powers.farseeing.content.1.rows.0.2"
					],
					[
						"powers.farseeing.content.1.rows.1.0",
						"powers.farseeing.content.1.rows.1.1",
						"powers.farseeing.content.1.rows.1.2"
					],
					[
						"powers.farseeing.content.1.rows.2.0",
						"powers.farseeing.content.1.rows.2.1",
						"powers.farseeing.content.1.rows.0.1"
					],
					[
						"powers.farseeing.content.1.rows.3.0",
						"powers.farseeing.content.1.rows.3.1",
						"powers.farseeing.content.1.rows.1.1"
					]
				]
			},
			{
				"type": "effect",
				"text": "powers.farseeing.content.2.text"
			},
			{
				"type": "example",
				"text": "powers.farseeing.content.3.text"
			},
			{
				"type": "effect",
				"text": "powers.farseeing.content.4.text"
			}
		]
	},
	{
		"name": "powers.force_jump.name",
		"required": [
			"powers.enhance_attribute.name",
			"powers.telekinesis.name"
		],
		"difficulty": {
			"control": {
				"level": 2
			},
			"alter": {
				"level": 2
			}
		},
		"summary": "powers.force_jump.summary",
		"content": [
			{
				"type": "table",
				"text": "powers.force_jump.content.0.text",
				"columns": [
					"powers.force_jump.content.0.columns.0",
					"powers.force_jump.content.0.columns.1"
				],
				"rows": [
					[
						"powers.force_jump.content.0.rows.0.0",
						"powers.force_jump.content.0.rows.0.1"
					],
					[
						"powers.force_jump.content.0.rows.1.0",
						"powers.force_jump.content.0.rows.1.1"
					],
					[
						"powers.force_jump.content.0.rows.2.0",
						"powers.force_jump.content.0.rows.2.1"
					],
					[
						"powers.force_jump.content.0.rows.3.0",
						"powers.force_jump.content.0.rows.3.1"
					],
					[
						"powers.force_jump.content.0.rows.4.0",
						"powers.force_jump.content.0.rows.4.1"
					],
					[
						"powers.force_jump.content.0.rows.5.0",
						"powers.force_jump.content.0.rows.5.1"
					]
				]
			},
			{
				"type": "effect",
				"text": [
					"powers.force_jump.content.1.text.0",
					"powers.force_jump.content.1.text.1"
				]
			},
			{
				"type": "table",
				"columns": [
					"powers.force_jump.content.2.columns.0",
					"powers.force_jump.content.2.columns.1"
				],
				"rows": [
					[
						"powers.force_jump.content.2.rows.0.0",
						1
					],
					[
						"powers.force_jump.content.2.rows.1.0",
						2
					],
					[
						"powers.force_jump.content.2.rows.2.0",
						3
					],
					[
						"powers.force_jump.content.2.rows.3.0",
						4
					],
					[
						"powers.force_jump.content.2.rows.4.0",
						5
					],
					[
						"powers.force_jump.content.2.rows.5.0",
						6
					]
				],
				"subnote": "powers.force_jump.content.2.subnote"
			},
			{
				"type": "example",
				"text": [
					"powers.force_jump.content.3.text.0",
					"powers.force_jump.content.3.text.1"
				]
			}
		]
	},
	{
		"name": "powers.force_push.name",
		"required": [
			"powers.concentration.name",
			"powers.life_detection.name",
			"powers.telekinesis.name"
		],
		"extra": data.extra.inSight,
		"difficulty": {
			"alter": {
				"level": data.level.perception,
				"increased": [
					{
						"add": "powers.force_push.difficulty.alter.increased.0.add",
						"text": "powers.force_push.difficulty.alter.increased.0.text"
					}
				]
			}
		},
		"summary": "powers.force_push.summary",
		"content": [
			{
				"type": "warning",
				"text": "powers.force_push.content.0.text"
			},
			{
				"type": "effect",
				"text": [
					"powers.force_push.content.1.text.0",
					"powers.force_push.content.1.text.1",
					"powers.force_push.content.1.text.2"
				]
			},
			{
				"type": "table",
				"columns": [
					"powers.force_push.content.2.columns.0",
					"powers.force_push.content.2.columns.1"
				],
				"rows": [
					[
						"powers.inspire.content.1.rows.0.0",
						"powers.force_push.content.2.rows.0.1"
					],
					[
						"powers.inspire.content.1.rows.1.0",
						"powers.force_push.content.2.rows.1.1"
					],
					[
						"powers.inspire.content.1.rows.2.0",
						"powers.force_push.content.2.rows.2.1"
					],
					[
						"powers.force_push.content.2.rows.3.0",
						"powers.force_push.content.2.rows.3.1"
					],
					[
						"powers.force_push.content.2.rows.4.0",
						"powers.force_push.content.2.rows.4.1"
					]
				]
			}
		]
	},
	{
		"name": "powers.hibernation_trance.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 4
			}
		},
		"summary": "powers.hibernation_trance.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.hibernation_trance.content.0.text.0",
					"powers.hibernation_trance.content.0.text.1",
					"powers.hibernation_trance.content.0.text.2"
				]
			},
			{
				"type": "example",
				"text": "powers.hibernation_trance.content.1.text"
			},
			{
				"type": "effect",
				"text": [
					"powers.hibernation_trance.content.2.text.0",
					"powers.hibernation_trance.content.2.text.1",
					"powers.hibernation_trance.content.2.text.2",
					"powers.hibernation_trance.content.2.text.3"
				]
			}
		]
	},
	{
		"name": "powers.kinetic_combat.name",
		"required": "powers.telekinesis.name",
		"difficulty": {
			"alter": {
				"level": 4
			}
		},
		"summary": "powers.kinetic_combat.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.kinetic_combat.content.0.text.0",
					"powers.kinetic_combat.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.lesser_force_shield.name",
		"required": [
			"powers.absorb_dissipate_energy.name",
			"powers.concentration.name",
			"powers.magnify_senses.name",
			"powers.telekinesis.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 2
			},
			"alter": {
				"level": 2
			}
		},
		"summary": "powers.lesser_force_shield.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.lesser_force_shield.content.0.text.0",
					"powers.lesser_force_shield.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.life_detection.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "powers.life_detection.difficulty.sense.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.life_detection.difficulty.sense.level.1.text"
					}
				],
				"modifiers": data.modifiers.relationship
			}
		},
		"summary": "powers.life_detection.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.life_detection.content.0.text.0",
					"powers.life_detection.content.0.text.1",
					"powers.life_detection.content.0.text.2"
				]
			},
			{
				"type": "example",
				"text": [
					"powers.life_detection.content.1.text.0",
					"powers.life_detection.content.1.text.1",
					"powers.life_detection.content.1.text.2",
					"powers.life_detection.content.1.text.3"
				]
			}
		]
	},
	{
		"name": "powers.life_sense.name",
		"required": "powers.life_detection.name",
		"extra": "powers.life_sense.extra",
		"difficulty": {
			"sense": {
				"level": 1,
				"modifiers": [
					data.modifiers.proximity,
					data.modifiers.relationship
				]
			}
		},
		"summary": "powers.life_sense.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.life_sense.content.0.text.0",
					"powers.life_sense.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.lightsaber_combat.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3
			},
			"sense": {
				"level": 2
			}
		},
		"summary": "powers.lightsaber_combat.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.lightsaber_combat.content.0.text.0",
					"powers.lightsaber_combat.content.0.text.1",
					"powers.lightsaber_combat.content.0.text.2"
				]
			},
			{
				"type": "example",
				"text": [
					"powers.lightsaber_combat.content.1.text.0",
					"powers.lightsaber_combat.content.1.text.1",
					"powers.lightsaber_combat.content.1.text.2"
				]
			},
			{
				"type": "effect",
				"text": [
					"powers.lightsaber_combat.content.2.text.0",
					"powers.lightsaber_combat.content.2.text.1",
					"powers.lightsaber_combat.content.2.text.2",
					"powers.lightsaber_combat.content.2.text.3"
				]
			},
			{
				"type": "example",
				"text": [
					"powers.lightsaber_combat.content.3.text.0",
					"powers.lightsaber_combat.content.3.text.1",
					"powers.lightsaber_combat.content.3.text.2"
				]
			}
		]
	},
	{
		"name": "powers.magnify_senses.name",
		"timeToUse": data.time.rounds["3"],
		"difficulty": {
			"sense": {
				"level": 1,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.magnify_senses.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.magnify_senses.content.0.text"
			}
		]
	},
	{
		"name": "powers.merge_senses.name",
		"required": "powers.magnify_senses.name",
		"timeToUse": data.time.rounds["3"],
		"difficulty": {
			"sense": {
				"level": 3,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.merge_senses.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.merge_senses.content.0.text.0",
					"powers.merge_senses.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.projective_telepathy.name",
		"required": [
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.receptive_telepathy.name"
		],
		"extra": "powers.projective_telepathy.extra",
		"difficulty": {
			"control": {
				"level": 1,
				"increased": [
					{
						"add": "powers.projective_telepathy.difficulty.control.increased.0.add",
						"text": "powers.projective_telepathy.difficulty.control.increased.0.text"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "powers.projective_telepathy.difficulty.sense.level.0.text"
					},
					{
						"level": "powers.receptive_telepathy.difficulty.sense.level.1.level",
						"text": "powers.receptive_telepathy.difficulty.sense.level.1.text"
					}
				],
				"modifiers": data.modifiers.relationship
			}
		},
		"summary": "powers.projective_telepathy.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.projective_telepathy.content.0.text.0",
					"powers.projective_telepathy.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.receptive_telepathy.name",
		"required": [
			"powers.life_detection.name",
			"powers.life_sense.name"
		],
		"extra": "powers.receptive_telepathy.extra",
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "powers.receptive_telepathy.difficulty.sense.level.0.text"
					},
					{
						"level": "powers.receptive_telepathy.difficulty.sense.level.1.level",
						"text": "powers.receptive_telepathy.difficulty.sense.level.1.text"
					}
				],
				"modifiers": [
					data.modifiers.proximity,
					data.modifiers.relationship
				]
			}
		},
		"summary": "powers.receptive_telepathy.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.receptive_telepathy.content.0.text.0",
					"powers.receptive_telepathy.content.0.text.1",
					"powers.receptive_telepathy.content.0.text.2"
				]
			}
		]
	},
	{
		"name": "powers.remain_conscious.name",
		"required": "powers.control_pain.name",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2,
						"text": "powers.remain_conscious.difficulty.control.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.reduce_injury.difficulty.control.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.reduce_injury.difficulty.control.level.1.text"
					}
				]
			}
		},
		"summary": "powers.remain_conscious.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.remain_conscious.content.0.text.0",
					"powers.remain_conscious.content.0.text.1",
					"powers.remain_conscious.content.0.text.2"
				]
			},
			{
				"type": "example",
				"text": [
					"powers.remain_conscious.content.1.text.0",
					"powers.remain_conscious.content.1.text.1",
					"powers.remain_conscious.content.1.text.2"
				]
			}
		]
	},
	{
		"name": "powers.telekinesis.name",
		"extra": [
			data.extra.inSight,
			data.extra.keptUp
		],
		"difficulty": {
			"alter": {
				"level": [
					{
						"level": 1,
						"text": "powers.telekinesis.difficulty.alter.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.telekinesis.difficulty.alter.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.telekinesis.difficulty.alter.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.telekinesis.difficulty.alter.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.telekinesis.difficulty.alter.level.4.text"
					},
					{
						"level": 6,
						"text": "powers.telekinesis.difficulty.alter.level.5.text"
					}
				],
				"increased": [
					{
						"add": "powers.telekinesis.difficulty.alter.increased.0.add",
						"text": "powers.telekinesis.difficulty.alter.increased.0.text"
					},
					{
						"add": "powers.telekinesis.difficulty.alter.increased.1.add",
						"text": "powers.telekinesis.difficulty.alter.increased.1.text"
					},
					{
						"add": "powers.telekinesis.difficulty.alter.increased.2.add",
						"text": "powers.telekinesis.difficulty.alter.increased.2.text"
					},
					{
						"add": "powers.telekinesis.difficulty.alter.increased.3.add",
						"text": "powers.telekinesis.difficulty.alter.increased.3.text"
					}
				],
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.telekinesis.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.telekinesis.content.0.text.0",
					"powers.telekinesis.content.0.text.1",
					"powers.telekinesis.content.0.text.2",
					"powers.telekinesis.content.0.text.3",
					"powers.telekinesis.content.0.text.4",
					"powers.telekinesis.content.0.text.5"
				]
			}
		]
	},
	{
		"name": "powers.transfer_force.name",
		"required": [
			"powers.control_another_s_pain.name",
			"powers.control_pain.name"
		],
		"timeToUse": "powers.resist_stun.timeToUse",
		"timeToUseNote": data.time.notes["12R"],
		"difficulty": {
			"control": {
				"level": 2,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": 3
			}
		},
		"summary": "powers.transfer_force.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.transfer_force.content.0.text.0",
					"powers.transfer_force.content.0.text.1",
					"powers.transfer_force.content.0.text.2"
				]
			}
		]
	},
	{
		"name": "powers.translation.name",
		"required": [
			"powers.receptive_telepathy.name",
			"powers.projective_telepathy.name",
			"powers.life_sense.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "powers.translation.difficulty.sense.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.translation.difficulty.sense.level.1.text"
					}
				],
				"increased": [
					{
						"add": "powers.telekinesis.difficulty.alter.increased.0.add",
						"text": "powers.translation.difficulty.sense.increased.0.text"
					},
					{
						"add": "powers.translation.difficulty.sense.increased.1.add",
						"text": "powers.translation.difficulty.sense.increased.1.text"
					}
				]
			}
		},
		"summary": "powers.translation.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.translation.content.0.text.0",
					"powers.translation.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.beast_languages.name",
		"required": [
			"powers.life_sense.name",
			"powers.receptive_telepathy.name",
			"powers.projective_telepathy.name",
			"powers.translation.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "powers.beast_languages.difficulty.sense.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.beast_languages.difficulty.sense.level.1.text"
					},
					{
						"level": 4,
						"text": "powers.beast_languages.difficulty.sense.level.1.text"
					},
					{
						"level": 5,
						"text": "powers.beast_languages.difficulty.sense.level.3.text"
					},
					{
						"level": 6,
						"text": "powers.beast_languages.difficulty.sense.level.3.text"
					}
				]
			}
		},
		"summary": "powers.beast_languages.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.beast_languages.content.0.text.0",
					"powers.beast_languages.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.control_disease.name",
		"required": "powers.accelerate_healing.name",
		"timeToUse": data.time.minutes["30"],
		"timeToUseNote": data.time.notes.disease,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "powers.control_disease.difficulty.control.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.control_disease.difficulty.control.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.control_disease.difficulty.control.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.control_disease.difficulty.control.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.control_disease.difficulty.control.level.4.text"
					},
					{
						"level": 6,
						"text": "powers.control_disease.difficulty.control.level.5.text"
					}
				]
			}
		},
		"summary": "powers.control_disease.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.control_disease.content.0.text.0",
					"powers.control_disease.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.detoxify_poison.name",
		"timeToUse": data.time.minutes["5"],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "powers.detoxify_poison.difficulty.control.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.detoxify_poison.difficulty.control.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.detoxify_poison.difficulty.control.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.detoxify_poison.difficulty.control.level.3.text"
					},
					{
						"level": 5,
						"and_more": true,
						"text": "powers.detoxify_poison.difficulty.control.level.4.text"
					}
				]
			}
		},
		"summary": "powers.detoxify_poison.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.detoxify_poison.content.0.text"
			}
		]
	},
	{
		"name": "powers.force_of_will.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 2
			}
		},
		"summary": "powers.force_of_will.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.force_of_will.content.0.text.0",
					"powers.force_of_will.content.0.text.1",
					"powers.force_of_will.content.0.text.2"
				]
			},
			{
				"type": "note",
				"text": "powers.force_of_will.content.1.text"
			},
			{
				"type": "example",
				"text": [
					"powers.force_of_will.content.2.text.0",
					"powers.force_of_will.content.2.text.1",
					"powers.force_of_will.content.2.text.2",
					"powers.force_of_will.content.2.text.3"
				]
			}
		]
	},
	{
		"name": "powers.instinctive_astrogation.name",
		"required": "powers.magnify_senses.name",
		"difficulty": {
			"sense": {
				"level": 3,
				"modifiers": data.modifiers.astrogation
			}
		},
		"summary": "powers.instinctive_astrogation.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.instinctive_astrogation.content.0.text"
			},
			{
				"type": "table",
				"text": "powers.instinctive_astrogation.content.1.text",
				"columns": [
					"powers.instinctive_astrogation.content.1.columns.0",
					"powers.instinctive_astrogation.content.1.columns.1"
				],
				"rows": [
					[
						"powers.instinctive_astrogation.content.1.rows.0.0",
						"powers.instinctive_astrogation.content.1.rows.0.1"
					],
					[
						"powers.instinctive_astrogation.content.1.rows.1.0",
						"powers.instinctive_astrogation.content.1.rows.0.1"
					],
					[
						"powers.instinctive_astrogation.content.1.rows.2.0",
						"powers.instinctive_astrogation.content.1.rows.0.1"
					],
					[
						"powers.instinctive_astrogation.content.1.rows.3.0",
						"powers.instinctive_astrogation.content.1.rows.3.1"
					],
					[
						"powers.instinctive_astrogation.content.1.rows.4.0",
						"powers.instinctive_astrogation.content.1.rows.4.1"
					],
					[
						"powers.instinctive_astrogation.content.1.rows.5.0",
						"powers.instinctive_astrogation.content.1.rows.5.1"
					]
				]
			},
			{
				"type": "effect",
				"text": "powers.instinctive_astrogation.content.2.text"
			}
		]
	},
	{
		"name": "powers.instinctive_astrogation_control.name",
		"timeToUse": "powers.resist_stun.timeToUse",
		"timeToUseNote": data.time.notes["12R"],
		"difficulty": {
			"control": {
				"level": 5,
				"modifiers": data.modifiers.astrogation
			}
		},
		"summary": "powers.instinctive_astrogation_control.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.instinctive_astrogation_control.content.0.text"
			},
			{
				"type": "table",
				"text": "powers.instinctive_astrogation_control.content.1.text",
				"columns": [
					"powers.instinctive_astrogation.content.1.columns.0",
					"powers.instinctive_astrogation.content.1.columns.1"
				],
				"rows": [
					[
						"powers.instinctive_astrogation.content.1.rows.0.0",
						"powers.instinctive_astrogation.content.1.rows.0.1"
					],
					[
						"powers.instinctive_astrogation.content.1.rows.1.0",
						"powers.instinctive_astrogation.content.1.rows.3.1"
					],
					[
						"powers.instinctive_astrogation.content.1.rows.2.0",
						"powers.instinctive_astrogation.content.1.rows.4.1"
					],
					[
						"powers.instinctive_astrogation.content.1.rows.3.0",
						"powers.instinctive_astrogation.content.1.rows.5.1"
					],
					[
						"powers.instinctive_astrogation.content.1.rows.4.0",
						"powers.instinctive_astrogation_control.content.1.rows.4.1"
					],
					[
						"powers.instinctive_astrogation.content.1.rows.5.0",
						"powers.instinctive_astrogation_control.content.1.rows.5.1"
					]
				]
			},
			{
				"type": "effect",
				"text": [
					"powers.instinctive_astrogation_control.content.2.text.0",
					"powers.instinctive_astrogation_control.content.2.text.1"
				]
			}
		]
	},
	{
		"name": "powers.life_web.name",
		"required": [
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.sense_force.name"
		],
		"timeToUse": data.time.days["2"],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "powers.life_web.difficulty.sense.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.life_web.difficulty.sense.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.life_web.difficulty.sense.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.life_web.difficulty.sense.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.life_web.difficulty.sense.level.4.text"
					},
					{
						"level": 6,
						"text": "powers.life_web.difficulty.sense.level.5.text"
					}
				],
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.life_web.summary",
		"content": [
			{
				"type": "note",
				"text": "powers.life_web.content.0.text"
			},
			{
				"type": "effect",
				"text": [
					"powers.life_web.content.1.text.0",
					"powers.life_web.content.1.text.1"
				]
			},
			{
				"type": "example",
				"text": "powers.life_web.content.2.text"
			},
			{
				"type": "effect",
				"text": "powers.life_web.content.3.text"
			}
		]
	},
	{
		"name": "powers.postcognition.name",
		"required": [
			"powers.hibernation_trance.name",
			"powers.life_detection.name",
			"powers.sense_force.name"
		],
		"timeToUse": "powers.postcognition.timeToUse",
		"timeToUseDetails": {
			"baseLabel": data.time.minutes["5"],
			"minimumLabel": "powers.resist_stun.timeToUse",
			"summary": "powers.postcognition.timeToUseDetails.summary",
			"rush": {
				"baseMinutes": 5,
				"minimumMinutes": 1,
				"stepMinutes": 1,
				"modifierPerStep": 10,
				"modifierLabel": "powers.postcognition.timeToUseDetails.rush.modifierLabel"
			}
		},
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "powers.postcognition.difficulty.sense.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.postcognition.difficulty.sense.level.1.text"
					},
					{
						"level": 4,
						"text": "powers.postcognition.difficulty.sense.level.2.text"
					},
					{
						"level": 5,
						"text": "powers.postcognition.difficulty.sense.level.3.text"
					},
					{
						"level": 6,
						"text": "powers.postcognition.difficulty.sense.level.4.text"
					}
				],
				"increased": [
					{
						"add": "powers.postcognition.difficulty.sense.increased.0.add",
						"text": "powers.postcognition.difficulty.sense.increased.0.text"
					}
				]
			}
		},
		"summary": "powers.postcognition.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.postcognition.content.0.text.0",
					"powers.postcognition.content.0.text.1",
					"powers.postcognition.content.0.text.2",
					"powers.postcognition.content.0.text.3",
					"powers.postcognition.content.0.text.4"
				]
			},
			{
				"type": "example",
				"text": [
					"powers.postcognition.content.1.text.0",
					"powers.postcognition.content.1.text.1"
				]
			}
		]
	},
	{
		"name": "powers.predict_natural_disaster.name",
		"required": [
			"powers.danger_sense.name",
			"powers.life_detection.name",
			"powers.weather_sense.name",
			"powers.magnify_senses.name"
		],
		"timeToUse": "powers.predict_natural_disaster.timeToUse",
		"timeToUseDetails": {
			"baseLabel": "powers.predict_natural_disaster.timeToUseDetails.baseLabel",
			"minimumLabel": "powers.resist_stun.timeToUse",
			"summary": "powers.predict_natural_disaster.timeToUseDetails.summary",
			"rush": {
				"modifierLabel": "powers.predict_natural_disaster.timeToUseDetails.rush.modifierLabel",
				"options": [
					{
						"minutes": 15,
						"modifierLabel": "powers.predict_natural_disaster.timeToUseDetails.rush.options.0.modifierLabel"
					},
					{
						"minutes": 10,
						"modifierLabel": "powers.predict_natural_disaster.timeToUseDetails.rush.options.1.modifierLabel"
					},
					{
						"minutes": 5,
						"modifierLabel": "powers.predict_natural_disaster.timeToUseDetails.rush.options.2.modifierLabel"
					},
					{
						"minutes": 1,
						"modifierLabel": "powers.predict_natural_disaster.timeToUseDetails.rush.options.3.modifierLabel"
					}
				]
			}
		},
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "powers.weather_sense.difficulty.sense.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.predict_natural_disaster.difficulty.sense.level.1.text"
					},
					{
						"level": 4,
						"text": "powers.predict_natural_disaster.difficulty.sense.level.2.text"
					},
					{
						"level": 5,
						"text": "powers.predict_natural_disaster.difficulty.sense.level.3.text"
					}
				],
				"modifiers": data.modifiers.severity
			}
		},
		"summary": "powers.predict_natural_disaster.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.predict_natural_disaster.content.0.text"
			}
		]
	},
	{
		"name": "powers.rage.name",
		"required": "powers.hibernation_trance.name",
		"extra": data.extra.usableWhenDarkSide,
		"difficulty": {
			"control": {
				"level": 4
			}
		},
		"grantsDarkSidePointOnUse": true,
		"summary": "powers.rage.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.rage.content.0.text.0",
					"powers.rage.content.0.text.1",
					"powers.rage.content.0.text.2",
					"powers.rage.content.0.text.3",
					"powers.rage.content.0.text.4",
					"powers.rage.content.0.text.5",
					"powers.rage.content.0.text.6",
					"powers.rage.content.0.text.7"
				]
			},
			{
				"type": "example",
				"text": "powers.rage.content.1.text"
			},
			{
				"type": "effect",
				"text": [
					"powers.rage.content.2.text.0",
					"powers.rage.content.2.text.1"
				]
			}
		]
	},
	{
		"name": "powers.reduce_injury.name",
		"required": "powers.control_pain.name",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3,
						"text": "powers.reduce_injury.difficulty.control.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.reduce_injury.difficulty.control.level.1.text"
					},
					{
						"level": 5,
						"text": "powers.reduce_injury.difficulty.control.level.2.text"
					}
				]
			}
		},
		"summary": "powers.reduce_injury.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.reduce_injury.content.0.text.0",
					"powers.reduce_injury.content.0.text.1",
					"powers.reduce_injury.content.0.text.2"
				]
			},
			{
				"type": "note",
				"text": "powers.reduce_injury.content.1.text"
			},
			{
				"type": "example",
				"text": "powers.reduce_injury.content.2.text"
			}
		]
	},
	{
		"name": "powers.remove_fatigue.name",
		"required": [
			"powers.accelerate_healing.name",
			"powers.control_pain.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3
			}
		},
		"summary": "powers.remove_fatigue.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.remove_fatigue.content.0.text"
			}
		]
	},
	{
		"name": "powers.resist_stun.name",
		"extra": data.extra.keptUp,
		"timeToUse": "powers.resist_stun.timeToUse",
		"timeToUseNote": data.time.notes["12R"],
		"difficulty": {
			"control": {
				"level": 3
			}
		},
		"summary": "powers.resist_stun.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.resist_stun.content.0.text.0",
					"powers.resist_stun.content.0.text.1"
				]
			},
			{
				"type": "example",
				"text": [
					"powers.resist_stun.content.1.text.0",
					"powers.resist_stun.content.1.text.1"
				]
			}
		]
	},
	{
		"name": "powers.short_term_memory_enhancement.name",
		"required": "powers.hibernation_trance.name",
		"difficulty": {
			"control": {
				"level": 4
			}
		},
		"summary": "powers.short_term_memory_enhancement.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.short_term_memory_enhancement.content.0.text.0",
					"powers.short_term_memory_enhancement.content.0.text.1",
					"powers.short_term_memory_enhancement.content.0.text.2"
				]
			},
			{
				"type": "table",
				"columns": [
					"powers.enhance_attribute.content.1.columns.0",
					"powers.short_term_memory_enhancement.content.1.columns.1"
				],
				"rows": [
					[
						"powers.short_term_memory_enhancement.content.1.rows.0.0",
						"powers.short_term_memory_enhancement.content.1.rows.0.1"
					],
					[
						"powers.burst_of_speed.content.1.rows.1.0",
						"powers.short_term_memory_enhancement.content.1.rows.1.1"
					],
					[
						"powers.force_push.content.2.rows.4.0",
						"powers.short_term_memory_enhancement.content.1.rows.2.1"
					]
				],
				"subnote": "powers.short_term_memory_enhancement.content.1.subnote"
			}
		]
	},
	{
		"name": "powers.up_the_walls.name",
		"required": [
			"powers.enhance_attribute.name",
			"powers.burst_of_speed.name"
		],
		"difficulty": {
			"control": {
				"level": 4
			}
		},
		"summary": "powers.up_the_walls.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.up_the_walls.content.0.text.0",
					"powers.up_the_walls.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.sense_force.name",
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "powers.sense_force.difficulty.sense.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.sense_force.difficulty.sense.level.1.text"
					}
				],
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.sense_force.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.sense_force.content.0.text.0",
					"powers.sense_force.content.0.text.1"
				]
			},
			{
				"type": "example",
				"text": "powers.sense_force.content.1.text"
			},
			{
				"type": "effect",
				"text": "powers.sense_force.content.2.text"
			}
		]
	},
	{
		"name": "powers.sense_force_potential.name",
		"required": [
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.receptive_telepathy.name",
			"powers.sense_force.name"
		],
		"timeToUse": data.time.rounds["6"],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "powers.sense_force_potential.difficulty.sense.level.0.text"
					},
					{
						"levels": [
							{
								"level": 3
							},
							data.level.perception
						],
						"text": "powers.sense_force_potential.difficulty.sense.level.1.text"
					}
				]
			}
		},
		"summary": "powers.sense_force_potential.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.sense_force_potential.content.0.text.0",
					"powers.sense_force_potential.content.0.text.1",
					"powers.sense_force_potential.content.0.text.2"
				]
			}
		]
	},
	{
		"name": "powers.sense_path.name",
		"required": [
			"powers.emptiness.name",
			"powers.hibernation_trance.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 3
			}
		},
		"summary": "powers.sense_path.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.sense_path.content.0.text.0",
					"powers.sense_path.content.0.text.1",
					"powers.sense_path.content.0.text.2",
					"powers.sense_path.content.0.text.3",
					"powers.sense_path.content.0.text.4",
					"powers.sense_path.content.0.text.5"
				]
			},
			{
				"type": "example",
				"text": [
					"powers.sense_path.content.1.text.0",
					"powers.sense_path.content.1.text.1"
				]
			}
		]
	},
	{
		"name": "powers.shift_sense.name",
		"required": "powers.magnify_senses.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "powers.shift_sense.difficulty.sense.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.shift_sense.difficulty.sense.level.1.text"
					},
					{
						"level": 5,
						"text": "powers.shift_sense.difficulty.sense.level.2.text"
					}
				]
			}
		},
		"summary": "powers.shift_sense.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.shift_sense.content.0.text.0",
					"powers.shift_sense.content.0.text.1"
				]
			},
			{
				"type": "example",
				"text": "powers.shift_sense.content.1.text"
			}
		]
	},
	{
		"name": "powers.weather_sense.name",
		"required": "powers.magnify_senses.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "powers.weather_sense.difficulty.sense.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.weather_sense.difficulty.sense.level.1.text"
					},
					{
						"level": 4,
						"text": "powers.weather_sense.difficulty.sense.level.2.text"
					},
					{
						"level": 5,
						"text": "powers.weather_sense.difficulty.sense.level.3.text"
					}
				],
				"modifiers": [
					data.modifiers.proximity,
					data.modifiers.meteorological
				]
			}
		},
		"summary": "powers.weather_sense.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.weather_sense.content.0.text.0",
					"powers.weather_sense.content.0.text.1",
					"powers.weather_sense.content.0.text.2"
				]
			}
		]
	},
	{
		"name": "powers.injure_kill.name",
		"required": [
			"powers.life_detection.name",
			"powers.life_sense.name"
		],
		"difficulty": {
			"alter": {
				"level": [
					data.level.perception
				]
			}
		},
		"grantsDarkSidePointOnUse": true,
		"summary": "powers.injure_kill.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.injure_kill.content.0.text.0",
					"powers.injure_kill.content.0.text.1"
				]
			},
			{
				"type": "example",
				"text": "powers.injure_kill.content.1.text"
			}
		]
	},
	{
		"name": "powers.life_bond.name",
		"required": [
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.magnify_senses.name",
			"powers.receptive_telepathy.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3
			},
			"sense": {
				"level": [
					data.level.description
				],
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.life_bond.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.life_bond.content.0.text.0",
					"powers.life_bond.content.0.text.1"
				]
			},
			{
				"type": "effect",
				"text": [
					"powers.life_bond.content.1.text.0",
					"powers.life_bond.content.1.text.1",
					"powers.life_bond.content.1.text.2",
					"powers.life_bond.content.1.text.3"
				]
			},
			{
				"type": "effect",
				"text": "powers.life_bond.content.2.text"
			},
			{
				"type": "example",
				"text": "powers.life_bond.content.3.text"
			},
			{
				"type": "effect",
				"text": [
					"powers.life_bond.content.4.text.0",
					"powers.life_bond.content.4.text.1",
					"powers.life_bond.content.4.text.2",
					"powers.life_bond.content.4.text.3",
					"powers.life_bond.content.4.text.4"
				]
			}
		]
	},
	{
		"name": "powers.lifemerge.name",
		"difficulty": {
			"control": {
				"level": 4
			},
			"sense": {
				"level": 4
			}
		},
		"summary": "powers.lifemerge.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.lifemerge.content.0.text.0",
					"powers.lifemerge.content.0.text.1",
					"powers.lifemerge.content.0.text.2",
					"powers.lifemerge.content.0.text.3"
				]
			}
		]
	},
	{
		"name": "powers.control_another_s_disease.name",
		"required": [
			"powers.accelerate_healing.name",
			"powers.control_disease.name"
		],
		"timeToUse": data.time.minutes["30"],
		"timeToUseNote": data.time.notes.disease,
		"difficulty": {
			"control": {
				"level": 1,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": 1
			}
		},
		"summary": "powers.control_another_s_disease.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.control_another_s_disease.content.0.text"
			}
		]
	},
	{
		"name": "powers.detoxify_another_s_poison.name",
		"required": [
			"powers.accelerate_healing.name",
			"powers.accelerate_another_s_healing.name",
			"powers.control_pain.name",
			"powers.control_another_s_pain.name",
			"powers.detoxify_poison.name"
		],
		"timeToUse": data.time.minutes["5"],
		"difficulty": {
			"control": {
				"level": 1,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": [
					{
						"level": 1,
						"text": "powers.detoxify_another_s_poison.difficulty.alter.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.detoxify_poison.difficulty.control.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.detoxify_poison.difficulty.control.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.detoxify_poison.difficulty.control.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.detoxify_poison.difficulty.control.level.4.text"
					},
					{
						"level": 6,
						"text": "powers.detoxify_poison.difficulty.control.level.4.text"
					}
				]
			}
		},
		"summary": "powers.detoxify_another_s_poison.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.detoxify_another_s_poison.content.0.text"
			}
		]
	},
	{
		"name": "powers.feed_on_dark_side.name",
		"required": "powers.sense_force.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3,
						"text": "powers.feed_on_dark_side.difficulty.control.level.0.text"
					},
					{
						"level": 1,
						"text": "powers.feed_on_dark_side.difficulty.control.level.1.text"
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 3,
						"text": "powers.feed_on_dark_side.difficulty.alter.level.0.text"
					}
				]
			}
		},
		"grantsDarkSidePointOnUse": true,
		"summary": "powers.feed_on_dark_side.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.feed_on_dark_side.content.0.text.0",
					"powers.feed_on_dark_side.content.0.text.1",
					"powers.feed_on_dark_side.content.0.text.2",
					"powers.feed_on_dark_side.content.0.text.3"
				]
			},
			{
				"type": "warning",
				"text": "powers.feed_on_dark_side.content.1.text"
			}
		]
	},
	{
		"name": "powers.force_lightning.name",
		"extra": data.extra.inSight,
		"difficulty": {
			"control": {
				"level": 4,
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": [
					data.level.perception
				]
			}
		},
		"grantsDarkSidePointOnUse": true,
		"summary": "powers.force_lightning.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.force_lightning.content.0.text.0",
					"powers.force_lightning.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.inflict_pain.name",
		"required": [
			"powers.control_pain.name",
			"powers.life_sense.name"
		],
		"difficulty": {
			"control": {
				"level": 1,
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": [
					data.level.perception
				]
			}
		},
		"grantsDarkSidePointOnUse": true,
		"summary": "powers.inflict_pain.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.inflict_pain.content.0.text"
			}
		]
	},
	{
		"name": "powers.place_another_in_hibernation_trance.name",
		"required": "powers.hibernation_trance.name",
		"timeToUse": data.time.minutes["5"],
		"difficulty": {
			"control": {
				"level": 1,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": 4
			}
		},
		"summary": "powers.place_another_in_hibernation_trance.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.place_another_in_hibernation_trance.content.0.text.0",
					"powers.place_another_in_hibernation_trance.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.redirect_energy.name",
		"required": "powers.absorb_dissipate_energy.name",
		"difficulty": {
			"control": {
				"level": 4
			},
			"alter": {
				"level": [
					{
						"level": 5
					},
					data.level.dodge
				]
			}
		},
		"summary": "powers.redirect_energy.summary",
		"content": [
			{
				"type": "warning",
				"text": "powers.redirect_energy.content.0.text"
			},
			{
				"type": "effect",
				"text": "powers.redirect_energy.content.1.text"
			}
		]
	},
	{
		"name": "powers.remove_another_s_fatigue.name",
		"required": [
			"powers.accelerate_healing.name",
			"powers.accelerate_another_s_healing.name",
			"powers.control_pain.name",
			"powers.control_another_s_pain.name",
			"powers.remove_fatigue.name"
		],
		"difficulty": {
			"control": {
				"level": 2
			},
			"alter": {
				"level": 3,
				"modifiers": data.modifiers.relationship
			}
		},
		"summary": "powers.remove_another_s_fatigue.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.remove_another_s_fatigue.content.0.text"
			}
		]
	},
	{
		"name": "powers.return_another_to_consciousness.name",
		"required": [
			"powers.remain_conscious.name",
			"powers.control_pain.name"
		],
		"difficulty": {
			"control": {
				"level": 2,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "powers.reduce_injury.difficulty.control.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.reduce_injury.difficulty.control.level.1.text"
					}
				]
			}
		},
		"summary": "powers.return_another_to_consciousness.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.return_another_to_consciousness.content.0.text"
			}
		]
	},
	{
		"name": "powers.dim_another_s_senses.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 2,
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": [
					data.level.perception
				]
			}
		},
		"summary": "powers.dim_another_s_senses.summary",
		"content": [
			{
				"type": "note",
				"text": "powers.dim_another_s_senses.content.0.text"
			},
			{
				"type": "table",
				"text": "powers.dim_another_s_senses.content.1.text",
				"columns": [
					"powers.dim_another_s_senses.content.1.columns.0",
					"powers.dim_another_s_senses.content.1.columns.1"
				],
				"rows": [
					[
						"powers.inspire.content.1.rows.0.0",
						"powers.dim_another_s_senses.content.1.rows.0.1"
					],
					[
						"powers.inspire.content.1.rows.1.0",
						"powers.dim_another_s_senses.content.1.rows.1.1"
					],
					[
						"powers.inspire.content.1.rows.2.0",
						"powers.dim_another_s_senses.content.1.rows.2.1"
					],
					[
						"powers.force_push.content.2.rows.3.0",
						"powers.dim_another_s_senses.content.1.rows.3.1"
					],
					[
						"powers.force_push.content.2.rows.4.0",
						"powers.dim_another_s_senses.content.1.rows.4.1"
					]
				],
				"subnote": "powers.dim_another_s_senses.content.1.subnote"
			}
		]
	},
	{
		"name": "powers.greater_force_shield.name",
		"required": [
			"powers.absorb_dissipate_energy.name",
			"powers.concentration.name",
			"powers.magnify_senses.name",
			"powers.telekinesis.name",
			"powers.lesser_force_shield.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 4
			},
			"alter": {
				"level": 5
			}
		},
		"summary": "powers.greater_force_shield.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.greater_force_shield.content.0.text"
			},
			{
				"type": "example",
				"text": "powers.greater_force_shield.content.1.text"
			},
			{
				"type": "effect",
				"text": "powers.greater_force_shield.content.2.text"
			}
		]
	},
	{
		"name": "powers.battle_meditation.name",
		"extra": data.extra.keptUp,
		"timeToUse": data.time.minutes["5"],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "powers.battle_meditation.difficulty.alter.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.battle_meditation.difficulty.alter.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.battle_meditation.difficulty.alter.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.battle_meditation.difficulty.alter.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.battle_meditation.difficulty.alter.level.4.text"
					},
					{
						"level": 6,
						"text": "powers.battle_meditation.difficulty.alter.level.5.text"
					}
				]
			},
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "powers.battle_meditation.difficulty.alter.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.battle_meditation.difficulty.alter.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.battle_meditation.difficulty.alter.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.battle_meditation.difficulty.alter.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.battle_meditation.difficulty.alter.level.4.text"
					},
					{
						"level": 6,
						"text": "powers.battle_meditation.difficulty.alter.level.5.text"
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 1,
						"text": "powers.battle_meditation.difficulty.alter.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.battle_meditation.difficulty.alter.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.battle_meditation.difficulty.alter.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.battle_meditation.difficulty.alter.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.battle_meditation.difficulty.alter.level.4.text"
					},
					{
						"level": 6,
						"text": "powers.battle_meditation.difficulty.alter.level.5.text"
					}
				]
			}
		},
		"summary": "powers.battle_meditation.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.battle_meditation.content.0.text.0",
					"powers.battle_meditation.content.0.text.1",
					"powers.battle_meditation.content.0.text.2",
					"powers.battle_meditation.content.0.text.3"
				]
			},
			{
				"type": "example",
				"text": "powers.battle_meditation.content.1.text"
			}
		]
	},
	{
		"name": "powers.control_mind.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3
					},
					{
						"level": data.level.perception,
						"text": "powers.control_mind.difficulty.control.level.1.text",
						"optional": true
					}
				],
				"modifiers": data.modifiers.relationship
			},
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "powers.control_mind.difficulty.sense.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.control_mind.difficulty.sense.level.1.text"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"conditional": {
					"description": "powers.control_mind.difficulty.alter.conditional.description",
					"tables": [
						{
							"title": "powers.control_mind.difficulty.alter.conditional.tables.0.title",
							"columns": [
								"powers.control_mind.difficulty.alter.conditional.tables.0.columns.0",
								"powers.control_mind.difficulty.alter.conditional.tables.0.columns.1",
								"powers.control_mind.difficulty.alter.conditional.tables.0.columns.2"
							],
							"rows": [
								[
									"powers.control_mind.difficulty.alter.conditional.tables.0.rows.0.0",
									1,
									2
								],
								[
									"powers.control_mind.difficulty.alter.conditional.tables.0.rows.1.0",
									2,
									3
								],
								[
									"powers.control_mind.difficulty.alter.conditional.tables.0.rows.2.0",
									3,
									4
								],
								[
									"powers.control_mind.difficulty.alter.conditional.tables.0.rows.3.0",
									4,
									5
								],
								[
									"powers.control_mind.difficulty.alter.conditional.tables.0.rows.4.0",
									5,
									6
								]
							]
						},
						{
							"title": "powers.control_mind.difficulty.alter.conditional.tables.1.title",
							"columns": [
								"powers.control_mind.difficulty.alter.conditional.tables.0.columns.0",
								"powers.control_mind.difficulty.alter.conditional.tables.0.columns.1",
								"powers.control_mind.difficulty.alter.conditional.tables.0.columns.2"
							],
							"rows": [
								[
									"powers.control_mind.difficulty.alter.conditional.tables.0.rows.0.0",
									3,
									4
								],
								[
									"powers.control_mind.difficulty.alter.conditional.tables.0.rows.1.0",
									4,
									5
								],
								[
									"powers.control_mind.difficulty.alter.conditional.tables.0.rows.2.0",
									5,
									6
								]
							]
						}
					]
				}
			}
		},
		"summary": "powers.control_mind.summary",
		"content": [
			{
				"type": "warning",
				"text": [
					data.warnings.darkSidePointOnUseWarning,
					"powers.control_mind.content.0.text.1"
				]
			},
			{
				"type": "note",
				"text": "powers.control_mind.content.1.text"
			},
			{
				"type": "effect",
				"text": [
					"powers.control_mind.content.2.text.0",
					"powers.control_mind.content.2.text.1",
					"powers.control_mind.content.2.text.2",
					"powers.control_mind.content.2.text.3"
				]
			}
		]
	},
	{
		"name": "powers.create_force_storms.name",
		"required": [
			"powers.hibernation_trance.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.magnify_senses.name",
			"powers.receptive_telepathy.name",
			"powers.sense_force.name",
			"powers.telekinesis.name",
			"powers.farseeing.name",
			"powers.projective_telepathy.name",
			"powers.instinctive_astrogation.name",
			"powers.rage.name"
		],
		"difficulty": {
			"control": {
				"level": 6
			},
			"sense": {
				"level": 6
			},
			"alter": {
				"level": 6,
				"upkeep": [
					{
						"level": 6,
						"text": "powers.create_force_storms.difficulty.alter.upkeep.0.text"
					},
					{
						"level": 5,
						"text": "powers.create_force_storms.difficulty.alter.upkeep.1.text"
					}
				],
				"increased": [
					{
						"add": "powers.telekinesis.difficulty.alter.increased.0.add",
						"text": "powers.create_force_storms.difficulty.alter.increased.0.text"
					},
					{
						"add": "powers.postcognition.difficulty.sense.increased.0.add",
						"text": "powers.create_force_storms.difficulty.alter.increased.1.text"
					},
					{
						"add": "powers.transfer_life.difficulty.sense.increased.0.add",
						"text": "powers.create_force_storms.difficulty.alter.increased.2.text"
					},
					{
						"add": "powers.battle_meld.difficulty.control.increased.0.add",
						"text": "powers.create_force_storms.difficulty.alter.increased.3.text"
					},
					{
						"add": "powers.telekinesis.difficulty.alter.increased.0.add",
						"text": "powers.create_force_storms.difficulty.alter.increased.4.text"
					}
				],
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.create_force_storms.summary",
		"content": [
			{
				"type": "warning",
				"text": [
					"powers.create_force_storms.content.0.text.0",
					data.warnings.darkSidePointOnUseWarning
				]
			},
			{
				"type": "effect",
				"text": [
					"powers.create_force_storms.content.1.text.0",
					"powers.create_force_storms.content.1.text.1",
					"powers.create_force_storms.content.1.text.2",
					"powers.create_force_storms.content.1.text.3"
				]
			}
		]
	},
	{
		"name": "powers.doppleganger.name",
		"required": [
			"powers.control_pain.name",
			"powers.emptiness.name",
			"powers.hibernation_trance.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.magnify_senses.name",
			"powers.receptive_telepathy.name",
			"powers.sense_force.name",
			"powers.telekinesis.name",
			"powers.projective_telepathy.name",
			"powers.control_another_s_pain.name",
			"powers.transfer_force.name",
			"powers.affect_mind.name",
			"powers.dim_another_s_senses.name"
		],
		"extra": data.extra.keptUp,
		"timeToUse": data.time.minutes["5"],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 5
			},
			"sense": {
				"level": 5
			},
			"alter": {
				"level": 6
			}
		},
		"summary": "powers.doppleganger.summary",
		"content": [
			{
				"type": "note",
				"text": "powers.doppleganger.content.0.text"
			},
			{
				"type": "effect",
				"text": [
					"powers.doppleganger.content.1.text.0",
					"powers.doppleganger.content.1.text.1"
				]
			}
		]
	},
	{
		"name": "powers.drain_life_essence.name",
		"required": [
			"powers.control_pain.name",
			"powers.hibernation_trance.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.magnify_senses.name",
			"powers.receptive_telepathy.name",
			"powers.sense_force.name",
			"powers.telekinesis.name",
			"powers.farseeing.name",
			"powers.projective_telepathy.name",
			"powers.control_another_s_pain.name",
			"powers.transfer_force.name",
			"powers.affect_mind.name",
			"powers.control_mind.name",
			"powers.dim_another_s_senses.name"
		],
		"extra": data.extra.keptUp,
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 5,
				"modifiers": data.modifiers.inverseRelationship
			},
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "powers.drain_life_essence.difficulty.sense.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.drain_life_essence.difficulty.sense.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.drain_life_essence.difficulty.sense.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.drain_life_essence.difficulty.sense.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.drain_life_essence.difficulty.sense.level.4.text"
					},
					{
						"level": 6,
						"text": "powers.drain_life_essence.difficulty.sense.level.5.text"
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "powers.drain_life_essence.difficulty.alter.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.drain_life_essence.difficulty.alter.level.1.text"
					},
					{
						"level": 6,
						"text": "powers.drain_life_essence.difficulty.alter.level.2.text"
					}
				],
				"increased": [
					{
						"add": "powers.postcognition.difficulty.sense.increased.0.add",
						"text": "powers.drain_life_essence.difficulty.alter.increased.0.text"
					}
				]
			}
		},
		"summary": "powers.drain_life_essence.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.drain_life_essence.content.0.text.0",
					"powers.drain_life_essence.content.0.text.1",
					"powers.drain_life_essence.content.0.text.2",
					"powers.drain_life_essence.content.0.text.3"
				]
			},
			{
				"type": "table",
				"title": "powers.drain_life_essence.content.1.title",
				"columns": [
					"powers.drain_life_essence.content.1.columns.0",
					"powers.drain_life_essence.content.1.columns.1"
				],
				"rows": [
					[
						"powers.drain_life_essence.content.1.rows.0.0",
						"powers.drain_life_essence.content.1.rows.0.1"
					],
					[
						"powers.drain_life_essence.content.1.rows.1.0",
						"powers.drain_life_essence.content.1.rows.1.1"
					],
					[
						"powers.drain_life_essence.content.1.rows.2.0",
						"powers.drain_life_essence.content.1.rows.2.1"
					],
					[
						"powers.drain_life_essence.content.1.rows.3.0",
						"powers.drain_life_essence.content.1.rows.3.1"
					],
					[
						"powers.drain_life_essence.content.1.rows.4.0",
						"powers.drain_life_essence.content.1.rows.4.1"
					],
					[
						"powers.drain_life_essence.content.1.rows.5.0",
						"powers.drain_life_essence.content.1.rows.5.1"
					]
				]
			},
			{
				"type": "table",
				"title": "powers.drain_life_essence.content.2.title",
				"columns": [
					"powers.drain_life_essence.content.1.columns.0",
					"powers.drain_life_essence.content.1.columns.1"
				],
				"rows": [
					[
						"powers.drain_life_essence.content.1.rows.0.0",
						"powers.drain_life_essence.content.2.rows.0.1"
					],
					[
						"powers.drain_life_essence.content.1.rows.1.0",
						"powers.drain_life_essence.content.2.rows.1.1"
					],
					[
						"powers.drain_life_essence.content.1.rows.2.0",
						"powers.drain_life_essence.content.2.rows.2.1"
					],
					[
						"powers.drain_life_essence.content.1.rows.3.0",
						"powers.drain_life_essence.content.2.rows.3.1"
					],
					[
						"powers.drain_life_essence.content.1.rows.4.0",
						"powers.drain_life_essence.content.2.rows.4.1"
					],
					[
						"powers.drain_life_essence.content.1.rows.5.0",
						"powers.drain_life_essence.content.2.rows.5.1"
					]
				]
			}
		]
	},
	{
		"name": "powers.enhanced_coordination.name",
		"extra": [
			data.extra.keptUp,
			"powers.enhanced_coordination.extra.1",
			"powers.enhanced_coordination.extra.2"
		],
		"difficulty": {
			"control": {
				"level": 3,
				"modifiers": data.modifiers.proximity
			},
			"sense": {
				"level": 4
			},
			"alter": {
				"level": [
					{
						"level": 1,
						"text": "powers.enhanced_coordination.difficulty.alter.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.enhanced_coordination.difficulty.alter.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.enhanced_coordination.difficulty.alter.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.enhanced_coordination.difficulty.alter.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.enhanced_coordination.difficulty.alter.level.4.text"
					},
					{
						"level": 6,
						"text": "powers.enhanced_coordination.difficulty.alter.level.5.text"
					}
				]
			}
		},
		"summary": "powers.enhanced_coordination.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.enhanced_coordination.content.0.text"
			}
		]
	},
	{
		"name": "powers.force_harmony.name",
		"required": [
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.receptive_telepathy.name",
			"powers.projective_telepathy.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 4,
				"modifiers": data.modifiers.proximity
			},
			"sense": {
				"level": 4,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": 3
			}
		},
		"summary": "powers.force_harmony.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.force_harmony.content.0.text"
			},
			{
				"type": "example",
				"text": "powers.force_harmony.content.1.text"
			},
			{
				"type": "effect",
				"text": "powers.force_harmony.content.2.text"
			}
		]
	},
	{
		"name": "powers.projected_fighting.name",
		"required": [
			"powers.concentration.name",
			"powers.telekinesis.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 4
			},
			"sense": {
				"level": 4
			},
			"alter": {
				"level": 3,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.projected_fighting.summary",
		"content": [
			{
				"type": "warning",
				"text": "powers.projected_fighting.content.0.text"
			},
			{
				"type": "note",
				"text": "powers.projected_fighting.content.1.text"
			},
			{
				"type": "effect",
				"text": [
					"powers.projected_fighting.content.2.text.0",
					"powers.projected_fighting.content.2.text.1"
				]
			}
		]
	},
	{
		"name": "powers.telekinetic_kill.name",
		"required": [
			"powers.control_pain.name",
			"powers.inflict_pain.name",
			"powers.injure_kill.name",
			"powers.life_sense.name"
		],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 2,
				"modifiers": data.modifiers.proximity
			},
			"sense": {
				"level": 2,
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": data.level.perception
			}
		},
		"summary": "powers.telekinetic_kill.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.telekinetic_kill.content.0.text"
			}
		]
	},
	{
		"name": "powers.transfer_life.name",
		"required": [
			"powers.absorb_dissipate_energy.name",
			"powers.accelerate_healing.name",
			"powers.control_pain.name",
			"powers.emptiness.name",
			"powers.detoxify_poison.name",
			"powers.hibernation_trance.name",
			"powers.reduce_injury.name",
			"powers.remain_conscious.name",
			"powers.resist_stun.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.magnify_senses.name",
			"powers.receptive_telepathy.name",
			"powers.sense_force.name",
			"powers.telekinesis.name",
			"powers.injure_kill.name",
			"powers.farseeing.name",
			"powers.projective_telepathy.name",
			"powers.accelerate_another_s_healing.name",
			"powers.control_another_s_pain.name",
			"powers.feed_on_dark_side.name",
			"powers.inflict_pain.name",
			"powers.return_another_to_consciousness.name",
			"powers.dim_another_s_senses.name",
			"powers.transfer_force.name",
			"powers.affect_mind.name"
		],
		"difficulty": {
			"control": {
				"level": 6,
				"increased": [
					{
						"add": "powers.transfer_life.difficulty.sense.increased.0.add",
						"text": "powers.transfer_life.difficulty.control.increased.0.text"
					}
				],
				"modifiers": data.modifiers.relationship
			},
			"sense": {
				"level": 6,
				"increased": [
					{
						"add": "powers.transfer_life.difficulty.sense.increased.0.add",
						"text": "powers.transfer_life.difficulty.sense.increased.0.text"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "powers.transfer_life.difficulty.alter.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.transfer_life.difficulty.alter.level.1.text"
					},
					{
						"level": 4,
						"text": "powers.transfer_life.difficulty.alter.level.2.text"
					},
					{
						"level": 5,
						"text": "powers.transfer_life.difficulty.alter.level.3.text"
					},
					{
						"level": data.level.willpowerAlter,
						"text": "powers.transfer_life.difficulty.alter.level.4.text",
						"optional": true
					}
				]
			}
		},
		"summary": "powers.transfer_life.summary",
		"content": [
			{
				"type": "warning",
				"text": [
					data.warnings.darkSidePointOnUseWarning,
					"powers.transfer_life.content.0.text.1"
				]
			},
			{
				"type": "effect",
				"text": [
					"powers.transfer_life.content.1.text.0",
					"powers.transfer_life.content.1.text.1"
				]
			}
		]
	},
	{
		"name": "powers.force_scream.name",
		"summary": "powers.force_scream.summary",
		"content": [
			{
				"type": "note",
				"text": "powers.force_scream.content.0.text"
			},
			{
				"type": "effect",
				"text": [
					"powers.force_scream.content.1.text.0",
					"powers.force_scream.content.1.text.1",
					"powers.force_scream.content.1.text.2",
					"powers.force_scream.content.1.text.3",
					"powers.force_scream.content.1.text.4"
				]
			}
		]
	},
	{
		"name": "powers.bolt_of_hatred.name",
		"extra": data.extra.sithDiscipline,
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"alter": {
				"level": 3
			}
		},
		"summary": "powers.bolt_of_hatred.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.bolt_of_hatred.content.0.text"
			}
		]
	},
	{
		"name": "powers.dark_side_web.name",
		"extra": [
			data.extra.keptUp,
			data.extra.sithDiscipline
		],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"alter": {
				"level": 4
			}
		},
		"summary": "powers.dark_side_web.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.dark_side_web.content.0.text.0",
					"powers.dark_side_web.content.0.text.1"
				]
			},
			{
				"type": "example",
				"text": "powers.dark_side_web.content.1.text"
			},
			{
				"type": "effect",
				"text": "powers.dark_side_web.content.2.text"
			}
		]
	},
	{
		"name": "powers.aura_of_uneasiness.name",
		"extra": [
			data.extra.sithDiscipline,
			data.extra.inSight
		],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 2,
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": 2
			}
		},
		"summary": "powers.aura_of_uneasiness.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.aura_of_uneasiness.content.0.text"
			}
		]
	},
	{
		"name": "powers.electronic_manipulation.name",
		"required": [
			"powers.absorb_dissipate_energy.name",
			"powers.affect_mind.name"
		],
		"extra": data.extra.sithDiscipline,
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2,
						"text": "powers.electronic_manipulation.difficulty.control.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.electronic_manipulation.difficulty.control.level.1.text"
					},
					{
						"level": 4,
						"text": "powers.electronic_manipulation.difficulty.control.level.2.text"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "powers.electronic_manipulation.difficulty.alter.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.electronic_manipulation.difficulty.alter.level.1.text"
					},
					{
						"level": 4,
						"text": "powers.electronic_manipulation.difficulty.alter.level.2.text"
					}
				]
			}
		},
		"summary": "powers.electronic_manipulation.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.electronic_manipulation.content.0.text.0",
					"powers.electronic_manipulation.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.waves_of_darkness.name",
		"extra": [
			data.extra.keptUp,
			data.extra.sithDiscipline
		],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3,
						"text": "powers.waves_of_darkness.difficulty.alter.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.waves_of_darkness.difficulty.alter.level.1.text"
					},
					{
						"level": 5,
						"text": "powers.waves_of_darkness.difficulty.alter.level.2.text"
					},
					{
						"level": 6,
						"text": "powers.waves_of_darkness.difficulty.alter.level.3.text"
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 3,
						"text": "powers.waves_of_darkness.difficulty.alter.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.waves_of_darkness.difficulty.alter.level.1.text"
					},
					{
						"level": 5,
						"text": "powers.waves_of_darkness.difficulty.alter.level.2.text"
					},
					{
						"level": 6,
						"text": "powers.waves_of_darkness.difficulty.alter.level.3.text"
					}
				]
			}
		},
		"summary": "powers.waves_of_darkness.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.waves_of_darkness.content.0.text.0",
					"powers.waves_of_darkness.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.force_wind.name",
		"required": [
			"powers.magnify_senses.name",
			"powers.shift_sense.name",
			"powers.telekinesis.name"
		],
		"extra": [
			data.extra.keptUp,
			data.extra.sithDiscipline
		],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"sense": {
				"level": 3
			},
			"alter": {
				"level": [
					{
						"level": 3,
						"text": "powers.force_wind.difficulty.alter.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.force_wind.difficulty.alter.level.1.text"
					},
					{
						"level": 5,
						"text": "powers.force_wind.difficulty.alter.level.2.text"
					}
				]
			}
		},
		"summary": "powers.force_wind.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.force_wind.content.0.text"
			}
		]
	},
	{
		"name": "powers.drain_life_energy.name",
		"extra": [
			data.extra.keptUp,
			data.extra.sithDiscipline
		],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 2
			},
			"sense": {
				"level": 2,
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": 2
			}
		},
		"summary": "powers.drain_life_energy.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.drain_life_energy.content.0.text"
			}
		]
	},
	{
		"name": "powers.memory_wipe.name",
		"required": [
			"powers.control_pain.name",
			"powers.hibernation_trance.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.magnify_senses.name",
			"powers.receptive_telepathy.name",
			"powers.sense_force.name",
			"powers.telekinesis.name",
			"powers.farseeing.name",
			"powers.projective_telepathy.name",
			"powers.affect_mind.name",
			"powers.control_mind.name",
			"powers.dim_another_s_senses.name"
		],
		"extra": data.extra.sithDiscipline,
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 3
			},
			"sense": {
				"level": data.level.perception,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": data.level.perception,
				"modifiers": data.modifiers.relationship
			}
		},
		"summary": "powers.memory_wipe.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.memory_wipe.content.0.text"
			}
		]
	},
	{
		"name": "powers.channel_rage.name",
		"extra": data.extra.keptUp,
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 2
			}
		},
		"summary": "powers.channel_rage.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.channel_rage.content.0.text"
			}
		]
	},
	{
		"name": "powers.force_shot.name",
		"required": [
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.sense_force.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 3
			}
		},
		"summary": "powers.force_shot.summary",
		"content": [
			{
				"type": "warning",
				"text": "powers.force_shot.content.0.text"
			},
			{
				"type": "effect",
				"text": "powers.force_shot.content.1.text"
			}
		]
	},
	{
		"name": "powers.guided_attack.name",
		"required": [
			"powers.combat_sense.name",
			"powers.danger_sense.name",
			"powers.farseeing.name",
			"powers.life_sense.name",
			"powers.life_detection.name",
			"powers.sense_force.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": data.level.perception
			}
		},
		"summary": "powers.guided_attack.summary",
		"content": [
			{
				"type": "warning",
				"text": "powers.force_shot.content.0.text"
			},
			{
				"type": "effect",
				"text": "powers.guided_attack.content.1.text"
			}
		]
	},
	{
		"name": "powers.nature_affinity.name",
		"required": [
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.sense_force.name"
		],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "powers.nature_affinity.difficulty.sense.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.nature_affinity.difficulty.sense.level.1.text"
					},
					{
						"level": data.level.hide,
						"text": "powers.nature_affinity.difficulty.sense.level.2.text",
						"optional": true
					}
				]
			}
		},
		"summary": "powers.nature_affinity.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.nature_affinity.content.0.text"
			}
		]
	},
	{
		"name": "powers.sense_surroundings.name",
		"required": [
			"powers.magnify_senses.name",
			"powers.sense_force.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 2
			}
		},
		"summary": "powers.sense_surroundings.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.sense_surroundings.content.0.text"
			}
		]
	},
	{
		"name": "powers.empower_force.name",
		"difficulty": {
			"alter": {
				"level": 5
			}
		},
		"summary": "powers.empower_force.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.empower_force.content.0.text"
			},
			{
				"type": "example",
				"text": "powers.empower_force.content.1.text"
			},
			{
				"type": "effect",
				"text": "powers.empower_force.content.2.text"
			},
			{
				"type": "example",
				"text": "powers.empower_force.content.3.text"
			}
		]
	},
	{
		"name": "powers.enlarge_force.name",
		"difficulty": {
			"alter": {
				"level": 4
			}
		},
		"summary": "powers.enlarge_force.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.enlarge_force.content.0.text"
			},
			{
				"type": "example",
				"text": "powers.enlarge_force.content.1.text"
			},
			{
				"type": "effect",
				"text": "powers.enlarge_force.content.2.text"
			}
		]
	},
	{
		"name": "powers.extend_force.name",
		"difficulty": {
			"alter": {
				"level": 4
			}
		},
		"summary": "powers.extend_force.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.extend_force.content.0.text"
			},
			{
				"type": "example",
				"text": "powers.extend_force.content.1.text"
			},
			{
				"type": "effect",
				"text": "powers.extend_force.content.2.text"
			}
		]
	},
	{
		"name": "powers.force_flight.name",
		"required": [
			"powers.concentration.name",
			"powers.telekinesis.name"
		],
		"difficulty": {
			"alter": {
				"level": {
					"level": "powers.force_flight.difficulty.alter.level.level",
					"text": "powers.force_flight.difficulty.alter.level.text"
				}
			}
		},
		"summary": "powers.force_flight.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.force_flight.content.0.text"
			}
		]
	},
	{
		"name": "powers.force_light.name",
		"required": [
			"powers.force_harmony.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.projective_telepathy.name",
			"powers.receptive_telepathy.name"
		],
		"difficulty": {
			"alter": {
				"level": 2
			}
		},
		"summary": "powers.force_light.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.force_light.content.0.text"
			},
			{
				"type": "table",
				"text": "powers.force_light.content.1.text",
				"columns": [
					"powers.inspire.content.1.columns.0",
					"powers.force_light.content.1.columns.1",
					"powers.force_light.content.1.columns.2",
					"powers.force_light.content.1.columns.3"
				],
				"rows": [
					[
						"powers.farseeing.content.1.rows.0.0",
						2,
						"powers.force_light.content.1.rows.0.2",
						"powers.force_light.content.1.rows.0.3"
					],
					[
						"powers.farseeing.content.1.rows.1.0",
						3,
						"powers.force_light.content.1.rows.1.2",
						"powers.force_light.content.1.rows.0.3"
					],
					[
						"powers.force_light.content.1.rows.2.0",
						4,
						"powers.force_light.content.1.rows.2.2",
						"powers.force_light.content.1.rows.0.3"
					],
					[
						"powers.force_light.content.1.rows.3.0",
						5,
						"powers.force_light.content.1.rows.3.2",
						"powers.force_light.content.1.rows.3.3"
					]
				]
			},
			{
				"type": "effect",
				"text": "powers.force_light.content.2.text"
			}
		]
	},
	{
		"name": "powers.inspire.name",
		"required": [
			"powers.affect_mind.name",
			"powers.battle_meditation.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"alter": {
				"level": 5,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.inspire.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.inspire.content.0.text"
			},
			{
				"type": "table",
				"text": "powers.inspire.content.1.text",
				"columns": [
					"powers.inspire.content.1.columns.0",
					"powers.inspire.content.1.columns.1"
				],
				"rows": [
					[
						"powers.inspire.content.1.rows.0.0",
						"powers.inspire.content.1.rows.0.1"
					],
					[
						"powers.inspire.content.1.rows.1.0",
						"powers.inspire.content.1.rows.1.1"
					],
					[
						"powers.inspire.content.1.rows.2.0",
						"powers.inspire.content.1.rows.2.1"
					],
					[
						"powers.inspire.content.1.rows.3.0",
						"powers.inspire.content.1.rows.3.1"
					]
				]
			}
		]
	},
	{
		"name": "powers.maximize_force.name",
		"difficulty": {
			"alter": {
				"level": 6
			}
		},
		"summary": "powers.maximize_force.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.maximize_force.content.0.text"
			},
			{
				"type": "note",
				"text": "powers.maximize_force.content.1.text"
			}
		]
	},
	{
		"name": "powers.shadow_bomb.name",
		"required": "powers.telekinesis.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"alter": {
				"level": data.level.description
			}
		},
		"summary": "powers.shadow_bomb.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.shadow_bomb.content.0.text"
			}
		]
	},
	{
		"name": "powers.split_force.name",
		"difficulty": {
			"alter": {
				"level": 4
			}
		},
		"summary": "powers.split_force.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.split_force.content.0.text"
			},
			{
				"type": "example",
				"text": "powers.split_force.content.1.text"
			},
			{
				"type": "effect",
				"text": "powers.split_force.content.2.text"
			}
		]
	},
	{
		"name": "powers.battle_meld.name",
		"required": [
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.projective_telepathy.name",
			"powers.receptive_telepathy.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 2,
				"increased": [
					{
						"add": "powers.battle_meld.difficulty.control.increased.0.add",
						"text": "powers.battle_meld.difficulty.control.increased.0.text"
					}
				],
				"modifiers": data.modifiers.relationship
			},
			"sense": {
				"level": 2,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "powers.battle_meld.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.battle_meld.content.0.text"
			}
		]
	},
	{
		"name": "powers.shield_gauntlet_defense.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3
			},
			"sense": {
				"level": 2
			}
		},
		"summary": "powers.shield_gauntlet_defense.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.shield_gauntlet_defense.content.0.text"
			}
		]
	},
	{
		"name": "powers.sith_sorcery.name",
		"required": [
			"powers.enhance_attribute.name",
			"powers.feed_on_dark_side.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.sense_force.name"
		],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 4
			},
			"sense": {
				"level": 3
			}
		},
		"summary": "powers.sith_sorcery.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.sith_sorcery.content.0.text"
			},
			{
				"type": "table",
				"columns": [
					"powers.sith_sorcery.content.1.columns.0",
					"powers.sith_sorcery.content.1.columns.1",
					"powers.sith_sorcery.content.1.columns.2"
				],
				"rows": [
					[
						"powers.sith_sorcery.content.1.rows.0.0",
						"powers.friendship.content.1.rows.0.1",
						"powers.sith_sorcery.content.1.rows.0.2"
					],
					[
						"powers.sith_sorcery.content.1.rows.1.0",
						"powers.force_jump.content.0.rows.0.1",
						"powers.sith_sorcery.content.1.rows.0.2"
					],
					[
						"powers.sith_sorcery.content.1.rows.2.0",
						"powers.friendship.content.1.rows.2.1",
						"powers.sith_sorcery.content.1.rows.2.2"
					],
					[
						"powers.sith_sorcery.content.1.rows.3.0",
						"powers.friendship.content.1.rows.3.1",
						"powers.sith_sorcery.content.1.rows.2.2"
					],
					[
						"powers.force_weapon.content.2.rows.3.0",
						"powers.force_jump.content.0.rows.1.1",
						"powers.sith_sorcery.content.1.rows.4.2"
					]
				]
			},
			{
				"type": "effect",
				"text": "powers.sith_sorcery.content.2.text"
			},
			{
				"type": "example",
				"text": "powers.sith_sorcery.content.3.text"
			}
		]
	},
	{
		"name": "powers.sith_sword_combat.name",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3
			},
			"sense": {
				"level": 2
			}
		},
		"summary": "powers.sith_sword_combat.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.sith_sword_combat.content.0.text"
			}
		]
	},
	{
		"name": "powers.create_force_talisman.name",
		"required": [
			"powers.concentration.name",
			"powers.control_another_s_pain.name",
			"powers.control_pain.name",
			"powers.force_weapon.name",
			"powers.transfer_force.name"
		],
		"difficulty": {
			"control": {
				"level": 3
			},
			"alter": {
				"level": 4
			}
		},
		"summary": "powers.create_force_talisman.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.create_force_talisman.content.0.text"
			},
			{
				"type": "table",
				"columns": [
					"powers.inspire.content.1.columns.0",
					"powers.create_force_talisman.content.1.columns.1"
				],
				"rows": [
					[
						"powers.force_weapon.content.2.rows.0.0",
						"powers.friendship.content.1.rows.0.1"
					],
					[
						"powers.force_weapon.content.2.rows.1.0",
						"powers.force_jump.content.0.rows.0.1"
					],
					[
						"powers.mind_numbing.content.1.rows.4.0",
						"powers.friendship.content.1.rows.2.1"
					]
				]
			}
		]
	},
	{
		"name": "powers.drain_energy.name",
		"required": "powers.absorb_dissipate_energy.name",
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "powers.drain_energy.difficulty.control.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.drain_energy.difficulty.control.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.drain_energy.difficulty.control.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.drain_energy.difficulty.control.level.3.text"
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "powers.drain_energy.difficulty.alter.level.0.text"
					},
					{
						"level": "powers.drain_energy.difficulty.alter.level.1.level",
						"text": "powers.drain_energy.difficulty.alter.level.1.text"
					}
				]
			}
		},
		"summary": "powers.drain_energy.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.drain_energy.content.0.text"
			}
		]
	},
	{
		"name": "powers.enhance_another_s_attribute.name",
		"required": [
			"powers.enhance_attribute.name",
			"powers.control_pain.name",
			"powers.control_another_s_pain.name",
			"powers.transfer_force.name"
		],
		"difficulty": {
			"control": {
				"level": 2,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": 3
			}
		},
		"summary": "powers.enhance_another_s_attribute.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.enhance_another_s_attribute.content.0.text"
			},
			{
				"type": "table",
				"columns": [
					"powers.inspire.content.1.columns.0",
					"powers.enhance_attribute.content.1.columns.1",
					"powers.sith_sorcery.content.1.columns.2"
				],
				"rows": [
					[
						"powers.enhance_attribute.content.1.rows.0.0",
						"powers.force_jump.content.0.rows.0.1",
						"powers.sith_sorcery.content.1.rows.2.2"
					],
					[
						"powers.enhance_attribute.content.1.rows.1.0",
						"powers.force_jump.content.0.rows.1.1",
						"powers.sith_sorcery.content.1.rows.4.2"
					],
					[
						"powers.enhance_attribute.content.1.rows.2.0",
						"powers.force_jump.content.0.rows.2.1",
						"powers.enhance_another_s_attribute.content.1.rows.2.2"
					]
				]
			}
		]
	},
	{
		"name": "powers.force_weapon.name",
		"required": "powers.concentration.name",
		"difficulty": {
			"control": {
				"level": {
					"level": "powers.force_flight.difficulty.alter.level.level",
					"text": "powers.force_weapon.difficulty.control.level.text"
				}
			},
			"alter": {
				"level": 3
			}
		},
		"summary": "powers.force_weapon.summary",
		"content": [
			{
				"type": "warning",
				"text": "powers.force_weapon.content.0.text"
			},
			{
				"type": "effect",
				"text": "powers.force_weapon.content.1.text"
			},
			{
				"type": "table",
				"columns": [
					"powers.inspire.content.1.columns.0",
					"powers.force_weapon.content.2.columns.1"
				],
				"rows": [
					[
						"powers.force_weapon.content.2.rows.0.0",
						"powers.force_weapon.content.2.rows.0.1"
					],
					[
						"powers.force_weapon.content.2.rows.1.0",
						"powers.friendship.content.1.rows.0.1"
					],
					[
						"powers.force_weapon.content.2.rows.2.0",
						"powers.force_jump.content.0.rows.0.1"
					],
					[
						"powers.force_weapon.content.2.rows.3.0",
						"powers.friendship.content.1.rows.2.1"
					]
				]
			}
		]
	},
	{
		"name": "powers.hatred.name",
		"required": [
			"powers.control_pain.name",
			"powers.inflict_pain.name",
			"powers.injure_kill.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.hibernation_trance.name",
			"powers.rage.name",
			"powers.waves_of_darkness.name"
		],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 3
			},
			"alter": {
				"level": data.level.perception
			}
		},
		"summary": "powers.hatred.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.hatred.content.0.text"
			}
		]
	},
	{
		"name": "powers.morichro.name",
		"required": [
			"powers.accelerate_another_s_healing.name",
			"powers.control_another_s_pain.name",
			"powers.control_pain.name",
			"powers.hibernation_trance.name",
			"powers.injure_kill.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.place_another_in_hibernation_trance.name"
		],
		"difficulty": {
			"control": {
				"level": 3,
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": data.level.perception
			}
		},
		"summary": "powers.morichro.summary",
		"content": [
			{
				"type": "warning",
				"text": "powers.morichro.content.0.text"
			},
			{
				"type": "effect",
				"text": "powers.morichro.content.1.text"
			}
		]
	},
	{
		"name": "powers.plant_surge.name",
		"required": [
			"powers.concentration.name",
			"powers.telekinesis.name"
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2,
						"text": "powers.plant_surge.difficulty.control.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.plant_surge.difficulty.control.level.1.text"
					},
					{
						"level": 4,
						"text": "powers.plant_surge.difficulty.control.level.2.text"
					},
					{
						"level": 5,
						"text": "powers.plant_surge.difficulty.control.level.3.text"
					}
				]
			},
			"alter": {
				"level": data.level.brawlingParry
			}
		},
		"summary": "powers.plant_surge.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.plant_surge.content.0.text.0",
					"powers.plant_surge.content.0.text.1"
				]
			}
		]
	},
	{
		"name": "powers.friendship.name",
		"difficulty": {
			"sense": {
				"level": data.level.perception
			},
			"alter": {
				"level": [
					{
						"level": 1,
						"text": "powers.friendship.difficulty.alter.level.0.text"
					},
					{
						"level": 2,
						"text": "powers.friendship.difficulty.alter.level.1.text"
					},
					{
						"level": 3,
						"text": "powers.friendship.difficulty.alter.level.2.text"
					},
					{
						"level": 4,
						"text": "powers.friendship.difficulty.alter.level.3.text"
					},
					{
						"level": 5,
						"text": "powers.friendship.difficulty.alter.level.4.text"
					}
				]
			}
		},
		"summary": "powers.friendship.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.friendship.content.0.text"
			},
			{
				"type": "table",
				"columns": [
					"powers.friendship.content.1.columns.0",
					"powers.friendship.content.1.columns.1"
				],
				"rows": [
					[
						"powers.inspire.content.1.rows.0.0",
						"powers.friendship.content.1.rows.0.1"
					],
					[
						"powers.inspire.content.1.rows.1.0",
						"powers.force_jump.content.0.rows.0.1"
					],
					[
						"powers.inspire.content.1.rows.2.0",
						"powers.friendship.content.1.rows.2.1"
					],
					[
						"powers.force_push.content.2.rows.3.0",
						"powers.friendship.content.1.rows.3.1"
					],
					[
						"powers.force_push.content.2.rows.4.0",
						"powers.force_jump.content.0.rows.1.1"
					]
				]
			}
		]
	},
	{
		"name": "powers.malacia.name",
		"required": [
			"powers.enhance_another_s_attribute.name",
			"powers.enhance_attribute.name",
			"powers.control_pain.name",
			"powers.control_another_s_pain.name",
			"powers.transfer_force.name"
		],
		"difficulty": {
			"sense": {
				"level": 3
			},
			"alter": {
				"level": data.level.strengthControl
			}
		},
		"summary": "powers.malacia.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.malacia.content.0.text"
			}
		]
	},
	{
		"name": "powers.alchemy.name",
		"required": [
			"powers.accelerate_another_s_healing.name",
			"powers.control_another_s_pain.name",
			"powers.control_pain.name",
			"powers.enhance_attribute.name",
			"powers.enhance_another_s_attribute.name",
			"powers.feed_on_dark_side.name",
			"powers.hibernation_trance.name",
			"powers.injure_kill.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.place_another_in_hibernation_trance.name",
			"powers.sense_force.name",
			"powers.sith_sorcery.name",
			"powers.transfer_force.name"
		],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 3
			},
			"sense": {
				"level": 3
			},
			"alter": {
				"conditional": {
					"description": "powers.alchemy.difficulty.alter.conditional.description",
					"tables": [
						{
							"columns": [
								"powers.alchemy.difficulty.alter.conditional.tables.0.columns.0",
								"powers.alchemy.difficulty.alter.conditional.tables.0.columns.1"
							],
							"rows": [
								[
									"powers.alchemy.difficulty.alter.conditional.tables.0.rows.0.0",
									4
								],
								[
									"powers.alchemy.difficulty.alter.conditional.tables.0.rows.1.0",
									4
								],
								[
									"powers.alchemy.difficulty.alter.conditional.tables.0.rows.2.0",
									6
								],
								[
									"powers.alchemy.difficulty.alter.conditional.tables.0.rows.3.0",
									5
								],
								[
									"powers.alchemy.difficulty.alter.conditional.tables.0.rows.4.0",
									3
								],
								[
									"powers.alchemy.difficulty.alter.conditional.tables.0.rows.5.0",
									5
								],
								[
									"powers.alchemy.difficulty.alter.conditional.tables.0.rows.6.0",
									6
								],
								[
									"powers.alchemy.difficulty.alter.conditional.tables.0.rows.7.0",
									6
								],
								[
									"powers.alchemy.difficulty.alter.conditional.tables.0.rows.8.0",
									5
								],
								[
									"powers.alchemy.difficulty.alter.conditional.tables.0.rows.9.0",
									5
								]
							],
							"subnote": "powers.alchemy.difficulty.alter.conditional.tables.0.subnote"
						}
					]
				}
			}
		},
		"summary": "powers.alchemy.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.alchemy.content.0.text"
			}
		]
	},
	{
		"name": "powers.illusion.name",
		"required": [
			"powers.affect_mind.name",
			"powers.dim_another_s_senses.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.projective_telepathy.name",
			"powers.receptive_telepathy.name",
			"powers.sense_force.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3,
				"modifiers": data.modifiers.proximity
			},
			"sense": {
				"level": 3,
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": data.level.perception
			}
		},
		"summary": "powers.illusion.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.illusion.content.0.text"
			}
		]
	},
	{
		"name": "powers.sever_force.name",
		"required": [
			"powers.affect_mind.name",
			"powers.battle_meditation.name",
			"powers.concentration.name",
			"powers.hibernation_trance.name",
			"powers.emptiness.name",
			"powers.force_harmony.name",
			"powers.force_of_will.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.projective_telepathy.name",
			"powers.receptive_telepathy.name",
			"powers.sense_force.name",
			"powers.sense_force_potential.name"
		],
		"difficulty": {
			"control": {
				"level": 4
			},
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "powers.sever_force.difficulty.sense.level.0.text"
					},
					{
						"level": 4,
						"text": "powers.sever_force.difficulty.sense.level.1.text"
					}
				]
			},
			"alter": {
				"level": data.level.willpowerControl
			}
		},
		"summary": "powers.sever_force.summary",
		"content": [
			{
				"type": "note",
				"text": "powers.sever_force.content.0.text"
			},
			{
				"type": "special",
				"text": "powers.sever_force.content.1.text"
			},
			{
				"type": "effect",
				"text": "powers.sever_force.content.2.text"
			},
			{
				"type": "table",
				"columns": [
					"powers.force_push.content.2.columns.0",
					"powers.sever_force.content.3.columns.1"
				],
				"rows": [
					[
						"powers.farseeing.content.1.rows.0.0",
						3
					],
					[
						"powers.farseeing.content.1.rows.1.0",
						4
					],
					[
						"powers.force_light.content.1.rows.2.0",
						5
					],
					[
						"powers.sever_force.content.3.rows.3.0",
						6
					],
					[
						"powers.sever_force.content.3.rows.4.0",
						{
							"level": 6,
							"increase": "powers.telekinesis.difficulty.alter.increased.0.add"
						}
					]
				]
			},
			{
				"type": "effect",
				"text": "powers.sever_force.content.4.text"
			}
		]
	},
	{
		"name": "powers.control_temperature.name",
		"fanMade": true,
		"required": [
			"powers.hibernation_trance.name",
			"powers.absorb_dissipate_energy.name"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 2
			}
		},
		"summary": "powers.control_temperature.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.control_temperature.content.0.text.0",
					"powers.control_temperature.content.0.text.1",
					"powers.control_temperature.content.0.text.2"
				]
			},
			{
				"type": "table",
				"columns": [
					"powers.control_temperature.content.1.columns.0",
					"powers.control_temperature.content.1.columns.1"
				],
				"rows": [
					[
						"powers.inspire.content.1.rows.0.0",
						"powers.force_jump.content.0.rows.2.1"
					],
					[
						"powers.control_temperature.content.1.rows.1.0",
						"powers.force_jump.content.0.rows.3.1"
					],
					[
						"powers.control_temperature.content.1.rows.2.0",
						"powers.force_jump.content.0.rows.4.1"
					],
					[
						"powers.force_push.content.2.rows.4.0",
						"powers.force_jump.content.0.rows.5.1"
					]
				]
			}
		]
	},
	{
		"name": "powers.aquatic_force.name",
		"fanMade": true,
		"required": "powers.telekinesis.name",
		"difficulty": {
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "powers.aquatic_force.difficulty.alter.level.0.text"
					},
					{
						"level": 3,
						"text": "powers.aquatic_force.difficulty.alter.level.1.text"
					},
					{
						"level": 4,
						"text": "powers.aquatic_force.difficulty.alter.level.2.text"
					},
					{
						"level": 5,
						"text": "powers.aquatic_force.difficulty.alter.level.3.text"
					},
					{
						"level": 6,
						"text": "powers.aquatic_force.difficulty.alter.level.4.text"
					}
				]
			}
		},
		"summary": "powers.aquatic_force.summary",
		"content": [
			{
				"type": "warning",
				"text": "powers.aquatic_force.content.0.text"
			},
			{
				"type": "effect",
				"text": [
					"powers.aquatic_force.content.1.text.0",
					"powers.aquatic_force.content.1.text.1",
					"powers.aquatic_force.content.1.text.2"
				]
			}
		]
	},
	{
		"name": "powers.disable_droid.name",
		"fanMade": true,
		"required": [
			"powers.absorb_dissipate_energy.name",
			"powers.sense_force.name",
			"powers.telekinesis.name"
		],
		"extra": data.extra.inSight,
		"difficulty": {
			"control": {
				"level": 3,
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": data.level.strength
			}
		},
		"summary": "powers.disable_droid.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.disable_droid.content.0.text"
			}
		]
	},
	{
		"name": "powers.mind_numbing.name",
		"fanMade": true,
		"required": [
			"powers.accelerate_another_s_healing.name",
			"powers.control_another_s_pain.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.return_another_to_consciousness.name"
		],
		"difficulty": {
			"control": {
				"level": 3
			},
			"alter": {
				"level": data.level.perception
			}
		},
		"summary": "powers.mind_numbing.summary",
		"content": [
			{
				"type": "effect",
				"text": [
					"powers.mind_numbing.content.0.text.0",
					"powers.mind_numbing.content.0.text.1"
				]
			},
			{
				"type": "table",
				"columns": [
					"powers.force_push.content.2.columns.0",
					"powers.mind_numbing.content.1.columns.1"
				],
				"rows": [
					[
						"powers.mind_numbing.content.1.rows.0.0",
						"powers.mind_numbing.content.1.rows.0.1"
					],
					[
						"powers.mind_numbing.content.1.rows.1.0",
						"powers.mind_numbing.content.1.rows.1.1"
					],
					[
						"powers.mind_numbing.content.1.rows.2.0",
						"powers.mind_numbing.content.1.rows.2.1"
					],
					[
						"powers.mind_numbing.content.1.rows.3.0",
						"powers.mind_numbing.content.1.rows.3.1"
					],
					[
						"powers.mind_numbing.content.1.rows.4.0",
						"powers.mind_numbing.content.1.rows.4.1"
					]
				]
			}
		]
	},
	{
		"name": "powers.force_blinding.name",
		"fanMade": true,
		"required": "powers.dim_another_s_senses.name",
		"difficulty": {
			"sense": {
				"level": 2,
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": [
					{
						"level": 4
					},
					{
						"level": data.level.perception,
						"optional": true
					}
				]
			}
		},
		"summary": "powers.force_blinding.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.force_blinding.content.0.text"
			}
		]
	},
	{
		"name": "powers.force_breach.name",
		"fanMade": true,
		"required": [
			"powers.affect_mind.name",
			"powers.dim_another_s_senses.name",
			"powers.sense_force.name"
		],
		"difficulty": {
			"sense": {
				"level": 2
			},
			"alter": {
				"level": data.level.control
			}
		},
		"summary": "powers.force_breach.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.force_breach.content.0.text"
			},
			{
				"type": "example",
				"text": "powers.force_breach.content.1.text"
			}
		]
	},
	{
		"name": "powers.drain_life.name",
		"fanMade": true,
		"required": [
			"powers.drain_life_essence.name",
			"powers.control_pain.name",
			"powers.hibernation_trance.name",
			"powers.life_detection.name",
			"powers.life_sense.name",
			"powers.magnify_senses.name",
			"powers.receptive_telepathy.name",
			"powers.sense_force.name",
			"powers.telekinesis.name",
			"powers.farseeing.name",
			"powers.projective_telepathy.name",
			"powers.control_another_s_pain.name",
			"powers.transfer_force.name",
			"powers.affect_mind.name",
			"powers.control_mind.name",
			"powers.dim_another_s_senses.name",
			"powers.accelerate_healing.name",
			"powers.accelerate_another_s_healing.name",
			"powers.injure_kill.name"
		],
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": data.level.perception
			},
			"sense": {
				"level": 4
			},
			"alter": {
				"level": data.level.strength
			}
		},
		"summary": "powers.drain_life.summary",
		"content": [
			{
				"type": "effect",
				"text": "powers.drain_life.content.0.text"
			}
		]
	}
];

const forcePowerStringCatalogs = {
	en: englishPowerStrings,
	de: germanPowerStrings,
};

function getStringCatalog(code = defaultPowerLanguage) {
	const language = getForcePowerLanguage(code);
	return forcePowerStringCatalogs[language.code]
		|| forcePowerStringCatalogs[language.fallbackCode]
		|| forcePowerStringCatalogs[defaultPowerLanguage];
}

export function getForcePowerText(code, id, replacements = {}) {
	const strings = getStringCatalog(code);
	const fallbackStrings = forcePowerStringCatalogs[defaultPowerLanguage];
	const template = strings[id] ?? fallbackStrings[id] ?? id;

	return Object.entries(replacements).reduce(
		(text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
		String(template)
	);
}

export function getForcePowerSkillName(code, power) {
	return getForcePowerText(code, `ui.powers.${power}`);
}

function resolveTextRefs(value, strings, fallbackStrings) {
	if (Array.isArray(value)) {
		return value.map((entry) => resolveTextRefs(entry, strings, fallbackStrings));
	}

	if (typeof value === "string") {
		return strings[value] ?? fallbackStrings[value] ?? value;
	}

	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.entries(value).map(([key, nestedValue]) => [
				key,
				resolveTextRefs(nestedValue, strings, fallbackStrings),
			])
		);
	}

	return value;
}

function getPowerIdFromNameRef(name) {
	const match = String(name || "").match(/^powers\.([^.]+)\.name$/);
	return match?.[1] || null;
}

function withStablePowerIds(items = []) {
	return items.map((item) => {
		if (!item || typeof item !== "object" || item.id) return item;

		const id = getPowerIdFromNameRef(item.name);
		return id ? { id, ...item } : item;
	});
}

export function getForcePowerLanguage(code) {
	const languageCode = String(code || defaultPowerLanguage).trim().toLowerCase();
	return forcePowerLanguages.find((language) => language.code === languageCode)
		|| forcePowerLanguages.find((language) => language.code === defaultPowerLanguage);
}

export function getForcePowerCatalog(code = defaultPowerLanguage) {
	const strings = getStringCatalog(code);
	const fallbackStrings = forcePowerStringCatalogs[defaultPowerLanguage];

	return {
		data: resolveTextRefs(data, strings, fallbackStrings),
		items: resolveTextRefs(withStablePowerIds(rawPowerItemStructures), strings, fallbackStrings),
	};
}

export const forcePowerData = getForcePowerCatalog(defaultPowerLanguage).data;

export const rawPowerItems = getForcePowerCatalog(defaultPowerLanguage).items;
