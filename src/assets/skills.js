export default class Stats {
	getSkill(stat, skill) {
		return this.stats[stat].skills[skill]
	}

	getDescription(stat, skill) {
		skill = this.getSkill(stat, skill)
		if (skill) {
			const description = skill.description
			if (description) {
				return description
			}
		}
		return ''
	}

	getRoot(stat, skill) {
		skill = this.getSkill(stat, skill)
		return skill.root
	}

	stats = {
		Dexterity: {
			name: 'Dexterity',
			skills: {
				Lightsaber: {
					name: 'Lightsaber',
					spezializations: {
						description: 'Specific type or model lightsaber',
						examples: ['double-bladed lightsaber', 'light-whip'],
					},
					description: {
						main: `Lightsaber is the "melee combat" skill used for the lightsaber, the weapon of the famed Jedi Knights.<br>
						While a very powerful weapon, a lightsaber is dangerous to an unskilled user — if an attacking character misses the attack difficulty number by 10 or more points, then the character has injured himself with the weapon and rolls damage against his own Strength.<br>
						Lightsaber can also be used as a "reaction skill" to parry brawling, lightsaber and melee combat attacks. Jedi Knights can parry blaster bolts with a lightsaber, but that’s only because they have the lightsaber combat Force power; it’s very, very difficult for a character without the power to parry blaster shots.
						`,
					},
					example: `Ana Tathis is using her lightsaber to strike at a pirate. Her lightsaber skill is 5D and the lightsaber’s difficulty is Difficult (her difficulty number is a 20). Ana’s player rolls her skill dice and gets a 21 — she hits. If she had rolled a 10 or lower, Ana would have underestimated the momentum of her attack maneuver and sliced herself with her own lightsaber, causing 5D damage to herself.
					`,
				},
				Acrobatics: {
					spezializations: {
						description: 'Type of acrobatics used, form or style',
						examples: ['diving', 'trapeze', 'tumbling'],
					},
					description: {
						main:
							'Characters with this skill can tumble, leap, and roll to avoid falling damage, to entertain an audience, or to surprise an opponent in combat.',
						extra: `Using acrobatics can improve many of a character’s climbing/jumping and running attempts. The gamemaster determines the difficulty of the acrobatics stunt. One-half of the difference (rounded up) between the difficulty and the acrobatics roll is added to the complementary skill. The acrobatics attempt and the climbing/jumping or running try must be done on the same turn, incurring a multiple action penalty.<br>
						Instead of adding a modifier to the running or swim difficulty for particularly challenging obstacle courses, the gamemaster may have the hero make an acrobatics roll in addition to a running or swim roll.<br>
						Acrobatics can make a character appear more intimidating. The player may add one-half of the difference (rounded up) between the difficulty and the successful acrobatics roll to their intimidation attempt. The intimidating attempt may be made on the same turn as the acrobatics roll or on the next round.<br>
						During a fall, acrobatics may be used to reduce bodily harm. If the character has not already used his declared actions for the round, he may rely on acrobatics in an attempt to land properly as a "full reaction". The character generates an acrobatics total. For every five points over the base difficulty number of 10, the hero reduces the damage total by one point, in addition to a base reduction of one point. The damage total, however, cannot be lower than zero.<br>
						The difficulty depends upon how difficult the acrobatic maneuver is, some examples are provided below:<br>
						... [!!!]
						`,
					},
				},
				Dodge: {
					spezializations: {
						description: 'Kind of ranged attack to be dodged',
						examples: ['energy weapons', 'grenades', 'missile weapons'],
					},
					description: {
						main: `Dodge is a "reaction skill" used to avoid any ranged attack, including blaster fire, grenades, bullets and arrows. Characters using this are doing whatever they can to dodge the attack — slipping around a corner for cover, diving behind cargo containers, dropping to the ground, or any other maneuvers to avoid getting hit.
						`,
					},
				},
				Running: {
					spezializations: {
						examples: ['Long distance', 'short sprint'],
					},
					description: {
						main: `Running is the character’s ability to run and keep his
						balance, especially in dangerous terrain. The running difficulty
						is based on the kind of terrain being crossed and
						how fast the character moves. See the chapter on "Movement and Chases" for more information.
						`,
					},
				},
			},
		},
		Perception: {
			name: 'Perception',
			skills: {
				Sneak: {
					spezializations: {
						description: 'Specific type of terrain',
						examples: ['jungle', 'urban'],
					},
					description: {
						main: `Sneak represents the character’s ability to move silently, hide from view, move in shadows and otherwise creep around without being noticed. This is an opposed roll — the character sneaking around makes a sneak roll, and anyone who might spot the character makes a search or Perception roll.<br>
						This skill allows characters to hide themselves only — to conceal objects, they must use the hide skill.
						`,
						extra: `This skill is also used when the character wants to make a long distance journey without leaving behind physical clues. The character makes a roll to leave behind false clues and paths and the tracking character must make an opposed search roll to follow the true path.
						`,
					},
				},
			},
		},
		Knowledge: {
			name: 'Knowledge',
			skills: {
				Cultures: {
					time: 'One round to one day or longer',
					spezializations: {
						description: 'Planet or social group',
						examples: [
							'Corellians',
							'Alderaan royal family',
							'Brentaal',
							'Prexian pirates',
						],
					},
					description: {
						main: `This skill reflects knowledge of particular cultures and common cultural forms (primitive tribal civilizations tend to be somewhat similar, for example). Cultures allows a character to determine how he is expected to behave in a particular situation among a certain group of individuals. The more obscure the information or culture, the higher the difficulty. Cultural knowledge includes information about a certain group’s art, history, politics, customs, rites of passage, and views on outsiders.<br>
						For instance, a visitor to Tatooine might make a cultures roll to better understand the moisture farmers he’s dealing with. Depending on what the player asks about this culture, he could learn the moisture farmers depend heavily on droids, they often trade with roaming bands of Jawa scavengers, and their calendar revolves around planting and harvesting seasons.<br>
						This skill can be used for cultures of one’s own species or for those of other species.
						`,
					},
				},
			},
		},
		Strength: {
			name: 'Strength',
			skills: {
				'Climbing/Jumping': {
					spezializations: {
						examples: ['Climbing', 'jumping'],
					},
					description: {
						main: `Use this skill when a character attempts to climb a tree, wall or cliff, leap a wide gap, or jump up and grab an outcropping.
						`,
						extra: `Characters who have the climbing/jumping skill can move up a surface at their normal Move (barring adverse environmental factors) with a base difficulty of Very Easy. Those without the climbing/jumping skill move at half their normal movement rate. Increasing the rate increases the difficulty by +10 for each additional one-half of the base climbing Move (rounded up).<br>
						A character’s total leaping distance (vertically and horizontally) from a standing position equals one-quarter of his Move in meters (rounded up). The base difficulty is Very Easy to move this distance, and +10 for each additional two meters (vertically and horizontally) the character hopes to cover. If there is enough room, the character may try running before jumping. The character may add +5 to his skill total per round of the running start, up to a maximum of +10 (two rounds). The character must have beat the running difficulty in both rounds in order to get the full bonus.<br>
						Climbers usually move in groups and combine actions, with frequent rest breaks and patient, steady progress. Base difficulties for uses of this skill are described above. Note that taking care in climbing and carrying 50% or more of the character’s body weight slows the character down by two meters or more per round.<br>
						... [!!!]`
					},
					example: `A character with a Move of 10 and without the climbing/jumping skill wants to move quickly up a tree. His base climbing Move is 5. To increase this to eight meters per round means a difficulty of 15 (5 to climb the tree plus +10 to increase the movement by one-half, or three meters, of his base climbing Move).
					`
				},
				Swimming: {
					time: 'One round to several minutes or hours.',
					description: {
						main: `This skill represents the character’s ability to stay afloat in aquatic environments — lakes, oceans, flooding rivers and luxury starliner swimming pools. Swimming difficulties are determined by the water conditions: the starliner pool is Very Easy, while a roaring river might be Very Difficult.<br>
						When a character fails a swimming check, he begins to drown. Roll 2D at the beginning of each round; if the total is less than the number of rounds that the character has been drowning, the character drowns and dies. Characters can attempt other actions while drowning at a −3D penalty. Characters who are drowning may attempt to save themselves once per round. They must make a swimming total at one level of difficulty higher than the one in which they failed their swimming roll (the character doesn’t suffer the −3D penalty when making this roll).
						`,
					},
				},
			},
		},
		Mechanical: {
			name: 'Mechanical',
			skills: {},
		},
		Technical: {
			name: 'Technical',
			skills: {
				time: 'In general, 15 minutes, then one hour, then one day, then two days. Construction takes approximately one month.',
				"Lightsaber Engineering": {
					spezializations: {
						description: 'Specific type or model lightsaber',
						examples: ['double-bladed lightsaber', 'light-whip'],
					},
					description: {
						main: `Characters use this skill when repairing, modifying, or building a lightsaber, the weapon of the Jedi. This skill is generally restricted to Jedi Knights who learned it from their master. Lightsaber repair/engineering combines the repair and design skills into one, due to the special nature of the skill. The cost and difficulty to repair equipment depends upon how badly it is damaged — see "Weapons" in "Using Repair Skills" above.`,
						extra: `Lightsaber Construction: To construct a Iightsaber from its basic components parts takes a minimum of one month and requires a successful lightsaber repair roll against a Very Difficult difficulty.<br>
						Decrease the difficulty by one level for each extra month spent building the saber, to a minimum of Easy. Jedi characters may adjust a Iightsaber’s base damage die code through modifications (as indicated in the "Improving Vehicles, Vessels, and Weapons" section). Characters rely on their lightsaber repair/engineering skill to make such improvements.<br>
						Note that lightsaber repair/engineering is not an advanced skill, however it should be judiciously governed by the gamemaster and generally used only by Jedi characters.`
					},
				},
			},
		},
	}
}
