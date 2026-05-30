import { Extra, Modifier, Power, Skill } from "./powers";

const lightsaber_combat = new Skill("Lightsaber Combat");
lightsaber_combat.setPowers([Power.control, Power.sense]);
lightsaber_combat.setExtra(Extra.keptUp);
lightsaber_combat.addDifficulty(Power.control, 3);
lightsaber_combat.addDifficulty(Power.sense, 2);
lightsaber_combat.setEffect(`To use a lightsaber most effectively, a Jedi learns this power. The Jedi uses this power both to wield this elegant but difficult-to-control weapon while also sensing his opponent's actions through his connection to the Force.<br>
This power is called upon at the start of a battle and remains up until the Jedi is stunned or injured; a Jedi who has been injured or stunned may attempt to bring the power back up.<br>
If the Jedi is successful in using this power, the Jedi adds his sense dice to his lightsaber skill roll when trying to hit a target or parry, and he adds or subtracts up to the number of his control dice to the lightsaber's 5D damage when it hits in combat. Players must decide how many control dice they are adding or subtracting before they roll damage.<br>
If the Jedi fails the power roll, he must use the lightsaber with only his lightsaber skill to hit and the weapon's normal damage in combat and he cannot attempt to use the power again for the duration of the combat.<br>
Finally, the Jedi may use lightsaber combat to parry blaster bolts as a "reaction skill". To do this, the character must declare that he is parrying that round, using his lightsaber skill as normal.<br>
The Jedi may also attempt to control where detected blaster bolts go; this is a reaction skill and counts as an additional action. (The Jedi cannot full parry when trying to control deflected bolts.) The Jedi must declare which specific shot he is controlling. Then, once the roll is made to see if the blaster bolt was parried by the Jedi, the Jedi makes a control roll, with the difficulty being his new target's dodge or the range (figured from the Jedi to his target). The damage is that of the original blaster bolt.`);
lightsaber_combat.setExample(`Ana is entering combat: she has a lightsaber skill of 4D, a control of 5D and a sense of 4D+2. She activates lightsaber combat by making her Moderate control roll and her Easy sense roll; she decides to keep the power "up". Since she is making both the control and sense rolls in the same round, each suffers a -1D penalty.<br>
She adds her sense of 3D+2 (4D+2-1D) to her lightsaber skill roll of 4D, for a total lightsaber of 7D+2. She adds her control of 4D (5D-1D) to her lightsaber's damage of 5D, for a total of 9D.<br>
When Ana attacks in a round, that's another action, for an additional -1D penalty to all actions (total penalty of -2D); she'd only roll 6D+2 to attack and would roll 8D for damage.<br>
Ana Decides to parry a blaster bolt and control where it goes. This is two more actions in a round, which means a total of four actions (don't forget the control and sense to keep the power "up"), for a penalty of -3D: Ana's lightsaber skill is 5D+2, and her lightsaber's damage is 7D.<br>
Ana's attacker is using a blaster pistol that causes 4D damage.<br>
First Ana makes her parry roll with her lightsaber: her parry roll of 18 is higher than the attacker's blaster roll of 13, so Ana parries the bolt.<br>
Now, Ana tries to control the blaster bolt. Her target is 20 meters away – that's a Moderate difficulty for the blaster pistol. Ana rolls a 14 with her control – just barely good enough to hit. The blaster bolt bounces off Ana's lightsaber blade and hits another goon, causing 4D damage.`);

const telekinesis = new Skill("Telekinesis");
telekinesis.setPowers(Power.alter);
telekinesis.setExtra([Extra.inSight, Extra.keptUp]);
telekinesis.addDifficulty(Power.alter, 1, `0kg < obj ≤ 1kg`);
telekinesis.addDifficulty(Power.alter, 2, `1kg < obj ≤ 10kg`);
telekinesis.addDifficulty(Power.alter, 3, `10kg < obj ≤ 100kg`);
telekinesis.addDifficulty(Power.alter, 4, `100kg < obj ≤ 1.000kg`);
telekinesis.addDifficulty(Power.alter, 5, `1.000kg < obj ≤ 10.000kg`);
telekinesis.addDifficulty(Power.alter, 6, `10.00kg < obj ≤ 100.000kg`);
telekinesis.addIncrement(Power.alter, `+5`, `+10 meters/round movement`);
telekinesis.addIncrement(Power.alter, `+1 to +5`, `for gentle turns`);
telekinesis.addIncrement(Power.alter, `+6 to +10`, `for easy maneuvers`);
telekinesis.addIncrement(Power.alter, `+11 to +25`, `for complex maneuvers`);
telekinesis.setModifiers(Power.alter, Modifier.proximity);
telekinesis.setEffect(`By using this power, a Jedi may levitate objects with mental power. If used successfully, the object moves as the Jedi desires.<br>
A Jedi can lift several objects simultaneously, but each additional object requires the Jedi to make a new telekinesis roll.<br>
This power can be used to levitate oneself or others. It can be used as a primitive space drive in emergencies. When levitating against someone's will, the target will resist by adding his or her Perception or control roll to the difficulty number.<br>
Levitated objects can be used to attack other characters, but this automatically gives the Jedi a Dark Side Point. Such objects do up to 1D damage if under one kilogram, 2D if one to ten kilos, 4D if 11to100 kilos, 3D Speeder-scale if one to ten tons, 5D Starfighter-scale if 11 to 100 tons.<br>
Such attacks require an additional control roll by the Jedi, which would be this hit roll against the target's dodge. If the character doesn't dodge the attack, the difficulty if Easy.`);

