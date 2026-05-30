export const Extra = {
	inSight: 'Target must be in sight of the Jedi',
	keptUp: 'Power can be kept up',
	ignorePain: 'Character can ignore pain of injuries for a long period of time',
	newRollWhenInjured: 'Whenever character is injured again, must make a new Control pain roll',
	notUsableWhenDarkside: 'Characters who are consumed by the dark side of the Force may not use this power.'
};

export const Modifier = {
	proximity: {
		text: 'Modified by Proximity',
		hover: 'Touching +0\nLine of sight (not touching) +2\nNot line of site, at 1-100 meters +5\n101 meters, to 10 kilometers +7\n11 to 1,000 kilometers +10\nSame planet more than 1,000 kilometers +15\nSame star system, different planet +20\nNot in same star system +20'
	},
	relationship: {
		text: 'Modified by Relationship',
		hover: 'Close relatives (married, siblings, parent and child, etc) +0\nClose friends +2\nFriends +5\nAcquaintances +7\nSlight acquaintances +10\nMet once +12\nNever met, but know each other by reputation +15\nComplete strangers +20\nComplete strangers and not of the same species +30'
	},
};

export const Power = {
	control: 'control',
	sense: 'sense',
	alter: 'alter'
};

export const PowerName = {
	control: "Control",
	sense: "Sense",
	alter: "Alter"
};

export class Skill {
	name;
	powers;
	source;
	required = [];
	extra = [];
	difficulty = {
		control: { level: [] },
		sense: { level: [] },
		alter: { level: [] },
	};
	effect;
	example;

	constructor(skillName) {
		this.name = skillName;
	}

	setPowers(powers) {
		if (typeof powers === "string") powers = [powers];
		this.powers = powers;
	}
	setSource(source) { this.source = source; }
	setRequired(required) {
		if (!required.length) required = [required];
		this.required = required;
	}
	setExtra(extra) {
		if (typeof extra === "string") extra = [extra];
		this.extra = extra;
	}
	addDifficulty(power, level, text = null, hover = null) {
		let difficulty = {
			level: level
		};
		if (text != null) difficulty.text = text;
		if (hover != null) difficulty.hover = hover;
		this.difficulty[power].level.push(difficulty);
	}
	addIncrement(power, add, text) {
		if (!this.difficulty[power].increased) {
			this.difficulty[power]['increased'] = [];
		}
		this.difficulty[power].increased.push({
			add: add,
			text: text
		});
	}
	setModifiers(power, modifiers) {
		if (!this.difficulty[power].modifiers) {
			this.difficulty[power]['modifiers'] = [];
		}
		if (!modifiers.length) modifiers = [modifiers];
		this.difficulty[power].modifiers = modifiers;
	}
	setEffect(effect) { this.effect = effect; }
	setExample(example) { this.example = example; }

	hasRequiredSkills() { return this.required.length !== 0; }
	hasIncreasedDifficulty(power) { return this.difficulty[power].increased !== null; }
	hasModifiedDifficulty(power) { return this.difficulty[power].modifiers !== null; }
}

export default class PowerLabel {
	constructor(labelName) {
		this.name = labelName;
		this.skills = [];
	}

	addSkill(skill) {
		this.skills.push(skill);
	}

	getName() { return this.name; }
	getSkills() { return this.skills; }
}

export class PowersOld {
	getLabelIDs() {
		return Object.keys(this.label);
	}

	getLabelName(labelID) {
		return this.label[labelID]['name'];
	}

	getPowerIDs(labelID) {
		return Object.keys(this.label[labelID]['skills']);
	}

	getSkill(stat, skill) {
		return this.stats[stat].skills[skill];
	}

	getDescription(stat, skill) {
		skill = this.getSkill(stat, skill);
		if (skill) {
			const description = skill.description;
			if (description) {
				return description;
			}
		}
		return '';
	}

	getRoot(stat, skill) {
		skill = this.getSkill(stat, skill);
		return skill.root;
	}

	data = {
		modifiers: {
			proximity: {
				text: 'Modified by Proximity',
				hover: 'Touching +0\nLine of sight (not touching) +2\nNot line of site, at 1-100 meters +5\n101 meters, to 10 kilometers +7\n11 to 1,000 kilometers +10\nSame planet more than 1,000 kilometers +15\nSame star system, different planet +20\nNot in same star system +20'
			},
			relationship: {
				text: 'Modified by Relationship',
				hover: 'Close relatives (married, siblings, parent and child, etc) +0\nClose friends +2\nFriends +5\nAcquaintances +7\nSlight acquaintances +10\nMet once +12\nNever met, but know each other by reputation +15\nComplete strangers +20\nComplete strangers and not of the same species +30'
			},
		},
		extra: {
			inSight: 'Target must be in sight of the Jedi',
			keptUp: 'Power can be kept up',
			ignorePain:
				'Character can ignore pain of injuries for a long period of time',
			newRollWhenInjured:
				'Whenever character is injured again, must make a new Control pain roll',
			notUsableWhenDarkside: 'Characters who are consumed by the dark side of the Force may not use this power.'
		},
		time: {
			default: 'One round [1R]',
			minute: 'One minute [12R]',
			minute_plus: 'At least one minute [12R]',
			3: 'Three rounds [3R]',
		},
	};

