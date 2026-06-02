const data = {
	"modifiers": {
		"proximity": {
			"text": "Modified by Proximity",
			"hover": [
				"Touching +0",
				"Line of sight (not touching) +2",
				"Not line of sight, at 1-100 meters +5",
				"101 meters, to 10 kilometers +7",
				"11 to 1,000 kilometers +10",
				"Same planet more than 1,000 kilometers +15",
				"Same star system, different planet +20",
				"Not in same star system +20"
			]
		},
		"relationship": {
			"text": "Modified by Relationship",
			"hover": [
				"Close relatives (married, siblings, parent and child, etc) +0",
				"Close friends +2",
				"Friends +5",
				"Acquaintances +7",
				"Slight acquaintances +10",
				"Met once +12",
				"Never met, but know each other by reputation +15",
				"Complete strangers +20",
				"Complete strangers and not of the same species +30"
			]
		},
		"inverseRelationship": {
			"text": "Modified by inverted Relationship",
			"hover": [
				"Close relatives (married, siblings, parent and child, etc) +30",
				"Close friends +20",
				"Friends +15",
				"Acquaintances +12",
				"Slight acquaintances +10",
				"Met once +7",
				"Never met, but know each other by reputation +5",
				"Complete strangers +2",
				"Complete strangers and not of the same species +0"
			]
		},
		"astrogation": {
			"text": "Modified by astrogation difficulty"
		},
		"meteorological": {
			"text": "Modified by local meteorological conditions"
		},
		"severity": {
			"text": "Modified by severity",
			"hover": [
				"Larger disasters are easier to predict",
				"Gamemasters may decide that disasters are easier or harder to predict based on a multitude of factors"
			]
		}
	},
	"extra": {
		"inSight": "Target must be in sight of the Jedi",
		"keptUp": "Power can be kept up",
		"ignorePain": "Character can ignore pain of injuries for a long period of time",
		"newRollWhenInjured": "Whenever character is injured again, must make a new Control pain roll",
		"usableWhenLightSide": "Characters who are consumed by the dark side of the Force may not use this power",
		"usableWhenDarkSide": "This power can only be used by characters who have been consumed by the dark side of the Force",
		"sithDiscipline": "This power is a Sith discipline"
	},
	"time": {
		"minutes": {
			"1": "1 minute",
			"1+": "At least 1 minute",
			"5": "5 minutes",
			"30+": "30 minutes per use",
		},
		"rounds": {
			"3": "3 rounds",
			"6": "6 rounds"
		},
		"days": {
			"2+": "2+ days",
		},
		"notes": {
			"12R": "12 rounds",
			"disease": "Severe cases may require several uses over weeks."
		}
	},
	"warnings": {
		"darkSidePointOnUseWarning": "Using this power grants the user one Dark Side Point"
	},
	"level": {
		"perception": {
			"level": "Target's Control or Perception",
			"hover": "Use whichever value is higher"
		},
		"willpowerAlter": {
			"level": "Target's Alter or Willpower",
			"hover": "Use whichever value is higher"
		},
		"willpowerControl": {
			"level": "Target's Control or Willpower",
			"hover": "Use whichever value is higher"
		},
		"hide": {
			"level": "Target's Control or Hide",
			"hover": "Use whichever value is higher"
		},
		"brawlingParry": {
			"level": "Target's Control or Brawling Parry",
			"hover": "Use whichever value is higher"
		},
		"strengthControl": {
			"level": "Target's Control or Strength",
			"hover": "Use whichever value is higher"
		},
		"description": {
			"level": "See description"
		},
		"dodge": {
			"level": "Target's dodge roll",
			"text": "if the target decides to dodge"
		},
		"strength": {
			"level": "Target's Strength"
		},
		"control": {
			"level": "Target's Control"
		}
	}
};

export const forcePowerData = data;