const kinetic_combat = new Skill("Kinetic Combat");
kinetic_combat.setPowers(Power.alter);
kinetic_combat.setSource(`Hero's Guide, page 42`);
kinetic_combat.setRequired(telekinesis);
kinetic_combat.addDifficulty(Power.alter, 4);
kinetic_combat.setEffect(`Once the Jedi has successfully activated this power, he may wield a melee weapon or lightsaber with the power of the Force at a distance up to 10 meters, as though the weapon were in his hands using his melee weapons or lightsaber skill respectively. Multiple action penalties apply. The first round, the Jedi can make only one attack. As his control improves, he may attack with the weapon as many times as possible (as determined by multiple action penalties).`);

const concentration = new Skill("Concentration");
concentration.setPowers(Power.control);
concentration.addDifficulty(Power.control, 2, `relaxed and at peace`);
concentration.addDifficulty(Power.control, 4, `filled with aggression, fear or other negative emotions`);
concentration.addDifficulty(Power.control, 5, `acting on the negative emotions`);
concentration.setEffect(`When using this power, Jedi clear Force Powers 5 all negative thoughts from their minds, feeling the Force flowing through the universe and their own being.<br>
The individual Jedi concentrates on one specific task at hand. If the skill roll is successful, the Jedi may add +4D to any one action in that round. The Jedi may do nothing other than using the concentration power and using that one skill for a single action. The Jedi receives no bonus if anything else is done in that round, including duplicate uses of the same skill or dodges or parries.<br>
This power may be used in conjunction with Force Points and Character Points. This power is only in effect for one round and may not be kept up.`);
concentration.setExample(`Luke is flying down the trench of the Death Star. With Ben’s urging, he clears his mind of negative thoughts, and feels the Force flowing through him. Using the Force, he concentrates on the task at hand of firing a proton torpedo into the unshielded exhausst port. Since he has cleared his mind, the control difficulty is Easy.<br>
Luke’s player declares that Luke is also spending a Force Point to accomplish the task this round. Luke’s starship gunnery skill is 6D. he looses -1D for doing one other thing in the round (using the Force counts as an action), reducing his starship gunnery skill to 5D. Because he rolls successfully for his control, he receives the bonus of +4D, making his effective skill for that round 9D. Because he is spending a Force Point, his skill level is doubled to 18D!<br>
If Luke attempted any other action in that round, including firing another proton torpedo or blaster, or dodging enemy shots, he would receive no bonus.`);

const life_detection = new Skill("Life Detection");

const force_push = new Skill("Force Push");
force_push.setPowers(Power.alter);
force_push.setSource(`Core Rulebook, page 86`);
force_push.setRequired([concentration, life_detection, telekinesis]);
force_push.setExtra(Extra.inSight);
force_push.addDifficulty(Power.alter, `Target's control or Strength roll`, null, `Looking for something?`);
force_push.addIncrement(Power.alter, `+3`, `for every 5 meters away from target`);
force_push.setEffect(`With this power, a Jedi may use the Force to push several adjacent targets backwards, knocking them prone or banging them against a wall. Each target past the first incurs a -1D penalty on the Jedi using the power (ie, 1 target, no penalty; 2 targets, -1D penalty; 3 targets, -2D penalty; 4 targets, -3D penalty…). Each target makes either a control or Strength roll to resist, and the acting Jedi's alter roll result is compared to each result in turn to determine the effects. A target that is knocked back into a wall or other solid object takes the listed damage. If a Jedi kills a living being as a result of this power he immediately receives a Dark Side Point; as such, he may roll less than his full alter score if he so chooses.
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
</table>`);