	label = {
		combat: {
			name: 'Combat',
			skills: {
				lightsaber_combat: {
					name: 'Lightsaber Combat',
					powers: ['control', 'sense'],
					extra: [this.data.extra.keptUp],
					difficulty: {
						control: {
							level: [
								{
									level: 3,
								},
							],
						},
						sense: {
							level: [
								{
									level: 2,
								},
							],
						},
					},
					effect: {
						short: [
							[
								`power is called at start of battle - remains up until the Jedi is stunned or injured`,
								`a Jedi who has been injured or stunned may attempt to bring the power back up`,
							],
							`Sense dice to Lightsaber skill when trying to hit or parry`,
							[
								`add or subtract up to number of Control dice to lightsaber's damage`,
								`choose number of dice before rolling damage`,
							],
							[
								`fail: only use Lightsaber skill - cannot roll again during combat Lightsaber Combat may be used as reaction skill to parry blaster bolts`,
								`charakter must declare to parry this round`,
								`can control where blaster bolt goes - additional action, no full parry`,
								`Control roll: difficulty = dodge of target / distance to Jedi, damage = blaster damage`,
							],
						],
						long: `To use a lightsaber most effectively, a Jedi learns this power. The Jedi uses this power both to wield this elegant but difficult-to-control weapon while also sensing his opponent's actions through his connection to the Force.<br>
						This power is called upon at the start of a battle and remains up until the Jedi is stunned or injured; a Jedi who has been injured or stunned may attempt to bring the power back up.<br>
						If the Jedi is successful in using this power, the Jedi adds his sense dice to his lightsaber skill roll when trying to hit a target or parry, and he adds or subtracts up to the number of his control dice to the lightsaber's 5D damage when it hits in combat. Players must decide how many control dice they are adding or subtracting before they roll damage.<br>
						If the Jedi fails the power roll, he must use the lightsaber with only his lightsaber skill to hit and the weapon's normal damage in combat and he cannot attempt to use the power again for the duration of the combat.<br>
						Finally, the Jedi may use lightsaber combat to parry blaster bolts as a "reaction skill". To do this, the character must declare that he is parrying that round, using his lightsaber skill as normal.<br>
						The Jedi may also attempt to control where detected blaster bolts go; this is a reaction skill and counts as an additional action. (The Jedi cannot full parry when trying to control deflected bolts.) The Jedi must declare which specific shot he is controlling. Then, once the roll is made to see if the blaster bolt was parried by the Jedi, the Jedi makes a control roll, with the difficulty being his new target's dodge or the range (figured from the Jedi to his target). The damage is that of the original blaster bolt.`,
					},
					example: {
						long: `Ana is entering combat: she has a lightsaber skill of 4D, a control of 5D and a sense of 4D+2. She activates lightsaber combat by making her Moderate control roll and her Easy sense roll; she decides to keep the power "up". Since she is making both the control and sense rolls in the same round, each suffers a -1D penalty.<br>
						She adds her sense of 3D+2 (4D+2-1D) to her lightsaber skill roll of 4D, for a total lightsaber of 7D+2. She adds her control of 4D (5D-1D) to her lightsaber's damage of 5D, for a total of 9D.<br>
						When Ana attacks in a round, that's another action, for an additional -1D penalty to all actions (total penalty of -2D); she'd only roll 6D+2 to attack and would roll 8D for damage.<br>
						Ana Decides to parry a blaster bolt and control where it goes. This is two more actions in a round, which means a total of four actions (don't forget the control and sense to keep the power "up"), for a penalty of -3D: Ana's lightsaber skill is 5D+2, and her lightsaber's damage is 7D.<br>
						Ana's attacker is using a blaster pistol that causes 4D damage.<br>
						First Ana makes her parry roll with her lightsaber: her parry roll of 18 is higher than the attacker's blaster roll of 13, so Ana parries the bolt.<br>
						Now, Ana tries to control the blaster bolt. Her target is 20 meters away – that's a Moderate difficulty for the blaster pistol. Ana rolls a 14 with her control – just barely good enough to hit. The blaster bolt bounces off Ana's lightsaber blade and hits another goon, causing 4D damage.`,
					},
				},
				kinetic_control: {
					name: 'Kinetic Combat',
					powers: ['alter'],
					source: 'Hero’s Guide, page 42',
					required: ['Telekinesis'],
					difficulty: {
						alter: {
							level: [
								{
									level: 4,
								},
							],
						},
					},
					effect: {
						short: [],
						long: `Once the Jedi has successfully activated this power, he may wield a melee weapon or lightsaber with the power of the Force at a distance up to 10 meters, as though the weapon were in his hands using his melee weapons or lightsaber skill respectively. Multiple action penalties apply. The first round, the Jedi can make only one attack. As his control improves, he may attack with the weapon as many times as possible (as determined by multiple action penalties).`,
					},
				},
				force_push: {
					name: 'Force Push',
					powers: ['alter'],
					source: 'Core Rulebook, page 86',
					required: ['Concentration', 'Life Detection', 'Telekinesis'],
					extra: [this.data.extra.inSight],
					difficulty: {
						alter: {
							level: [
								{
									level: 'Target’s control or Strength roll',
									hover: 'Looking for something?',
								},
							],
							increased: [
								{
									add: '+3',
									text: 'for every 5 meters away from target',
								},
							],
						},
					},
					effect: {
						short: [],
						long: `With this power, a Jedi may use the Force to push several adjacent targets backwards, knocking them prone or banging them against a wall. Each target past the first incurs a -1D penalty on the Jedi using the power (ie, 1 target, no penalty; 2 targets, -1D penalty; 3 targets, -2D penalty; 4 targets, -3D penalty…). Each target makes either a control or Strength roll to resist, and the acting Jedi’s alter roll result is compared to each result in turn to determine the effects. A target that is knocked back into a wall or other solid object takes the listed damage. If a Jedi kills a living being as a result of this power he immediately receives a Dark Side Point; as such, he may roll less than his full alter score if he so chooses.
						<table>
							<tr>
								<th><i>Alter Roll > Difficulty By</i></th>
								<th><i>Target pushed back/Collision damage</i></th>
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
						</table>`,
					},
				},
				absorb_dissipate_energy: {
					name: 'Absorb/Dissipate Energy',
					powers: ['control'],
					extra: [this.data.extra.keptUp + ' as long as the source of energy is constant — for blaster bolts or Force lightning, it is used as a reaction skill, multiple action penalties apply for use to block fire (as though it were a dodge skill)'],
					difficulty: {
						alter: {
							level: [
								{
									level: 1,
									text: 'for sunburn and other very minor energy sources',
								},
								{
									level: 2,
									text: 'for intense sun',
								},
								{
									level: 3,
									text: 'for solar wind and other modest energy sources (blaster bolts and Force lightening)',
								},
								{
									level: 4,
									text: 'or radiation storms and other intense energy sources (speeder-scale damage)',
								},
							],
							increased: [
								{
									add: '+30',
									text: 'Walker-scale',
								},
								{
									add: '+40',
									text: 'Starfighter-scale',
								},
								{
									add: '+20',
									text: `Area of Effect:
									<ul>
										<li>Point blank to 1 meters: -4D energy damage</li>
										<li>2 meters: -3D energy damage</li>
										<li>3 meters: -2D energy damage</li>
										<li>4 meters: -1D energy damage</li>
									</ul>`,
								}
							],
						},
					},
					effect: {
						short: [],
						long: `This power allows the Jedi to absorb or dissipate energy, including light, heat, radiation and blaster bolts. A successful control roll means that the energy is dissipated. If the user fails the roll, she takes full damage from the energy.<br>
						This power may be used to ward off sunburn, heat-stroke and radiation exposure, as well as withstand intense heat.<br>
						The character may activate the power as a “reaction skill” to absorb the blaster bolt or Force lightning — the roll replaces the ranged target number the shooter who must roll equal or higher in order to hit.`,
					},
					example: {
						long: `A stormtrooper is shooting at Ana. Rather than dodge behind cover, she decides to use absorb/dissipate energy to absorb the shot. The difficulty is Moderate. For the Moderate difficulty, thegamemaster picks a difficulty number of 14. Ana rolls control and gets a 21.<br>
						If the blaster’s damage roll is less than 21, then Ana absorbs the blaster bolt and takes no damage. If the blaster’s damage roll is 21 or higher, she takes full damage from the blaster shot.`
					}
				},
				lesser_force_shield: {
					name: 'Lesser Force Shield',
					powers: ['sense', 'alter'],
					required: ['Absorb/Dissipate Energy', 'Concentration', 'Magnify Senses', 'Telekinesis'],
					extra: [this.data.extra.keptUp],
					difficulty: {
						sense: {
							level: [
								{
									level: 2,
								},
							],
						},
						alter: {
							level: [
								{
									level: 3,
								}
							]
						}
					},
					effect: {
						short: [],
						long: `This power allows the Jedi to surround his body with a Force-generated shield. The shield can be used to repel energy and physical matter away from the Jedi’s body, down to the molecular level.<br>
						The shield acts as STR+1D armor to all energy and physical attacks made against the Jedi, including non-directional attacks such as gas clouds and grenade blasts. The shield is not particularly strong, but can sometimes be just enough to protect the Jedi from serious injury.`,
					},
				},
			},
		},
		utils: {
			name: 'Utils',
			skills: {
				telekinesis: {
					name: 'Telekinesis',
					powers: ['alter'],
					extra: [this.data.extra.inSight, this.data.extra.keptUp],
					difficulty: {
						alter: {
							level: [
								{
									level: 1,
									text: '0kg < obj ≤ 1kg',
								},
								{
									level: 2,
									text: '1kg < obj ≤ 10kg',
								},
								{
									level: 3,
									text: '10kg < obj ≤ 100kg',
								},
								{
									level: 4,
									text: '100kg < obj ≤ 1.000kg',
								},
								{
									level: 5,
									text: '1.000kg < obj ≤ 10.000kg',
								},
								{
									level: 6,
									text: '10.000kg < obj ≤ 100.000kg',
								},
							],
							increased: [
								{
									add: '+5',
									text: '+10 meters/round movement',
								},
								{
									add: '+1 to +5',
									text: 'for gentle turns',
								},
								{
									add: '+6 to +10',
									text: 'for easy maneuvers',
								},
								{
									add: '+11 to +25 or more',
									text: 'for complex maneuvers',
								},
							],
							modifiers: [this.data.modifiers.proximity],
						},
					},
					effect: {
						short: [
							'levitate objects with mental power - objects can be moved',
							'possible to lift serveral objects simultaneously - each object requires new Telekinesis roll',
							'levitate oneself or others is possible',
							'can be used as primitive space drive in emergencys',
							'when used against will: add his/her Perception or Control roll to difficulty',
							'levitated objects can be used to attack others - automatically gives a Dark Side Point',
						],
						long: `By using this <click>power</click>, a Jedi may levitate objects with mental power. If used successfully, the object moves as the Jedi desires.<br>
						A Jedi can lift several objects simultaneously, but each additional object requires the Jedi to make a new telekinesis roll.<br>
						This power can be used to levitate oneself or others. It can be used as a primitive space drive in emergencies. When levitating against someone's will, the target will resist by adding his or her Perception or control roll to the difficulty number.<br>
						Levitated objects can be used to attack other characters, but this automatically gives the Jedi a Dark Side Point. Such objects do up to 1D damage if under one kilogram, 2D if one to ten kilos, 4D if 11to100 kilos, 3D Speeder-scale if one to ten tons, 5D Starfighter-scale if 11 to 100 tons.<br>
						Such attacks require an additional control roll by the Jedi, which would be this hit roll against the target's dodge. If the character doesn't dodge the attack, the difficulty if Easy.`,
					},
				},
				contort_escape: {
					name: 'Contort/Escape',
					powers: ['control'],
					required: ['Concentration', 'Coontrol Pain', 'Enhance Attribute'],
					difficulty: {
						control: {
							level: [
								{
									level: 1,
									text: 'for loose bonds',
								},
								{
									level: 2,
									text: 'for hand binder',
								},
								{
									level: 3,
									text: 'for serious restraints',
								},
								{
									level: 4,
									and_more: true,
									text: 'for maximum security (varies at gamemaster’s discretion, depending on security measures)',
								},
							],
							modifiers: [this.data.modifiers.proximity],
						},
					},
					effect: {
						long: `The character may escape bonds by contorting in painful and difficult (but still physically possible) ways. By stretching, twisting, and dislocating joints a Jedi can escape almost any physical restraining device. While this is indeed a painful procedure, Jedi are trained to block out the pain and focus on the task at hand.`,
					},
				},
			},
		},
		buffs: {
			name: 'Buffs',
			skills: {
				concentration: {
					name: 'Concentration',
					powers: ['control'],
					difficulty: {
						control: {
							level: [
								{
									level: 2,
									text: 'relaxed and at peace',
								},
								{
									level: 4,
									text:
										'filled with aggression, fear or other negative emotions',
								},
								{
									level: 5,
									text: 'acting on the negative emotions',
								},
							],
						},
					},
					effect: {
						long: `When using this power, Jedi clear Force Powers 5 all negative thoughts from their minds, feeling the Force flowing through the universe and their own being.<br>
						The individual Jedi concentrates on one specific task at hand. If the skill roll is successful, the Jedi may add +4D to any one action in that round. The Jedi may do nothing other than using the concentration power and using that one skill for a single action. The Jedi receives no bonus if anything else is done in that round, including duplicate uses of the same skill or dodges or parries.<br>
						This power may be used in conjunction with Force Points and Character Points. This power is only in effect for one round and may not be kept up.`,
					},
					example: {
						long: `Luke is flying down the trench of the Death Star. With Ben’s urging, he clears his mind of negative thoughts, and feels the Force flowing through him. Using the Force, he concentrates on the task at hand of firing a proton torpedo into the unshielded exhausst port. Since he has cleared his mind, the control difficulty is Easy.<br>
						Luke’s player declares that Luke is also spending a Force Point to accomplish the task this round. Luke’s starship gunnery skill is 6D. he looses -1D for doing one other thing in the round (using the Force counts as an action), reducing his starship gunnery skill to 5D. Because he rolls successfully for his control, he receives the bonus of +4D, making his effective skill for that round 9D. Because he is spending a Force Point, his skill level is doubled to 18D!<br>
						If Luke attempted any other action in that round, including firing another proton torpedo or blaster, or dodging enemy shots, he would receive no bonus.`,
					},
				},
				enhance_attribute: {
					name: 'Enhance Attribute',
					powers: ['control'],
					difficulty: {
						control: {
							level: [
								{
									level: 3,
								},
							],
						},
					},
					effect: {
						short: [],
						long: `A Jedi uses this power to increase a single attribute for a limited period.An increased attribute can help a Jedi jump higher, see better, and run faster. All skills governed by the enhanced attribute increase by the same amount for as long as the power remains in effect.<br>
						An attribute increased by this power remains enhanced for the duration listed below. Duration and attribute increase are determined by how much a character’s control skill roll exceeds the difficulty number.<br>
						Duration can be extended through the use of Character Points – for every Character Point a Jedi spends, the duration is increased by one combat round. The points can be spent at any time before the power fades.<br>
						A Jedi can only increase one attribute at a time. If a character invokes the power to enhance a second attribute while the first attribute is still enhanced, then the first enhancement fades and the second attribute receives the increase.
						<table>
							<tr>
								<th><i>Skill Roll > Difficulty By</i></th>
								<th><i>Attribute Duration/Increase</i></th>
							</tr>
							<tr>
								<td>0-13</td>
								<td>+1D / 3 rounds</td>
							</tr>
							<tr>
								<td>14-25</td>
								<td>+2D / 2 rounds</td>
							</tr>
							<tr>
								<td>26+</td>
								<td>+3D / 1 round</td>
							</tr>
						</table>`,
					},
				},
				force_jump: {
					name: 'Force Jump',
					powers: ['control', 'alter'],
					requires: ['Enhance Attribute', 'Telekinesis'],
					difficulty: {
						control: {
							level: [
								{
									level: '1-3',
									hover: '',
									text: 'Jumping Increase +1D',
								},
								{
									level: '4-8',
									hover: '',
									text: 'Jumping Increase +2D',
								},
								{
									level: '9-15',
									hover: '=-6',
									text: 'Jumping Increase +3D',
								},
								{
									level: '16-25',
									hover: '',
									text: 'Jumping Increase +4D',
								},
								{
									level: '26-37',
									hover: 'Nothing to see here...',
									text: 'Jumping Increase +5D',
								},
								{
									level: '38+',
									hover: '',
									text: 'Jumping Increase +6D',
								},
							],
						},
						alter: {
							level: [
								{
									level: 2
								}
							]
						}
					},
					effect: {
						long: `A Jedi uses this power to increase his jumping ability in order to perform impossibly high leaps. If both Force skill rolls are successful, the character uses his normal climbing/jumping skill to perform the jump, but he uses the special table below to determine difficulties. If the control roll exceeds the difficulty, the character gains an immediate bonus to his climbing/jumping roll. If the Jedi fails any Force skill roll, the power is not activated and the character is left to use his normal jumping ability (and there are certain situations where you can’t back out of a jump because your power failed). At the gamemaster’s discretion, a failed climbing/jumping roll might mean the Jedi fails to achieve the desired height or distance, fails to properly cushion his landing and suffers normal falling damage, or both. Multiple action penalties apply. The climbing/jumping roll is a third action in that round, whether the power is successful or not.<br>
						<div style="display: flex">
							<ul style="list-style: none; text-align: center;">
								<li><b><i>Height Jumped</i></b></li>
								<li>0 - 1 meter</li>
								<li>1 - 2 meter</li>
								<li>3 - 4 meter</li>
								<li>5 - 8 meter</li>
								<li>9 - 15 meter</li>
								<li>16 - 20 meter</li>
							</ul>
							<ul style="list-style: none; text-align: center;">
								<li><b><i>Jumping Difficulty</i></b></li>
								<li>Very Easy</li>
								<li>Easy</li>
								<li>Moderate</li>
								<li>Difficulty</li>
								<li>Very Difficulty</li>
								<li>Heroic</li>
							</ul>
						</div>
						Add +5 to the difficulty for every additional 5 meters. If the character is simply jumping downwards, with no upwards movement, reduce jumping difficulty by one level. Add +1 to the difficulty per meter of horizontal distance jumped.
						`,
					},
					example: {
						long: `Ambelled Daru has a control skill of 5D, alter of 3D+2, and a climbing/jumping skill of 4D, and wants to perform a Force jump across a chasm to a ledge above. He rolls 1D+2 for alter (3D+2 subtracting –2D for multiple action penalties), and gets a 7, making his alter difficulty. Next he rolls his control of 3D, and gets a 11 (which exceeds the difficulty by 4). This adds +2D to his climbing/jumping roll, cancelling out the multiple action penalty.<br>
						The ledge on which he wants to jump is 4 meters up and the chasm is 3 meters across, thus the difficulty is Moderate+3. Ambelled Daru rolls his 4D climbing/jumping (4D –2D +2D), and gets a 16, making the difficulty and using the Force to leap safely on top of the ledge.`
					}
				},
				emptiness: {
					name: 'Emptiness',
					powers: ['control'],
					required: ['Hibernation Trance'],
					extra: [this.data.extra.notUsableWhenDarkside],
					difficulty: {
						control: {
							level: [
								{
									level: 3,
								}
							],
						},
					},
					effect: {
						short: [],
						long: `The user empties his mind to allow the Force to flow through him. Characters in emptiness seem to be in deep meditation and are totally oblivious to their surroundings. A character in emptiness may not move or take any action except to try to disengage from the emptiness.<br>
						While in emptiness, a character is difficult to sense or affect with the Force. When another character attempts to use a Force power on the character in emptiness, add the meditating character’s emptiness roll to the difficulty for the other character’s sense or control rolls (only the sense roll if the affected; if the power doesn’t use the sense skill, then add the difficulty to the control roll). This difficulty is added regardless of whether or not the empty character would willingly receive the power’s effect.<br>
						Once a character gets out of emptiness, the character gets a +6 bonus modifier to all Force skill rolls for a period equal to the amount of time the character spent in emptiness. This bonus is reduced by 1 for every Dark Side Point the character has.<br>
						When in emptiness, characters dehydrate and hunger normally – some initiates have died because they lacked enough control to bring themselves out of emptiness.<br>
						When the character enters into emptiness, the player must state for how long the character will be in meditation. A character must make a Difficult control skill roll to exit emptiness. The character may attempt to come out of meditation under the following circumstances:
						<ul>
							<li>When the stated time has passed.</li>
							<li>Once each hour beyond the original time limit.</li>
							<li>The character’s body takes any damage more serious than stun damage.</li>
						</ul>`,
					},
				},
				burst_of_speed: {
					name: 'Burst of Speed',
					powers: ['control'],
					required: ['Enhance Attribute'],
					difficulty: {
						control: {
							level: [
								{
									level: 3,
								}
							],
						},
					},
					effect: {
						short: [],
						long: `A Jedi can use this power to enhance his Move rating, increasing his running and walking speeds dramatically for a short period of time. Both the duration and Move increase are determined by the amount the Jedi’s control roll exceeds the difficulty. The duration can be increased by spending characterpoints — for each character point spent, the duration is increased by one round. These points can be spent at any time before the power fades.<br>
						<table>
							<tr>
								<th><i>Control Roll ≥ Difficulty By</i></th>
								<th><i>Move Increase</i></th>
								<th><i>Duration</i></th>
							</tr>
							<tr>
								<td>0 - 8</td>
								<td>+5</td>
								<td>4R</td>
							</tr>
							<tr>
								<td>9 - 20</td>
								<td>+10</td>
								<td>3R</td>
							</tr>
							<tr>
								<td>21+</td>
								<td>+15</td>
								<td>2R</td>
							</tr>
						</table>`,
					},
				},
			},
		},
		self_control: {
			name: 'Self-Control',
			skills: {
				control_pain: {
					name: 'Control Pain',
					powers: ['control'],
					extra: [
						this.data.extra.keptUp,
						this.data.extra.ignorePain,
						this.data.extra.newRollWhenInjured,
					],
					difficulty: {
						control: {
							level: [
								{
									level: 1,
									text: 'for wounded or stunned characters',
								},
								{
									level: 2,
									text: 'for incapacitated characters',
								},
								{
									level: 4,
									text: 'for mortally wounded characters',
								},
							],
						},
					},
					effect: {
						short: [],
						long: `An injured character who uses control pain can act as if he has not been wounded the next round after he uses the skill. The wound is not healed, but the character doesn’t suffer the penalties of being wounded: a wounded Jedi doesn’t loose 1D from all actions; an incapacitated character can still act normally, as can a mortally wounded character. This power can also be used to shrug off any stun results.<br>
						However, the injury can still grow worse even if the character doesn’t feel the pain. For example, a character who’s been wounded twice and is wounded again would still become incapacitated. Mortally wounded users make the same rolls as other mortally wounded characters, even if they aren’t feeling any pain.`,
					},
				},
				remain_conscious: {
					name: 'Remain Conscious',
					powers: ['control'],
					required: ['Control Pain'],
					difficulty: {
						control: {
							level: [
								{
									level: 2,
									text: 'for stunned characters',
								},
								{
									level: 3,
									text: 'for incapacitated characters',
								},
								{
									level: 4,
									text: 'for mortally wounded characters',
								},
							],
						},
					},
					effect: {
						short: [],
						long: `Remain conscious allows a Jedi to remain conscious even when he has suffered injuries which would knock him unconscious. In game terms, when a character with this power suffers this kind of injury, they lose all of their actions for the rest of the round, but they are still conscious (normal characters automatically pass out). On the next round, the character may attempt to activate the power – this must be the first action of that round; the Jedi cannot even dodge or parry.<br>
						If the role is unsuccessful, the Jedi passes out. If successful, the Jedi can do any one other action declared for that round – often characters will attempt to control pain so that he will be able to remain conscious. Once this action is completed, the Jedi will lapse into unconsciousness, unless control pain or something else is done to keep the character conscious.`,
					},
					example: {
						long: `Ana suffers several stuns and should be knocked unconscious ... but she has remain conscious. Ana loses her remaining actions for that round, but she is still awake.<br>
						At the beginning of the next round, Ana’s player declares that she will try to activate remain conscious and control pain. The player makes the Moderate control roll to activate remain conscious, so Ana stays awake for the rest of the round. (If the roll had failed or Ana hadn’t activated remain conscious, she would have passed out at the beginning of the round.) Ana must now make a Very Easy control roll to activate control pain. If she succeeds, she may now act normally; if the roll fails, Ana is overwhelmed by the pain and slips into unconsciousness.`,
					},
				},
				hibernation_trance: {
					name: 'Hibernation Trance',
					powers: ['control'],
					extra: [this.data.extra.keptUp],
					difficulty: {
						control: {
							level: [
								{
									level: 4,
								},
							],
						},
					},
					effect: {
						short: [],
						long: `The Jedi places himself into a deep trance, remarkably slowing all body functions. The Jedi’s heartbeat slows, his breathing drops to barely perceivable levels, and he falls unconscious.<br>
						When a Jedi enters a hibernation trance, the character must declare how much time they will spend and/or under what circumstances the character will awaken: after a specific amount of time, or what stimulus needs to be present (noise, someone touching them, etc.). A character can heal while in a hibernation trance, but may not use any other skills or Force powers.<br>
						Hibernation trance serves two purposes. It allows a Jedi to "play dead." It can be used to survive when food or air supplies are low. A character in hibernation uses only about a tenth as much as someone who is sleeping – he can hibernate for a week in a dry climate, for up to a	month in a wet climate before dying of thirst.<br>
						Anyone who sees a Jedi in hibernation assumes he is dead unless he makes a point to test him. Another Jedi with the sense skill or the life detection power will be able to detect the Force within the hibernating character and realize that he is alive.`,
					},
				},
				accelerate_healing: {
					name: 'Accelerate Healing',
					powers: ['control'],
					timeToUse: this.data.time.minute,
					difficulty: {
						control: {
							level: [
								{
									level: 2,
									text: 'for wounded characters',
								},
								{
									level: 3,
									text: 'for incapacitated characters',
								},
								{
									level: 4,
									text: 'for mortally wounded characters',
								},
							],
						},
					},
					effect: {
						short: [],
						long: `A Jedi who uses this power successfully may make two natural healing rolls for the current day (12 hours apart) regardless of the severity of the injury. The Jedi gets a +2 modifier to both Strength rolls to heal. Accelerate healing may only be attempted once per day.`,
					},
					example: {
						long: `Ana has been incapacitated; normally a full two weeks of rest are necessary before she can roll to heal.<br>
						She makes her Moderate control roll to activate accelerate healing. She now gets to make two Strength rolls to heal and gets to add +2 to both rolls.<br>
						Since she’s incapacitated, Ana needs a total of 9 or better to improve to wounded.<br>
						Ana’s first Strength roll is an eight; adding the +2 gives her a total of 10. She improves from incapacitated to wounded twice (she’s at –2D to all actions).<br>
						Twelve hours later, Ana gets to make her second healing roll. Since she’s wounded, she only needs a Strength total of 7 to improve from wounded twice (at –2D) to wounded (-1D to all actions). Her Strength roll is seven; the +2 gives her a total of nine. She now heals to wounded.`,
					},
				},
				control_breathing: {
					name: 'Control Breathing',
					powers: ['control', 'alter'],
					required: ['Concentration', 'Hibernation Trance', 'Telekinesis'],
					extra: [this.data.extra.keptUp],
					difficulty: {
						control: {
							level: [
								{
									level: 3,
								},
							],
						},
						alter: {
							level: [
								{
									level: 5,
								}
							]
						},
					},
					effect: {
						short: [],
						long: `This power allows a Jedi to control the amount of oxygen flowing into his or her body. The Jedi takes control of the surrounding atmosphere, pulling oxygen molecules through the skin into the lungs. With this power the Jedi can effectively breathe underwater, and conversely, a water breather could survive on land. In game terms, this power negates the need for a breath mask, mechgill, or any rebreather gear.<br>
						In the cold of space or a hard vacuum, however, this power would be of little use. Even if the Jedi could somehow survive the drastic changes in pressure or the extreme temperatures, there is not enough oxygen in these environments for the Jedi to “grab.”<br>
						The power will remain up until the character either takes incapacitating damage or willfully drops it.`,
					},
				},
			},
		},
		enhance_senses: {
			name: 'Enhance Senses',
			skills: {
				merge_senses: {
					name: 'Merge Senses',
					powers: ['sense'],
					timeToUse: this.data.time[3],
					required: ['Magnify Senses'],
					difficulty: {
						sense: {
							level: [
								{
									level: 3,
								},
							],
							modifiers: [this.data.modifiers.proximity],
						},
					},
					effect: {
						short: [],
						long: `This power allows a Force user to perceive things through the senses of another creature, one with animal intelligence or less. He can see through the eyes of the selected creature, enjoying the benefits of being bound by the restrictions of the creature’s vision. He can hear through the creature’s ears; smell was that creature smells; and physically feel whatever the creature is feeling. The Force user does not control the creature, but can make suggestions. The simpler or less threatening the request, the more likely it will be agreed to. If a suggestion goes against the nature of the creature or would put it in an obviously hazardous situation, the Force user must make a sense roll against the subject’s willpower. Failure means the suggestion is ignored.<br>
						While the Force user’s senses are merged with a creature’s, the Force user’s body is motionless, its senses unable to function until, of course, the meld is broken. Releasing the target creature requires a Moderate roll. The link with the creature is also broken by the death of either the creature of the Force user. If the creature suffers damage or dies during a meld, the Force user suffers one-half the amount of damage.`,
					},
				},
				magnify_senses: {
					name: 'Magnify Senses',
					powers: ['sense'],
					timeToUse: this.data.time[3],
					difficulty: {
						sense: {
							level: [
								{
									level: 1,
								},
							],
							modifiers: [this.data.modifiers.proximity],
						},
					},
					effect: {
						short: [],
						long: `This power allows a Jedi to increase the effectiveness of his normal senses to perceive things that are otherwise impossible without aid. He can hear noises beyond his normal hearing due to distance or softness – he can’t hear or see beyond normal species frequencies. Likewise, he can see normal visible things over distances that would normally require the use of macrobinoculars, and identify scents and odors that are normally too faint for human olfactory senses.`,
					},
				},
				life_sense: {
					name: 'Life Sense',
					powers: ['sense'],
					required: ['Life Detection'],
					extra: [this.data.extra.keptUp],
					difficulty: {
						sense: {
							level: [
								{
									level: 1,
								},
							],
							modifiers: [
								this.data.modifiers.proximity,
								this.data.modifiers.relationship,
							],
						},
					},
					effect: {
						short: [],
						long: `The user can sense the presence and identity of a specific person for whom he searches. The user can sense how badly wounded, diseased, or otherwise physically disturbed the target is.<br>
						A target may use the control skill to hide his identity from the Jedi uses life sense. The character’s control skill is added to the senser’s difficulty.`,
					},
				},
				life_detection: {
					name: 'Life Detection',
					powers: ['sense'],
					extra: [this.data.extra.keptUp],
					difficulty: {
						sense: {
							level: [
								{
									level: 1,
									text: 'if subject has Force skills or is Force-sensitive',
								},
								{
									level: 3,
									text: 'if not',
								},
							],
							modifiers: [this.data.modifiers.relationship],
						},
					},
					effect: {
						short: [],
						long: `This power allows the Jedi to detect the location of sentient beings who might otherwise remain hidden from their normal senses. When the power is activated, the Jedi knows the location of all sentients within 10 meters – if the power is kept up, the Jedi may know whenever a sentient approaches within 10 meters of them or vice versa.<br>
						When the Jedi approaches or is approached by a sentient being, the character makes a sense roll and each sentient creature makes an opposed control or Perception roll to avoid detection. Both actions are "free" actions and don’t count as a skill use (and thus there are no die code penalties except those caused by injury). If a tie occurs, the Jedi detects the creature in question.<br>
						If Jedi beats the target’s roll by 10 or more points, the Jedi is aware if the person has Force skills (yes or no), is Force-sensitive (yes or no), or if they have met before (yes or no), and if yes, what their identity is.`,
					},
					example: {
						long: `Ana has her life detection power "up." Bill, the gamemaster, knows that three Gamorreans are approaching Ana from behind. She rolls her sense to see if she can detect the beings — she rolls a 22.<br>
						The first Gamorrean’s roll is a 9; Ana’s roll beats his by 13 points. Ana knows the being is not Force-sensitive, doesn’t have Force skills; since Ana’s never met the being before, she doesn’t know its identity, not even its species.<br>
						The second Gamorrean rolls a 15 — Ana only knows about the existence and location of the second being.<br>
						Ana’s roll beats the third Gamorrean’s by 11 points, so she knows that this being is also not Force-sensitive and doesn’t have Force skills. However, Ana has met the creature before—she knows the third being is Draughckt, a Gamorrean she met a few years earlier on the planet Seltos.`,
					},
				},
				danger_sense: {
					name: 'Danger Sense',
					powers: ['sense'],
					required: ['Life Detection'],
					extra: [this.data.extra.keptUp],
					difficulty: {
						sense: {
							level: [
								{
									level: 3,
								},
								{
									level: 'Attacker’s Control roll',
									hover: 'Alternative',
								},
							],
						},
					},
					effect: {
						short: [],
						long: `Danger sense allows a Jedi to extend his senses around himself like protective sensors creating an early warning system for as long as the power remains in effect.<br>
						When this power is used, the Jedi detects any attacks the round before they are made. This gives the Jedi a round to decide how to react to the danger.<br>
						In game terms, if a character plans to attack the Jedi on the next round, she must declare her action the round before. Attacking characters with Force skills may roll their control skill to increase the difficulty of using this power.<br>`,
					},
				},
				combat_sense: {
					name: 'Combat Sense',
					powers: ['sense'],
					required: ['Danger Sense', 'Life Detection'],
					difficulty: {
						sense: {
							level: [
								{
									level: 3,
									text: 'for one opponent',
								},
							],
							increased: [
								{
									add: '+3',
									text:
										'for each additional opponent the Jedi wishes to defend against',
								},
							],
						},
					},
					effect: {
						short: [],
						long: `Combat sense allows a Jedi to focus on the battle at hand. Everything else becomes dulled and muted as the Jedi’s senses are all turned toward the combat occurring around him. All targets become mentally highlighted in the Jedi’s mind, enhancing his ability to attack and defend. In game terms, the Jedi gains important advantages.<br>
						First, the Jedi may choose when he wishes to act that round—no initiative rolls are necessary while the power is in effect. If more than one Jedi is using the power, whoever rolled highest when invoking the power determines when he wishes to act.<br>
						Second, the Jedi’s attack and defense rolls are increased by +2. Combat sense lasts for ten combat rounds and doesn’t count as a "skill use" for determining die code penalties.`,
					},
				},
				direction_sense: {
					name: 'Direction Sense',
					powers: ['sense'],
					required: ['Danger Sense', 'Life Detection'],
					extra: [this.data.extra.keptUp],
					difficulty: {
						sense: {
							level: [
								{
									level: 2,
								},
							],
							modifiers: [this.data.modifiers.proximity],
						},
					},
					effect: {
						short: [],
						long: `Direction sense allows a Jedi to be guided by the Force toward a particular goal or destination. It could be an object of importance, the north pole of a planet, the nearest cantina, etc., but this power does not sense life forms.<br>
						Alternatively a Jedi may use the Force for guidance through a maze-like cavern. If the Jedi meets the required sense difficulty, she just knows the general direction the object or location is in: left, right, forward, behind, above, below. If she succeeds by 10 or more, the Jedi knows exactly in what direction and how faraway the location is from her current position.<br>`,
					},
				},
				farseeing: {
					name: 'Farseeing',
					powers: ['control', 'sense'],
					timeToUse: this.data.time.minute_plus,
					requires: ['Life Sense'],
					difficulty: {
						control: {
							level: [
								{
									level: 1,
								},
							],
							increased: [
								{
									add: '+5 to +20',
									text: 'to see something in the past',
								},
								{
									add: '+10 to +30',
									text: 'to see something in the future',
								},
							],
							modifiers: [this.data.modifiers.proximity],
						},
						sense: {
							level: [
								{
									level: 1,
									text: 'if the target is friendly and doesn’t resist',
								},
								{
									level: 'Target’s Control or Perception'
								}
							],
							modifiers: [this.data.modifiers.relationship],
						}
					},
					effect: {
						long: `The Jedi may see the person or place he wishes to see in his mind as the situation currently exists. The power can also be used to see the future or the past. The Jedi sees the immediate surroundings, for example, when a friend is in danger, or what happened on his home planet in his absence.<br>
						Farseeing requires calm conditions and at least one minute, but often takes a few minutes. Farseeing cannot be done in the face of danger. The Jedi’s vision may not be entirely accurate:
						<div style="display: flex">
							<ul style="list-style: none; text-align: center;">
								<li><b><i>Power roll</i></b></li>
								<li>0 - 10</li>
								<li>11 - 20</li>
								<li>21 - 30</li>
								<li>31+</li>
							</ul>
							<ul style="list-style: none; text-align: center;">
								<li><b><i>Sense Difficulty</i></b></li>
								<li>50%</li>
								<li>75%</li>
								<li>90%</li>
								<li>100%</li>
							</ul>
							<ul style="list-style: none; text-align: center;">
								<li><b><i>Past / Present / Future</i></b></li>
								<li>10%</li>
								<li>25%</li>
								<li>50%</li>
								<li>75%</li>
							</ul>
						</div>
						The past and present are set and it is merely a matter of the Jedi having correct perceptions. However, the future is always fluid, always in motion, never set until it becomes the present — therefore it is much harder to predict. The percentages on the chart are a rough measure of how much correct information the character receives in the vision.<br>
						For example, 10% means that the character will only be able to make out the most basic details of a situation, such as “My friends are in danger.” 25% means that the Jedi gets a some what accurate vision of what will transpire, but most major details will be missing from the vision. 50% means that the character’s vision was about half right. 75% means that the character has an understanding of the critical happenings, but the character still has missed a major detail or two, which, of course, can complicate things. 90% means that the character has a very accurate and very detailed vision of what has transpired or will transpire. 100% means that the character’s vision is even more accurate and detailed, complete with minor, almost trivial details.<br>
						When a character farsees into the future, the gamemaster has to make an honest effort to correctly represent what will happen: if the characters get a 75% result, the gamemaster must try to predict what he thinks the characters will do and what the outcome will be. Of course, since the future is so fluid, things are always subject to change. Farseeing is a great mechanic for the gamemaster to reveal part of the story — enough to tantalize the players, without ruining the story.`,
					},
				},
			},
		},
		communication: {
			name: 'Communication',
			skills: {
				affect_mind: {
					name: 'Affect Mind',
					powers: ['control', 'sense', 'alter'],
					difficulty: {
						control: {
							level: [
								{
									level: 1,
									text: 'for perceptions',
								},
								{
									level: 2,
									text: 'for memories',
								},
								{
									level: 3,
									text: 'for conclusions',
								},
							],
							modifiers: [this.data.modifiers.proximity],
						},
						sense: {
							level: [
								{
									level: 'Target’s Control or Perception roll',
									hover: 'Found ya!',
								},
							],
						},
						alter: {
							level: [
								{
									level: 1,
									text:
										'for slight, momentary misperceptions, minor changes to distant memories, or if the character doesn’t care one way or another',
								},
								{
									level: 2,
									text:
										'for brief visible phenomena, memories less than a year old, or minor emotions regarding a coming conclusion',
								},
								{
									level: 3,
									text:
										'for short hallucinations, memories less than a day old, or if the target has strict orders about the conclusion',
								},
								{
									level: 4,
									text:
										'slight disguise to facial features, hallucinations which can be sensed with two senses (sight and sound, for example), memories less than a minute old, or if the matter involving the conclusion is very important to the target',
								},
								{
									level: 5,
									text:
										'for hallucinations that can be sensed with all five senses, a major memory change, or if the logic is absolutely clear and coming to the wrong conclusion is virtually impossible',
								},
							],
						},
					},
					effect: {
						short: [],
						long: `This power is used to alter a character’s perception so that he senses an illusion or fails to see what the Jedi doesn’t want him to see. This power is used to permanently alter a character’s memories so that he remembers things incorrectly or fails to remember something. This power can also be used to alter a character’s conclusions so that he comes to an incorrect conclusion.<br>
						Before making skill rolls, the character must describe exactly what he wants the effect to be. The power is normally on one target; two or more targets can only be affected if the power is used two or more times.<br>
						A character believes he is affected by any successful illusions – a character who thinks he is struck by an illusionary object would feel the blow. If he thinks he was injured, pain would be felt, or if he thought he was killed, he would become unconscious. The character does not suffer any true injury.<br>
						This power can’t be used to affect droids and does not work through recording devices.`,
					},
				},
				translation: {
					name: 'Translation',
					powers: ['sense'],
					required: [
						'Receptive Telepathy',
						'Projective Telepathy',
						'Life Sense',
					],
					extra: [this.data.extra.keptUp],
					difficulty: {
						sense: {
							level: [
								{
									level: 3,
									text: 'for humans or aliens',
								},
								{
									level: 4,
									text: 'for droids',
								},
							],
							increased: [
								{
									add: '+5',
									text: 'if target is being purposely cryptic',
								},
								{
									add: '+20',
									text: 'if the language is written down',
								},
							],
						},
					},
					effect: {
						short: [],
						long: `The character may translate a language and speak it. The Jedi may decipher body language, explore the spoken word, or translate ancient Sith texts, etc. In order for this to work, the character must first hear the target speak, or see the works in written form (such as an ancient text or document). It takes only one application of this power to "understand" a language. As long as they all speak the same language and the power is kept up, the character need not roll for each individual talking. Also because they also "speak" using beeps and whistles, droids may be communicated with using this power.<br>
						Note that the character does not really know the language. Once this power is no longer in use, the Jedi is once again unable to understand or speak the language.`,
					},
				},
				receptive_telepathy: {
					name: 'Receptive Telepathy',
					powers: ['sense'],
					required: ['Life Sense'],
					extra: [
						this.data.extra.keptUp +
						' if target is willing and proximity modifier doesn’t increase',
					],
					difficulty: {
						sense: {
							level: [
								{
									level: 1,
									text: 'for friendly, non-resisting targets',
								},
								{
									level: 'Perception or Control',
									text: 'if target resists',
								},
							],
							modifiers: [
								this.data.modifiers.proximity,
								this.data.modifiers.relationship,
							],
						},
					},
					effect: {
						short: [],
						long: `If the Jedi makes the power roll, he can read the surface thoughts and emotions of the target. The Jedi "hears" what the target is thinking, but cannot probe for deeper information. When used on another player, the gamemaster asks the player if he minds the power being used on him/her. If used on a gamemaster character the gamemaster decides if the target will resist.<br>
						If the skill’s roll is double the difficulty, the Jedi can shift through memories up to 24 hours old, though this takes two rounds. A Jedi cannot sift through memories in the same round that contact is made – this process takes a full round.<br>
						A Jedi can read the minds of more than one person at a time, but each additional person counts as an additional action, with separate rolls and multiple skill use penalties.<br>
						This power may be used on creatures and other sentient beings, although it cannot be used on droids.`,
					},
				},
				projective_telepathy: {
					name: 'Projective Telepathy',
					powers: ['control', 'sense'],
					required: ['Receptive Telepathy', 'Life Sense'],
					extra: ['<b>Homebrew:</b> Checks with friend s and upwards succeed automatically'],
					difficulty: {
						control: {
							level: [
								{
									level: 1,
								},
							],
							increased: [
								{
									add: '+5 to +10',
									text:
										"if Jedi cannot verbalize thoughts he's transmitting (Zebron GM Rule: increase doesn't apply)",
								},
							],
							modifiers: [this.data.modifiers.proximity],
						},
						sense: {
							level: [
								{
									level: 1,
									text: 'if target is friendly and doesn’t resist',
								},
								{
									level: 'Perception or Control',
									text: 'if target resists',
								},
							],
							modifiers: [this.data.modifiers.relationship],
						},
					},
					effect: {
						short: [],
						long: `If the Jedi successfully projects his thoughts, the target "hears" his thoughts and "feels" his emotions. The Jedi can only broadcast feelings, emotions and perhaps a couple of words – this power cannot be used to send sentences or to hold conversations.<br>
						The target understand that the thoughts and feelings he is experiencing are not his own and that they belong to the user of the power. If the Jedi doesn’t "verbally" identify himself, the target doesn’t know who is projecting thoughts to him. This power can only be used to communicate with other minds, not control them.`,
					},
				},
			},
		},
		party: {
			name: 'Party',
			skills: {
				control_anothers_pain: {
					name: "Control Another's Pain",
					powers: ['control', 'alter'],
					required: ['Control Pain'],
					difficulty: {
						control: {
							level: [
								{
									level: 1,
								},
							],
							modifiers: [this.data.modifiers.relationship],
						},
						alter: {
							level: [
								{
									level: 2,
									text: 'for wounded characters',
								},
								{
									level: 3,
									text: 'for incapacitated characters',
								},
								{
									level: 4,
									text: 'for mortally wounded characters',
								},
							],
						},
					},
					effect: {
						short: [],
						long: `This power allows a Jedi to help another character control pain, under the same rules and conditions outlined in the same rules and conditions outlined in the control pain power. The Jedi must be touching the character to use this power. [<b>Editor’s note</b>: The Tales of the Jedi Companion removes the restriction that the Jedi must be touching the character, and instead modifies the difficulty by proximity.]`,
					},
				},
				accelerate_anothers_healing: {
					name: 'Accelerate Another’s Healing',
					powers: ['control', 'alter'],
					required: ["Control Another's Pain", 'Control Pain'],
					timeToUse: this.data.time.minute,
					difficulty: {
						control: {
							level: [
								{
									level: 1,
								},
							],
							modifiers: [this.data.modifiers.relationship],
						},
						alter: {
							level: [
								{
									level: 1,
								},
							],
						},
					},
					effect: {
						short: [],
						long: `This allows a Jedi to heal another character. The target is allowed to make extra healing rolls, as outlined in accelerate healing. The Jedi must be touching the character whenever he attempts a healing roll.`,
					},
				},
				transfer_force: {
					name: 'Transfer Force',
					powers: ['control', 'alter'],
					required: ['Control Pain', 'Control Another’s Pain'],
					timeToUse: this.data.time.minute,
					difficulty: {
						control: {
							level: [
								{
									level: 2,
								},
							],
							modifiers: [this.data.modifiers.relationship],
						},
						alter: {
							level: [
								{
									level: 3,
								},
							],
						},
					},
					effect: {
						short: [],
						long: `This power will save a mortally wounded character from dying because the Jedi is transferring her life force to the target. When a character has force transferred to him, he remains mortally wounded, but he will not die provided he isn’t injured again. The injured character is in hibernation and will stay alive in this state for up to six weeks. The Jedi must be touching the target character when the power is activated.<br>
						When this power is used, the user must spend a Force Point (this is the life force that is transferred to the target). This use is always considered heroic, so the character will get the Force Point back at the end of the adventure.<br>
						The recipient of this power must be willing.`,
					},
				},
			}
		}
	};
}