export const rawPowerItems = [
	{
		"name": "Absorb/Dissipate Energy",
		"extra": "The power may be kept up as long as the source of energy is constant — for blaster bolts or Force lightning, it is used as a reaction skill, multiple action penalties apply for use to block fire (as though it were a dodge skill).",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "for sunburn and other very minor energy sources"
					},
					{
						"level": 2,
						"text": "for intense sun"
					},
					{
						"level": 3,
						"text": "for solar wind and other modest energy sources (blaster bolts and Force lightning)"
					},
					{
						"level": 4,
						"text": "for radiation storms and other intense energy sources (speeder-scale damage)"
					}
				],
				"increased": [
					{
						"add": "+30",
						"text": "Walker-scale"
					},
					{
						"add": "+40",
						"text": "Starfighter-scale"
					},
					{
						"add": "+20",
						"text": `Area of Effect:
							<ul>
								<li>Point blank to 1 meter: -4D energy damage</li>
								<li>2 meters: -3D energy damage</li>
								<li>3 meters: -2D energy damage</li>
								<li>4 meters: -1D energy damage</li>
							</ul>`
					}
				]
			}
		},
		"summary": "Lets a Jedi absorb or dissipate harmful energy such as heat, radiation, blaster fire, or Force lightning. A successful Control roll negates the energy, while a failed roll leaves the character taking the full effect.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows the Jedi to absorb or dissipate energy, including light, heat, radiation and blaster bolts. A successful <b>control</b> roll means that the energy is dissipated. If the user fails the roll, she takes full damage from the energy.",
					"This power may be used to ward off sunburn, heat-stroke and radiation exposure, as well as withstand intense heat.",
					"The character may activate the power as a \"reaction skill\" to absorb the blaster bolt or <i>Force lightning</i> — the roll replaces the ranged target number the shooter who must roll equal or higher in order to hit."
				]
			},
			{
				"type": "example",
				"text": [
					"A stormtrooper is shooting at Ana. Rather than <i>dodge</i> behind cover, she decides to use <i>absorb/dissipate energy</i> to absorb the shot. The difficulty is Moderate. For the Moderate difficulty, the gamemaster picks a difficulty number of 14. Ana rolls <b>control</b> and gets a 21.",
					"If the blaster's damage roll is less than 21, then Ana absorbs the blaster bolt and takes no damage. If the blaster's damage roll is 21 or higher, she takes <i>full</i> damage from the blaster shot."
				]
			}
		]
	},
	{
		"name": "Accelerate Another's Healing",
		"required": [
			"Control Another's Pain",
			"Control Pain"
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
		"summary": "Lets a Jedi speed the natural healing of a touched character using the same rules as Accelerate Healing. The target gains the extra healing rolls while relationship modifies the Control difficulty.",
		"content": [
			{
				"type": "effect",
				"text": "The target is allowed to make extra healing rolls, as outlined in <i>accelerate healing</i>. The Jedi must be touching the character whenever she activates this power."
			}
		]
	},
	{
		"name": "Accelerate Healing",
		"timeToUse": data.time.minutes["1"],
		"timeToUseNote": data.time.notes["12R"],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2,
						"text": "for <i>wounded</i> characters"
					},
					{
						"level": 3,
						"text": "for <i>incapacitated</i> characters"
					},
					{
						"level": 4,
						"text": "for <i>mortally wounded</i> characters"
					}
				]
			}
		},
		"summary": "Speeds the Jedi's own natural recovery. On a successful Control roll, the character may make two healing rolls that day, 12 hours apart, with +2 to each Strength roll.",
		"content": [
			{
				"type": "effect",
				"text": [
					"A Jedi who uses this power successfully may make two natural healing rolls for the current day (12 hours apart) regardless of the severity of the injury. The Jedi gets a <b>+2</b> modifier to both <b>Strength</b> rolls to heal.",
					"See \"Combat and Injuries\" for healing rules. <i>Accelerate healing</i> may only be attempted once per day."
				]
			},
			{
				"type": "example",
				"text": [
					"Ana has been <i>incapacitated</i>; normally a full two weeks of rest are necessary before she can roll to heal. She makes her Moderate <b>control</b> roll to activate <i>accelerate healing</i>. She now gets to make two <b>Strength</b> rolls to heal and gets to add <b>+2</b> to both rolls.",
					"Since she's <i>incapacitated</i>, Ana needs a total of <b>9</b> or better to improve to <i>wounded</i>.",
					"Ana's first <b>Strength</b> roll is an eight; adding the <b>+2</b> gives her a total of <b>10</b>. She improves from <i>incapacitated</i> to <i>wounded twice</i> (she's at <b>-2D</b> to all actions).",
					"Twelve hours later, Ana gets to make her second healing roll. Since she's wounded, she only needs a <i>Strength</i> total of <b>7</b> to improve from <i>wounded twice</i> (at <b>-2D</b>) to <i>wounded</i> (<b>-1D</b> to all actions). Her <b>Strength</b> roll is a seven; the <b>+2</b> gives her a total of nine. She now heals to <i>wounded</i>."
				]
			}
		]
	},
	{
		"name": "Affect Mind",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "for perceptions"
					},
					{
						"level": 2,
						"text": "for memories"
					},
					{
						"level": 3,
						"text": "for conclusions"
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
						"text": "for slight, momentary misperceptions, minor changes to distant memories, or if the character doesn't care one way or another"
					},
					{
						"level": 2,
						"text": "for brief, visible phenomena, for memories less than a year old, or if the character feels only minor emotion regarding the conclusion he is reaching"
					},
					{
						"level": 3,
						"text": "for short hallucinations, for memories less than a day old, or if the target has strict orders about the conclusion"
					},
					{
						"level": 4,
						"text": "for slight disguises to facial features, hallucinations which can be sensed with two senses (sight and sound, for example), for memories less than a minute old, or if the matter involving the conclusion is very important to the target"
					},
					{
						"level": 5,
						"text": "for hallucinations which can be sensed by all five senses, if the memory change is major, or if the logic is clear and coming to the wrong conclusion is virtually impossible"
					}
				]
			}
		},
		"summary": "Alters a target's perceptions, memories, or conclusions as precisely described before rolling. Illusions can feel real to the target but cause no actual injury, and the power does not affect droids or recordings.",
		"content": [
			{
				"type": "effect",
				"text": [
					"The target character's perceptions are altered so that he senses an illusion or fails to see what the user of the power doesn't want him to see. This power is used to permanently alter a target character's memories so that he remembers things incorrectly or fails to remember something. This power can also be used to alter a character's conclusions so that he comes to an incorrect conclusion.",
					"Before making skill rolls, the Jedi must describe exactly what effect she is trying to achieve. The power is normally used on only one target; two or more targets can only be affected if the power is used two or more times.",
					"The target character believes he is affected by any successful illusions — a character who thinks he is struck by an illusory object would feel the blow. If he thought he was injured, he would feel pain, or if he thought he had been <i>killed</i>, he would go <i>unconscious</i>. However, the character suffers no true injury.",
					"This power cannot affect droids or recording devices."
				]
			}
		]
	},
	{
		"name": "Burst of Speed",
		"required": "Enhance Attribute",
		"difficulty": {
			"control": {
				"level": 3
			}
		},
		"summary": "Briefly increases the Jedi's Move rating for rapid running or walking. The amount of extra movement and its duration depend on how far the Control roll exceeds the difficulty, and Character Points can extend it.",
		"content": [
			{
				"type": "effect",
				"text": "A Jedi can use this power to enhance his Move rating, increasing his running and walking speeds dramatically for a short period of time. Both the duration and Move increase are determined by the amount the Jedi's <b>control</b> roll exceeds the difficulty. The duration can be increased by spending character points — for each character point spent, the duration is increased by one round. These points can be spent at any time before the power fades."
			},
			{
				"type": "table",
				"columns": ["Control Roll &ge; Difficulty", "Move Increase", "Duration"],
				"rows": [
					["0-8", "+5", "4R"],
					["9-20", "+10", "3R"],
					["21+", "+15", "2R"]
				]
			}
		]
	},
	{
		"name": "Combat Sense",
		"required": [
			"Danger Sense",
			"Life Detection"
		],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "for one opponent"
					}
				],
				"increased": [
					{
						"add": "+3",
						"text": "for each additional opponent the Jedi wishes to defend against"
					}
				]
			}
		},
		"summary": "Focuses the Jedi's awareness completely on nearby combat. While active, the Jedi chooses when to act, gains +2 to attack and defense rolls, and the power does not add multiple-action penalties after activation.",
		"content": [
			{
				"type": "effect",
				"text": [
					"<i>Combat sense</i> allows a Jedi to focus on the battle at hand. Everything else becomes dulled and muted as the Jedi's senses are all turned toward the combat occurring around him. All targets become mentally highlighted in the Jedi's mind, enhancing his ability to attack and defend. In game terms, the Jedi gains important advantages.",
					"First, the Jedi may choose when he wishes to act that round — no initiative rolls are necessary while the power is in effect. If more than one Jedi is using the power, whoever rolled highest when invoking the power determines when he wishes to act.",
					"Second, the Jedi's attack and defense rolls are increased by <b>+2</b>. <i>Combat sense</i> lasts for ten combat rounds and doesn't count as a \"skill use\" for determining die code penalties."
				]
			}
		]
	},
	{
		"name": "Concentration",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2,
						"text": "if the Jedi is relaxed and at peace"
					},
					{
						"level": 4,
						"text": "if the Jedi is filled with aggression, fear or other negative emotions"
					},
					{
						"level": 5,
						"text": "if the Jedi is acting on those negative emotions"
					}
				]
			}
		},
		"summary": "Lets the Jedi clear away distractions and focus on one declared task. A successful roll grants +4D to a single action that round, but any other action, dodge, parry, or repeated use of the same skill cancels the bonus.",
		"content": [
			{
				"type": "effect",
				"text": [
					"When using this power, the Jedi clears all negative thoughts from her mind, feeling the Force flowing through the universe and her own being.",
					"The individual Jedi concentrates on one specific task at hand. If the skill roll is successful, the Jedi may add <b>+4D</b> to any <i>one</i> action in that round. The Jedi may do nothing other than using the <i>concentration</i> power and using that one skill for one action. The Jedi receives no bonus if anything else is done in that round, including duplicate uses of the same skill or dodges or parries.",
					"This power <i>may</i> be used in conjunction with Force Points or Character Points. This power is only in effect for one round and may not be kept up."
				]
			},
			{
				"type": "example",
				"text": [
					"Luke is flying down the trench of the Death Star. With Ben's urging, he clears his mind of negative thoughts, and feels the Force flowing through him. Using the Force, he <i>concentrates</i> on the task of firing a proton torpedo into the unshielded exhaust port. Since he has cleared his mind, the <b>control</b> difficulty is Easy.",
					"Luke's player declares that Luke is also spending a Force Point to accomplish the task this round. Luke's <i>starship gunnery</i> skill is <b>6D</b>. He loses <b>-1D</b> for doing one other thing in the round (using the Force counts as an action), reducing his <i>starship gunnery</i> skill to <b>5D</b>. Because he rolls successfully for his <b>control</b>, he receives the bonus of <b>+4D</b>, making his effective skill for that round <b>9D</b>. Because he is spending a Force Point, his skill level is doubled to <b>18D</b>!",
					"If Luke attempted any other action in that round, including firing another proton torpedo or blaster, or dodging enemy shots, he would receive no bonus."
				]
			}
		]
	},
	{
		"name": "Contort/Escape",
		"required": [
			"Concentration",
			"Control Pain",
			"Enhance Attribute"
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "for loose bonds"
					},
					{
						"level": 2,
						"text": "for hand binders"
					},
					{
						"level": 3,
						"text": "for serious restraints"
					},
					{
						"level": 4,
						"and_more": true,
						"text": "for maximum security (varies at gamemaster's discretion, depending on security measures)"
					}
				]
			}
		},
		"summary": "Allows the Jedi to escape physical restraints through painful but possible body control, stretching, and joint manipulation. The difficulty depends on how secure or restrictive the bonds are.",
		"content": [
			{
				"type": "effect",
				"text": "The character may escape bonds by contorting in painful and difficult (but still physically possible) ways. By stretching, twisting, and dislocating joints a Jedi can escape almost any physical restraining device. While this is indeed a painful procedure, Jedi are trained to block out the pain and focus on the task at hand."
			}
		]
	},
	{
		"name": "Control Another's Pain",
		"required": "Control Pain",
		"difficulty": {
			"control": {
				"level": 1,
				"modifiers": data.modifiers.relationship
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "for <i>wounded</i> characters"
					},
					{
						"level": 3,
						"text": "for <i>incapacitated</i> characters"
					},
					{
						"level": 4,
						"text": "for <i>mortally wounded</i> characters"
					}
				]
			}
		},
		"summary": "Lets a Jedi help a touched character ignore pain under the same basic rules as Control Pain. Relationship modifies the Control roll, and the Alter difficulty depends on the target's injury level.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Jedi to help another character <i>control pain</i>, under the same rules and conditions outlined in the <i>control pain</i> power. The Jedi must be touching the character to use this power."
			}
		]
	},
	{
		"name": "Control Breathing",
		"required": [
			"Concentration",
			"Hibernation Trance",
			"Telekinesis"
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
		"summary": "Allows the Jedi to draw usable oxygen from the surrounding environment and breathe without normal gear, such as underwater or in unusual atmospheres. It does not help in vacuum or deep space where there is no oxygen to draw in.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Jedi to control the amount of oxygen flowing into his or her body. The Jedi takes control of the surrounding atmosphere, pulling oxygen molecules through the skin into the lungs. With this power the Jedi can effectively breathe underwater, and conversely, a water breather could survive on land. In game terms, this power negates the need for a breath mask, mechgill, or any rebreather gear.",
					"In the cold of space or a hard vacuum, however, this power would be of little use. Even if the Jedi could somehow survive the drastic changes in pressure or the extreme temperatures, there is not enough oxygen in these environments for the Jedi to \"grab\".",
					"The power will remain up until the character either takes incapacitating damage or willfully drops it."
				]
			}
		]
	},
	{
		"name": "Control Pain",
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
						"text": "for wounded or stunned characters"
					},
					{
						"level": 2,
						"text": "for incapacitated characters"
					},
					{
						"level": 4,
						"text": "for mortally wounded characters"
					}
				]
			}
		},
		"summary": "Allows an injured Jedi to ignore pain, stuns, and wound penalties without actually healing the injury. The character can keep acting, but further wounds still worsen normally and mortal injuries can still be fatal.",
		"content": [
			{
				"type": "effect",
				"text": [
					"A wounded Jedi who <i>controls pain</i> can act as if she has not been wounded, starting with the round after the power roll has been made. The wound is not healed, but the character doesn't suffer the penalties of being wounded: a <i>wounded</i> Jedi doesn't suffer any die code penalties; an <i>incapacitated</i> character can still act normally, as can a <i>mortally wounded</i> character. This power can also be used to shrug off any stun results.",
					"However, the character is still injured, and thus is prone to getting worse, even if the Jedi doesn't feel the pain."
				]
			},
			{
				"type": "example",
				"text": "A character who's been <i>wounded twice</i> and is wounded again would still become <i>incapacitated</i>. <i>Mortally wounded</i> Jedi may still die from injuries, even if they don't feel any pain."
			}
		]
	},
	{
		"name": "Danger Sense",
		"required": "Life Detection",
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
		"summary": "Creates an early warning sense for incoming attacks while the power is kept up. The Jedi learns of planned attacks one round before they happen, though Force-using attackers may increase the difficulty with Control.",
		"content": [
			{
				"type": "effect",
				"text": [
					"<i>Danger sense</i> allows a Jedi to extend his senses around himself like protective sensors creating an early warning system for as long as the power remains in effect.",
					"When this power is used, the Jedi detects any attacks the round before they are made. This gives the Jedi a round to decide how to react to the danger.",
					"In game terms, if a character plans to attack the Jedi on the next round, she must declare her action the round before. Attacking characters with Force skills may roll their <b>control</b> skill to increase the difficulty of using this power. (This <b>control</b> roll doesn't count as an action, so there are no die code penalties except those caused by injury.)"
				]
			}
		]
	},
	{
		"name": "Direction Sense",
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 2,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "Guides the Jedi toward a chosen object, place, or destination through the Force. It does not locate living beings, but a strong Sense roll can reveal both exact direction and distance.",
		"content": [
			{
				"type": "effect",
				"text": [
					"<i>Direction sense</i> allows a Jedi to be guided by the Force toward a particular goal or destination. It could be an object of importance, the north pole of a planet, the nearest cantina, etc., but this power does not sense life forms.",
					"Alternatively a Jedi may use the Force for guidance through a maze-like cavern. If the Jedi meets the required sense difficulty, she just knows the general direction the object or location is in: left, right, forward, behind, above, below. If she succeeds by 10 or more, the Jedi knows exactly in what direction and how far away the location is from her current position."
				]
			}
		]
	},
	{
		"name": "Emptiness",
		"required": "Hibernation Trance",
		"extra": data.extra.usableWhenLightSide,
		"difficulty": {
			"control": {
				"level": 3
			}
		},
		"summary": "Places a light-side Force-user in deep meditation, leaving them motionless, hard to sense, and difficult to affect through the Force. After emerging, the character gains a temporary Force-skill bonus but must successfully return from the trance.",
		"content": [
			{
				"type": "effect",
				"text": [
					"The user empties her mind and allows the Force to flow through her. The character seems to be in deep meditation and is oblivious to her surroundings. A character in <i>emptiness</i> may not move or take any action except to try to disengage from the <i>emptiness</i>.",
					"While in <i>emptiness</i>, a character is difficult to sense or affect with the Force. When another character attempts to use a Force power on the user in <i>emptiness</i>, add the user's <b>emptiness</b> roll to the difficulty for the other character's <b>sense</b> roll (if the power doesn't use the <i>sense</i> skill, add the difficulty to the <b>control</b> roll). This difficulty is added regardless of whether or not the empty character would willingly receive the power's effect.",
					"Once the character comes out of <i>emptiness</i>, the character gets a <b>+6</b> bonus modifier to all Force skill rolls for a period of time equal to the amount of time spent in <i>emptiness</i>. This bonus is reduced by <b>-1</b> for each Dark Side Point that the character has.",
					"When in <i>emptiness</i>, characters dehydrate and hunger normally — some initiates have died because they lacked enough control to bring themselves out of <i>emptiness</i>.",
					"A character must make a Difficult <b>control</b> skill roll to bring herself out of <i>emptiness</i>. When the character enters into <i>emptiness</i>, the player must state for how long the character will be in meditation. The character may attempt to come out of meditation under the following circumstances:",
					`<ul>
						<li>When the stated time has passed.</li>
						<li>Once each hour beyond the original time limit.</li>
						<li>The character's body takes any damage more serious than <i>stun damage</i>.</li>
					</ul>`
				]
			}
		]
	},
	{
		"name": "Enhance Attribute",
		"difficulty": {
			"control": {
				"level": 3
			}
		},
		"summary": "Temporarily increases one attribute and all skills governed by it. The bonus and duration depend on the Control roll margin, and only one attribute can be enhanced at a time.",
		"content": [
			{
				"type": "effect",
				"text": [
					"A Jedi uses this power to increase a single attribute for a limited period. An increased attribute can help a Jedi jump higher, see better, and run faster. All skills governed by the enhanced attribute increase by the same amount for as long as the power remains in effect.",
					"An attribute increased by this power remains enhanced for the duration listed below. Duration and attribute increase are determined by how much a character's <b>control</b> skill roll exceeds the difficulty number. Duration can be extended through use of Character Points — for each Character Point a Jedi spends, the duration is increased by one combat round. The points can be spent at any time before the power fades.",
					"A Jedi can only increase one attribute at a time. If a character invokes the power to enhance a second attribute while the first attribute is still enhanced, then the first enhancement fades and the second attribute receives the increase."
				]
			},
			{
				"type": "table",
				"columns": ["Skill Roll &ge; Difficulty", "Attribute Increase", "Duration"],
				"rows": [
					["0-13", "<b>+1D</b>", "3R"],
					["14-25", "<b>+2D</b>", "2R"],
					["26+", "<b>+3D</b>", "1R"]
				]
			}
		]
	},
	{
		"name": "Farseeing",
		"required": "Life Sense",
		"timeToUse": data.time.minutes["1+"],
		"timeToUseNote": data.time.notes["12R"],
		"difficulty": {
			"control": {
				"level": 1,
				"increased": [
					{
						"add": "+5 to +20",
						"text": "if the character wishes to see something in the past"
					},
					{
						"add": "+10 to +30",
						"text": "for the future"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "if the target is friendly and doesn't resist"
					},
					{
						"level": data.level.perception.level,
						"text": "otherwise",
						"hover": data.level.perception.hover
					}
				],
				"modifiers": data.modifiers.relationship
			}
		},
		"summary": "Gives the Jedi a vision of a person, place, past event, current situation, or possible future. It requires calm conditions and time, and future visions are less reliable because the future remains changeable.",
		"content": [
			{
				"type": "effect",
				"text": "The Jedi may see the person or place he wishes to see in his mind as the situation currently exists. The power can also be used to see the future or the past. The Jedi sees the immediate surroundings, for example, when a friend is in danger, or what happened on his home planet in his absence."
			},
			{
				"type": "table",
				"text": "<i>Farseeing</i> requires calm conditions and at least one minute, but often takes a few minutes. <i>Farseeing</i> cannot be done in the face of danger. The Jedi's vision may not be entirely accurate:",
				"columns": ["Power roll &ge; Sense Difficulty", "Past/Present", "Future"],
				"rows": [
					["0-10", "50%", "10%"],
					["11-20", "75%", "25%"],
					["21-30", "90%", "50%"],
					["31+", "100%", "75%"]
				]
			},
			{
				"type": "effect",
				"text": "The past and present are set and it is merely a matter of the Jedi having correct perceptions. However, the future is always fluid, always in motion, never set until it becomes the present — therefore it is much harder to predict. The percentages on the chart are a rough measure of how much correct information the character receives in the vision."
			},
			{
				"type": "example",
				"text": "10% means that the character will only be able to make out the most basic details of a situation, such as \"My friends are in danger\". 25% means that the Jedi gets a somewhat accurate vision of what will transpire, but most major details will be missing from the vision. 50% means that the character's vision was about half right. 75% means that the character has an understanding of the critical happenings, but the character still has missed a major detail or two, which, of course, can complicate things. 90% means that the character has a very accurate and very detailed vision of what has transpired or will transpire. 100% means that the character's vision is even more accurate and detailed, complete with minor, almost trivial details."
			},
			{
				"type": "effect",
				"text": "When a character farsees into the future, the gamemaster has to make an honest effort to correctly represent what will happen: if the characters get a 75% result, the gamemaster must try to predict what he thinks the characters will do and what the outcome will be. Of course, since the future is so fluid, things are always subject to change. <i>Farseeing</i> is a great mechanic for the gamemaster to reveal part of the story — enough to tantalize the players, without ruining the story."
			}
		]
	},
	{
		"name": "Force Jump",
		"required": [
			"Enhance Attribute",
			"Telekinesis"
		],
		"difficulty": {
			"control": {
				"level": 2
			},
			"alter": {
				"level": 2
			}
		},
		"summary": "Boosts the Jedi's jumping ability for extraordinary leaps. Control and Alter must both succeed, after which the character makes a normal Climbing/Jumping roll with the listed Force bonus and adjusted jump difficulty.",
		"content": [
			{
				"type": "table",
				"text": "A Jedi uses this power to increase his jumping ability in order to perform impossibly high leaps. If both Force skill rolls are successful, the character uses his normal <i>climbing/jumping</i> skill to perform the jump, but he uses the special table below to determine difficulties. If the <b>control</b> roll exceeds the difficulty, the character gains an immediate bonus to his <b>climbing/jumping</b> roll.",
				"columns": ["Control Roll &ge; Difficulty", "Jumping Increase"],
				"rows": [
					["1-3", "<b>+1D</b>"],
					["4-8", "<b>+2D</b>"],
					["9-15", "<b>+3D</b>"],
					["16-25", "<b>+4D</b>"],
					["26-37", "<b>+5D</b>"],
					["38+", "<b>+6D</b>"]
				]
			},
			{
				"type": "effect",
				"text": [
					"If the Jedi fails any Force skill roll, the power is not activated and the character is left to use his normal jumping ability (and there are certain situations where you can't back out of a jump because your power failed). At the gamemaster's discretion, a failed <b>climbing/jumping</b> roll might mean the Jedi fails to achieve the desired height/distance, fails to properly cushion his landing and suffers normal falling damage, or both.",
					"Multiple action penalties apply. The <b>climbing/jumping</b> roll is a third action in that round, whether the power is successful or not."
				]
			},
			{
				"type": "table",
				"columns": ["Height Jumped", "Jumping Difficulty"],
				"rows": [
					["0-1 meter", 1],
					["1-2 meter", 2],
					["3-4 meter", 3],
					["5-8 meter", 4],
					["9-15 meter", 5],
					["16-20 meter", 6]
				],
				"subnote": "Add <b>+5</b> to the difficulty for every additional 5 meters. If the character is simply jumping downwards, with no upwards movement, reduce jumping difficulty by one level. Add <b>+1</b> to the difficulty per meter of horizontal distance jumped."
			},
			{
				"type": "example",
				"text": [
					"Daru has a <i>control</i> skill of <b>5D</b>, alter of <b>3D+2</b>, and a <i>climbing/jumping</i> skill of <b>4D</b>, and wants to perform a <i>Force jump</i> across a chasm to a ledge above. He rolls <b>1D+2</b> for <b>alter</b> (<b>3D+2</b> subtracting <b>-2D</b> for multiple action penalties), and gets a 7, making his <b>alter</b> difficulty. Next he rolls his <b>control</b> of <b>3D</b>, and gets a 11 (which exceeds the difficulty by 4). This adds <b>+2D</b> to his <b>climbing/jumping</b> roll, canceling out the multiple action penalty.",
					"The ledge on which he wants to jump is 4 meters up and the chasm is 3 meters across, thus the difficulty is Moderate <b>+3</b>. Daru rolls his <b>4D</b> climbing/jumping (<b>4D</b>-<b>2D</b>+<b>2D</b>), and gets a 16, making the difficulty and using the Force to leap safely on top of the ledge."
				]
			}
		]
	},
	{
		"name": "Force Push",
		"required": [
			"Concentration",
			"Life Detection",
			"Telekinesis"
		],
		"extra": data.extra.inSight,
		"difficulty": {
			"alter": {
				"level": data.level.perception,
				"increased": [
					{
						"add": "+3",
						"text": "for every 5 meters away from target"
					}
				]
			}
		},
		"summary": "Pushes one or more adjacent visible targets backward with the Force, potentially knocking them prone or into solid objects. Each extra target adds penalties, and killing a living being with the power grants a Dark Side Point.",
		"content": [
			{
				"type": "warning",
				"text": "If a Jedi kills a living being as a result of this power he immediately receives a Dark Side Point"
			},
			{
				"type": "effect",
				"text": [
					"With this power, a Jedi may use the Force to push several adjacent targets backwards, knocking them prone or banging them against a wall. Each target past the first incurs a <b>-1D</b> penalty on the Jedi using the power (i.e., 1 target, no penalty; 2 targets, <b>-1D</b> penalty; 3 targets, <b>-2D</b> penalty; 4 targets, <b>-3D</b> penalty...).",
					"Each target makes either a <b>control</b> or <b>Strength</b> roll to resist, and the acting Jedi's <b>alter</b> roll result is compared to each result in turn to determine the effects. A target that is knocked back into a wall or other solid object takes the listed damage.",
					"If a Jedi kills a living being as a result of this power he immediately receives a Dark Side Point; as such, he may roll less than his full <b>alter</b> score if he so chooses."
				]
			},
			{
				"type": "table",
				"columns": ["Alter Roll &ge; Difficulty", "Target pushed back/Collision damage"],
				"rows": [
					["0-5", "2 meters / 2D"],
					["6-10", "3 meters / 3D"],
					["11-15", "5 meters / 4D"],
					["16-20", "10 meters / 5D"],
					["21+", "15 meters / 6D"]
				]
			}
		]
	},
	{
		"name": "Hibernation Trance",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 4
			}
		},
		"summary": "Places the Jedi in a deep trance that slows breathing, heartbeat, hunger, and thirst to survival levels. The character appears nearly dead, can heal but not act, and awakens only under declared conditions or outside assistance.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Jedi to place herself into a deep trance, remarkably slowing all body functions. The Jedi's heartbeat slows, her breathing drops to barely perceivable levels, and she falls <i>unconscious</i>. A Jedi can heal while in a <i>hibernation trance</i>, but can do nothing else.",
					"Anyone who comes across a Jedi in <i>hibernation trance</i> assumes that the Jedi is dead unless she makes a point of testing him. Another Jedi with the <b>sense</b> skill or the <i>life detection</i> power will be able to detect the Force within the hibernating character and realize that she is alive.",
					"When a Jedi enters a <i>hibernation trance</i>, the player must declare under what circumstances the character will awaken: after a specific amount of time, or what stimuli need to be present."
				]
			},
			{
				"type": "example",
				"text": "The awakening stimulus could be noise or someone touching the character."
			},
			{
				"type": "effect",
				"text": [
					"Another Jedi can use the power <i>place another in hibernation trance</i> to bring the user out of the trance.",
					"<i>Hibernation trance</i> serves two purposes. It allows a Jedi to \"play dead\" and it can be used to survive when food or air supplies are low.",
					"A character in hibernation uses only about a tenth as much air as someone who is sleeping — she can hibernate for a week in a dry climate or for up to a month in a wet climate before dying from lack of water. It is possible to hook the character up to an intravenous water drip to survive indefinitely.",
					"A character can hibernate for up to three months before dying of starvation. An intravenous sugar solution can extend that to one year."
				]
			}
		]
	},
	{
		"name": "Kinetic Combat",
		"required": "Telekinesis",
		"difficulty": {
			"alter": {
				"level": 4
			}
		},
		"summary": "Lets the Jedi wield a melee weapon or lightsaber telekinetically within 10 meters. The weapon attacks as if held normally, using the appropriate combat skill and normal multiple-action penalties.",
		"content": [
			{
				"type": "effect",
				"text": [
					"Once the Jedi has successfully activated this power, he may wield a melee weapon or lightsaber with the power of the Force at a distance up to 10 meters, as though the weapon were in his hands using his melee weapons or <i>lightsaber</i> skill respectively. Multiple action penalties apply.",
					"The first round, the Jedi can make only one attack. As his control improves, he may attack with the weapon as many times as possible (as determined by multiple action penalties)."
				]
			}
		]
	},
	{
		"name": "Lesser Force Shield",
		"required": [
			"Absorb/Dissipate Energy",
			"Concentration",
			"Magnify Senses",
			"Telekinesis"
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
		"summary": "Surrounds the Jedi with a modest Force barrier that repels energy and physical matter. While kept up, it acts as STR+1D armor against direct attacks and area effects such as gas or explosions.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows the Jedi to surround his body with a Force-generated shield. The shield can be used to repel energy and physical matter away from the Jedi's body, down to the molecular level.",
					"The shield acts as <b>STR+1D</b> armor to all energy and physical attacks made against the Jedi, including non-directional attacks such as gas clouds and grenade blasts. The shield is not particularly strong, but can sometimes be just enough to protect the Jedi from serious injury."
				]
			}
		]
	},
	{
		"name": "Life Detection",
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "if the subject has Force skills or is Force-sensitive"
					},
					{
						"level": 3,
						"text": "if not"
					}
				],
				"modifiers": data.modifiers.relationship
			}
		},
		"summary": "Detects nearby sentient living beings, including hidden ones, within 10 meters while active. Strong successes can also reveal whether a being is Force-sensitive, trained in Force skills, previously met, or identifiable.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows Jedi to detect live sentient beings who might otherwise remain hidden. When the power is activated, the Jedi knows the location of all sentients within 10 meters — if the power is kept up, the Jedi may know whenever a sentient is within 10 meters of him.",
					"When approached by or approaching sentient creatures, the Jedi should make a <b>sense</b> roll; each creature makes an opposed <b>control</b> or <b>Perception</b> roll to avoid detection. (These rolls don't count as actions, so there are no die code penalties except those caused by injury.)",
					"The Jedi detects each being that she ties or beats. If the Jedi beats the target's roll by 10 or more points, she is aware if this person has Force skills (yes or no), is Force-sensitive (yes or no), if she has met the person before (yes or no), and if yes, their identity."
				]
			},
			{
				"type": "example",
				"text": [
					"Ana has her <i>life detection</i> power up. Bill, the gamemaster, knows that three Gamorreans are approaching Ana from behind. She rolls her <b>sense</b> to see if she can detect the beings — she rolls a 22.",
					"The first Gamorrean's roll is a 9; Ana's roll beats his by 13 points. Ana knows the being is not Force-sensitive, doesn't have Force skills; since Ana's never met the being before, she doesn't know its identity, not even its species.",
					"The second Gamorrean rolls a 15 — Ana only knows about the existence and location of the second being.",
					"Ana's roll beats the third Gamorrean's by 11 points, so she knows that this being is also not Force-sensitive and doesn't have Force skills. However, Ana has met the creature before — she knows the third being is Draughckt, a Gamorrean she met a few years earlier on the planet Seltos."
				]
			}
		]
	},
	{
		"name": "Life Sense",
		"required": "Life Detection",
		"extra": "Power can be kept up: to track a target",
		"difficulty": {
			"sense": {
				"level": 1,
				"modifiers": [
					data.modifiers.proximity,
					data.modifiers.relationship
				]
			}
		},
		"summary": "Lets the Jedi sense the presence, identity, and physical condition of a specific person. The power can be kept up to track the target, and the target may hide their identity with Control.",
		"content": [
			{
				"type": "effect",
				"text": [
					"The user can sense the presence and identity of a specific person for whom she searches. The user can sense how badly <i>wounded</i>, diseased or otherwise physically disturbed the target is.",
					"A target may hide his identity from the Jedi using <i>life sense</i> by rolling his <i>control</i> skill and adding it to the difficulty."
				]
			}
		]
	},
	{
		"name": "Lightsaber Combat",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3
			},
			"sense": {
				"level": 2
			}
		},
		"summary": "Enhances lightsaber fighting through the Force. Sense adds to attack and parry rolls, Control can modify damage, and the power also supports parrying and redirecting blaster bolts while kept up.",
		"content": [
			{
				"type": "effect",
				"text": [
					"Jedi use this power to wield this elegant but difficult-to-control weapon while also sensing their opponents' actions through the Force.",
					"This power is called upon at the start of a battle and remains up until the Jedi is <i>stunned</i>, <i>wounded</i> or worse; a Jedi who has been <i>injured</i> or <i>stunned</i> may attempt to bring the power back up.",
					"If the Jedi is successful in using this power, she adds her <b>sense</b> dice to her <b>lightsaber</b> skill roll when attacking and parrying. The Jedi may add or subtract part or all of her <b>control</b> dice to the lightsaber's damage; players must decide how many <b>control</b> dice they are adding or subtracting when the power is activated."
				]
			},
			{
				"type": "example",
				"text": [
					"Ana is entering combat: she has a <i>lightsaber</i> skill of <b>4D</b>, a <i>control</i> of <b>5D</b> and a <i>sense</i> of <b>4D+2</b>. She activates <i>lightsaber combat</i> by making her Moderate <b>control</b> roll and her Easy <b>sense</b> roll; she decides to keep the power up. Since she is making both the <b>control</b> and <b>sense</b> rolls in the same round, each suffers a <b>-1D</b> penalty.",
					"She adds her <b>sense</b> of <b>3D+2</b> (<b>4D+2</b>-<b>1D</b>) to her <b>lightsaber</b> skill roll of <b>4D</b>, for a total lightsaber of <b>7D+2</b>. She adds her <b>control</b> of <b>4D</b> (<b>5D</b>-<b>1D</b>) to her lightsaber's damage of <b>5D</b>, for a total of <b>9D</b>.",
					"When Ana attacks in a round, that's another action, for an additional <b>-1D</b> to all actions (total penalty of <b>-2D</b>): she'd only roll <b>6D+2</b> to attack and would roll <b>8D</b> for damage."
				]
			},
			{
				"type": "effect",
				"text": [
					"A Jedi who fails when trying to activate <i>lightsaber combat</i> may only use the <i>lightsaber</i> skill for the duration of combat.",
					"Finally, the Jedi may use <i>lightsaber combat</i> to parry blaster bolts as a \"reaction skill\".",
					"The Jedi may also attempt to control where deflected blaster bolts go; this is a \"reaction skill\" and counts as an additional action. (The Jedi cannot <i>full parry</i> when trying to control deflected bolts.)",
					"If the Jedi tries to control the blaster bolt, she makes a <b>control</b> roll: the difficulty is the range of the target (use the original weapon's ranges) or the target's <b>dodge</b> roll. The blaster bolt's damage stays the same."
				]
			},
			{
				"type": "example",
				"text": [
					"Ana decides to parry a blaster bolt and control where it goes. This is two more actions in a round, which means a total of four actions (don't forget the control and sense to keep the power up), for a penalty of <b>-3D</b>: Ana's <i>lightsaber</i> skill is <b>5D+2</b>, and her lightsaber's damage is <b>7D</b>. Ana's attacker has a blaster pistol that causes <b>4D</b> damage.",
					"First, Ana makes her parry roll with her <b>lightsaber</b>: her parry roll of <b>18</b> is higher than the attacker's blaster roll of <b>13</b>, so Ana parries the bolt.",
					"Now, Ana tries to control the blaster bolt. Her target is 20 meters away — that's a Moderate difficulty for the blaster pistol. Ana rolls a <b>14</b> with her <b>control</b> — just barely good enough to hit. The blaster bolt bounces off Ana's lightsaber blade and hits another enemy, causing <b>4D</b> damage."
				]
			}
		]
	},
	{
		"name": "Magnify Senses",
		"timeToUse": data.time.rounds["3"],
		"difficulty": {
			"sense": {
				"level": 1,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "Enhances the Jedi's normal senses beyond ordinary limits. The user can hear faint or distant sounds, see normally visible details at long range, and identify scents that would otherwise be too weak.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Jedi to increase the effectiveness of her normal senses to perceive things that otherwise would be impossible without artificial aids. She can hear noises beyond her normal hearing due to distance or softness (she can't hear beyond normal frequencies). Likewise, she can see normally visible things over distances that would require the use of macrobinoculars; she can identify scents and odors that are normally too faint for human olfactory senses."
			}
		]
	},
	{
		"name": "Merge Senses",
		"required": "Magnify Senses",
		"timeToUse": data.time.rounds["3"],
		"difficulty": {
			"sense": {
				"level": 3,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "Links the Force-user's senses to a simple creature, allowing them to see, hear, smell, and feel through it. The user does not directly control the creature, and their own body remains motionless and vulnerable during the link.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Force user to perceive things through the senses of another creature, one with animal intelligence or less. He can see through the eyes of the selected creature, enjoying the benefits of being bound by the restrictions of the creature's vision. He can hear through the creature's ears; smell was that creature smells; and physically feel whatever the creature is feeling. The Force user does not control the creature, but can make suggestions. The simpler or less threatening the request, the more likely it will be agreed to. If a suggestion goes against the nature of the creature or would put it in an obviously hazardous situation, the Force user must make a <b>sense</b> roll against the subject's willpower. Failure means the suggestion is ignored.",
					"While the Force user's senses are merged with a creature's, the Force user's body is motionless, its senses unable to function until, of course, the meld is broken. Releasing the target creature requires a Moderate roll. The link with the creature is also broken by the death of either the creature or the Force user. If the creature suffers damage or dies during a meld, the Force user suffers one-half the amount of damage."
				]
			}
		]
	},
	{
		"name": "Projective Telepathy",
		"required": [
			"Life Detection",
			"Life Sense",
			"Receptive Telepathy"
		],
		"extra": "<b>Homebrew:</b> Checks with friend's or closer individuals succeed automatically",
		"difficulty": {
			"control": {
				"level": 1,
				"increased": [
					{
						"add": "+5 to +10",
						"text": "if the Jedi cannot verbalize the thoughts she is transmitting (she is gagged or doesn't want to make a sound) - <i><b>Homebrew:</b> doesn't apply for Zebron</i>"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "if target is friendly and doesn't resist"
					},
					{
						"level": "Perception or Control",
						"text": "if target resists"
					}
				],
				"modifiers": data.modifiers.relationship
			}
		},
		"summary": "Sends emotions, feelings, or a few short words into another mind. The target knows the impressions are not their own, and the power communicates rather than controls.",
		"content": [
			{
				"type": "effect",
				"text": [
					"If the Jedi successfully projects her thoughts, the target \"hears\" her thoughts and \"feels\" her emotions. The Jedi can only broadcast feelings, emotions and perhaps a couple of words — this power cannot be used to send sentences or to hold conversations.",
					"The target understands that the thoughts and feelings he is experiencing are not his own and that they belong to the user of the power. If the Jedi doesn't \"verbally\" identify herself, the target doesn't know who is projecting the thoughts. This power can only be used to communicate with other minds, not control them."
				]
			}
		]
	},
	{
		"name": "Receptive Telepathy",
		"required": [
			"Life Detection",
			"Life Sense"
		],
		"extra": "Power can be kept up: if the target is willing and the proximity modifier doesn't increase",
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "for friendly, non-resisting targets"
					},
					{
						"level": "Perception or Control",
						"text": "if target resists"
					}
				],
				"modifiers": [
					data.modifiers.proximity,
					data.modifiers.relationship
				]
			}
		},
		"summary": "Reads a target's surface thoughts and emotions, with stronger success allowing memories from the last 24 hours to be searched. Each additional target requires a separate roll, and droids are unaffected.",
		"content": [
			{
				"type": "effect",
				"text": [
					"A Jedi who makes the power roll can read the surface thoughts and emotions of the target. The Jedi \"hears\" what the target is thinking, but cannot probe for deeper information.",
					"If the <b>sense</b> roll doubles the difficulty number, the Jedi can sift through any memories up to 24 hours old. A Jedi cannot sift through memories in the same round that contact is made — this process takes a full round.",
					"A Jedi can read the minds of more than one person at a time, but each additional target requires a new <b>receptive telepathy</b> roll. This power may be used on creatures and other sentient species, although it cannot be used on droids."
				]
			}
		]
	},
	{
		"name": "Remain Conscious",
		"required": "Control Pain",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2,
						"text": "for <i>stunned</i> characters"
					},
					{
						"level": 3,
						"text": "for <i>incapacitated</i> characters"
					},
					{
						"level": 4,
						"text": "for <i>mortally wounded</i> characters"
					}
				]
			}
		},
		"summary": "Lets a Jedi stay awake after injuries that would normally cause unconsciousness. The character loses immediate actions, must activate the power first next round, and then usually has time for one follow-up action such as Control Pain.",
		"content": [
			{
				"type": "effect",
				"text": [
					"<i>Remain conscious</i> allows a Jedi to <i>remain conscious</i> even after suffering injuries which would knock her <i>unconscious</i>. When a character with this power suffers this kind of injury, she loses all other actions for the rest of the round but she is still conscious (a character without this power would simply pass out).",
					"At the beginning of the next round, the character may attempt to activate the power — this must be the first action of that round; the Jedi cannot even dodge or parry.",
					"If the roll is unsuccessful, the character passes out immediately. If the roll is successful, the Jedi may only perform one other action that round — often the character will attempt to <i>control pain</i>. The character may make a last-ditch heroic effort before passing out. After that other action has been completed, the Jedi will lapse into unconsciousness (unless she has activated <i>control pain</i> or done something else to stay conscious)."
				]
			},
			{
				"type": "example",
				"text": [
					"Ana suffers several stuns and should be knocked <i>unconscious</i>... but she has <i>remain conscious</i>. Ana loses her remaining actions for that round, but she is still awake.",
					"At the beginning of the next round, Ana's player declares that she will try to activate <i>remain conscious</i> and <i>control pain</i>. The player makes the Moderate <b>control</b> roll to activate <i>remain conscious</i>, so Ana stays awake for the rest of the round. (If the roll had failed or Ana hadn't activated <i>remain conscious</i>, she would have passed out at the beginning of the round.)",
					"Ana must now make a Very Easy <b>control</b> roll to activate <i>control pain</i>. If she succeeds, she may now act normally; if the roll fails, Ana is overwhelmed by the pain and slips into unconsciousness."
				]
			}
		]
	},
	{
		"name": "Telekinesis",
		"extra": [
			data.extra.inSight,
			data.extra.keptUp
		],
		"difficulty": {
			"alter": {
				"level": [
					{
						"level": 1,
						"text": "for objects weighing one kilogram or less"
					},
					{
						"level": 2,
						"text": "for objects weighing one to ten kilograms"
					},
					{
						"level": 3,
						"text": "for objects 11 to 100 kilograms"
					},
					{
						"level": 4,
						"text": "for 101 kilograms to one metric ton"
					},
					{
						"level": 5,
						"text": "for 1,001 kilograms to ten metric tons"
					},
					{
						"level": 6,
						"text": "for objects weighing 10,001 kilograms to 100 metric tons"
					}
				],
				"increased": [
					{
						"add": "+5",
						"text": "per additional 10 meters per round"
					},
					{
						"add": "+1 to +5",
						"text": "gentle turns"
					},
					{
						"add": "+6 to +10",
						"text": "easy maneuvers"
					},
					{
						"add": "+11 to +25 or more",
						"text": "complex maneuvers, such as using a levitated lightsaber to attack"
					}
				],
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "Moves objects or beings with the Force. Difficulty is based on weight, distance, speed, and maneuver complexity, and using the power to attack living beings grants a Dark Side Point.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows the Jedi to levitate and move objects with the power of her mind alone. If used successfully, the object moves as the Jedi desires.",
					"A Jedi can levitate several objects simultaneously, but each additional object requires a new <b>telekinesis</b> roll.",
					"This power can be used to levitate oneself or others. It can be used as a primitive space drive in emergencies.",
					"When used to levitate someone against their will, the target may resist by adding her <b>Perception</b> or <b>control</b> roll to the difficulty number.",
					"Levitated objects can be used to attack other characters, but this automatically gives the Jedi a Dark Side Point. Such objects do <b>1D</b> damage if under a kilogram, <b>2D</b> if one to ten kilos, <b>4D</b> if 11 to 100 kilos, <b>3D</b> speeder-scale damage if 101 kilos to one metric ton, <b>3D</b> starfighter-scale damage if one to ten tons and <b>5D</b> starfighter-scale damage if 11 to 100 metric tons.",
					"Such attacks require an additional <b>control</b> roll by the Jedi, which acts as an attack roll against the target's <i>dodge</i>. If the target doesn't <i>dodge</i> the attack, the difficulty is Easy."
				]
			}
		]
	},
	{
		"name": "Transfer Force",
		"required": [
			"Control Another's Pain",
			"Control Pain"
		],
		"timeToUse": data.time.minutes["1"],
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
		"summary": "Transfers life force from the Jedi to a willing mortally wounded target to keep them from dying. The Jedi spends a Force Point, and the target remains severely injured in hibernation for up to six weeks.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power will save a <i>mortally wounded</i> character from dying because the Jedi is transferring her life force to the target. The target character remains <i>mortally wounded</i> but will not die unless injured again. The injured character is in hibernation and will stay alive in this state for up to six weeks. The Jedi must be touching the target character when the power is activated.",
					"When this power is used, the Jedi must spend a Force Point (this is the life force that is transferred to the target). This use is always considered heroic, so the Jedi will get the Force Point back at the end of the adventure.",
					"The recipient of this power must be willing."
				]
			}
		]
	},
	{
		"name": "Translation",
		"required": [
			"Receptive Telepathy",
			"Projective Telepathy",
			"Life Sense"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "for humans or aliens"
					},
					{
						"level": 4,
						"text": "for droids"
					}
				],
				"increased": [
					{
						"add": "+5",
						"text": "if the target is being purposely cryptic"
					},
					{
						"add": "+20",
						"text": "if the language is written down"
					}
				]
			}
		},
		"summary": "Lets the Jedi understand and speak a language while the power remains active after hearing or seeing it. The power enables temporary communication but does not permanently teach the language.",
		"content": [
			{
				"type": "effect",
				"text": [
					"The character may translate a language and speak it. The Jedi may decipher body language, explore the spoken word, or translate ancient Sith texts, etc. In order for this to work, the character must first hear the target speak, or see the works in written form (such as an ancient text or document). It takes only one application of this power to \"understand\" a language. As long as they all speak the same language and the power is kept up, the character need not roll for each individual talking. Also because they also \"speak\" using beeps and whistles, droids may be communicated with using this power.",
					"Note that the character does not really know the language. Once this power is no longer in use, the Jedi is once again unable to understand or speak the language."
				]
			}
		]
	},
	{
		"name": "Beast Languages",
		"required": [
			"Life Sense",
			"Receptive Telepathy",
			"Projective Telepathy",
			"Translation"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "if the animal is domesticated/ friendly (such as a bantha)"
					},
					{
						"level": 3,
						"text": "if the animal is wild, but non-predatory (such as an undomesticated tauntaun)"
					},
					{
						"level": 4,
						"text": "if the animal is wild, but non-predatory (such as an undomesticated tauntaun)"
					},
					{
						"level": 5,
						"text": "if the animal is ferocious/predatory (such as a wild rancor)"
					},
					{
						"level": 6,
						"text": "if the animal is ferocious/predatory (such as a wild rancor)"
					}
				]
			}
		},
		"summary": "Allows communication with non-sentient creatures by interpreting emotions, sounds, and body language. While kept up, it can continue reading the creature's emotional state and may make rideable beasts easier to handle.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows the Jedi to translate a beast-language and allows the Jedi to speak it. As creatures rarely have \"true\" languages, the Jedi is actually reading the differences in surface emotions within grunts and growls and other cues of body language.",
					"Note that the character may keep up this power if the Jedi needs to continue picking up the emotional state of a creature. For beasts that can be ridden, subtract <b>-2D</b> from their orneriness code while this power is in effect. A creature's minimum orneriness code is <b>0D</b>."
				]
			}
		]
	},
	{
		"name": "Control Disease",
		"required": "Accelerate Healing",
		"timeToUse": data.time.minutes["30+"],
		"timeToUseNote": data.time.notes.disease,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "for a mild infection, such as a cold"
					},
					{
						"level": 2,
						"text": "for a modest infection or illness, such as a high fever or severe flu"
					},
					{
						"level": 3,
						"text": "for a severe illness, such as gangrene or a hive virus"
					},
					{
						"level": 4,
						"text": "for a life-threatening disease"
					},
					{
						"level": 5,
						"text": "for a massive, long-standing disease"
					},
					{
						"level": 6,
						"text": "for a rapid-acting life-threatening disease"
					}
				]
			}
		},
		"summary": "Directs the Jedi's own healing ability against disease after meditation. Difficulty depends on the illness, and serious or long-standing diseases can require repeated successful rolls over weeks or months.",
		"content": [
			{
				"type": "effect",
				"text": [
					"<i>Control disease</i> allows the Jedi to direct and control the anti-bodies and healing resources of her body to throw off an infection or to resist diseases within the body. Using the power requires the Jedi to meditate for half an hour.",
					"If the disease is life-threatening or long-standing, the Jedi must make repeated skill attempts over the course of several weeks or months to cure the disease entirely. (gamemaster's discretion as to how many rolls are needed and how often.)"
				]
			}
		]
	},
	{
		"name": "Detoxify Poison",
		"timeToUse": data.time.minutes["5"],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "for a very mild poison, such as alcohol"
					},
					{
						"level": 2,
						"text": "for a mild poison"
					},
					{
						"level": 3,
						"text": "for an average poison"
					},
					{
						"level": 4,
						"text": "for a virulent poison"
					},
					{
						"level": 5,
						"and_more": true,
						"text": "for a neurotoxin"
					}
				]
			}
		},
		"summary": "Neutralizes or expels poison from the Jedi's body. On a successful Control roll the poison has no effect, with difficulty based on the poison's strength.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Jedi to detoxify or eject poisons that have entered her body. If the Jedi makes the power roll, the poison doesn't affect her."
			}
		]
	},
	{
		"name": "Force of Will",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 2
			}
		},
		"summary": "Lets the Jedi use Willpower to resist hostile Force powers that directly affect the mind or body. It can reduce or block such effects, but it does not stop physical manifestations like lightning or hurled objects and can strain the user.",
		"content": [
			{
				"type": "effect",
				"text": [
					"By using <i>force of will</i>, the character uses his or her own <i>willpower</i> skill to fight the effects of hostile Force powers. If faced with a mind-based power, the Jedi's <b>willpower</b> skill roll may be added to either the <b>control</b> or <b>Perception</b> code.",
					"The <b>control</b> (or <b>Perception</b>) plus <b>willpower</b> total is referred to as the \"protection number\". If the attack roll is less than the target's <b>control</b> (or <b>Perception</b>) roll, the character suffers no ill effects. If the attack roll is greater than the protection number, the Jedi suffers the full effects of the attacking power. If the attack roll is greater then the <b>control</b> roll, but less than the protection number, the Jedi is protected from the power, but his willpower is considered \"battered\". Subtract <b>-1D</b> from the character's <i>willpower</i> skill. The Jedi can still continue to defend, but with the decreased willpower. Reroll for a new protection number in this case. If a Jedi's <i>willpower</i> skill ever reaches <b>0D</b>, the <i>Force of will</i> power is automatically dropped, and the Jedi can only resist with <b>control</b> or Perception.",
					"It takes one day to recover <b>1D</b> of damage from a \"battered will\", or one hour in <i>emptiness</i> (or <i>rage</i>) for each <b>1D</b> to recover."
				]
			},
			{
				"type": "note",
				"text": "<i>Force of will</i> does not protect against <i>Force lightning</i> or <i>Force storms</i> or objects hurled by <i>telekinesis</i> since in each case the power creates a distinct physical manifestation. These are external rather than internal powers, in which case willpower would have no bearing on resistance. <i>Force of will</i> works on <i>injure/kill</i>, <i>telekinetic kill</i>, <i>inflict pain</i>, and other powers which directly use the Force to affect the target"
			},
			{
				"type": "example",
				"text": [
					"Nomi is attacked by an alien being whose skills reach into the dark side. With an Easy <b>control</b> roll, Nomi initiates the <i>force of will</i> power. The alien decides to use the <i>telekinetic kill</i> power on Nomi. The alien's <b>control</b> and <b>sense</b> rolls are successful, and he now rolls his <b>alter</b> skill against Nomi's <i>control</i> skill of <b>6D</b>. Because Nomi is using the <i>force of will</i> power, she adds her <b>willpower</b> skill of <b>7D+2</b> to her <b>control</b> code for a protection number of <b>13D+2</b>.",
					"If the alien rolls less than Nomi's <i>control</i> skill, she would remain unaffected.",
					"If the alien rolls greater than the protection number, Nomi is be struck by the full force of her opponent's attack. The alien makes an additional <b>alter</b> roll against Nomi's unaided <b>control</b> roll to determine damage.",
					"If the alien rolls greater than Nomi's <i>control</i> skill, but less than her protection number, she would be fully protected from the hostile Force power. However, her will is considered to be battered, and her <i>willpower</i> skill drops -<b>1D</b> to <b>6D+2</b>. She must roll the <b>6D+2</b> to get a new (and presumably lower) protection number. It will take her either a full day of meditating, or one hour in <i>emptiness</i> to bring her willpower die code back up to <b>7D+2</b>."
				]
			}
		]
	},
	{
		"name": "Instinctive Astrogation",
		"required": "Magnify Senses",
		"difficulty": {
			"sense": {
				"level": 3,
				"modifiers": data.modifiers.astrogation
			}
		},
		"summary": "Allows the Jedi to feel a safe hyperspace route without relying on a nav computer. Success lowers the astrogation difficulty, while failure can create a dangerous or very difficult course.",
		"content": [
			{
				"type": "effect",
				"text": "This is the more well known ability of the Jedi to calculate astrogation routes without the use of a nav computer. The Jedi uses his <b>sense</b> skill to feel through the myriad of hyperspace routes to determine the safest path."
			},
			{
				"type": "table",
				"text": "The difficulty is modified by the danger of the course:",
				"columns": ["Task is", "Modifier (add to difficulty)"],
				"rows": [
					["Very Easy", "0"],
					["Easy", "0"],
					["Moderate", "0"],
					["Difficult", "<b>+5</b>"],
					["Very Difficult", "<b>+10</b>"],
					["Heroic", "<b>+15</b>"]
				]
			},
			{
				"type": "effect",
				"text": "If the Jedi succeeds at charting the course, she needs to only generate an [[diff:2]] astrogation total to plot a safe path. If the Jedi fails the roll, the astrogation difficulty is automatically [[diff:5]]. If the roll is missed by more than five points, increase the difficulty to [[diff:6]]."
			}
		]
	},
	{
		"name": "Instinctive Astrogation Control",
		"timeToUse": data.time.minutes["1"],
		"timeToUseNote": data.time.notes["12R"],
		"difficulty": {
			"control": {
				"level": 5,
				"modifiers": data.modifiers.astrogation
			}
		},
		"summary": "Lets the Jedi calculate hyperspace routes mentally rather than sensing them. Even on success a simple Astrogation roll is still needed, and failure can overlook hazards.",
		"content": [
			{
				"type": "effect",
				"text": "<i>Instinctive astrogation control</i> is far more difficult than the standard sense-based <i>instinctive astrogation</i> power because rather than trying to feel the correct solutions to the hyperspace equations, the Jedi calculates them in his head. This is quite possible and is often done as part of training exercises, though the figures generated are rarely utilized because it is so easy even for a Jedi to make a mistake."
			},
			{
				"type": "table",
				"text": "The difficulty is modified by how hard the task is with a nav computer:",
				"columns": ["Task is", "Modifier (add to difficulty)"],
				"rows": [
					["Very Easy", "0"],
					["Easy", "<b>+5</b>"],
					["Moderate", "<b>+10</b>"],
					["Difficult", "<b>+15</b>"],
					["Very Difficult", "<b>+20</b>"],
					["Heroic", "<b>+30</b>"]
				]
			},
			{
				"type": "effect",
				"text": [
					"If the <b>control</b> roll is successful, a [[diff:1]] <b>astrogation</b> roll is necessary to enter the correct routes into the nav computer. If the Jedi fails the attempt, she overlooks an obstacle, and sends the ship down an inherently dangerous path, thereby making the <i>astrogation</i> difficulty [[diff:5]]. If the <b>control</b> roll is missed by five or more points, the astrogation difficulty increases to [[diff:6]].",
					"This is a largely unknown application of the control power that allows Jedi to plot astrogation paths instead of using the more well-known sense-based <i>instinctive astrogation</i> power. <i>Instinctive astrogation control</i> is little more than a curiosity, studied only by a few Jedi theoreticians."
				]
			}
		]
	},
	{
		"name": "Life Web",
		"required": [
			"Life Detection",
			"Life Sense",
			"Sense Force"
		],
		"timeToUse": data.time.days["2+"],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "Population in tens of billions"
					},
					{
						"level": 2,
						"text": "Population in billions"
					},
					{
						"level": 3,
						"text": "Population in hundreds of millions"
					},
					{
						"level": 4,
						"text": "Population in tens of millions"
					},
					{
						"level": 5,
						"text": "Population in millions"
					},
					{
						"level": 6,
						"text": "Population in hundreds of thousands"
					}
				],
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "Detects large populations of an intelligent species the Force-user has specialized in. After extended concentration, it reveals general direction and, on stronger success, rough distance to populations of at least 100,000.",
		"content": [
			{
				"type": "note",
				"text": "The Force-user must choose one specific species as a specialization (see description)"
			},
			{
				"type": "effect",
				"text": [
					"This power is used to detect large concentrations of members of a specific species such as humans, Rodians, or Chadra-Fan. When the power is used successfully, the users sense the general direction toward the population. If the Jedi beats the difficulty by 10 or more, she knows the approximate distance to the population (i.e., hundreds or thousands of kilometers, or single tens, hundreds, or thousands of light-years).",
					"This power may not be used to detect populations smaller than 100,000 individuals. When this power is selected, the Force-user must select a specific intelligent species to specialize in. A Force-user may select more <i>life web</i> species specializations at a cost of three Character Points per additional species. The Force-user must be familiar with the species. This power may only be used to detect species that the Force-user has specialized in."
				]
			},
			{
				"type": "example",
				"text": "Ulic Qel-Droma could specialize in <i>life web</i>: Twi'lek since he is familiar with Tott Doneeta's unique \"Force presence\", but he would not be able to select <i>life web</i>: Rodian until he spent time with a member of that species."
			},
			{
				"type": "effect",
				"text": "This power requires at least two days of continuous <i>concentration</i>. For each additional two days of <i>concentration</i>, the Force-user may add <b>+1D</b> to his or her <b>sense</b> roll."
			}
		]
	},
	{
		"name": "Postcognition",
		"required": [
			"Hibernation Trance",
			"Life Detection",
			"Sense Force"
		],
		"timeToUse": "5 minutes, rushable to 1 minute",
		"timeToUseDetails": {
			"baseLabel": "5 minutes",
			"minimumLabel": "1 minute",
			"summary": "Reduce the time by accepting a higher Sense difficulty.",
			"rush": {
				"baseMinutes": 5,
				"minimumMinutes": 1,
				"stepMinutes": 1,
				"modifierPerStep": 10,
				"modifierLabel": "+10 difficulty per minute reduced"
			}
		},
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "if seeing less than two hours into the past"
					},
					{
						"level": 3,
						"text": "for seeing more than two hours but less than a week into the past"
					},
					{
						"level": 4,
						"text": "for seeing more than a week but less than six months into the past"
					},
					{
						"level": 5,
						"text": "for seeing more than six months but less than a year into the past"
					},
					{
						"level": 6,
						"text": "for seeing more than a year but less than two years into the past"
					}
				],
				"increased": [
					{
						"add": "+10",
						"text": "for each additional year"
					}
				]
			}
		},
		"summary": "Reads Force impressions left on a handled object to perceive past events around it. The Jedi chooses how far back to search, and higher rolls provide clearer sensory impressions.",
		"content": [
			{
				"type": "effect",
				"text": [
					"<i>Postcognition</i> allows a Jedi to investigate the tenuous imprints of the Force left on objects when they are handled by living beings. The character must be able to handle the target object.",
					"The Jedi must declare how far in the past is being reviewed prior to rolling <i>postcognition</i>. If the roll is successful, the Jedi can determine who has handled or touched the object and what events have transpired around it. The Jedi may \"search\" for specific incidents or simply review past events, somewhat like viewing a hologram.",
					"If the <b>postcognition</b> roll is equal to or higher than three times the difficulty number, the character can witness events when the object was present as if she were there herself.",
					"If the <b>postcognition</b> roll is greater than or equal to twice the difficulty number, the Jedi gains a good sensory impression of the event, but is limited in that the primary sense (the sense which gives the most information, usually sight) is obscured; the other sensory impressions come through clearly.",
					"If the <b>postcognition</b> roll is simply greater than the difficulty number, then all sensory impressions are muffled, tactile sense is dulled, smells or tastes are indistinct or mixed. The Jedi receives a vague sense of who handled the object and what events transpired around it."
				]
			},
			{
				"type": "example",
				"text": [
					"Ana is going to use <i>postcognition</i> on a blaster to see if it was used to murder an Alliance officer. She declares that she will search back a full year (a Very Difficult task) — her <b>postcognition</b> total is <b>24</b>, which just barely beats the difficulty number. Ana gets several sensory impressions — blurry images of a woman grabbing the gun, a muffled scream as a man is shot and falls to the ground. Unfortunately, the images are so indistinct that Ana can't tell exactly who is using the gun and who was shot.",
					"If Ana had limited her <i>postcognition</i> viewing to less than two hours — an Easy task — her roll of <b>24</b> would have been more than three times the difficulty. She would have seen any events with clarity."
				]
			}
		]
	},
	{
		"name": "Predict Natural Disaster",
		"required": [
			"Danger Sense",
			"Life Detection",
			"Weather Sense",
			"Magnify Senses"
		],
		"timeToUse": "15 minutes, rushable to 1 minute",
		"timeToUseDetails": {
			"baseLabel": "15 minutes",
			"minimumLabel": "1 minute",
			"summary": "Reduce the time by raising the Sense difficulty in five-minute rush steps.",
			"rush": {
				"modifierLabel": "+1 difficulty category per rush step",
				"options": [
					{ "minutes": 15, "modifierLabel": "+0" },
					{ "minutes": 10, "modifierLabel": "+1 category" },
					{ "minutes": 5, "modifierLabel": "+2 categories" },
					{ "minutes": 1, "modifierLabel": "+3 categories" }
				]
			}
		},
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "if the Jedi has lived in the area for more than a year"
					},
					{
						"level": 3,
						"text": "if the Jedi has been living within the area between six and 12 months"
					},
					{
						"level": 4,
						"text": "if the Jedi has been living within the area between one and six months"
					},
					{
						"level": 5,
						"text": "if the Jedi has been living within the area less than one month"
					}
				],
				"modifiers": data.modifiers.severity
			}
		},
		"summary": "Attunes the Jedi to local weather and geological patterns to predict imminent natural disasters. The forecast normally covers 12 hours, with familiarity and severity affecting the difficulty.",
		"content": [
			{
				"type": "effect",
				"text": "The Jedi can sense local meteorological and geological conditions and predict imminent disasters, such as earthquakes, volcanic eruptions, floods, landslides, avalanches, cave-ins, tornadoes, hurricanes (hurricanes can also be predicted with <i>weather sense</i>), etc. By opening his or her senses to the environment, the Jedi can predict these disturbances, much as animals can seemingly sense an earthquake hours or even days before it happens. Like <i>weather sense</i>, this power does not lend itself to quick predictions. It customarily takes weeks for a Jedi to get to know local weather patterns and topography. The prediction is effective for 12 hours. The difficulty increases by one level for each additional 12-hour period by which the Jedi wishes to extend the prediction."
			}
		]
	},
	{
		"name": "Rage",
		"required": "Hibernation Trance",
		"extra": data.extra.usableWhenDarkSide,
		"difficulty": {
			"control": {
				"level": 4
			}
		},
		"grantsDarkSidePointOnUse": true,
		"summary": "A dark-side counterpart to Emptiness that puts the user into a hate-filled trance. It grants a later Force-skill bonus but gives a Dark Side Point, leaves the user vulnerable and dangerous, and can cause damage afterward.",
		"content": [
			{
				"type": "effect",
				"text": [
					"<i>Rage</i> allows a character to feel the influence of the dark side. It is a counterpart to <i>emptiness</i>.",
					"The character must tense himself completely, and allow the mindless <i>rage</i> of the dark side to possess them. Any character in <i>rage</i> will appear lifeless. The Force-user is amplifying the negative aspects of his personality, leaving his face clenched in a rictus of horror and fear.",
					"A character must determine how long he wishes to stay in <i>rage</i> when he enters it. Barring an attack or arrival of a specific person (as explained below) the dark Jedi remains in the trance for the duration. Every four hours, the character must make a Difficult <b>control</b> roll or he will come out of the trance.",
					"When the Jedi leaves this state, he receives a <b>+10</b> modifier to all Force skill rolls for a period equal to that spent in <i>rage</i>. After the bonus has subsided, the character takes one die of damage for every two hours he was in the trance.",
					"Like <i>emptiness</i>, <i>rage</i> makes characters oblivious to their surroundings; they are rendered immobile. Unlike <i>emptiness</i> the character will strongly exude the dark side. This internal focusing even provides some protection against others using the",
					"Force to manipulate them in some way. Add the <i>rage</i> <b>control</b> roll to the difficulty of the Force power employed by the \"attacking\" character.",
					"Characters also dehydrate and hunger twice as fast as normal in <i>rage</i> and are more susceptible to damage (<b>-1D</b> to Strength when resisting damage from physical and energy attacks while in this state). Characters who plan an extended trance require intravenous nourishment.",
					"In <i>rage</i>, the character is less oblivious to his surroundings than a Jedi in <i>emptiness</i>."
				]
			},
			{
				"type": "example",
				"text": "Any physical contact by a living being may revive the character in <i>rage</i> (requiring a Moderate <b>control</b> roll) and provoke an instant berserker-like attack, regardless of who the other character is. The character then must make a Difficult <b>control</b> roll to cease the attack before the \"offending\" character is <i>killed</i>."
			},
			{
				"type": "effect",
				"text": [
					"A character using <i>rage</i> can choose to anticipate the arrival of a foe, using a Difficult <b>sense</b> roll (modified by relationship) with the <i>life sense</i> power at the time they enter <i>rage</i>. This will allow them to instantly awaken (an Easy <b>control</b> roll) if the expected person comes within five meters of the person in <i>rage</i>.",
					"This power may be used in a preparation ritual for the <i>transfer life</i> power. When a raged person uses <i>transfer life</i>, their original body is completely consumed by the dark side, often bursting into blue flames. For every three points by which the <b>control</b> roll exceeded the <i>rage</i> difficulty, the body does <b>1D</b> damage upon the explosion (three-meter blast radius)."
				]
			}
		]
	},
	{
		"name": "Reduce Injury",
		"required": "Control Pain",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3,
						"text": "for <i>incapacitated</i> characters"
					},
					{
						"level": 4,
						"text": "for <i>mortally wounded</i> characters"
					},
					{
						"level": 5,
						"text": "for dead characters"
					}
				]
			}
		},
		"summary": "Lets a Jedi reduce a severe or fatal injury to wounded if used immediately after it occurs. The power costs a Force Point and may leave a permanent injury when it prevents death.",
		"content": [
			{
				"type": "effect",
				"text": [
					"A Jedi may use this power to reduce the amount of injury she suffers. This power is normally only used in desperation because of its long-term repercussions.",
					"The power must be used in the round that the injury is suffered or in the round immediately following. When the power is successful, the Jedi loses a Force Point.",
					"Any injury that is suffered is reduced to <i>wounded</i>. If the original injury would have <i>killed</i> the character, the gamemaster will inflict a relevant permanent injury on the character."
				]
			},
			{
				"type": "note",
				"text": "It is not always a \"selfish\" act to save one's life, so the character might be able to get the Force Point back. If the character was fighting to save her friends from certain doom — and if she fails, they certainly die — then this could even be considered an heroic action"
			},
			{
				"type": "example",
				"text": "Luke Skywalker and Darth Vader are fighting in the Emperor's chambers on the Second Death Star. Luke batters down Vader's defenses and makes a killing strike — but Vader uses the <i>reduce injury</i> power and spends a Force Point. He is now only <i>wounded</i>, but his hand is severed."
			}
		]
	},
	{
		"name": "Remove Fatigue",
		"required": [
			"Accelerate Healing",
			"Control Pain"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3
			}
		},
		"summary": "Purges fatigue-causing toxins and helps the Jedi endure strenuous activity while the power is kept up. The character still needs food and water but must fail two stamina checks before becoming fatigued.",
		"content": [
			{
				"type": "effect",
				"text": "The character uses this power to combat the effects of strenuous work. The Jedi manipulates the Force, causing bodily toxins to be ejected much more efficiently, thus allowing for greater stamina. While kept up, the Jedi must make a <b>stamina</b> check once per day. While using this power, a Jedi must fail two <b>stamina</b> checks before he or she is fatigued. The character still has to eat and drink normally. If the Jedi does fail two <b>stamina</b> checks and becomes fatigued, a penalty of -<b>1D</b> is applied to all attributes and skills for <b>1D</b> hours."
			}
		]
	},
	{
		"name": "Resist Stun",
		"extra": data.extra.keptUp,
		"timeToUse": data.time.minutes["1"],
		"timeToUseNote": data.time.notes["12R"],
		"difficulty": {
			"control": {
				"level": 3
			}
		},
		"summary": "Prepares the Jedi to ignore stun results while the power is active. An unconscious result drops the power and leaves the Jedi stunned, while normal wound results are resolved normally.",
		"content": [
			{
				"type": "effect",
				"text": [
					"<i>Resist stun</i> allows the Jedi to prepare her body to resist the effects of <i>stun damage</i>. The power must be activated before the character has suffered any damage.",
					"A successful result allows the Jedi to resist all <i>stun</i> results (except for <i>unconscious</i>). An <i>unconscious</i> result forces the Jedi to drop the power, and she is considered <i>stunned</i>. Other injuries — <i>wounded</i>, <i>incapacitated</i>, <i>mortally wounded</i> and <i>killed</i> — are treated normally."
				]
			},
			{
				"type": "example",
				"text": [
					"Ana has a Strength of <b>3D</b>; if she suffers three <i>stun</i> results, she is knocked <i>unconscious</i>. She activates the <i>resist stun</i> power and decides to keep it up. (Since the power is kept up, she suffers a <b>-1D</b> penalty to all actions.)",
					"In the first round of combat, Ana suffers two <i>stun</i> results... but since she is using the <i>resist stun</i> power, she is not affected by the stuns. When she suffers a third <i>stunned</i> result, Ana must drop the <i>resist stun</i> power, but she is only considered <i>stunned</i> (<b>-1D</b> to actions)."
				]
			}
		]
	},
	{
		"name": "Short-Term Memory Enhancement",
		"required": "Hibernation Trance",
		"difficulty": {
			"control": {
				"level": 4
			}
		},
		"summary": "Lets the Jedi replay recent memories and notice details that were seen but missed at the time. The Control roll determines how far back the memory review can reach.",
		"content": [
			{
				"type": "effect",
				"text": [
					"When a Jedi uses this power, he or she can replay recent events in order to more carefully examine images and peripheral occurrences. Using the power, a Jedi can freeze images and even scan memory tracks to recall details that were seen but not consciously registered at the time of observation.",
					"In game terms, this power can be used to alert a Jedi to information, items, other characters, or anything else that passed before his senses within a specific span of time. In addition, if a gamemaster provided clues or leads to clues that the players originally missed or ignored, this power can be used to recall them. When players get stuck on a puzzle or mystery within an adventure, this power can alert them to possible solutions, if those solutions were observed earlier in the adventure.",
					"How far back a Jedi can remember depends on the success of his <b>control</b> roll."
				]
			},
			{
				"type": "table",
				"columns": ["Skill Roll &ge; Difficulty", "Memory Extends Back"],
				"rows": [
					["1-8", "Through current <i>episode</i>"],
					["9-20", "Through last <i>episode</i>"],
					["21+", "Through last two <i>episode</i>"]
				],
				"subnote": "An <i>episode</i> is essentially one \"Act\" of an adventure you are currently running. This definition, however, is left to gamemaster discretion."
			}
		]
	},
	{
		"name": "Up the Walls",
		"required": [
			"Enhance Attribute",
			"Burst of Speed"
		],
		"difficulty": {
			"control": {
				"level": 4
			}
		},
		"summary": "Allows the Jedi to run along walls as part of normal movement by combining the power with Running. The character must begin and end on the floor or risk falling and taking damage.",
		"content": [
			{
				"type": "effect",
				"text": [
					"You can use some or all of your movement on a wall, as long as you begin and end your turn on the floor. The height you can achieve on the wall is limited only by your movement limit. You must use this power in conjunction with your <i>running</i> skill, multiple action penalties apply.",
					"If you do not end your move on the floor or if you fail your <b>running</b> roll, you fall prone, taking damage as appropriate for your height above the floor. Treat the wall as normal floor for the purposes of measuring your movement, but not for where you can begin or end your move. Shifting from a horizontal surface to a vertical surface (and vice-versa) costs 2 meters of movement."
				]
			}
		]
	},
	{
		"name": "Sense Force",
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "for an area"
					},
					{
						"level": 4,
						"text": "for sensing details or specific objects within the area"
					}
				],
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "Senses the ambient Force within an area or object. It can reveal rough Force strength, kinds of life present, light or dark side influence, and vague premonitions, but not specific individuals.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power is used to sense the ambient Force within a place. It cannot be used to specifically detect sentient beings, but there are many forms of life and many areas of the galaxy intertwined with the Force which can be sensed with this power.",
					"<i>Sense Force</i> will tell a character the rough magnitude of the Force in an area or object (rich, moderate or poor in the Force), the rough type and quantity of life-forms (\"many insects\", \"only microbes and bacteria\", \"teeming with plant and animal life, including higher predators\") and whether the area or object tends toward the dark side or the light."
				]
			},
			{
				"type": "example",
				"text": "The tree on Dagobah which Luke Skywalker entered is a \"dark side nexus\" rich in the negative energies of the dark side of the Force."
			},
			{
				"type": "effect",
				"text": "An area rich in negative or positive energies may indicate past events or the activities of past inhabitants. The Jedi may also receive \"vague premonitions\" about the area, such as \"I sense something wrong\", or \"I sense a great impending tragedy\"."
			}
		]
	},
	{
		"name": "Sense Force Potential",
		"required": [
			"Life Detection",
			"Life Sense",
			"Receptive Telepathy",
			"Sense Force"
		],
		"timeToUse": data.time.rounds["6"],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "for friendly, unresistant targets"
					},
					{
						"levels": [
							{
								"level": 3,
							},
							data.level.perception
						],
						"text": "for unwilling subjects"
					}
				]
			}
		},
		"summary": "Probes a target's deeper mind to judge Force potential. Force-sensitive targets may produce an involuntary backlash, whose strength can reveal their connection or training.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Jedi to probe the mind of a target, and determine whether that person has the potential to be strong in the Force.",
					"The deep subconscious of a Force-sensitive person is shielded by a protective barrier which prevents another Force wielder from penetrating his or her inner mind. This shield pushes violently back at an intruder, sending him or her stumbling back. This \"shield\" is an involuntary defense mechanism maintained by every Force-sensitive person. It is one reliable way to determine which people might have the potential to become a Jedi.",
					"The magnitude of the backlash generated by the shield depends on the character's strength in the Force. A person who is merely Force sensitive will shove the intruder back several feet. Someone with actual Force skills will produce a more intense reaction. Those with little training will send the intruder reeling back across the room. Someone who is well-trained, or who has a great deal of raw talent in the Force, might actually send the intruder flying across the room."
				]
			}
		]
	},
	{
		"name": "Sense Path",
		"required": [
			"Emptiness",
			"Hibernation Trance"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 3
			}
		},
		"summary": "Shows symbolic visions about whether current or possible actions lead toward the light or dark side. The visions can warn, encourage, foreshadow, or guide atonement but remain indirect and interpretive.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power informs a character of the \"path\" he travels: whether his current actions are likely to lead him to the dark side, and whether any specified future actions are likely to do so (this power may be thought of as <i>farseeing</i> without control). Bear in mind that without control, the Jedi does not have the ability to decide whether he sees the past, present, or a possible future. The visions he receives are more likely to be allegorical in nature. To receive specific details, the <i>farseeing</i> power must be used.",
					"When giving the results of this power, be honest but obscure if the character has gained any Dark Side Points and is attempting to atone, this power will tell him how successful he has been within a game context.",
					"The Jedi can choose to consciously use this power, or it can be a plot device. If the latter, at an appropriate point in the scenario, you may call for a roll on this power, and give the Jedi a vision if he succeeds. You may use this to tell the players how well they are doing, or to give them a premonition of doom just before a critical encounter to heighten the tension. You may use it to warn them (by showing the future of their current course), to encourage them (particularly when they have done the right thing but have no way of knowing), to provide hints, or to foreshadow upcoming events.",
					"A vision from the Force should never be taken lightly by the players. It should give them something to think about, along with the attendant chances for good roleplaying. Bear in mind that different Jedi will tend to receive different renditions of the same scene, and consequently you should tailor the details you",
					"give to the fit character concerned. Instead, you might consider altering the way you describe the scenery; for the dark side, you might always describe rocky and barren terrain, or with a cold wind blowing, or it might always be night for the dark side and daytime or dawn for the light side. You can present these images in as contrary manner as you wish, provided you are consistent with the descriptions.",
					"Another thing to bear in mind is that it is never easy to tell which is the right course to take (although the path of darkness may be clear enough, the path of the light may be far more elusive). The Jedi must still be sure to follow the Jedi Code regardless of what his visions seem to be telling him, otherwise his own desires will encourage a less truthful vision and cause his downfall. And it is quite possible for a skilled Dark Jedi to twist the readings of this power to suit his own ends."
				]
			},
			{
				"type": "example",
				"text": [
					"\"You are scrambling through a rocky landscape at night. The only light is a feeble flow ahead of you, coming from behind the next outcropping. You are hurrying, trying to arrive in time to avert... something. When you pass the outcrop, the terrain falls away on all sides, and you find yourself on the edge of a gigantic precipice, like the inner rim of a volcano. Rock walls loom high on the opposite side of the pit. Standing, alone and vulnerable on a spike of rock scarcely half a meter wide at the tip, is your companion Tetsu. He is scared and crying. The column he is on is nowhere connected to the rim where you are standing: there is no way to reach him. A wind begins to howl up from below\".",
					"\"You are walking along a path: the route is straight and wide... and as black as coal. On your left is a second path, just as broad, just as straight, and shining brilliant white. You become aware of a presence walking along the second pathway matching you pace for pace. Ahead your paths cross, and the path that leads away from the point of intersection is twice as wide as your own… and of indeterminate color\"."
				]
			}
		]
	},
	{
		"name": "Shift Sense",
		"required": "Magnify Senses",
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "for simple phenomena (such as heat or simple scents)"
					},
					{
						"level": 4,
						"text": "for more uncommon phenomena (such as comm frequencies, infrared radiation)"
					},
					{
						"level": 5,
						"text": "for specific, complex phenomena (such as setting olfactory nerves to detect the presence of Tibanna gas)"
					}
				]
			}
		},
		"summary": "Shifts one of the Jedi's senses beyond its normal range, such as infrared, heat, unusual frequencies, or specific scents. It can reveal the presence of a phenomenon but may not locate, decode, or fully interpret it.",
		"content": [
			{
				"type": "effect",
				"text": [
					"The character may shift his or her senses as to detect phenomena of a different type than normal. Shifting eyesight to the infrared spectrum, hearing frequencies above or below normal range for his or her species, etc. This power counts as a \"skill use\" for determining die code penalties.",
					"Please note that this power is exceptionally useful in some aspects, but fairly limited in others."
				]
			},
			{
				"type": "example",
				"text": "A Jedi may detect comm frequencies, but that does not mean that the Jedi can listen in on the transmission. The Jedi will be able to detect that a transmission is present, but may not necessarily be able to locate the signal's source, and certainly will not be able to decode the information carried by the transmission."
			}
		]
	},
	{
		"name": "Weather Sense",
		"required": "Magnify Senses",
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "if the Jedi has lived in the area for more than a year"
					},
					{
						"level": 3,
						"text": "if the Jedi has lived in the area between six and twelve months"
					},
					{
						"level": 4,
						"text": "if the Jedi has lived in the area between one and six months"
					},
					{
						"level": 5,
						"text": "if the Jedi has lived in the area less than one month"
					}
				],
				"modifiers": [
					data.modifiers.proximity,
					data.modifiers.meteorological
				]
			}
		},
		"summary": "Attunes the Jedi to nearby clouds, winds, tides, and weather patterns for short-term forecasts. It works best after time spent learning the local area and normally predicts about four hours ahead.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows the Jedi to attune himself to the workings of local weather patterns. By sensing the movements of clouds, winds, tides, and solar bodies, someone using this power can discern patterns in the weather, and so make limited predictions regarding the behavior of atmospheric phenomenon.",
					"This power does not lend itself to quick predictions, however. It usually takes weeks for a Jedi to become accustomed to local weather patterns and become familiar with unique features of the local topography that is possible to obtain accurate readings.",
					"The prediction is effective for four hours. The difficulty increases if the Jedi wishes to make more extended forecasts."
				]
			}
		]
	},
	{
		"name": "Injure/Kill",
		"required": [
			"Life Detection",
			"Life Sense"
		],
		"difficulty": {
			"alter": {
				"level": [
					data.level.perception
				]
			}
		},
		"grantsDarkSidePointOnUse": true,
		"summary": "A dark-side touch attack that channels the Force directly into a living target to injure or kill. After touching the target, the user's Alter roll is compared to the target's Control or Perception as damage.",
		"content": [
			{
				"type": "effect",
				"text": [
					"An attacker must be touching the target to use this power. In combat, this means making a successful brawling attack in the same round that the power is to be used.",
					"When the power is activated, if the attacker's <b>alter</b> roll is higher than the character's resisting <b>control</b> or <b>Perception</b> total, figure damage as if the power roll was a damage total and the <b>control</b> or <b>Perception</b> roll was a <b>Strength</b> roll to resist damage."
				]
			},
			{
				"type": "example",
				"text": "A Dark Jedi grabs Ana by the shoulder and uses <i>injure/kill</i> on her. The Dark Jedi's <b>alter</b> roll is 15; Ana's <b>control</b> roll is an 8. That's a difference of seven, which on the damage chart means Ana is <i>wounded</i>. Ana falls to the ground, clutching her shoulder."
			}
		]
	},
	{
		"name": "Life Bond",
		"required": [
			"Life Detection",
			"Life Sense",
			"Magnify Senses",
			"Receptive Telepathy"
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
		"summary": "Creates a permanent, willing mental bond with a close individual. The partners can sense each other's location, emotions, senses, thoughts, and danger, but pain, dark-side actions, and death can also echo through the bond.",
		"content": [
			{
				"type": "effect",
				"text": [
					"A Jedi character may choose the <i>life bond</i> power to permanently form a mental link with one other individual, normally a mate (although sometimes siblings, parent and child, or even very close friends choose to <i>life bond</i>).",
					"Detailed information can be learned by activating the power. If both characters have the <i>life bond</i> power, reduce all sense difficulties by one level (although both characters must still roll for <i>life bond</i> to achieve the benefits listed below). The following benefits are only in effect when the characters are actively using the <i>life bond</i> power."
				]
			},
			{
				"type": "effect",
				"text": [
					"On an [[diff:2]] sense roll, the Force-user is aware of the other's general location and general emotional state: whether the person is frightened, in pain, injured, happy, or experiencing some other strong emotion.",
					"On a [[diff:3]] sense roll, the Force-user experiences the other's senses: he or she sees though the other's eyes, hears what the other hears, and smells, tastes, and feels what the other person is experiencing. However, at this level, the characters are affected by each other's experiences — both characters share pain, and if one character is injured, the other character suffers an injury one level lower.",
					"On a [[diff:4]] sense roll, the Force-user is considered telepathically linked to the <i>life bond</i> partner and can read the surface thoughts of the other if the other is willing to share those thoughts.",
					"On a [[diff:5]] sense roll, the Force-user can send thoughts to the <i>life bond</i> partner (as per the <i>projective telepathy</i> power), allowing the characters to carry on a telepathic conversation."
				]
			},
			{
				"type": "effect",
				"text": "As an added benefit, the two characters can have premonitions about each other."
			},
			{
				"type": "example",
				"text": "If one character is severely injured, his or her <i>life bond</i> partner will sense that something bad has happened."
			},
			{
				"type": "effect",
				"text": [
					"This aspect of the <i>life bond</i> power is modified by proximity only, as outlined below. Sensing premonitions is automatic of within 11,000 kilometers of each other. If on the same planet but more than 1,000 kilometers from each other, a Very Easy <b>sense</b> roll is necessary to sense premonitions. If not on the same planet but in the same star system, and Easy <b>sense</b> roll is necessary to sense premonitions. If not in the same star system but within 10 light-years, a Moderate <b>sense</b> roll is required. If more than 10 light-years but less than 100 light-years away, a Difficult <b>sense</b> roll is necessary. If more than 100 light-years away from each other, a Very Difficult <b>sense</b> roll is necessary.",
					"Life-bonded characters may not share skills, attributes, Force Points, or Character Points. However, since the characters do have such a close bond, the actions of one can affect the other. If a life-bonded character commits an evil action, the Jedi partner receives a Dark Side Point even though these actions were not the Jedi's fault. Obviously, life bonding is an exceedingly serious commitment, and not to be taken lightly.",
					"Both characters must agree to the <i>life bond</i> for the power to work and a character may only <i>life bond</i> with one other individual. Life bonding takes <b>1D</b> weeks to complete (as the Jedi becomes accustomed to the background Force presence of the <i>life bond</i> partner). During that time, the Jedi's control is <b>-1D</b>. The <i>life bond</i> power may not be activated until the bond is completely formed.",
					"Death is the only means of severing the <i>life bond</i>. If one member of the life-bonded couple is <i>killed</i>, the surviving partner enters a near-catatonic state of shock for <b>1D</b> days. After reawakening, the partner grieves and readjusts to a solitary existence; all die codes are reduced by <b>-1D</b> for the same amount of time it took to forge the <i>life bond</i>.",
					"Any attempt to forge a new <i>life bond</i> in the future requires a much longer period of adjustment: <b>2D</b> weeks for a second bond, <b>3D</b> weeks for a third bond, and so forth."
				]
			}
		]
	},
	{
		"name": "Lifemerge",
		"difficulty": {
			"control": {
				"level": 4
			},
			"sense": {
				"level": 4
			}
		},
		"summary": "Allows a dying Jedi to become one with the Force while retaining identity. The body fades away, and the Jedi may later appear to close companions a limited number of times without affecting the physical world.",
		"content": [
			{
				"type": "effect",
				"text": [
					"A Jedi may attempt to activate this power at his death. At the moment the Jedi knows death is imminent (just after a fatal wound, or just before it), the Jedi calms his mind and body (Difficult <b>control</b> roll), preparing to surrender his mortal shell. The Jedi then reaches out with his mind, tracing the ebb and flow of the Force around him and through him (Difficult <b>sense</b> roll).",
					"Upon succeeding at both rolls, the Jedi's spirit exits his body and becomes one with the Force, while still retaining his original identity. His body fades into nothingness, but the Jedi who passes in this fashion will not completely die.",
					"The Jedi can make a number of visitations to his close friends and associates equal to the number of Force Points he had upon death. In this fashion, a player who knows his character is about to die can ensure that death will mean something, as he can manifest to important persons in later sessions and warn them of impending disaster, or offer wisdom and teaching.",
					"At the gamemaster's discretion, and based on the power level of the Jedi when he died, only Force-sensitive characters may witness the visitation. After death, the Jedi cannot influence the material world in any way."
				]
			}
		]
	},
	{
		"name": "Control Another's Disease",
		"required": [
			"Accelerate Healing",
			"Control Disease"
		],
		"timeToUse": data.time.minutes["30+"],
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
		"summary": "Lets a Jedi help a touched character resist or overcome disease using the same basic rules as Control Disease. Relationship modifies the Control difficulty, while disease severity sets the Alter difficulty.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Jedi to heal another character, using the same rules and conditions as outlined in <i>control disease</i>. The Jedi must be touching the character to be healed."
			}
		]
	},
	{
		"name": "Detoxify Another's Poison",
		"required": [
			"Accelerate Healing",
			"Accelerate Another's Healing",
			"Control Pain",
			"Control Another's Pain",
			"Detoxify Poison"
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
						"text": "for a very mild poison (such as alcohol)"
					},
					{
						"level": 2,
						"text": "for a mild poison"
					},
					{
						"level": 3,
						"text": "for an average poison"
					},
					{
						"level": 4,
						"text": "for a virulent poison"
					},
					{
						"level": 5,
						"text": "for a neurotoxin"
					},
					{
						"level": 6,
						"text": "for a neurotoxin"
					}
				]
			}
		},
		"summary": "Neutralizes poison in another character while the Jedi maintains physical contact and the power. The target is protected during contact, but failure or broken contact can let the poison take effect.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Jedi to remove or <i>detoxify poison</i> from a patient's body faster than is normally possible. While using this power, the Jedi must remain in physical contact with the patient. As long as the Jedi is in contact with the target, that person is considered immune to the effects of the poison. Failure to make the required <b>control</b> and <b>alter</b> difficulty checks or breaking physical contact during the use of the power causes the patient a wound."
			}
		]
	},
	{
		"name": "Feed on Dark Side",
		"required": "Sense Force",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3,
						"text": "when activated"
					},
					{
						"level": 1,
						"text": "each round thereafter"
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 3,
						"text": "when activated; no rolls required for subsequent rounds"
					}
				]
			}
		},
		"grantsDarkSidePointOnUse": true,
		"summary": "Lets a dark-side user draw strength from nearby fear, hatred, anger, and other negative emotions. If a light-side Force-sensitive gains a Dark Side Point nearby, the user gains temporary Force Points and another Dark Side Point.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Jedi to feed on the fear, hatred, or other negative emotions of others to make himself more powerful. It does not matter to the dark side why the others are filled with dark emotions; the feelings alone suffice.",
					"In game terms, in any round in which a character using this power is in the presence of a light side Force-sensitive who gains a Dark Side Point, the character gains a Dark Side Point and a Force Point. If multiple characters gain Dark Side Points in the same round, the character gains multiple Force Points. These Force Points must be spent within five minutes of being received.",
					"Dark Jedi use this power to gain power from the anger and hatred they create in their foes. For player characters who are quick to anger, it is impossible to die-roll their way out of this situation. The only way to stop a Jedi from gaining extra Force Points from this power is to resist the dark side. This can be extremely difficult, particularly since there is nothing to prevent the Dark Jedi from doing everything in his power to provide these negative emotions. This might include deception, the butchering of innocents, taunts, insults, threats against the characters, their friends, families, home planets or bases, and anything else likely to make them call on the dark side.",
					"Players who fail to devise a better way of defeating a Dark Jedi other than by brute force are very likely to be destroyed if faced with this power."
				]
			},
			{
				"type": "warning",
				"text": "Avoid overusing this power, since it can severely disrupt game balance if not used in moderation"
			}
		]
	},
	{
		"name": "Force Lightning",
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
		"summary": "A dark-side attack that projects painful blue-white energy from the user's fingertips. Armor does not protect against it, damage is based on Alter, and Absorb/Dissipate Energy can repel it.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power is a corruption of the Force. When used, it produces bolts of white or blue energy that fly from the user's fingertips like lightning. The bolts tear through their target, causing painful wounds. Since this power is Force-generated it can be Force-repelled using <i>absorb/dissipate energy</i>.",
					"Force lightning courses over and into its target, convulsing the target with serious pain, and eventually killing him. Armor does not protect a character from <i>Force lightning</i>. <i>Force lightning</i> causes <b>1D</b> of damage for each <b>2D</b> of alter the user has (rounded down: a character with an <b>alter</b> of <b>5D</b> would cause <b>2D</b> of damage)."
				]
			}
		]
	},
	{
		"name": "Inflict Pain",
		"required": [
			"Control Pain",
			"Life Sense"
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
		"summary": "Wracks a target with intense agony and stun damage resisted by Control, Perception, or Willpower. Any damage leaves the target unable to act for the rest of the current round and the next round.",
		"content": [
			{
				"type": "effect",
				"text": "The target experiences great agony. The user causes damage by rolling her <i>alter</i> skill, while the target resists damage with their <b>control</b>, Perception, or willpower. Damage is figured as a <i>stun</i> attack, although if the target suffers any damage at all, they are so crippled by pain that they are incapable of acting for the rest of the round and the next round."
			}
		]
	},
	{
		"name": "Place Another in Hibernation Trance",
		"required": "Hibernation Trance",
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
		"summary": "Places a willing touched character into hibernation trance and cannot be used as an attack. The same power can also awaken someone from hibernation at increased difficulty.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Jedi to put another character into a <i>hibernation trance</i>. The affected character must be in physical contact with the power's user and must agree to be shut down — the power cannot be used as an \"attack\" to knock others <i>unconscious</i>.",
					"This power can be used to bring another character out of a <i>hibernation trance</i>, but the alter difficulty is increased by <b>+10</b>."
				]
			}
		]
	},
	{
		"name": "Redirect Energy",
		"required": "Absorb/Dissipate Energy",
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
		"summary": "Lets a Jedi hold and redirect a Force energy attack after successfully absorbing it. A failed redirection sends the energy off target, and harming a sentient bystander can grant a Dark Side Point.",
		"content": [
			{
				"type": "effect",
				"text": "If the Jedi is the target of a Force energy attack (such as <i>force lightning</i>) he may attempt to send the energy back at the attacker. After the Jedi has successfully absorbed the Force energy attack using <i>absorb/dissipate energy</i>; he may hold the energy (Difficult <b>control</b> roll), and then redirect the energy in the direction he chooses (Very Difficult <b>alter</b> roll). If the Jedi fails the <b>alter</b> roll, then the energy will be sent wildly off target (as determined by the grenade scatter diagram). If the bolt hits any sentient being other than the original attacker, the Jedi receives one Dark Side Point. The energy is not sent off target if it is merely dodged."
			}
		]
	},
	{
		"name": "Remove Another's Fatigue",
		"required": [
			"Accelerate Healing",
			"Accelerate Another's Healing",
			"Control Pain",
			"Control Another's Pain",
			"Remove Fatigue"
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
		"summary": "Removes fatigue penalties from a touched character after fatigue has already set in. It counteracts failed stamina-check effects as they occur rather than preventing fatigue in advance.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows the Jedi to remove the effects of fatigue in another. The affected character must be in physical contact with the power's user. Unlike the basic power, the Jedi must wait until the target is actually fatigued, before offering assistance. Hence the penalties for failing a <b>stamina</b> check can be counteracted, but must be addressed as they occur."
			}
		]
	},
	{
		"name": "Return Another to Consciousness",
		"required": [
			"Remain Conscious",
			"Control Pain"
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
						"text": "for <i>incapacitated</i> characters"
					},
					{
						"level": 4,
						"text": "for <i>mortally wounded</i> characters"
					}
				]
			}
		},
		"summary": "Returns a touched incapacitated or mortally wounded character to consciousness. The awakened target follows the same action limits imposed by Remain Conscious.",
		"content": [
			{
				"type": "effect",
				"text": "The target returns to consciousness. The target has the same restrictions as imposed by the <i>remain conscious</i> power, and must be touching the Jedi."
			}
		]
	},
	{
		"name": "Dim Another's Senses",
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
		"summary": "Reduces a target's Perception and related skills while the power is kept up. Multiple targets can be affected by increasing the Sense difficulty and using the strongest resisting roll for the group.",
		"content": [
			{
				"type": "note",
				"text": "The attribute and related skills are reduced as long as the power is kept up"
			},
			{
				"type": "table",
				"text": "This power greatly reduces the Perception of the target character. If successful, reduce the character's Perception and all <i>Perception</i> skills, depending upon the result:",
				"columns": ["Alter Roll &ge; control or Perception", "Reduce Perception"],
				"rows": [
					["0-5", "<b>-1</b>"],
					["6-10", "<b>-2</b>"],
					["11-15", "<b>-1D</b>"],
					["16-20", "<b>-2D</b>"],
					["21+", "<b>-3D</b>"]
				],
				"subnote": "The power may be used on more than one target at a time, with an increase of <b>+3</b> to the sense difficulty for each additional target; the target with the highest <b>control</b> or <b>Perception</b> rolls for the entire group."
			}
		]
	},
	{
		"name": "Greater Force Shield",
		"required": [
			"Absorb/Dissipate Energy",
			"Concentration",
			"Magnify Senses",
			"Telekinesis",
			"Lesser Force Shield"
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
		"summary": "Creates a strong Force barrier around the Jedi against energy and physical attacks. The shield adds to Strength based on the Alter roll, and a strong success can extend it to a touched character.",
		"content": [
			{
				"type": "effect",
				"text": "When a Jedi successfully activates this power, he creates a protective shield around his body. This shield is effective against both energy and physical attacks. The strength of the shield is equal the character's <b>alter</b> roll divided by three, rounded down."
			},
			{
				"type": "example",
				"text": "If the Jedi has <b>9D</b> in alter, he may add <b>3D</b> to his <b>Strength</b> roll to resist damage."
			},
			{
				"type": "effect",
				"text": "If the Jedi exceeds the alter difficulty by <b>+10</b>, he may extend the <i>greater force shield</i> to another character if he has direct contact with that character."
			}
		]
	},
	{
		"name": "Battle Meditation",
		"extra": data.extra.keptUp,
		"timeToUse": data.time.minutes["5"],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "1-2 Individuals"
					},
					{
						"level": 2,
						"text": "3-20 Individuals"
					},
					{
						"level": 3,
						"text": "21-100 Individuals"
					},
					{
						"level": 4,
						"text": "101-1.000 Individuals"
					},
					{
						"level": 5,
						"text": "1.001-10.000 Individuals"
					},
					{
						"level": 6,
						"text": "10.000+ Individuals"
					}
				]
			},
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "1-2 Individuals"
					},
					{
						"level": 2,
						"text": "3-20 Individuals"
					},
					{
						"level": 3,
						"text": "21-100 Individuals"
					},
					{
						"level": 4,
						"text": "101-1.000 Individuals"
					},
					{
						"level": 5,
						"text": "1.001-10.000 Individuals"
					},
					{
						"level": 6,
						"text": "10.000+ Individuals"
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 1,
						"text": "1-2 Individuals"
					},
					{
						"level": 2,
						"text": "3-20 Individuals"
					},
					{
						"level": 3,
						"text": "21-100 Individuals"
					},
					{
						"level": 4,
						"text": "101-1.000 Individuals"
					},
					{
						"level": 5,
						"text": "1.001-10.000 Individuals"
					},
					{
						"level": 6,
						"text": "10.000+ Individuals"
					}
				]
			}
		},
		"summary": "Influences an ongoing battle by either turning enemies against each other or strengthening allies while weakening foes. The user chooses one effect before rolling and must maintain the power for it to continue.",
		"content": [
			{
				"type": "effect",
				"text": [
					"<i>Battle meditation</i> has two possible effects. The Jedi can force her adversaries to abandon their assault and turn on each other, or she can alter the tide of the battle, strengthening her allies and at the same time weakening her enemies. Before initiating the power the Jedi must state which effect she wishes to use.",
					"The targets of this power must have initiated combat for the effects to take hold. In game terms, a Jedi may only use this power effectively on or after the first round of combat, not before. Enemies are defined as those who seek to oppose the Jedi's immediate goal (rescuing a prisoner, defeating a group of dark Jedi, etc.); allies are defined as those who seek to uphold and forward the Jedi's goal.",
					"When attempting to turn attackers against each other, the Jedi's highest skill roll (control, sense, or alter) to activate the skill becomes the difficulty the targets must beat to avoid the effect. Otherwise they immediately see their allies as the \"true\" enemy and attack. The Jedi must maintain the effect each round for the combatants to continue fighting. Once the power is dropped, its effects wear off instantly.",
					"On a successful roll to change the balance of the battle in the Jedi's allies' favor (the power's second function), the Jedi's enemies lose <b>1D</b> for every <b>4D</b> she has in her best Force skill, in an attribute determined by the Jedi (i.e., Strength, Dexterity, etc.) to a minimum of <b>1D</b>, while her allies receive a bonus of the same value to an attribute of her choosing."
				]
			},
			{
				"type": "example",
				"text": "Nomi Sunrider and three of her Jedi Knight companions are battling a dozen Sith minions. Seeing the tide of the engagement turning in the dark siders' favor, Nomi decides to use her <i>battle meditation</i> power to help her allies overcome their enemies. Since she has a control of <b>1D+1</b>, a sense <b>2D+1</b>, and an alter <b>1D</b>, she may increase one attribute of all of her companions (she chooses Dexterity in this case) by <b>2D+1</b> (the highest of the three), and decrease one attribute of that of her opponents by <b>2D+1</b> (She chooses Strength), to a minimum of <b>1D</b>, until she drops the power. While Nomi continues to maintain the power, her allies all have a <b>2D+1</b> bonus to Dexterity (and all of its skills) and all her enemies have a <b>2D+1</b> penalty to Strength (and all of its skills)."
			}
		]
	},
	{
		"name": "Control Mind",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3
					},
					{
						"level": data.level.perception,
						"text": "for targets with an affinity for the Force (i.e., have Force skill or Force Points) who decide to use it",
						"optional": true
					}
				],
				"modifiers": data.modifiers.relationship
			},
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "for a Jedi who has turned to the dark side"
					},
					{
						"level": 3,
						"text": "for a Jedi who is of the light side"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"conditional": {
					"description": "Variable, depending on the number of targets being controlled and whether or not they are willing. Force-sensitive targets may make opposed rolls, choosing either their roll or the difficulty, whichever is higher.",
					"tables": [
						{
							"title": "For a Jedi who has turned to the dark side",
							"columns": ["Number", "Willing", "Unwilling"],
							"rows": [
								["1", 1, 2],
								["2", 2, 3],
								["3", 3, 4],
								["4-5", 4, 5],
								["6-8", 5, 6]
							]
						},
						{
							"title": "For a Jedi who is of the light side",
							"columns": ["Number", "Willing", "Unwilling"],
							"rows": [
								["1", 3, 4],
								["2", 4, 5],
								["3", 5, 6]
							]
						}
					]
				}
			}
		},
		"summary": "A dark-side power that turns one or more beings into puppets under the user's will. It can be kept up, Force-sensitive targets can resist, and droids or computers are unaffected.",
		"content": [
			{
				"type": "warning",
				"text": [
					data.warnings.darkSidePointOnUseWarning,
					"Gain an additional Dark Side Point for every evil action the user forces a victim of this power to undertake"
				]
			},
			{
				"type": "note",
				"text": "The difficulties of this power are significantly decreased for those who have fallen to the dark side"
			},
			{
				"type": "effect",
				"text": [
					"The use of this power allows a Jedi to take control of another person turning him into a puppet who must obey the Jedi's will. When used successfully a Jedi can control the actions",
					"of others, making them serve his will like automatons. The power may be kept up to allow the user to maintain control of his target's mind — the Jedi must make a new roll if a new target is to be added.",
					"Characters versed in the ways of the Force (with any Force skills) can actively resist by rolling a <b>control</b> or <b>Perception</b> total. A character with an inherent affinity for the Force may resist by rolling a <b>Perception</b> total. The character may choose either the difficulty for the power use or his own roll. If the Jedi attempts to control more than one such Force-sensitive character at the same time, for all characters beyond the first, add <b>+1</b> for each die code of Perception or control (as per \"Combining Rules\"). The Jedi must make a new power roll whenever he attempts to take over a new target. Targets may be released without a roll.",
					"<i>Control mind</i> cannot be used to control droids or computers."
				]
			}
		]
	},
	{
		"name": "Create Force Storms",
		"required": [
			"Hibernation Trance",
			"Life Detection",
			"Life Sense",
			"Magnify Senses",
			"Receptive Telepathy",
			"Sense Force",
			"Telekinesis",
			"Farseeing",
			"Projective Telepathy",
			"Instinctive Astrogation",
			"Rage"
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
						"text": "each successive round to control the storm"
					},
					{
						"level": 5,
						"text": "to dissipate the storm"
					}
				],
				"increased": [
					{
						"add": "+5",
						"text": "Diameter of storm desired: 100 meters or less"
					},
					{
						"add": "+10",
						"text": "Diameter of storm desired: 100 meters to 1 kilometer"
					},
					{
						"add": "+15",
						"text": "Diameter of storm desired: base of 1 kilometer"
					},
					{
						"add": "+2",
						"text": "Diameter of storm desired: every additional kilometer"
					},
					{
						"add": "+5",
						"text": "Damage: per <b>1D</b> of damage"
					}
				],
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "Creates vast dark-side storms that twist space-time and can devastate ships or worlds. The user chooses size and damage, must keep control each round, and risks being consumed if control fails.",
		"content": [
			{
				"type": "warning",
				"text": [
					"<i>Force Storms</i> are immensely destructive and violate the laws of nature",
					data.warnings.darkSidePointOnUseWarning
				]
			},
			{
				"type": "effect",
				"text": [
					"This is one of the most destructive Force powers known. It allows the Jedi to twist the space-time continuum to create vast storms of Force. The power also allows limited control of these storms. Capable of creating annihilating vortices, the storms can swallow whole fleets of spaceships or tear the surfaces off worlds.",
					"This power requires an extreme focus of hate and anger to an almost palpable degree and there is considerable danger involved. Some are capable of creating <i>Force storms</i>, but fail at harnessing what they have foolishly unleashed. Often, those who fail to control the storm are themselves consumed and destroyed. If the Force-user is destroyed, the storm dissipates within minutes.",
					"When creating a Force Storm, the character must determine the diameter and amount of damage (on a capital scale.) If the Force user fails on any of her rolls, she successfully summons the storm with the desired damage, but the storm attempts to consume the summoner.",
					"At a <b>+10</b> difficulty, the summoner can use unusual maneuvers with the storm, like creating a vortex to draw victims to a specified point."
				]
			}
		]
	},
	{
		"name": "Doppleganger",
		"required": [
			"Control Pain",
			"Emptiness",
			"Hibernation Trance",
			"Life Detection",
			"Life Sense",
			"Magnify Senses",
			"Receptive Telepathy",
			"Sense Force",
			"Telekinesis",
			"Projective Telepathy",
			"Control Another's Pain",
			"Transfer Force",
			"Affect Mind",
			"Dim Another's Senses"
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
		"summary": "Creates a realistic illusory duplicate of the Force-user that people and sensors perceive as real. The user senses through it, it acts at half the creator's skill dice, and it must be maintained or it fades.",
		"content": [
			{
				"type": "note",
				"text": "This power must be kept up"
			},
			{
				"type": "effect",
				"text": [
					"This power creates a doppelganger of the Force-user. Though the doppelganger is merely an illusion, it will interact with people and appear to be real. The user can sense all normal senses through the doppelganger, including a \"feel\" of normal substances. Doppelgangers also register normally on all droids' audio and video sensors.",
					"Those who interact with the doppelganger believe it to be a real person. The doppelganger acts with half the skill dice of the person that created it. Every five minutes, the user must roll again to maintain the doppelganger. If the user stops using the doppelganger or it is fatally injured, it simply fades into nonexistence."
				]
			}
		]
	},
	{
		"name": "Drain Life Essence",
		"required": [
			"Control Pain",
			"Hibernation Trance",
			"Life Detection",
			"Life Sense",
			"Magnify Senses",
			"Receptive Telepathy",
			"Sense Force",
			"Telekinesis",
			"Farseeing",
			"Projective Telepathy",
			"Control Another's Pain",
			"Transfer Force",
			"Affect Mind",
			"Control Mind",
			"Dim Another's Senses"
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
						"text": "1-5 Victims"
					},
					{
						"level": 2,
						"text": "6-50 Victims"
					},
					{
						"level": 3,
						"text": "51-1.000 Victims"
					},
					{
						"level": 4,
						"text": "1.001-50.000 Victims"
					},
					{
						"level": 5,
						"text": "50.001-1.000.000 Victims"
					},
					{
						"level": 6,
						"text": "1.000.001-10.000.000 Victims"
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "for willing, worshipful subjects"
					},
					{
						"level": 4,
						"text": "for ambivalent or apathetic individuals"
					},
					{
						"level": 6,
						"text": "for enemies"
					}
				],
				"increased": [
					{
						"add": "+10",
						"text": "if individuals are imbued with the light side of the Force"
					}
				]
			}
		},
		"summary": "A dark-side power that drains life energy from nearby victims and channels it to the user. It can remain active over long periods, with benefits based on the number of victims and duration of the draining.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Jedi to draw life energy from those around him and channel the negative effects of the dark side into those victims.",
					"All living things are a part of and contribute to the Force; even those with no awareness of the Force are affected by and are a part of it. Many beings go through their daily lives wasting much of their life energy. This power draws that life energy from beings, allowing a Jedi to use that energy to further his or her own ends.",
					"To draw this energy the Jedi must roll this power once a day. This power is considered up at all times and thus die penalties apply.",
					"The amount of energy the Jedi draws depends on the number of individuals affected by the power and the length of time they have been drained."
				]
			},
			{
				"type": "table",
				"title": "For individuals who have been drained for less than one week or longer than one month",
				"columns": ["Number of Victims", "Force Points Acquired"],
				"rows": [
					["1-5", "One Force Point per week"],
					["6-50", "One Force Point per five days"],
					["51-1.000", "One Force Point per three days"],
					["1.001-50.000", "One Force Point per two days"],
					["50.001-1.000.000", "One Force Point per day"],
					["1.000.001-10.000.000", "One Force Point per 12 hours"]
				]
			},
			{
				"type": "table",
				"title": "For individuals who have been drained longer than one week and less than one month",
				"columns": ["Number of Victims", "Force Points Acquired"],
				"rows": [
					["1-5", "One Force Point per five days and <b>+1D</b> to all Force skills"],
					["6-50", "One Force Point per three days and <b>+2D</b> to all Force skills"],
					["51-1.000", "One Force Point per two days and <b>+3D</b> to all Force skills"],
					["1.001-50.000", "One Force Point per day and <b>+3D+2</b> to all Force skills"],
					["50.001-1.000.000", "One Point per 12 hours and <b>+4D</b> to all Force skills"],
					["1.000.001-10.000.000", "One Point per 6 hours and <b>+4D+2</b> to all Force skills"]
				]
			}
		]
	},
	{
		"name": "Enhanced Coordination",
		"extra": [
			data.extra.keptUp,
			"If new troops join the battle, the Jedi must make a new roll to keep the power up. Likewise the Jedi must make a new roll if the individuals' skills are affected or changed",
			"This power can only affect <i>Dexterity</i>, <i>Technical</i>, and <i>Strength</i> skills"
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
						"text": "1-10 Individuals affected"
					},
					{
						"level": 2,
						"text": "11-100 Individuals affected"
					},
					{
						"level": 3,
						"text": "101-500 Individuals affected"
					},
					{
						"level": 4,
						"text": "501-5.000 Individuals affected"
					},
					{
						"level": 5,
						"text": "5.001-50.000 Individuals affected"
					},
					{
						"level": 6,
						"text": "50.001-500.000 Individuals affected"
					}
				]
			}
		},
		"summary": "Subconsciously links a willing group so they perform selected shared tasks more efficiently. The user chooses three eligible skills, granting bonuses based on each participant's existing skill dice.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows the Jedi to coordinate a group at the subconscious level to perform certain tasks more efficiently. The Emperor often used this power to increase the fighting ability of his troops, mentally driving them on and supplementing their will to fight. This power can only be used on individuals who are in agreement with the intent of the Jedi, and it in no way grants the Jedi mental control over the troops affected. Instead, it links the troops on a subconscious level, allowing them to fight more proficiently and with better organization. If the power is successfully called upon, the Jedi picks three specific skills. The skills must be the same for the entire group. For every <b>3D</b> (round down) that individuals in the group have in those skills they receive a <b>+1D</b> bonus."
			}
		]
	},
	{
		"name": "Force Harmony",
		"required": [
			"Life Detection",
			"Life Sense",
			"Receptive Telepathy",
			"Projective Telepathy"
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
		"summary": "Links willing light-side Force-users to resist dark-side powers together. The combined harmony grants strong resistance bonuses and can interrupt maintained dark-side powers when the rolls are high enough.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows several willing Jedi to manifest the power of the light side. As long as this power is operating, it bathes the users in the celestial illumination that is of the light side. It can act as a shield against the powers of the dark side, giving <b>+5D</b> for each Force user involved to resist the effects of powers called upon by dark side servants. This bonus is not as great as it appears since a Jedi will receive a <b>-2D</b> penalty for calling on this power. The number of Force-users linked in this power is limited by the number of dice that the power's imitator has in control or sense, whichever is lower."
			},
			{
				"type": "example",
				"text": "Leia has a control of <b>5D+1</b> and a sense of <b>4D+2</b>. If she used <i>Force harmony</i> she would be able to link only four people (including herself)."
			},
			{
				"type": "effect",
				"text": "When acting as a shield against the dark side, if both <b>control</b> and <b>sense</b> rolls exceed the target's roll of the dark side power used (if the power requires multiple rolls, then the highest roll), the dark side power is interrupted. All powers being kept up by the target are interrupted as if the user were <i>stunned</i>. It doesn't cancel out the presence of the dark side, but can distract its servants and make their actions more difficult."
			}
		]
	},
	{
		"name": "Projected Fighting",
		"required": [
			"Concentration",
			"Telekinesis"
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
		"summary": "Allows the Jedi to strike a target at a distance with the Force using a Brawling roll. It is risky: using it beyond protective stun damage or causing serious harm grants a Dark Side Point.",
		"content": [
			{
				"type": "note",
				"text": "The distance between the user and the target needs to remain the same. Should the target move significantly or the user wish to select a new target, the power must be rerolled"
			},
			{
				"type": "effect",
				"text": [
					"<i>Projected fighting</i> allows the user to strike at an opponent, inflicting damage without physically touching the target. Use of this power is more than a little risky; in many cases <i>projected fighting</i> is simply using the Force for attack. However, the Jedi attempting to use <i>projected fighting</i> can elect to cause <i>stun damage</i> only, and even then should only attempt to use this power if it is to protect innocent life from immediate danger. A Jedi who uses <i>projected fighting</i> for any other reason, or causes anything more serious than <i>stun damage</i>, receives a Dark Side Point.",
					"After successfully using the power, the user makes a <b>brawling</b> skill roll. If attacking a Force-sensitive, the target may use the <i>brawling parry</i> skill to avoid the attack. Otherwise, the target cannot deflect the Jedi's blows. If the <b>brawling</b> roll is successful, the user rolls his or her full Strength versus the target's Strength. The user may target a specific portion of the body, but must subtract an additional <b>-1D</b> from his <i>brawling</i> skill (See \"Called Shots\" in the \"Combat & Injuries\" chapter). Be sure to add any armor bonuses that the target may have."
				]
			}
		]
	},
	{
		"name": "Telekinetic Kill",
		"required": [
			"Control Pain",
			"Inflict Pain",
			"Injure/Kill",
			"Life Sense"
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
		"summary": "A dark-side attack that injures or kills by crushing, choking, or otherwise damaging the target telekinetically. The user's Alter roll is compared to the target's Control or Perception to determine damage.",
		"content": [
			{
				"type": "effect",
				"text": "This power is used to telekinetically injure or kill a target. The user makes his <b>alter</b> roll against the target's <b>control</b> or <b>Perception</b> total to determine damage. The exact method used to kill the target varies: collapse of the trachea, stir in the brain, squeeze the heart, or any number of methods."
			}
		]
	},
	{
		"name": "Transfer Life",
		"required": [
			"Absorb/Dissipate Energy",
			"Accelerate Healing",
			"Control Pain",
			"Emptiness",
			"Detoxify Poison",
			"Hibernation Trance",
			"Reduce Injury",
			"Remain Conscious",
			"Resist Stun",
			"Life Detection",
			"Life Sense",
			"Magnify Senses",
			"Receptive Telepathy",
			"Sense Force",
			"Telekinesis",
			"Injure/Kill",
			"Farseeing",
			"Projective Telepathy",
			"Accelerate Another's Healing",
			"Control Another's Pain",
			"Feed on Dark Side",
			"Inflict Pain",
			"Return Another to Consciousness",
			"Dim Another's Senses",
			"Transfer Force",
			"Affect Mind"
		],
		"difficulty": {
			"control": {
				"level": 6,
				"increased": [
					{
						"add": "+15",
						"text": "if the victim is unwilling"
					}
				],
				"modifiers": data.modifiers.relationship
			},
			"sense": {
				"level": 6,
				"increased": [
					{
						"add": "+15",
						"text": "if the target is unwilling"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "Specially Prepared Clone Host Body"
					},
					{
						"level": 3,
						"text": "Recently Dead Body"
					},
					{
						"level": 4,
						"text": "Live Willing Host"
					},
					{
						"level": 5,
						"text": "Live Unwilling Host"
					},
					{
						"level": data.level.willpowerAlter,
						"text": "for victims that are Force sensitive and decide to use it",
						"optional": true
					}
				]
			}
		},
		"summary": "Transfers the user's life energy into another body or prepared clone host. It is an extremely difficult and evil dark-side power, and possessing an unwilling host grants additional Dark Side Points.",
		"content": [
			{
				"type": "warning",
				"text": [
					data.warnings.darkSidePointOnUseWarning,
					"If attempting to possess an unwilling host, the Jedi receives four Dark Side Points"
				]
			},
			{
				"type": "effect",
				"text": [
					"This power allows character to transfer his or her life energy into another body. The key to immortality itself, this is one of the most difficult and evil of all dark side powers. To overcome a spirit already residing in a body is nearly impossible. This is why the power is nearly useless without the ability to clone host bodies.",
					"Though theoretically possible, it is not yet known what the effect on an unborn fetus would be. Fortunately, there is almost no history of this power being used successfully. It is believed that if the user's body perishes as an attempt fails, the user's life energy is lost, dispersed to the void."
				]
			}
		]
	},
	{
		"name": "Force Scream",
		"summary": "An involuntary dark-side shockwave released when a Dark Jedi loses control of rage. It damages all beings within 50 meters, including the user, and leaves the Dark Jedi weakened afterward.",
		"content": [
			{
				"type": "note",
				"text": "This is an involuntary power that may be activated when a Dark Jedi loses control of her temper"
			},
			{
				"type": "effect",
				"text": [
					"The dark side of the Force is seductive, offering tremendous power to lure the weak-willed into its grip. Fear, anger, and jealousy are the ties that bind the servants of the dark side, and by tapping into such emotions, the Dark Jedi are capable of unleashing untold devastation.",
					"The power to destroy, however, does little to improve control of these abilities. Dark Jedi who have become angered sometimes lose control of their emotions. This can trigger shock waves that ripple through the Force, devastating the Dark Jedi and those unfortunate enough to be in close proximity.",
					"The <i>Force scream</i> has been called \"a wave of hatred amplified and fueled by the dark side, that is capable of smashing through mental and physical defenses with ease\". A number of references to Dark Jedi in Old Republic archives often mention the Dark Jedi losing control, violently, in the final moments of battle with the Jedi of the light side of the Force.",
					"In game terms, a <i>Force scream</i> is a reflex, usually occurring when Dark Jedi are provoked into losing their tempers. A Dark Jedi must make a Difficult <b>willpower</b> roll whenever angered to the point of rage; if the roll fails, the Jedi releases the <i>Force scream</i>. All of the Dark Jedi's die codes are reduced by <b>2D</b> for one hour, and he must rest for one hour or suffer an additional <b>-2D</b> penalty until rested (penalties are cumulative).",
					"The Force scream causes damage equal to the Dark Jedi's <i>alter</i> skill to all beings within 50 meters, including the Dark Jedi who unleashed this mental energy. Force-sensitive characters roll their <b>alter</b> dice to resist damage (those without the <i>alter</i> skill use <i>Strength</i>)."
				]
			}
		]
	},
	{
		"name": "Bolt of Hatred",
		"extra": data.extra.sithDiscipline,
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"alter": {
				"level": 3
			}
		},
		"summary": "A Sith discipline that forms a radiant sphere of hatred and hurls it at a visible target. On a hit, it deals heavy damage and causes the target to lose a Character Point.",
		"content": [
			{
				"type": "effect",
				"text": "The Force-user creates in his hand a radiant sphere of pure hatred which he can hurl at any target within his line of sight. After a successful <b>alter</b> roll to initiate the effect, the Force-wielder makes a <i>thrown weapons</i> roll with a <b>2D</b> bonus to launch the bolt of energy at his target. Characters hit by the sphere suffer <b>6D</b> damage and automatically <b>lose a Character Point</b>."
			}
		]
	},
	{
		"name": "Dark Side Web",
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
		"summary": "A Sith discipline that wraps a target in dark-side energy, cutting them off from the Force. It temporarily removes dice from Force skills and can also reduce Strength if the user chooses.",
		"content": [
			{
				"type": "effect",
				"text": [
					"When successfully initiated, this power summons strands of dark side power that wrap around the Force-user's target, ensnaring him in a mesh of brilliance. The lattice of energy severs the connection between the Force and the trapped individual and saps the strengths from his body.",
					"In game terms, the target of the <i>dark side web</i> loses a number of Force skill dice up to the number of the Force-wielder's <b>alter</b> dice."
				]
			},
			{
				"type": "example",
				"text": "If King Ommin had <b>6D</b> in <b>alter</b>, he could lower any one of Master Arca's Force skills by six dice; or, he could break up those six dice across all three of Arca's Force skills (<b>control, sense,</b> and <b>alter</b>), lowering each skill each by <b>2D</b> (or in any combination as long as the total number of dice removed totals <b>6D</b>)."
			},
			{
				"type": "effect",
				"text": "If the Force-user desires, he may include the <b>Strength</b> attribute in the reduction, thereby giving him the option of temporarily removing dice from <b>control, sense, alter</b>, and <b>Strength</b> in any combination of dice that adds up to his <b>alter</b> skill."
			}
		]
	},
	{
		"name": "Aura of Uneasiness",
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
		"summary": "A Sith discipline that projects an aura of discomfort around the user. Non-sentient creatures within sight instinctively avoid the Sith while the effect is active.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Sith to project a field of vague discomfort and unease around him, which causes non-sentient creatures to avoid him."
			}
		]
	},
	{
		"name": "Electronic Manipulation",
		"required": [
			"Absorb/Dissipate Energy",
			"Affect Mind"
		],
		"extra": data.extra.sithDiscipline,
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2,
						"text": "for non-sentient machines"
					},
					{
						"level": 3,
						"text": "for sentient machines"
					},
					{
						"level": 4,
						"text": "for sentient machines hostile to Sith"
					}
				],
				"modifiers": data.modifiers.proximity
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "for slight alteration"
					},
					{
						"level": 3,
						"text": "for significant changes in programming"
					},
					{
						"level": 4,
						"text": "for major reprogramming"
					}
				]
			}
		},
		"summary": "A Sith discipline that channels rage into a computer, droid, or machine to manipulate its circuits. It can restore altered programming to its original state, but does not rewrite programming freely.",
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Sith to channel his anger into the electronic circuits of a computer, droid, or machine, and reprogram it by manipulating its physical and electrical components. The reprogramming can only restore original reprogramming which has been altered, not actually rewrite a computer's programming.",
					"Since this Sith power can only be evoked in a state of rage, the Jedi have long avoided using it."
				]
			}
		]
	},
	{
		"name": "Waves of Darkness",
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
						"text": "for a 1-2 meter area of effect"
					},
					{
						"level": 4,
						"text": "for a 3-10 meter area of effect"
					},
					{
						"level": 5,
						"text": "for an 11-20 meter area of effect"
					},
					{
						"level": 6,
						"text": "for a 21-30 meter area of effect"
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 3,
						"text": "for a 1-2 meter area of effect"
					},
					{
						"level": 4,
						"text": "for a 3-10 meter area of effect"
					},
					{
						"level": 5,
						"text": "for an 11-20 meter area of effect"
					},
					{
						"level": 6,
						"text": "for a 21-30 meter area of effect"
					}
				]
			}
		},
		"summary": "A Sith discipline that radiates waves of hatred, jealousy, greed, and rage. Those caught in the area become confused and may be forced to flee unless they resist with Willpower or Control.",
		"content": [
			{
				"type": "effect",
				"text": [
					"The user delves into the darkness of her own spirit and dredges up the feelings of hatred, jealousy, greed, and rage that linger in the shadowed recesses. Using the Force as a power source, she expels these vile emotions in waves of dark side energy that radiate outward in an expanding sphere. Anyone caught in the disturbance suffers immediate confusion, and a few seconds later, feels fear.",
					"In game terms, those entering the area infested by the dark side waves must make a <b>willpower</b> or <b>control</b> roll against the Force-user's <b>control</b> total for initiating the effect. Anyone who fails the roll cannot take his next action (in this combat round or the next) and must flee on the successive round. Anyone who succeeds becomes confused and can take no more than one action each combat round until he exits the field of dark side energy."
				]
			}
		]
	},
	{
		"name": "Force Wind",
		"required": [
			"Magnify Senses",
			"Shift Sense",
			"Telekinesis"
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
						"text": "to affect 5 meters"
					},
					{
						"level": 4,
						"text": "to affect 10 meters"
					},
					{
						"level": 5,
						"text": "to affect 15 meters"
					}
				]
			}
		},
		"summary": "A Sith discipline that shapes air currents into destructive tornadoes. The cyclone can lift or fling targets and deals damage based on the user's Alter code.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows the Sith to manipulate and channel air currents to form powerful and destructive tornadoes that can lift people into the air and fling them about. The cyclone does the Sith's <b>alter</b> code in damage to all within its range."
			}
		]
	},
	{
		"name": "Drain Life Energy",
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
		"summary": "A Sith discipline that drains energy from nearby non-sentient life to avoid fatigue and sleep. It requires a supply of small creatures or similar life nearby and cannot be used on sentient beings.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Sith to draw power from nearby non-sentient beings to boost his ability to go without sleep. As long as this power is kept up, the Sith will not fatigue or require sleep. Use of the power depends on a ready supply of nearby insects, small rodents, birds, and so on to draw energy from. This power may not be used to draw energy from sentient beings."
			}
		]
	},
	{
		"name": "Memory Wipe",
		"required": [
			"Control Pain",
			"Hibernation Trance",
			"Life Detection",
			"Life Sense",
			"Magnify Senses",
			"Receptive Telepathy",
			"Sense Force",
			"Telekinesis",
			"Farseeing",
			"Projective Telepathy",
			"Affect Mind",
			"Control Mind",
			"Dim Another's Senses"
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
		"summary": "A Sith discipline that destroys a target's knowledge of a specific event or learned skill through direct contact. Only one clearly defined memory or skill can be targeted per use.",
		"content": [
			{
				"type": "effect",
				"text": "This dreadful power allows a Sith to sift through a person's mind and destroy all knowledge of specific events or learned skills. Use of the skill requires direct contact with the target, and only one specified objective can be pursued per session."
			}
		]
	},
	{
		"name": "Channel Rage",
		"extra": data.extra.keptUp,
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": 2
			}
		},
		"summary": "Turns the user's anger into a berserk combat fury, raising Strength while reducing defensive skill rolls. The user cannot perform patient or concentration-based actions and suffers Strength loss after the rage ends.",
		"content": [
			{
				"type": "effect",
				"text": "This power, when used, channels the character's anger and rage into a berserk fury, which increases his prowess in battle. Game effects include a temporary <b>+2D</b> bonus to <b>Strength</b>, and a <b>-1D</b> penalty to all defensive skill rolls. Raging characters are unable to perform any action or Force power that requires patience and/or concentration. When use of <i>channel rage</i> ends, the user loses two pips from his <b>Strength</b> die code for every round the power was kept up (reducing his Strength die code to a minimum of <b>1D</b>)."
			}
		]
	},
	{
		"name": "Force Shot",
		"required": [
			"Life Detection",
			"Life Sense",
			"Sense Force"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 3
			}
		},
		"summary": "Improves missile-weapon accuracy against living targets that are hidden or concealed. While kept up, the user adds Sense dice to ranged attacks against qualifying organic targets, but harming helpless targets grants a Dark Side Point.",
		"content": [
			{
				"type": "warning",
				"text": "Anyone who uses this power to harm a helpless character receives a Dark Side Point"
			},
			{
				"type": "effect",
				"text": "This power is used to increase a character's accuracy with missile weapons against hidden or concealed targets. If successful, the Force-user may add his <b>sense</b> dice to his ranged attack rolls against an organic/living target that is either fully or partially concealed, be it behind a wall, through smoke, or in darkness or shadow. At least some portion of the target must be concealed by some degree of cover to be effective. This power is called on at the start of a battle, and remains up until the Jedi is stunned, wounded, or worse. Any Jedi who has been stunned or wounded may attempt to activate the power again."
			}
		]
	},
	{
		"name": "Guided Attack",
		"required": [
			"Combat Sense",
			"Danger Sense",
			"Farseeing",
			"Life Sense",
			"Life Detection",
			"Sense Force"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": data.level.perception
			}
		},
		"summary": "Lets the user study one opponent for two full rounds and anticipate their combat reactions. While active, the target's defensive dice against the user are halved until the user is stunned, wounded, or worse.",
		"content": [
			{
				"type": "warning",
				"text": "Anyone who uses this power to harm a helpless character receives a Dark Side Point"
			},
			{
				"type": "effect",
				"text": "By successfully using this power and studying a single opponent for two full rounds, a character can anticipate that opponent's reactions in combat. This effectively reduces the opponent's defense dice rolls made to evade the character's attacks by half for the duration of the combat, or until the character using this power is stunned, wounded, or worse."
			}
		]
	},
	{
		"name": "Nature Affinity",
		"required": [
			"Life Detection",
			"Life Sense",
			"Sense Force"
		],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "to detect and identify plant and animal life in a 200 meter radius"
					},
					{
						"level": 4,
						"text": "to also sense the health of the area"
					},
					{
						"level": data.level.hide,
						"text": "if a target wishes not to be found",
						"optional": true
					}
				]
			}
		},
		"summary": "Detects and identifies nearby plant and animal life within 200 meters. At higher difficulty, it also senses the general health of the area in broad terms such as harmonious, threatened, or dying.",
		"content": [
			{
				"type": "effect",
				"text": "With a Moderate difficulty, this power allows the user to detect and identify the specific kinds of plant and animal life forms in a 200 meter radius. Those not wishing to be found can resist by rolling <b>control</b> or <b>hide</b>, and the result of this roll replaces the standard difficulty number. This power may only be used once per hour. With a Difficult difficulty, the user can also sense the \"health\" of an area, and this is expressed in a single word such as \"harmonious\", \"threatened\", or \"dying\"."
			}
		]
	},
	{
		"name": "Sense Surroundings",
		"required": [
			"Magnify Senses",
			"Sense Force"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"sense": {
				"level": 2
			}
		},
		"summary": "Lets a Force-user perceive through the Force despite blindness, deafness, darkness, or obstruction. It compensates for one missing sense per use and can support combat or search checks while kept up.",
		"content": [
			{
				"type": "effect",
				"text": "Sense surroundings allows a Force-user to extend his senses through the Force, permitting him to fight and make <i>search</i> checks despite darkness or obstruction. This power doesn't duplicate the <i>magnify senses</i> power, but it does allow a character to perceive things normally through the Force instead of through a normal sense. This power can only be used to counter either blindness or deafness. In order to counteract both lack of sight and sound, the power would need to be used twice (thus granting a multiple action penalty)."
			}
		]
	},
	{
		"name": "Empower Force",
		"difficulty": {
			"alter": {
				"level": 5
			}
		},
		"summary": "Increases the rolled variable effect of another Force power by half, such as damage or a rolled benefit. It must be activated in the same round as the affected power and uses normal multiple-action penalties.",
		"content": [
			{
				"type": "effect",
				"text": "All Force powers that have a variable effect based on a die roll are increased by one-half (multiply by 1.5, rounded down). "
			},
			{
				"type": "example",
				"text": "This can apply to damage for <i>Force lightning</i> or the benefits of <i>enhance attribute</i>."
			},
			{
				"type": "effect",
				"text": "This power must be activated in the same round as the related power. Multiple action penalties apply. Once the damage or benefit has been rolled, the result is multiplied by 1.5 (rounded down) and then added to the total. If the Jedi wants to affect more than one power, he must make separate <i>empower Force</i> rolls."
			},
			{
				"type": "example",
				"text": "A Force-user wishes to attack a target with <i>Force lightning</i>. The Force-user's <b>alter</b> die code is <b>7D</b>. If he successfully activates <i>empower force</i> before making his attack, he will roll his <b>3D</b> for damage. He rolls a nine, but has a final result of 13."
			}
		]
	},
	{
		"name": "Enlarge Force",
		"difficulty": {
			"alter": {
				"level": 4
			}
		},
		"summary": "Doubles the range of another Force power that is limited by distance. It must be activated in the same round as the affected power and has no effect on powers without range limits.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Jedi to double the range of those Force powers that are limited by distance."
			},
			{
				"type": "example",
				"text": "<i>Life bond</i> is a Force power limited by distance."
			},
			{
				"type": "effect",
				"text": "The Jedi must successfully activate <i>enlarge Force</i> in the same round as the Force power it is meant to enlarge. Force powers without range limitations are not affected."
			}
		]
	},
	{
		"name": "Extend Force",
		"difficulty": {
			"alter": {
				"level": 4
			}
		},
		"summary": "Doubles the duration of another Force power that expires after a set time. It must be activated in the same round as the affected power and does not affect powers without a duration limit.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Jedi to double the duration of those Force powers that have an effect that expires after a certain time."
			},
			{
				"type": "example",
				"text": "<i>Combat sense</i> and <i>enhance attribute</i> are Force powers with effects that expire after a set time."
			},
			{
				"type": "effect",
				"text": "The Jedi must successfully activate <i>extend Force</i> in the same round as the Force power it is meant to extend. Multiple action penalties apply. Force powers that are not affected by duration or an expiration time are not affected by this power."
			}
		]
	},
	{
		"name": "Force Flight",
		"required": [
			"Concentration",
			"Telekinesis"
		],
		"difficulty": {
			"alter": {
				"level": {
					"level": "Variable",
					"text": "Equal to the number of meters the Jedi wishes to move himself, maximum 20 meters"
				}
			}
		},
		"summary": "Moves the Force-user horizontally or vertically through the Force instead of walking. The distance sets the Alter difficulty, the movement is capped at 20 meters, and failing to land may cause falling damage.",
		"content": [
			{
				"type": "effect",
				"text": "Using this power instead of walking, a Force-user can physically move himself a number of meters either horizontally or vertically. The difficulty of the <b>alter</b> roll for this ability is equal to the number of meters that the Jedi wishes to move himself, but under no circumstances can the distance be greater than 20 meters. If the Force-user has not landed by the end of the round, he may suffer falling damage (at the gamemaster's discretion)."
			}
		]
	},
	{
		"name": "Force Light",
		"required": [
			"Force Harmony",
			"Life Detection",
			"Life Sense",
			"Projective Telepathy",
			"Receptive Telepathy"
		],
		"difficulty": {
			"alter": {
				"level": 2
			}
		},
		"summary": "Channels light-side energy in a 10-meter radius to harm dark-side spirits, weaken dark-side beings, or cleanse dark-side sites. The Alter result determines the strength of the effect.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Jedi to channel the Force into blasts of light that can destroy dark side spirits, as well as cleanse the taint of dark side locations. This light side energy emanates out to ten meters from the power's user, affecting all dark side characters, creatures, spirits, or sites within that area."
			},
			{
				"type": "table",
				"text": "When activated, the player rolls his <b>alter</b> score and checks his success on the following table:",
				"columns": ["Alter Roll &gt; Difficulty", "Character/Creature", "Dark Side Spirit", "Dark Side Site"],
				"rows": [
					["0-10", 2, "<b>2D+2</b>", "No Effect"],
					["11-20", 3, "<b>5D</b>", "No Effect"],
					["21-35", 4, "<b>7D+2</b>", "No Effect"],
					["36+", 5, "<b>10D</b>", "Reduce Site Power"]
				]
			},
			{
				"type": "effect",
				"text": "In the case of dark side characters and creatures, those within the effective range of the power must make a <b>control</b> or <b>willpower</b> skill roll with the difficulty listed, or they will lose a Dark Side Point. In the case of dark side spirits, the damage listed is inflicted upon them. If the target is a dark side site, its power level may be reduced."
			}
		]
	},
	{
		"name": "Inspire",
		"required": [
			"Affect Mind",
			"Battle Meditation"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"alter": {
				"level": 5,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "Fills one or more allies with confidence while the power is kept up. Affected allies gain +1D to ability and skill rolls, and the number of allies depends on the Alter roll's success level.",
		"content": [
			{
				"type": "effect",
				"text": "With successful use of this power, a Jedi can instill great confidence in one or more of his allies. This inspiration is reflected in a <b>+1D</b> bonus to all ability and skill rolls made by an affected ally, and last as long as the user desires to keep it up."
			},
			{
				"type": "table",
				"text": "The number of allies who gain the bonus is determined by the success level of the initiating <b>alter</b> roll:",
				"columns": ["Alter Roll &gt; Difficulty", "Number of Targets"],
				"rows": [
					["0-5", "1-10"],
					["6-10", "11-100"],
					["11-15", "101-1.000"],
					["16+", "1.001-10.000"]
				]
			}
		]
	},
	{
		"name": "Maximize Force",
		"difficulty": {
			"alter": {
				"level": 6
			}
		},
		"summary": "Maximizes the variable roll of another Force power instead of rolling it normally. It must be used in the same round as the affected power and can strongly disrupt balance if awarded freely.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows a Force-user to maximize the effect (usually damage) of her Force abilities. Instead of rolling for damage or other variable result, the die rolls are automatically calculated as though she had achieved the maximum effect possible. If the normal damage dice would have been <b>3D+2</b>, the result is automatically calculated as <b>20</b>. This power must be activated in the same round as the power it is attempting to maximize. Multiple action penalties apply. Force powers without random variables based on die rolls are not affected by this power."
			},
			{
				"type": "note",
				"text": "Gamemasters are highly advised to be cautious when using or awarding this power as it can disrupt game balance"
			}
		]
	},
	{
		"name": "Shadow Bomb",
		"required": "Telekinesis",
		"extra": data.extra.keptUp,
		"difficulty": {
			"alter": {
				"level": data.level.description
			}
		},
		"summary": "Lets a starfighter pilot guide an unpowered proton torpedo with the Force. The power must be kept up until impact and is especially effective against Yuuzhan Vong dovin basal defenses.",
		"content": [
			{
				"type": "effect",
				"text": "This power was developed in order to stealthily deliver non-propelled proton torpedoes to Yuuzhan Vong targets. Using the Force, a starfighter pilot can release his missiles, guiding them to the target with his thoughts alone. The difficulty of this power is the difficulty to hit the target (based on a range of 1/2/4), with the difficulty further increased based on the target's speed (<i>Second Edition Revised and Expanded</i>, page 127). The Force-user must keep this power up until the torpedo hits its target. A torpedo guided in this manner that hits a Yuuzhan Vong target ignores any protection normally afforded by its dovin basal shields."
			}
		]
	},
	{
		"name": "Split Force",
		"difficulty": {
			"alter": {
				"level": 4
			}
		},
		"summary": "Adds one extra target to another Force power used in the same round. It does not affect powers that already target multiple subjects or powers that can only target the user.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows the Jedi to add one additional target to his or her Force power during that round."
			},
			{
				"type": "example",
				"text": "He or she may select one additional object for <i>telekinesis</i>, or one additional person for <i>return another to consciousness</i>."
			},
			{
				"type": "effect",
				"text": "Powers that already target more than one person or object are not affected. Likewise, powers that only target only the user are not affected. <i>Split Force</i> must be activated in the same round as the power it is meant to split."
			}
		]
	},
	{
		"name": "Battle Meld",
		"required": [
			"Life Detection",
			"Life Sense",
			"Projective Telepathy",
			"Receptive Telepathy"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 2,
				"increased": [
					{
						"add": "+2",
						"text": "for each person to be included in the link"
					}
				],
				"modifiers": data.modifiers.relationship
			},
			"sense": {
				"level": 2,
				"modifiers": data.modifiers.proximity
			}
		},
		"summary": "Creates a telepathic link among Force-sensitive participants. The link grants a shared bonus based on the number of members, but each participant must keep resisting each round to remain in the meld.",
		"content": [
			{
				"type": "effect",
				"text": "This power may be used to include any other Force-sensitive characters in a telepathic link. A person involved in the meld can add a <b>+1</b> pip bonus to any attribute or skill rolls made for every two people that are linked together in this way. Note that only the highest modifiers for relationship and proximity are applied to this power's difficulties when it is activated. For each round the meld remains active, each participant must succeed at a Moderate <b>willpower</b> or <b>control</b> roll, or be forced out of the meld. If the Force-user who initiated the meld fails this roll, the entire link fails. The bonus granted by the battle meld applies to this <b>willpower</b> or <b>control</b> roll."
			}
		]
	},
	{
		"name": "Shield Gauntlet Defense",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3
			},
			"sense": {
				"level": 2
			}
		},
		"summary": "Enhances defense with a shield gauntlet in a way similar to Lightsaber Combat. The user adds Sense to Brawling Parry and Melee Parry, and may deflect blaster bolts with Melee Parry.",
		"content": [
			{
				"type": "effect",
				"text": "This power works in a manner similar to that of the <i>lightsaber combat</i> power, but centers on defense. If a character successfully uses this power, he adds his Sense rating to his <b>brawling parry</b> and <b>melee parry</b> skill rolls while using a Shield Gauntlet. Additionally, blaster bolts can be deflected using the <b>melee parry</b> skill, and the system is the same as the one listed for <i>lightsaber combat</i>."
			}
		]
	},
	{
		"name": "Sith Sorcery",
		"required": [
			"Enhance Attribute",
			"Feed on Dark Side",
			"Life Detection",
			"Life Sense",
			"Sense Force"
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
		"summary": "Channels the spirits of dead Sith lords to gain bonuses to attacks, resistance, damage resistance, and dark-side Force powers. The power grants a Dark Side Point and risks possession when it fades.",
		"content": [
			{
				"type": "effect",
				"text": "<i>Sith sorcery</i> is used to channel the spirits of dead Sith lords into a character's body, augmenting his own natural abilities at the risk of possession. If successful, this power grants bonuses to attacks, resistance rolls, <b>Strength</b> (to resist damage only), and any use of dark side Force powers (ie, any powers that give Dark Side Points when used). The extent of the bonus and the power's duration are determined by the amount the Jedi's <b>control</b> roll exceeds the difficulty. The duration can be increased by spending character points — for each character point spent, the duration is increased by one round. These points can be spent at any time before the power fades."
			},
			{
				"type": "table",
				"columns": ["Control Roll &gt; Difficulty", "Bonus", "Duration"],
				"rows": [
					["0-6", "<b>+2</b>", "4 Rounds"],
					["7-12", "<b>+1D</b>", "4 Rounds"],
					["13-18", "<b>+1D+1</b>", "3 Rounds"],
					["19-24", "<b>+1D+2</b>", "3 Rounds"],
					["25+", "<b>+2D</b>", "2 Rounds"]
				]
			},
			{
				"type": "effect",
				"text": "Whenever <i>Sith sorcery</i> is used, in addition to receiving a Dark Side Point, the character opens himself up to possession by Sith spirits. He must immediately succeed in a [[diff:3]] <b>willpower</b> skill check, with the difficulty increased by the amount of the bonus received."
			},
			{
				"type": "example",
				"text": "A Dark Jedi beats his <b>control</b> roll difficulty by 8 points, gaining a <b>+1D</b> bonus. When the power fades, he must make a <b>willpower</b> roll with a difficulty of [[diff:3]]<b>+1D</b>. If the skill roll succeeds, there are no complications. If it fails, however, the character is possessed by a dark side spirit."
			}
		]
	},
	{
		"name": "Sith Sword Combat",
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 3
			},
			"sense": {
				"level": 2
			}
		},
		"summary": "Enhances Sith sword use through the Force. Sense adds to Melee Parry, Control may add to sword damage, and blaster bolts can be deflected using the Lightsaber Combat rules.",
		"content": [
			{
				"type": "effect",
				"text": "This power works in a manner similar to that of the lightsaber combat power, but centers on defense. If a character successfully uses this power, he adds his <b>sense</b> rating to his <b>melee parry</b> skill rolls while using a Sith Sword, and is able to add (but not subtract) part or all of his <b>control</b> dice to the Sith Sword's damage. Additionally, blaster bolts can be deflected, and the system is the same as the one listed in <i>lightsaber combat</i>."
			}
		]
	},
	{
		"name": "Create Force Talisman",
		"required": [
			"Concentration",
			"Control Another's Pain",
			"Control Pain",
			"Force Weapon",
			"Transfer Force"
		],
		"difficulty": {
			"control": {
				"level": 3
			},
			"alter": {
				"level": 4
			}
		},
		"summary": "Imbues a personally significant item with Force energy by spending a Force Point. The talisman helps its bearer resist hostile Force powers, and a Force-user may possess only one at a time.",
		"content": [
			{
				"type": "effect",
				"text": "By using this power and spending a Force Point, a Force user can imbue an item of personal significance with Force energy, thereby creating a Force Talisman. A Force Talisman grants its possessor a bonus to resist Force powers, adding this bonus to any rolls made to resist hostile Force powers. A Force user can only possess one talisman at a time. The bonus granted by the talisman depends on the amount by which the Force user succeeds at his <b>alter</b> skill roll."
			},
			{
				"type": "table",
				"columns": ["Alter Roll &gt; Difficulty", "Resistance Bonus"],
				"rows": [
					["0-8", "<b>+2</b>"],
					["9-16", "<b>+1D</b>"],
					["17+", "<b>+1D+1</b>"]
				]
			}
		]
	},
	{
		"name": "Drain Energy",
		"required": "Absorb/Dissipate Energy",
		"grantsDarkSidePointOnUse": true,
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
						"text": "for simple devices such as datapads, holorecorders, or droid callers"
					},
					{
						"level": 2,
						"text": "for power packs such as blasters"
					},
					{
						"level": 3,
						"text": "for energy cells such as lightsabers, force pikes, or vibro weapons"
					},
					{
						"level": 4,
						"text": "for portable generators such as E-Web repeating blasters or droids"
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "if the target is a non-sentient piece of equipment"
					},
					{
						"level": "Droid's Strength roll",
						"text": "if the target is a droid"
					}
				]
			}
		},
		"summary": "Drains power packs, energy cells, and similar small power sources within sight. It can disable equipment until recharged or replaced and grants a Dark Side Point because it uses dark-side energy.",
		"content": [
			{
				"type": "effect",
				"text": "Use of this power allows a Jedi to drain the energy from power packs, energy cells, and similar power sources. This can render powered and electric equipment useless until the power source is replaced or recharged. Power generators larger than a portable generator, such as a fusion generator (used in power droids, vehicles, and ships) are too large to be drained by this ability. Using this power takes a full round. It can affect a single target within the character's line of sight up to 10 meters away. Due to the fact that this power uses dark side energy to siphon power, it grants the user a Dark Side Point."
			}
		]
	},
	{
		"name": "Enhance Another's Attribute",
		"required": [
			"Enhance Attribute",
			"Control Pain",
			"Control Another's Pain",
			"Transfer Force"
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
		"summary": "Temporarily increases one attribute and all related skills for another being. The bonus and duration depend on the Alter roll margin, and only one enhanced attribute can be maintained at a time.",
		"content": [
			{
				"type": "effect",
				"text": "A Jedi can use this power to enhance a single attribute for one being for a limited amount of time. All skills covered by the attribute are increased by the same amount for as long as the power remains in effect. An attribute increased by this power remains enhanced for the duration listed below. Both duration and attribute increase are determined by the amount the Jedi's Alter roll exceeds the difficulty. Duration can be increased by spending character points — for each character point spent, the duration increases by one combat round. These points can be spent at any time before the power fades. A Jedi can only increase one attribute at a time. If a character attempts to enhance a second attribute, the first enhancement fades and the second is increased."
			},
			{
				"type": "table",
				"columns": ["Alter Roll &gt; Difficulty", "Attribute Increase", "Duration"],
				"rows": [
					["0-13", "<b>+1D</b>", "3 Rounds"],
					["14-25", "<b>+2D</b>", "2 Rounds"],
					["26+", "<b>+3D</b>", "1 Rounds"]
				]
			}
		]
	},
	{
		"name": "Force Weapon",
		"required": "Concentration",
		"difficulty": {
			"control": {
				"level": {
					"level": "Variable",
					"text": "Equal to the melee weapon's base difficulty (ie, a knife is Very Easy)"
				}
			},
			"alter": {
				"level": 3
			}
		},
		"summary": "Imbues the user's personal non-powered melee weapon with the Force for five rounds. The Alter roll determines extra damage, and harming a helpless being with the weapon grants a Dark Side Point.",
		"content": [
			{
				"type": "warning",
				"text": "A character who uses this power to injure or kill a helpless being immediately gains a Dark Side Point"
			},
			{
				"type": "effect",
				"text": "A Force user with this power can temporarily imbue a non-powered melee weapon (such as a club, knife, staff, etc.) with the Force. This power can only be used on the Force user's personal weapon, and only while he uses the weapon himself. The power lasts for five rounds, after which time it must be activated again. The amount by which the <b>alter</b> skill roll exceeds the difficulty determines how much extra damage the weapon inflicts on a successful hit. Note that this damage will allow a weapon to exceed its listed maximum damage (if any)."
			},
			{
				"type": "table",
				"columns": ["Alter Roll &gt; Difficulty", "Damage Increase"],
				"rows": [
					["0-8", "<b>+1</b>"],
					["9-16", "<b>+2</b>"],
					["17-24", "<b>+1D</b>"],
					["25+", "<b>+1D+1</b>"]
				]
			}
		]
	},
	{
		"name": "Hatred",
		"required": [
			"Control Pain",
			"Inflict Pain",
			"Injure/Kill",
			"Life Detection",
			"Life Sense",
			"Hibernation Trance",
			"Rage",
			"Waves of Darkness"
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
		"summary": "Voluntarily releases the user's hatred as a burst of Force energy. It damages targets within 10 meters, penalizes their rolls, and can be extended with Character Points.",
		"content": [
			{
				"type": "effect",
				"text": "This power is similar to <i>Force scream</i>, but is used voluntarily. The character using this power releases his hatred into a blast of Force energy. Successful use of this power deals <b>3D</b> damage to all targets within ten meters of the character, and gives each one a <b>-1D</b> penalty to all rolls for the remainder of the round. The effects of this power last a single round, though the duration can be increased by spending character points — for each character point spent, the duration is increased by one round. These points can be spent at any time before the power fades."
			}
		]
	},
	{
		"name": "Morichro",
		"required": [
			"Accelerate Another's Healing",
			"Control Another's Pain",
			"Control Pain",
			"Hibernation Trance",
			"Injure/Kill",
			"Life Detection",
			"Life Sense",
			"Place Another in Hibernation Trance"
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
		"summary": "An offensive variation of Place Another in Hibernation Trance that can render a target helpless at range. A disastrous resistance roll can kill the target, granting the user a Dark Side Point.",
		"content": [
			{
				"type": "warning",
				"text": "If the target dies for any reason while under this power, the Force-user who initiated it gains a Dark Side Point"
			},
			{
				"type": "effect",
				"text": "This power is an offensive variation of <i>place another in hibernation trance</i>. It allows a Force-user to put someone into a trance-like state. If the target fails his <b>Perception</b> or <b>control</b> roll to resist this power, in addition to rolling a \"1\" on the Wild Die, the target immediately dies and the user of the power gains one Dark Side Point. The target can spent a Force Point in order to escape immediate death. When used against a living being, <i>morichro</i> has a maximum range of 10 meters. The effects are otherwise identical to the <i>place another in hibernation trance</i> power."
			}
		]
	},
	{
		"name": "Plant Surge",
		"required": [
			"Concentration",
			"Telekinesis"
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2,
						"text": "for a 2-meter radius"
					},
					{
						"level": 3,
						"text": "for a 4-meter radius"
					},
					{
						"level": 4,
						"text": "for a 6-meter radius"
					},
					{
						"level": 5,
						"text": "for an 8-meter radius"
					}
				]
			},
			"alter": {
				"level": data.level.brawlingParry
			}
		},
		"summary": "Animates nearby plants to entangle targets in the chosen area. Entangled creatures suffer attack, Dexterity, and movement penalties until they break free with Strength.",
		"content": [
			{
				"type": "effect",
				"text": [
					"When used, this power causes plants (grasses, weeds, bushes, trees, etc.) to entangle target creatures, holding them fast or slowing them down. The <b>control</b> difficulty depends on the area that the Force user wishes to affect:",
					"The <b>alter</b> difficulty is the <b>control</b> or <b>brawling</b> <i>parry</i> roll(s) of the target(s). If the Force-user succeeds in his use of the power, the targets are considered to be entangled. Entangled creatures suffer a <b>-1D</b> penalty to all attack rolls, a <b>-2D</b> penalty to their <b>Dexterity</b> scores, and can only move at half of their normal Movement scores. Entangled characters can attempt to escape, but this requires a Difficult <b>Strength</b> check to accomplish."
				]
			}
		]
	},
	{
		"name": "Friendship",
		"difficulty": {
			"sense": {
				"level": data.level.perception
			},
			"alter": {
				"level": [
					{
						"level": 1,
						"text": "against a person or animal with no reason to mistrust you, or who wants something from you"
					},
					{
						"level": 2,
						"text": "against a neutral or indifferent person or animal"
					},
					{
						"level": 3,
						"text": "against a wild animal or a person with a societal reason to dislike you"
					},
					{
						"level": 4,
						"text": "against a hungry predator or a person with a personal reason to dislike or hate you"
					},
					{
						"level": 5,
						"text": "against a sworn enemy or a starving, angry, or wounded animal"
					}
				]
			}
		},
		"summary": "Calms a hostile person or animal long enough to make discussion or parley possible. It does not erase past events, but it can grant bonuses to social rolls against the target.",
		"content": [
			{
				"type": "effect",
				"text": "Proper application of this power can calm a hostile person or animal. Use of <i>friendship</i> employs calming emotions that can cause enemies to re-think their motives, or open them up to discussion and parley. <i>Friendship</i> does not make them forget past events (such as when you tried to kill them), but it might give you a chance to bring about a peaceful solution to a disagreement. The target of <i>friendship</i> will remain calm until a situation occurs that alters that state. A bonus granted to all <b>bargain</b>, <b>command</b>, <b>con</b>, or <b>persuasion</b> rolls made against the target following the use of <i>friendship</i> is based on the amount by which the <b>sense</b> roll exceeds the target's <b>control</b> or <b>Perception</b> roll."
			},
			{
				"type": "table",
				"columns": ["Sense Roll &gt; Difficulty", "Skill Bonus"],
				"rows": [
					["0-5", "<b>+2</b>"],
					["6-10", "<b>+1D</b>"],
					["11-15", "<b>+1D+1</b>"],
					["16-20", "<b>+1D+2</b>"],
					["21+", "<b>+2D</b>"]
				]
			}
		]
	},
	{
		"name": "Malacia",
		"required": [
			"Enhance Another's Attribute",
			"Enhance Attribute",
			"Control Pain",
			"Control Another's Pain",
			"Transfer Force"
		],
		"difficulty": {
			"sense": {
				"level": 3
			},
			"alter": {
				"level": data.level.strengthControl
			}
		},
		"summary": "Overwhelms a visible target with dizziness and nausea. Affected targets are stunned for 2D rounds and cannot take actions during that time.",
		"content": [
			{
				"type": "effect",
				"text": "This power causes extreme dizziness and nausea in a single target within the user's line of sight. A target affected by this power is considered to be stunned for <b>2D</b> rounds, and cannot take any actions during that time."
			}
		]
	},
	{
		"name": "Alchemy",
		"required": [
			"Accelerate Another's Healing",
			"Control Another's Pain",
			"Control Pain",
			"Enhance Attribute",
			"Enhance Another's Attribute",
			"Feed on Dark Side",
			"Hibernation Trance",
			"Injure/Kill",
			"Life Detection",
			"Life Sense",
			"Place Another in Hibernation Trance",
			"Sense Force",
			"Sith Sorcery",
			"Transfer Force"
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
					"description": "Variable, depending on the alteration.",
					"tables": [
						{
							"columns": ["Alteration", "Difficulty"],
							"rows": [
								["Add Claws or Fangs (strength +2 damage)", 4],
								["Add Horns (strength +1D damage)", 4],
								["Add Natural Armor (+1D versus energy)*", 6],
								["Add Natural Armor (+1D versus physical)*", 5],
								["Alter Physical Appearance (+1D to Intimidation)*", 3],
								["Grant Darkvision (20')", 5],
								["Increase Attribute (+1)", 6],
								["Increase/Decrease Size By Half*", 6],
								["Increase Move Score +2 (up to twice original score)", 5],
								["Make Target Obedient (-1D to Willpower)", 5]
							],
							"subnote": "* Each additional use of this alteration on the same target increases the alter difficulty by 5 points and grants an additional Dark Side point."
						}
					]
				}
			}
		},
		"summary": "Uses ancient Sith equipment and formulae to mutate living beings or reshape inanimate matter. Each living alteration requires time, costly materials, causes damage, and grants additional Dark Side Points.",
		"content": [
			{
				"type": "effect",
				"text": "Using ancient Sith equipment and arcane formulae, a character with this Force power can alter the molecular composition of living beings, creating dark side mutants. All changes made to a being with this power create horrific physical mutations. Altering multiple aspects requires multiple rolls, with each roll taking one minute and granting an additional Dark Side Point. To use this power successfully requires thousands of credits worth of alchemical equipment and raw materials (as well as a subject). Each alteration made inflicts <b>4D</b> damage against the subject. This power can also be used to reshape inanimate matter."
			}
		]
	},
	{
		"name": "Illusion",
		"required": [
			"Affect Mind",
			"Dim Another's Senses",
			"Life Detection",
			"Life Sense",
			"Projective Telepathy",
			"Receptive Telepathy",
			"Sense Force"
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
		"summary": "Creates realistic images that observers can perceive as real but that cannot cause physical harm. The illusion can operate up to 10,000 meters away, but maintaining it requires complete concentration.",
		"content": [
			{
				"type": "effect",
				"text": "Characters with the power of Illusion can manifest images that seem completely real to those who perceive them. These illusions cannot cause physical harm, though they might cause others to make mistakes if they do not realize their true nature. Maximum range for an illusion is 10,000 meters from the user. Maintaining an illusion takes complete concentration."
			}
		]
	},
	{
		"name": "Sever Force",
		"required": [
			"Affect Mind",
			"Battle Meditation",
			"Concentration",
			"Hibernation Trance",
			"Emptiness",
			"Force Harmony",
			"Force of Will",
			"Life Detection",
			"Life Sense",
			"Projective Telepathy",
			"Receptive Telepathy",
			"Sense Force",
			"Sense Force Potential"
		],
		"difficulty": {
			"control": {
				"level": 4
			},
			"sense": {
				"level": [
					{
						"level": 3,
						"text": "if the target has seven or more Dark Side Points"
					},
					{
						"level": 4,
						"text": "if the target has four or more Dark Side Points"
					}
				]
			},
			"alter": {
				"level": data.level.willpowerControl
			}
		},
		"summary": "Severs a dark sider's connection to the Force by forcing them to roll before using Force powers. It costs the user a Force Point and lasts until the target reduces their Dark Side Point total enough.",
		"content": [
			{
				"type": "note",
				"text": "This power seems to be extremely unbalancing, as written in the d20 rules. The author has made an attempt to adapt it, while maintaining the flavor of the power. Individual gamemasters may not wish to allow players access to this power, for obvious reasons."
			},
			{
				"type": "special",
				"text": "Anyone using this power must spend one Force Point"
			},
			{
				"type": "effect",
				"text": "This power severs a dark sider's ties to the Force, preventing him from using any Force skills. It is not effective against a character who has less than four Dark Side Points, and anyone with more than three Dark Side points cannot use this power at all. The effects of Sever Force are permanent, and the only way for a target to reverse the effects are to reduce the number of Dark Side Points he has below four. The power's <b>sense</b> difficulty depends on the number of Dark Side Points possessed by the target. The <b>sense</b> difficulty is Difficult if the target has four or more Dark Side points, and is Moderate if the target has seven or more Dark Side Points. The amount by which the character using <i>sever force</i> makes his <b>alter</b> skill roll determines how effective this power is at severing his target's connection to the Force. If successful, the target of this power must roll a <b>control</b> check each time he attempts to use a Force power. The base difficulty of this roll is detailed on the following chart:"
			},
			{
				"type": "table",
				"columns": ["Alter Roll &ge; Difficulty", "Force Use Difficulty"],
				"rows": [
					["0-10", 3],
					["11-20", 4],
					["21-35", 5],
					["36-50", 6],
					["51+", { "level": 6, "increase": "+5" }]
				]
			},
			{
				"type": "effect",
				"text": "The base difficulty for the target to use Force powers is further modified by the number of Dark Side Points he possesses. If the target reduces his Dark Side Point total below three, he no longer needs to make this roll."
			}
		]
	},
	{
		"name": "Control Temperature",
		"fanMade": true,
		"required": [
			"Hibernation Trance",
			"Absorb/Dissipate Energy"
		],
		"extra": data.extra.keptUp,
		"difficulty": {
			"control": {
				"level": 2
			}
		},
		"summary": "Controls the user's body or skin temperature through the Force. It can aid survival in harsh heat or cold, or help avoid heat-based sensors and creatures that detect body heat.",
		"content": [
			{
				"type": "effect",
				"text": [
					"When successfully activated, this power allows the Jedi a stricter control over her body temperature. By speeding or slowing her metabolism she is able to change her core temperature, thereby allowing her to be more resilient to environmental changes. Whether these changes are due to malfunctioning life support systems, or harsh wilderness temperatures, the Force user can withstand greater heat and cold than most beings.",
					"Furthermore, the Jedi can also choose to control her surface body temperature to hide herself from heat-based sensors or hide from species that use heat detection as a primary sense.",
					"In game terms <i>control temperature</i> allows the Jedi to add bonus dice to her <b>survival</b> or <b>stamina</b> skill rolls to live in much harsher environments than she would normally be able to. Alternatively, the Jedi may choose to control their skin temperature to add to their <b>sneak</b> skill roll to avoid being detected by heat sensors. In either usage, the amount of bonus dice depends on the Jedi's skill roll. Using the power for both purposes in the same round requires an additional action with a <b>+5</b> to the difficulty for each roll."
				]
			},
			{
				"type": "table",
				"columns": ["Roll beats difficulty", "Survival/stamina or Sneak skill bonus"],
				"rows": [
					["0-5", "<b>+3D</b>"],
					["6-14", "<b>+4D</b>"],
					["15-21", "<b>+5D</b>"],
					["21+", "<b>+6D</b>"]
				]
			}
		]
	},
	{
		"name": "Aquatic Force",
		"fanMade": true,
		"required": "Telekinesis",
		"difficulty": {
			"alter": {
				"level": [
					{
						"level": 2,
						"text": "for a 1-2 meter bubble in diameter, character scale"
					},
					{
						"level": 3,
						"text": "for a 3-5 meter bubble in diameter, character scale"
					},
					{
						"level": 4,
						"text": "for a 6-9 meter bubble in diameter, speeder scale"
					},
					{
						"level": 5,
						"text": "for a 10-14 meter bubble in diameter, speeder scale"
					},
					{
						"level": 6,
						"text": "for a 15-20 meter bubble in diameter, walker scale"
					}
				]
			}
		},
		"summary": "Creates an underwater sphere of surface tension that can clear debris or be hurled in a straight line. It must be used underwater, deals damage based on size, and harming living beings grants a Dark Side Point.",
		"content": [
			{
				"type": "warning",
				"text": "If a character uses this power to harm a living being, he or she gains an immediate Dark Side Point"
			},
			{
				"type": "effect",
				"text": [
					"This power was originally developed by Kit Fisto during the Old Republic. The original intent of the power was to clear out sub aquatic passages and submerged lava tubes. Kit Fisto was able to summon the power of the Force to create a great a sphere of surface tension that he could hurl in a direct line. The useful effect was that it cleared away all debris and loose material so the passage could be utilized for other purposes.",
					"There have been reports that Kit Fisto may have used this power against droid soldiers and vehicles during the Clone Wars. However, these rumors have yet to be solidly confirmed.",
					"In game terms, a Jedi using this power must be underwater to use this power. Using the power of the Force he creates surface tension that is under his limited control. He may hurl the sphere in the direction that he chooses. If the Jedi wishes to throw the <i>aquatic force</i> at a particular object, the gamemaster chooses the <b>Strength</b> of the structure or debris (the default strength of an object is <b>2D</b> unless otherwise declared). The <i>aquatic force</i> does <b>4D</b> damage, though the scale varies depending on the size of the <i>aquatic Force.</i>"
				]
			}
		]
	},
	{
		"name": "Disable Droid",
		"fanMade": true,
		"required": [
			"Absorb/Dissipate Energy",
			"Sense Force",
			"Telekinesis"
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
		"summary": "Focuses Force energy inside a visible droid or electronic device to short it out. A success disables the target temporarily, while a strong Alter roll can overload it and cause damage that ignores armor.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows the Jedi to harness energy through the Force, causing it to focus on a single droid. The energy surges within the target causing it to short out, and possibly overload. Because the Jedi causes the energy to well up inside the droid, <i>disable droid</i> ignores all armor bonuses, and the droid must roll its <b>Strength</b> attribute alone. If the Jedi succeeds in activating the power, the droid is disabled, and considered out of commission for <b>2D</b> rounds. If the <b>alter</b> roll succeeds by 10 or more, <i>disable droid</i> will overload the droid's circuitry, and the droid takes <b>4D</b> damage (no armor bonus to resist). This power does not affect organic life forms. This power may also be used to disable other electronics, such as weapons, comlinks, and even individual computer terminals. (This power cannot be used to disrupt entire computer networks, or large and very complicated devices such as a capital scale hyperdrive or shield generator.) The targeted device must be operational for this power to work, i.e. you can't affect a droid or datapad that's shut off or a blaster that's not being fired. Unless otherwise stated, these devices have a <b>Strength</b> of <b>2D</b>. Targeting small electronics with this power, such as a comlink or hand weapon, adds <b>+5</b> to the <b>alter</b> difficulty. Targeting devices that operate on short bursts, such as blasters, adds <b>+15</b> to the <b>alter</b> difficulty. If a Force sensitive character is holding the piece of equipment the Jedi is attempting to disable, the opponent may add his <b>control</b> dice to the <b>alter</b> difficulty."
			}
		]
	},
	{
		"name": "Mind Numbing",
		"fanMade": true,
		"required": [
			"Accelerate Another's Healing",
			"Control Another's Pain",
			"Life Detection",
			"Life Sense",
			"Return Another to Consciousness"
		],
		"difficulty": {
			"control": {
				"level": 3
			},
			"alter": {
				"level": data.level.perception
			}
		},
		"summary": "Calms and numbs the thoughts of a touched target without controlling them. Greater Alter success can make the target sluggish, dazed, lethargic, or unconscious.",
		"content": [
			{
				"type": "effect",
				"text": [
					"The Jedi must be touching the target to use this power. In combat, this means making a successful <b>brawling</b> roll in the same round that the power is to be used.",
					"If the power is successfully activated, the target's thought processes are numbed, making him calm and relaxed. He is not, however, under any sort of mind control and will eventually build up his anxieties or anger again if he sees reason for it and the Jedi cannot keep him calm. In addition to this effect, additional success in the <b>alter</b> roll further numbs the target's mind, making him sluggish and possibly knocking him out. Before rolling, the Jedi may choose to use less than his full <b>alter</b> score if he fears \"overdoing\" the power."
				]
			},
			{
				"type": "table",
				"columns": ["Alter Roll &ge; Difficulty", "Effect"],
				"rows": [
					["1-4", "Target feels relaxed and calm"],
					["5-8", "Target is dizzy (<b>-1D</b> for all actions) for 1D rounds"],
					["9-12", "Target is dazed (<b>-2D</b> for all actions) for 2D rounds"],
					["13-16", "Target is lethargic (<b>-3D</b> for all actions) for 1D minutes"],
					["17+", "Target falls unconscious for 2D minutes"]
				]
			}
		]
	},
	{
		"name": "Force Blinding",
		"fanMade": true,
		"required": "Dim Another's Senses",
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
		"summary": "Temporarily blinds a target by overwhelming their vision with brilliant light. Vision-based skills drop to 1D for three rounds unless countered by Sense Surroundings or similar abilities.",
		"content": [
			{
				"type": "effect",
				"text": "This power allows the Jedi to temporarily blind a target. Using the Force, the Jedi overloads the target's vision, causing them to see little but a brilliant blinding light. All of the target's skills that require vision are reduced to <b>1D</b> for three rounds. The effects of <i>Force blinding</i> can be counteracted by <i>sense surroundings</i>, or a <i>blindfighting</i> special ability or skill."
			}
		]
	},
	{
		"name": "Force Breach",
		"fanMade": true,
		"required": [
			"Affect Mind",
			"Dim Another's Senses",
			"Sense Force"
		],
		"difficulty": {
			"sense": {
				"level": 2
			},
			"alter": {
				"level": data.level.control
			}
		},
		"summary": "Drops the Force powers a single target is currently maintaining. It does not stop instantaneous powers or prevent the target from reactivating powers on the following round.",
		"content": [
			{
				"type": "effect",
				"text": "If this power is successfully activated, it allows the Jedi to select a single opponent and bring down any Force powers the target currently has up. The target may attempt to activate their Force powers the following round with no penalties. This power does not affect Force powers such as <i>Force lightning</i>, or <i>bolt of hatred</i> that have a single, instantaneous effect."
			},
			{
				"type": "example",
				"text": "Ambelled Daru finds himself in combat with the Sith Lord, Darth Arius. Darth Arius is currently keeping <i>lightsaber combat</i> and <i>control pain</i> up. Ambelled rolls his <b>sense</b> dice and gets a 12, easily making the difficulty. Ambelled makes his <b>alter</b> roll and receives an 18. Darth Arius now makes his <b>control</b> roll, and receives an 11. Darth Arius now drops his <i>lightsaber combat</i> and <i>control pain</i>. Though he may attempt to activate them again next round."
			}
		]
	},
	{
		"name": "Drain Life",
		"fanMade": true,
		"required": [
			"Drain Life Essence",
			"Control Pain",
			"Hibernation Trance",
			"Life Detection",
			"Life Sense",
			"Magnify Senses",
			"Receptive Telepathy",
			"Sense Force",
			"Telekinesis",
			"Farseeing",
			"Projective Telepathy",
			"Control Another's Pain",
			"Transfer Force",
			"Affect Mind",
			"Control Mind",
			"Dim Another's Senses",
			"Accelerate Healing",
			"Accelerate Another's Healing",
			"Injure/Kill"
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
		"summary": "Lets a wounded dark-side user drain life from a touched victim to recover wound levels. The user must be at least wounded, make contact, overcome resistance, and inflict damage to heal.",
		"content": [
			{
				"type": "effect",
				"text": "When the Force user has suffered a wound, the Dark Side offers a swift way to preserve her life at the expense of another. The Force user draws the life force from a victim to have a surge of power to aid her own body. In game terms, a character that has a <i>wounded</i> status or worse may attempt to use this power to move up one or more wound levels. First, if in combat, the Force user must make a successful <b>brawling</b> roll to make contact. Next, the Force user must make a <b>control</b> roll against the target's <b>Perception</b> or <b>control</b> roll. If the roll succeeds, the Force user rolls her <b>alter</b> skill as damage. If the Force user inflicts a <i>wound</i> then she may recover one <i>wound</i> status; if she manages to inflict damage of <i>incapacitated</i> then she may recover two <i>wound</i> status levels, and so on. The character may not draw life away from the target unless the character is at least <i>wounded</i>. While using this power, the character must be in physical contact with the target."
			}
		]
	}
];