const absorb_dissipate_energy = new Skill("Absorb/Dissipate Energy");
absorb_dissipate_energy.setPowers(Power.alter);
absorb_dissipate_energy.setExtra(Extra.keptUp + ` as long as the source of energy is constant – for blaster bolts or Force lightning, it is used as a reaction skill, multiple action penalties apply for use to block fire (as though it were a dodge skill)`);
absorb_dissipate_energy.addDifficulty(Power.alter, 1, `for sunburn and other very minor energy sources`);
absorb_dissipate_energy.addDifficulty(Power.alter, 2, `for intense sun`);
absorb_dissipate_energy.addDifficulty(Power.alter, 3, `for solar wind and other modest energy sources (blaster bolts and Force lightening)`);
absorb_dissipate_energy.addDifficulty(Power.alter, 4, `or radiation storms and other intense energy sources (speeder-scale damage)`);
absorb_dissipate_energy.addIncrement(Power.alter, `+20`, `Area of Effect:
<ul>
<li>Point blank to 1 meters: -4D energy damage</li>
<li>2 meters: -3D energy damage</li>
<li>3 meters: -2D energy damage</li>
<li>4 meters: -1D energy damage</li>
</ul>`);
absorb_dissipate_energy.addIncrement(Power.alter, `+30`, `Walker-scale`);
absorb_dissipate_energy.addIncrement(Power.alter, `+40`, `Starfighter-scale`);
absorb_dissipate_energy.setEffect(`This power allows the Jedi to absorb or dissipate energy, including light, heat, radiation and blaster bolts. A successful control roll means that the energy is dissipated. If the user fails the roll, she takes full damage from the energy.<br>
This power may be used to ward off sunburn, heat-stroke and radiation exposure, as well as withstand intense heat.<br>
The character may activate the power as a “reaction skill” to absorb the blaster bolt or Force lightning — the roll replaces the ranged target number the shooter who must roll equal or higher in order to hit.`);
absorb_dissipate_energy.setExample(`A stormtrooper is shooting at Ana. Rather than dodge behind cover, she decides to use absorb/dissipate energy to absorb the shot. The difficulty is Moderate. For the Moderate difficulty, thegamemaster picks a difficulty number of 14. Ana rolls control and gets a 21.<br>
If the blaster’s damage roll is less than 21, then Ana absorbs the blaster bolt and takes no damage. If the blaster’s damage roll is 21 or higher, she takes full damage from the blaster shot.`);

const magnify_senses = new Skill("Magnify Senses");

const lesser_force_shield = new Skill("Lesser Force Shield");
lesser_force_shield.setPowers([Power.sense, Power.alter]);
lesser_force_shield.setRequired([absorb_dissipate_energy, concentration, magnify_senses, telekinesis]);
lesser_force_shield.setExtra(Extra.keptUp);
lesser_force_shield.addDifficulty(Power.sense, 2);
lesser_force_shield.addDifficulty(Power.alter, 3);
lesser_force_shield.setEffect(`This power allows the Jedi to surround his body with a Force-generated shield. The shield can be used to repel energy and physical matter away from the Jedi’s body, down to the molecular level.<br>
The shield acts as STR+1D armor to all energy and physical attacks made against the Jedi, including non-directional attacks such as gas clouds and grenade blasts. The shield is not particularly strong, but can sometimes be just enough to protect the Jedi from serious injury.`);

const control_pain = new Skill("Control Pain");

const enhance_attribute = new Skill("Enhance Attribute");

const contort_escape = new Skill("Contort/Escape");
contort_escape.setPowers(Power.control);
contort_escape.setRequired([concentration, control_pain, enhance_attribute]);
contort_escape.addDifficulty(Power.control, 1, `for loose bonds`);
contort_escape.addDifficulty(Power.control, 2, `for hand binder`);
contort_escape.addDifficulty(Power.control, 3, `for serious restraints`);
contort_escape.addDifficulty(Power.control, 14, `for maximum security (varies at gamemaster’s discretion, depending on security measures)`);
contort_escape.setModifiers(Power.control, Modifier.proximity);
contort_escape.setEffect(`The character may escape bonds by contorting in painful and difficult (but still physically possible) ways. By stretching, twisting, and dislocating joints a Jedi can escape almost any physical restraining device. While this is indeed a painful procedure, Jedi are trained to block out the pain and focus on the task at hand.`);

export const power = {
	lightsaber_combat,
	kinetic_combat,
	force_push,
	absorb_dissipate_energy,
	lesser_force_shield,
	telekinesis,
	contort_escape,
	concentration,
};