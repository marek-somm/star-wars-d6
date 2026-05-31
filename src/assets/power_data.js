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
		}
	},
	"extra": {
		"inSight": "Target must be in sight of the Jedi",
		"keptUp": "Power can be kept up",
		"ignorePain": "Character can ignore pain of injuries for a long period of time",
		"newRollWhenInjured": "Whenever character is injured again, must make a new Control pain roll",
		"notUsableWhenDarkside": "Characters who are consumed by the dark side of the Force may not use this power."
	},
	"time": {
		"3": "Three rounds [3R]",
		"default": "One round [1R]",
		"minute": "One minute [12R]",
		"minute_plus": "At least one minute [12R]"
	}
};

export const forcePowerData = data;

export const rawPowerItems = [
	{
		"type": "label",
		"name": "Combat"
	},
	{
		"name": "Lightsaber Combat",
		"extra": [
			data.extra.keptUp
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3
					}
				]
			},
			"sense": {
				"level": [
					{
						"level": 2
					}
				]
			}
		},
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
		"name": "Kinetic Combat",
		"required": [
			"Telekinesis"
		],
		"difficulty": {
			"alter": {
				"level": [
					{
						"level": 4
					}
				]
			}
		},
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
		"name": "Force Push",
		"required": [
			"Concentration",
			"Life Detection",
			"Telekinesis"
		],
		"extra": [
			data.extra.inSight
		],
		"difficulty": {
			"alter": {
				"level": [],
				"increased": [
					{
						"add": "+3",
						"text": "for every 5 meters away from target"
					}
				],
				"special": [
					{
						"text": "Target's <b>control</b> or <b>Strength</b> roll, line of sight only"
					}
				]
			}
		},
		"content": [
			{
				"type": "effect",
				"text": [
					"With this power, a Jedi may use the Force to push several adjacent targets backwards, knocking them prone or banging them against a wall. Each target past the first incurs a <b>-1D</b> penalty on the Jedi using the power (i.e, 1 target, no penalty; 2 targets, <b>-1D</b> penalty; 3 targets, <b>-2D</b> penalty; 4 targets, <b>-3D</b> penalty...).",
					"Each target makes either a <b>control</b> or <b>Strength</b> roll to resist, and the acting Jedi's <b>alter</b> roll result is compared to each result in turn to determine the effects. A target that is knocked back into a wall or other solid object takes the listed damage.",
					"If a Jedi kills a living being as a result of this power he immediately receives a Dark Side Point; as such, he may roll less than his full <b>alter</b> score if he so chooses.",
					`<table>
						<tr>
							<th><b>Alter Roll &lt; Difficulty By</b></th>
							<th><b>Target pushed back/Collision damage</b></th>
						</tr>
						<tr>
							<td>0-5</td>
							<td>2 meters / 2D</td>
						</tr>
						<tr>
							<td>6-10</td>
							<td>3 meters / 3D</td>
						</tr>
						<tr>
							<td>11-15</td>
							<td>5 meters / 4D</td>
						</tr>
						<tr>
							<td>16-20</td>
							<td>10 meters / 5D</td>
						</tr>
						<tr>
							<td>21+</td>
							<td>15 meters / 6D</td>
						</tr>
					</table>`
				]
			}
		]
	},
	{
		"name": "Absorb/Dissipate Energy",
		"extra": [
			"The power may be kept up as long as the source of energy is constant — for blaster bolts or Force lightning, it is used as a reaction skill, multiple action penalties apply for use to block fire (as though it were a dodge skill)."
		],
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
						"text": "for solar wind and other modest energy sources (blaster bolts and Force lightening)"
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
					<li>Point blank to 1 meters: -4D energy damage</li>
					<li>2 meters: -3D energy damage</li>
					<li>3 meters: -2D energy damage</li>
					<li>4 meters: -1D energy damage</li>
				</ul>`
					}
				]
			}
		},
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
		"name": "Lesser Force Shield",
		"required": [
			"Absorb/Dissipate Energy",
			"Concentration",
			"Magnify Senses",
			"Telekinesis"
		],
		"extra": [
			data.extra.keptUp
		],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 2
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 3
					}
				]
			}
		},
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
		"type": "label",
		"name": "Utils"
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
				"modifiers": [
					data.modifiers.proximity
				]
			}
		},
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
						"text": "for hand binder"
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
		"content": [
			{
				"type": "effect",
				"text": [
					"The character may escape bonds by contorting in painful and difficult (but still physically possible) ways. By stretching, twisting, and dislocating joints a Jedi can escape almost any physical restraining device. While this is indeed a painful procedure, Jedi are trained to block out the pain and focus on the task at hand."
				]
			}
		]
	},
	{
		"type": "label",
		"name": "Buffs"
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
		"name": "Enhance Attribute",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3
					}
				]
			}
		},
		"content": [
			{
				"type": "effect",
				"text": [
					"A Jedi uses this power to increase a single attribute for a limited period. An increased attribute can help a Jedi jump higher, see better, and run faster. All skills governed by the enhanced attribute increase by the same amount for as long as the power remains in effect.",
					"An attribute increased by this power remains enhanced for the duration listed below. Duration and attribute increase are determined by how much a character's <b>control</b> skill roll exceeds the difficulty number. Duration can be extended through use of Character Points — for each Character Point a Jedi spends, the duration is increased by one combat round. The points can be spent at any time before the power fades.",
					"A Jedi can only increase one attribute at a time. If a character invokes the power to enhance a second attribute while the first attribute is still enhanced, then the first enhancement fades and the second attribute receives the increase.",
					`<table>
						<tr>
							<th><b>Skill Roll &ge; Difficulty By</b></th>
							<th><b>Attribute Increase</b></th>
							<th><b>Duration</b></th>
						</tr>
						<tr>
							<td>0-13</td>
							<td>+<b>1D</b></td>
							<td>3R</td>
						</tr>
						<tr>
							<td>14-25</td>
							<td>+<b>2D</b></td>
							<td>2R</td>
						</tr>
						<tr>
							<td>26+</td>
							<td>+<b>3D</b></td>
							<td>1R</td>
						</tr>
					</table>`
				]
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
				"level": [
					{
						"level": 2
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 2
					}
				]
			}
		},
		"content": [
			{
				"type": "effect",
				"text": [
					"A Jedi uses this power to increase his jumping ability in order to perform impossibly high leaps. If both Force skill rolls are successful, the character uses his normal <i>climbing/jumping</i> skill to perform the jump, but he uses the special table below to determine difficulties. If the <b>control</b> roll exceeds the difficulty, the character gains an immediate bonus to his <b>climbing/jumping</b> roll.",
					`<table>
						<tr>
							<th><b>Control Roll &ge; Difficulty by</b></th>
							<th><b>Jumping Increase</b></th>
						</tr>
						<tr>
							<td>1-3</td>
							<td>+<b>1D</b></td>
						</tr>
						<tr>
							<td>4-8</td>
							<td>+<b>2D</b></td>
						</tr>
						<tr>
							<td>9-15</td>
							<td>+<b>3D</b></td>
						</tr>
						<tr>
							<td>16-25</td>
							<td>+<b>4D</b></td>
						</tr>
						<tr>
							<td>26-37</td>
							<td>+<b>5D</b></td>
						</tr>
						<tr>
							<td>38+</td>
							<td>+<b>6D</b></td>
						</tr>
					</table>`,
					"If the Jedi fails any Force skill roll, the power is not activated and the character is left to use his normal jumping ability (and there are certain situations where you can't back out of a jump because your power failed). At the gamemaster's discretion, a failed <b>climbing/jumping</b> roll might mean the Jedi fails to achieve the desired height/distance, fails to properly cushion his landing and suffers normal falling damage, or both.",
					"Multiple action penalties apply. The <b>climbing/jumping</b> roll is a third action in that round, whether the power is successful or not.",
					`<table>
						<tr>
							<th><b>Height Jumped</b></th>
							<th><b>Jumping Difficulty</b></th>
						</tr>
						<tr>
							<td>0-1 meter</td>
							<td>Very Easy</td>
						</tr>
						<tr>
							<td>1-2 meters</td>
							<td>Easy</td>
						</tr>
						<tr>
							<td>3-4 meters</td>
							<td>Moderate</td>
						</tr>
						<tr>
							<td>5-8 meters</td>
							<td>Difficult</td>
						</tr>
						<tr>
							<td>9-15 meters</td>
							<td>Very Difficult</td>
						</tr>
						<tr>
							<td>16-20 meters</td>
							<td>Heroic</td>
						</tr>
					</table>`,
					"Add <b>+5</b> to the difficulty for every additional 5 meters. If the character is simply jumping downwards, with no upwards movement, reduce jumping difficulty by one level. Add <b>+1</b> to the difficulty per meter of horizontal distance jumped."
				]
			},
			{
				"type": "example",
				"text": [
					"Daru has a <i>control</i> skill of <b>5D</b>, alter of <b>3D+2</b>, and a <i>climbing/jumping</i> skill of <b>4D</b>, and wants to perform a <i>Force jump</i> across a chasm to a ledge above. He rolls <b>1D+2</b> for <b>alter</b> (<b>3D+2</b> subtracting <b>-2D</b> for multiple action penalties), and gets a 7, making his <b>alter</b> difficulty. Next he rolls his <b>control</b> of <b>3D</b>, and gets a 11 (which exceeds the difficulty by 4). This adds <b>+2D</b> to his <b>climbing/jumping</b> roll, canceling out the multiple action penalty.",
					"The ledge on which he wants to jump is 4 meters up and the chasm is 3 meters across, thus the difficulty is Moderate <b>+3</b>. Daru rolls his <b>4D</b> climbing/ jumping (<b>4D</b>-<b>2D</b>+<b>2D</b>), and gets a 16, making the difficulty and using the Force to leap safely on top of the ledge."
				]
			}
		]
	},
	{
		"name": "Emptiness",
		"required": [
			"Hibernation Trance"
		],
		"extra": [
			data.extra.notUsableWhenDarkside
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3
					}
				]
			}
		},
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
		"name": "Burst of Speed",
		"required": [
			"Enhance Attribute"
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3
					}
				]
			}
		},
		"content": [
			{
				"type": "effect",
				"text": [
					"A Jedi can use this power to enhance his Move rating, increasing his running and walking speeds dramatically for a short period of time. Both the duration and Move increase are determined by the amount the Jedi's <b>control</b> roll exceeds the difficulty. The duration can be increased by spending character points — for each character point spent, the duration is increased by one round. These points can be spent at any time before the power fades.",
					`<table>
						<tr>
							<th><b>Control Roll &ge; Difficulty By</b></th>
							<th><b>Move Increase</b></th>
							<th><b>Duration</b></th>
						</tr>
						<tr>
							<td>0-8</td>
							<td>+5</td>
							<td>4R</td>
						</tr>
						<tr>
							<td>9-20</td>
							<td>+10</td>
							<td>3R</td>
						</tr>
						<tr>
							<td>21+</td>
							<td>+15</td>
							<td>2R</td>
						</tr>
					</table>`
				]
			}
		]
	},
	{
		"type": "label",
		"name": "Self-Control"
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
		"content": [
			{
				"type": "effect",
				"text": [
					"A wounded Jedi who <i>controls pain</i> can act as if she has not been wounded, starting with the round after the power roll has been made. The wound is not healed, but the character doesn't suffer the penalties of being wounded: a <i>wounded</i> Jedi doesn't suffer any die code penalties; an <i>incapacitated</i> character can still act normally, as can a <i>mortally wounded</i> character. This power can also be used to shrug off any stun results.",
					"However, the character is still injured, and thus is prone to getting worse, even if the Jedi doesn't feel the pain. For example, a character who's been <i>wounded twice</i> and is wounded again would still become <i>incapacitated</i>. <i>Mortally wounded</i> Jedi may still die from injuries, even if they don't feel any pain."
				]
			}
		]
	},
	{
		"name": "Remain Conscious",
		"required": [
			"Control Pain"
		],
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
		"name": "Hibernation Trance",
		"extra": [
			data.extra.keptUp
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 4
					}
				]
			}
		},
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Jedi to place herself into a deep trance, remarkably slowing all body functions. The Jedi's heartbeat slows, her breathing drops to barely perceivable levels, and she falls <i>unconscious</i>. A Jedi can heal while in a <i>hibernation trance</i>, but can do nothing else.",
					"Anyone who comes across a Jedi in <i>hibernation trance</i> assumes that the Jedi is dead unless she makes a point of testing him. Another Jedi with the <b>sense</b> skill or the <i>life detection</i> power will be able to detect the Force within the hibernating character and realize that she is alive.",
					"When a Jedi enters a <i>hibernation trance</i>, the player must declare under what circumstances the character will awaken: after a specific amount of time, or what stimuli need to be present (noise or someone touching them, for example). Another Jedi can use the power <i>place another in hibernation trance</i> to bring the user out of the trance.",
					"<i>Hibernation trance</i> serves two purposes. It allows a Jedi to \"play dead\" and it can be used to survive when food or air supplies are low.",
					"A character in hibernation uses only about a tenth as much air as someone who is sleeping — she can hibernate for a week in a dry climate or for up to a month in a wet climate before dying from lack of water. It is possible to hook the character up to an intravenous water drip to survive indefinitely.",
					"A character can hibernate for up to three months before dying of starvation. An intravenous sugar solution can extend that to one year."
				]
			}
		]
	},
	{
		"name": "Accelerate Healing",
		"timeToUse": "One minute [12R]",
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
		"name": "Control Breathing",
		"required": [
			"Concentration",
			"Hibernation Trance",
			"Telekinesis"
		],
		"extra": [
			data.extra.keptUp
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 3
					}
				]
			},
			"alter": {
				"level": [
					{
						"level": 5
					}
				]
			}
		},
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
		"type": "label",
		"name": "Enhance Senses"
	},
	{
		"name": "Merge Senses",
		"required": [
			"Magnify Senses"
		],
		"timeToUse": "Three rounds",
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3
					}
				],
				"modifiers": [
					data.modifiers.proximity
				]
			}
		},
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
		"name": "Magnify Senses",
		"timeToUse": "Three rounds",
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 1
					}
				],
				"modifiers": [
					data.modifiers.proximity
				]
			}
		},
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Jedi to increase the effectiveness of her normal senses to perceive things that otherwise would be impossible without artificial aids. She can hear noises beyond her normal hearing due to distance or softness (she can't hear beyond normal frequencies). Likewise, she can see normally visible things over distances that would require the use of macrobinoculars; she can identify scents and odors that are normally too faint for human olfactory senses."
				]
			}
		]
	},
	{
		"name": "Life Sense",
		"required": [
			"Life Detection"
		],
		"extra": [
			"Power can be kept up: to track a target"
		],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 1
					}
				],
				"modifiers": [
					data.modifiers.proximity,
					data.modifiers.relationship
				]
			}
		},
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
		"name": "Life Detection",
		"extra": [
			data.extra.keptUp
		],
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
				"modifiers": [
					data.modifiers.relationship
				]
			}
		},
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
		"name": "Danger Sense",
		"required": [
			"Life Detection"
		],
		"extra": [
			data.extra.keptUp
		],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 3
					},
					{
						"level": "Attacker's Control roll",
						"hover": "Alternative"
					}
				]
			}
		},
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
		"name": "Direction Sense",
		"extra": [
			data.extra.keptUp
		],
		"difficulty": {
			"sense": {
				"level": [
					{
						"level": 2,
						"text": "modified by proximity"
					}
				]
			}
		},
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
		"name": "Farseeing",
		"required": [
			"Life Sense"
		],
		"timeToUse": "At least one minute [12R]",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
					}
				],
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
				"modifiers": [
					data.modifiers.proximity
				]
			},
			"sense": {
				"level": [
					{
						"level": 1,
						"text": "if the target is friendly and doesn't resist"
					},
					{
						"level": "Target's Control or Perception",
						"text": "otherwise"
					}
				],
				"modifiers": [
					data.modifiers.relationship
				]
			}
		},
		"content": [
			{
				"type": "effect",
				"text": [
					"The Jedi may see the person or place he wishes to see in his mind as the situation currently exists. The power can also be used to see the future or the past. The Jedi sees the immediate surroundings, for example, when a friend is in danger, or what happened on his home planet in his absence.",
					"<i>Farseeing</i> requires calm conditions and at least one minute, but often takes a few minutes. <i>Farseeing</i> cannot be done in the face of danger. The Jedi's vision may not be entirely accurate:",
					`<table>
						<tr>
							<th><b>Power roll &ge; Sense Difficulty</b></th>
							<th><b>Past/Present</b></th>
							<th><b>Future</b></th>
						</tr>
						<tr>
							<td>0-10</td>
							<td>50%</td>
							<td>10%</td>
						</tr>
						<tr>
							<td>11-20</td>
							<td>75%</td>
							<td>25%</td>
						</tr>
						<tr>
							<td>21-30</td>
							<td>90%</td>
							<td>50%</td>
						</tr>
						<tr>
							<td>31+</td>
							<td>100%</td>
							<td>75%</td>
						</tr>
					</table>`,
					"The past and present are set and it is merely a matter of the Jedi having correct perceptions. However, the future is always fluid, always in motion, never set until it becomes the present — therefore it is much harder to predict. The percentages on the chart are a rough measure of how much correct information the character receives in the vision.",
					"For example, 10% means that the character will only be able to make out the most basic details of a situation, such as \"My friends are in danger\". 25% means that the Jedi gets a somewhat accurate vision of what will transpire, but most major details will be missing from the vision. 50% means that the character's vision was about half right. 75% means that the character has an understanding of the critical happenings, but the character still has missed a major detail or two, which, of course, can complicate things. 90% means that the character has a very accurate and very detailed vision of what has transpired or will transpire. 100% means that the character's vision is even more accurate and detailed, complete with minor, almost trivial details.",
					"When a character farsees into the future, the gamemaster has to make an honest effort to correctly represent what will happen: if the characters get a 75% result, the gamemaster must try to predict what he thinks the characters will do and what the outcome will be. Of course, since the future is so fluid, things are always subject to change. <i>Farseeing</i> is a great mechanic for the gamemaster to reveal part of the story — enough to tantalize the players, without ruining the story."
				]
			}
		]
	},
	{
		"type": "label",
		"name": "Communication"
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
				"modifiers": [
					data.modifiers.proximity
				]
			},
			"sense": {
				"level": [
					{
						"level": "Target's Control or Perception roll",
						"hover": "Hello :D"
					}
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
		"name": "Translation",
		"required": [
			"Receptive Telepathy",
			"Projective Telepathy",
			"Life Sense"
		],
		"extra": [
			data.extra.keptUp
		],
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
		"name": "Receptive Telepathy",
		"required": [
			"Life Detection",
			"Life Sense"
		],
		"extra": [
			"Power can be kept up: if the target is willing and the proximity modifier doesn't increase"
		],
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
		"name": "Projective Telepathy",
		"required": [
			"Life Detection",
			"Life Sense",
			"Receptive Telepathy"
		],
		"extra": [
			"<b>Homebrew:</b> Checks with friend's or closer individuals succeed automatically"
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
					}
				],
				"increased": [
					{
						"add": "+5 to +10",
						"text": "if the Jedi cannot verbalize the thoughts she is transmitting (she is gagged or doesn't want to make a sound) - <i><b>Homebrew:</b> doesn't apply for Zebron</i>"
					}
				],
				"modifiers": [
					data.modifiers.proximity
				]
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
				"modifiers": [
					data.modifiers.relationship
				]
			}
		},
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
		"type": "label",
		"name": "Party"
	},
	{
		"name": "Control Another's Pain",
		"required": [
			"Control Pain"
		],
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1,
					}
				],
				"modifiers": [
					data.modifiers.relationship
				]
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
		"content": [
			{
				"type": "effect",
				"text": [
					"This power allows a Jedi to help another character <i>control pain</i>, under the same rules and conditions outlined in the <i>control pain</i> power. The Jedi must be touching the character to use this power."
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
		"timeToUse": "One minute [12R]",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 1
					}
				],
				"modifiers": [
					data.modifiers.relationship
				]
			},
			"alter": {
				"level": [
					{
						"level": 1
					}
				]
			}
		},
		"content": [
			{
				"type": "effect",
				"text": [
					"The target is allowed to make extra healing rolls, as outlined in <i>accelerate healing</i>. The Jedi must be touching the character whenever she activates this power."
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
		"timeToUse": "One minute [12R]",
		"difficulty": {
			"control": {
				"level": [
					{
						"level": 2
					}
				],
				"modifiers": [
					data.modifiers.relationship
				]
			},
			"alter": {
				"level": [
					{
						"level": 3
					}
				]
			}
		},
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
	}
];
