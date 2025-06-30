export const ANIMA_EFFECTS: {
  [exaltType: string]: {
    [caste: string]: {
      description?: string;
      Passive?: string;
      Active?: string;
      Iconic?: string;
    };
  };
} = {
  
Lunar: {
  "Full Moon": {
	description: "The Full Moon is a warrior to their core, meeting the world’s dangers head on through physical prowess and dogged determination. They might be a warrior king or gloried hero. Their animal form is powerful and strong, such as a bear, bull, or horse. Their caste mark is a silver disc, and their anima shines bright and steady as the full moon. At the end of each session, Full Moon Castes gain an Exalt milestone if they defeated a significant foe in single combat.",
	Passive: "Unstoppable (Passive): Extras (p. 316) cannot deal damage to the Full Moon. Any damage rolls they would make on Step 7 generate 0 successes. Battle groups subtract the Full Moon’s Essence from their damage on Step 7.",
	Active: "Crushing Might (Active): The Lunar adds her Essence in automatic successes to any Force or Fortitude roll that is not an attack. This applies to Build Power actions and gambits as an exception.",
	Iconic: "Impossible Vigor (Iconic): The Lunar heals one damage any time they Incapacitate an enemy.",
  },
  "Changing Moon": {
    description: "The Changing Moon is a silver-tongued trickster, relying on cleverness and irrepressible charm to beat their foes. They might be a spy, assassin, or scout. Their animal shape is quick, clever, and often beautiful, such as a fox, cat, or raven. Their caste mark is a crescent moon, and their anima is a shifting of silver light and dark blue or purple shadows. At the end of each session, Changing Moon Castes gain an Exalt milestone if they committed a successful act of espionage or sabotage.",
    Passive: "Silver Tongue (Passive): Trivial targets cannot detect any lie the Changing Moon tells and accept it as truth no matter how outlandish. The Changing Moon cannot make them commit self-harm or do things they would not be capable of.",
    Active: "Trickster’s Cant (Active): The Lunar adds her Essence in automatic successes to social rolls made to persuade, bargain, or deceive. The Lunar must beguile their target in some regard.",
    Iconic: "Untouchable (Iconic): In combat, enemies targeting the Changing Moon with any action suffer a dice penalty equal to her Essence. Outside of combat, enemies cannot identify the character as anything other than some form of their iconic animal shape: either in a terrifying war-form or as a radiant god-beast. Onlookers still know she is some kind of magical being, if not a Lunar.",
  },
  "No Moon": {
    description: "The No Moon relies on intellect and wisdom. They like riddles and secrets, and challenge clever foes just to prove their superiority. They have a knack for sorcery. Their animal is one that symbolizes wisdom, mystery, or communion with mystical forces, such as an owl, snake, or octopus. Their caste mark is a silver circle, and dark blue and purple shadows cloud their anima, with just a trace of silver light at the edges. At the end of each session, No Moon Castes gain an Exalt milestone if they saved the day or changed the course of events with an application of wisdom, discretion, or their secret knowledge.",
    Passive: "Unseen Moon (Passive): Trivial targets cannot see or hear the No Moon unless the Lunar chooses to allow it. Significant characters suffer a three-dice penalty to determine her identity if she wishes to conceal it.",
    Active: "Silver Wisdom (Active): The Lunar adds their Essence in automatic successes to Fortitude or Finesse rolls involving observation, study, or the pursuit of knowledge, as well as Focus Will rolls.",
    Iconic: "Dark Moon’s Blessing (Iconic): All mundane efforts at stealth fail in the No Moon’s presence. Hidden objects fall from their hiding place. Creatures using Charms to hide must make a Stealth roll against a difficulty of 3 plus the No Moon’s Essence. Trivial targets keeping a secret from the No Moon immediately spill it, while non-trivial characters roll Integrity against a difficulty of her Essence or do the same.",
  },
  "Casteless": {
    description: "The Casteless may be newly Exalted, and not yet caught up with the Silver Pact. Or maybe they’re an elder Lunar who chooses to remain Casteless — either way they don’t benefit from moonsilver tattoos. They may have any kind of animal form. Their caste mark and anima are ever-changing, like the phases of the moon. At the end of each session, Casteless gain an Exalt milestone if they successfully executed a clever and daring plan.",
    Passive: "Reflected Moon (Passive): The Casteless chooses a passive anima effect from another Lunar caste to use as their own. They can change the passive effect whenever they gain a personal or Exalt milestone.",
    Active: "Shifting Moon’s Reserve (Active): Choose an Attribute + Ability roll iconic to the character. The Casteless always adds Essence in automatic successes to that roll. Choose the Attribute + Ability when this effect comes into play. It cannot be switched until the next scene.",
    Iconic: "Chimera’s Visage (Iconic): The Casteless may waive the usual cost for shapeshifting. While in iconic anima, the Casteless is immune to any effect that would transform her body against her will. She may spend 2 anima to end any single transformation already in effect when she reaches Iconic.",
  }
}
,
  
Solar: {
  "Dawn": {
    description: "The Dawn Caste comprises mighty warriors, charismatic generals, and genius strategists who fiercely defend their charges and lead armies to victory. Their animas are sunrise-hued: pale yellow, blue, and pink. Morning birds and hunting hawks call within, accompanied by the smell of molten metal. Their caste mark is a golden sunburst. At the end of each session, Dawn Castes gain an Exalt milestone if they fought in a battle, defended an ally, or intimidated an enemy into avoiding battle.",
    Passive: "Supernal Warrior (Passive): Without needing to roll, defeat up to the Dawn’s Essence in Extras (p. 316) on their turn, and add the Dawn’s Essence in dice to damage against battle groups (p. 322). Additionally, battle groups increase the difficulty to resist a rout check (p. 323) by the Exalt’s Essence.",
    Active: "Fearsome Visage (Active): The Dawn adds their Essence in automatic successes to attempts to frighten or intimidate an opponent, even if that opponent cannot normally be intimidated (such as mindless undead or automatons). Any gambits based on fear or intimidation have their cost reduced by one.",
    Iconic: "Unconquered (Iconic): At 10 anima, reflexively follow any Ranged or Close Combat attack with a secondary attack using a different Ability — including any rules or effects which allow Ability substitutions. These attacks must target different opponents unless the opponent is a single Size 3 or greater battle group or if they possess one of the following qualities: furious dragon’s ire, legendary size, or unstoppable (p. 317).",
  },
  "Zenith": {
    description: "The Zenith Caste are faithful priests and fiery orators, who inspire their followers to strive for justice. They’re holy warriors who vanquish the dead and creatures of darkness. Upon their Exaltation, the Unconquered Sun speaks directly to them. Their animas are the brilliant white and gold of the midday sky, streaked with cobalt. At the Iconic level, images of bulls, pillars, and other unyielding objects appear. Their caste mark is a golden solar disc. At the end of each session, Zenith Castes gain an Exalt milestone if they inspired a significant character with their words.",
    Passive: "All Eyes Upon Me (Passive): Trivial targets cannot ignore the Zenith’s social actions and will do as she asks as long as the request is reasonable. The Zenith gains the dice bonus from refusing her influence if any target chooses a hard bargain. Outside of combat, the Zenith may spend a mote to sanctify a corpse and reduce it to ash, rendering it beyond the reach of necromancy.",
    Active: "Purity of Purpose (Active): The Zenith adds their Essence in automatic successes to Presence and Performance rolls, or instantly reduces to fine ash any undead Extras or corpses they can perceive. Add the Zenith’s Essence in damage dice against undead battle groups.",
    Iconic: "Highest of Holies (Iconic): Add the Solar’s Essence in automatic successes to attacks against creatures of darkness. These attacks deal aggravated damage. The first time the Zenith reaches iconic anima in a scene, any battle group led by or consisting of creatures of darkness must immediately make a rout check with the difficulty increased by the Exalt’s Essence.",
  },
  "Twilight": {
    description: "Passionate in their pursuit of knowledge, the Twilight Caste are traveling scholars, engineers, and sorcerers, seeking to bring wisdom to the world and improve peoples’ lives. Their animas reflect the colors of sunset and early evening. At the Iconic level, images of tomes and gears swirl within. Their caste mark is a golden circle, filled with gold on the top and empty on the bottom half. At the end of each session, Twilight Castes gain an Exalt milestone if they used their knowledge to help a significant ally.",
    Passive: "Joyous Pursuit (Passive): Reduce difficulty to overcome obstacles while working on a venture (p. 151) involving investigation, research, or planning by the Twilight’s Essence, to a minimum of one.",
    Active:  "Indefatigable Genius (Active): Add the Solar’s Essence in automatic successes to Craft and Sagacity rolls, including Build Power and Focus Will actions.",
    Iconic: "Summoner’s Call (Iconic): Spend 5 anima. The Twilight may summon a minor elemental or First Circle demon of her choice, instantly calling it to her side. It remains bound to her for the rest of the scene, before sublimating into raw Essence or returning to Malfea, respectively.",
  },
  "Night": {
    description: "The Night Caste are spies and assassins, striking down the unrighteous from the cover of darkness. Where the other Lawgivers’ displays of power draw attention, Night Caste Solars are subtle. Shades of gray, violet, and black twist through their pale gold animas. At the Iconic level, they flash with the glint of moonlight on steel, and trail shadows in their wake. Their caste mark is an empty golden circle. At the end of each session, Night Castes gain an Exalt milestone if they successfully stole an important item or gained access to a locked or guarded space undetected.",
    Passive: "No One Special (Passive): The Night Caste can dampen her anima, preventing others from seeing it until she wants to be noticed. She cannot suppress her iconic anima. She gains a three-dice bonus to any roll to pretend to be someone she’s not.",
    Active: "Cloak of Shadows (Active): The Night Caste wraps her anima around her like a cloak and moves about unseen. Add her Essence in automatic successes to Stealth and Athletics rolls, including Build Power actions. Anyone who does notice her sees only a flickering shadow-visage; it’s impossible to discern her identity.",
    Iconic: "Vanishing Foe (Iconic): Spend 1 anima. After resolving a successful attack, the Night Caste may move instantly to any other location in the scene and gain her Essence in Power. Out of combat she becomes an immaterial thing and can move through solid matter as long as she ends her movement in an open space.",
  },
  "Eclipse": {
    description:"The Eclipse Caste are diplomats, negotiators, and peacemakers. They mend rifts between nations, de-escalate conflicts, and oversee bargains with the Fair Folk. Their white-and-gold animas coruscate outward into wispy trails like the corona of an eclipse. At the Iconic level, symbols of peace appear within them, while harmonious voices sing. Their caste mark is a golden disc within a circle. At the end of each session, Eclipse Castes gain an Exalt milestone if they successfully made a deal or defused a conflict between two significant characters or groups.",
    Passive: "Universal Scholar (Passive): The Eclipse may use an Exalt or minor milestone to learn qualities with the Eclipse keyword (p. 318) from spirits, Fair Folk, and other supernatural beings. For 2 anima, the Eclipse may seal an oath between two or more parties. They suffer a two-dice penalty to any subsequent rolls for the rest of the session if they break the agreement.",
    Active: "Esteemed Guest (Active): When the Eclipse negotiates with demons, Fair Folk, spirits, or the intelligent dead, they must welcome the Eclipse and entourage and present them with human hospitality. These beings must treat the Circle and her entourage with due respect for the duration of the scene. If the Eclipse or her guests act with hostility first, all subsequent hostile actions by the Eclipse and her allies (such as making attacks, threats, or Building Power, p. 183) are made at a difficulty increased by the Eclipse’s Essence.",
    Iconic: "Venerated Witness (Iconic): Everyone in the scene must honor their agreements with other characters in the Eclipse’s presence. If they choose not to, they suffer her Essence in increased difficulty to all actions taken to go back on their word. For 5 anima, the Eclipse may seal a greater oath between two parties. Anyone who chooses to break their vow suffers an appropriately grand curse determined by the Storyteller and player. The other party is aware of how and when the promise was broken.",
  }
}
,
  
"Dragon-Blooded": {
  Air: {
    description: "Air Aspects are idealists, visionaries, scholars, and innovators. They see the potential inherent in everyone and view the world as it could be. Their blue-and-white anima banners whirl and billow like storm clouds. At the Iconic level, lightning flashes, and birds and dragons glide within. At the end of each session, Air Aspects gain an Exalt milestone if they took an action toward furthering a long-term goal.",
    Passive: "Buoyed by the Wind (Passive): Once per turn, the Air Aspect may leap one additional range band vertically or horizontally as part of a movement action. She takes no falling damage from short range drops.",
    Active: "Mela’s Breath (Active): Subtract two dice from all ranged attacks targeting the Air Aspect.",
    Iconic: "Eye of the Hurricane (Iconic): Increase the Air Aspect’s Defense and the Defense of all allies within short range by half her Essence, rounded up. When targeted by influence which would sway her away from a long term goal or would drive her to act impulsively, increase her Resolve by one.",
  },
  Earth: {
    description: "Earth Aspects are implacable foes on the battlefield, standing firm to defend their allies. Stoic and resilient, they believe in strong foundations and sturdy structures, whether they’re building a community, an architectural marvel, or an imperial legion. What an Earth Aspect builds endures. Their yellow-and-white animas smell of loam and rumble like the shifting earth. At the Iconic level, mountains loom behind them and oxen and rocky dragons plod along in their glow. At the end of each session, Earth Aspects gain an Exalt milestone if they stood their ground against a foe.",
    Passive: "Fury of the Earth (Passive): The Earth Aspect reduces the cost of the knockback or knockdown gambits against extras to zero. Outside of combat, she may knock trivial characters within short range prone or one range band away without making an attack roll.",
    Active: "Pasiap Still Stands (Active): Add the Earth Aspect’s Essence to the cost of throw, knockback, and knockdown gambits used against them. This cannot make the cost exceed 10.",
    Iconic: "Unyielding Stone (Iconic): Add the Exalt’s Essence to her Soak for the remainder of the scene. The character cannot be targeted with the throw, knockback, and knockdown gambits. She may spend 2 anima when denying influence and prevent the target from gaining the dice bonus from her refusal. She may not apply this effect to the target again during the same scene.",
  },
  Water: {
    description: "Calm and relentless Water Aspects adapt to obstacles and wear down stubborn foes. As diplomats, investigators, and naval commanders, they see many paths to a satisfying solution. Their dark-blue and sea-green animas smell like brine and babble like brooks. At the iconic level, whirlpools churn within, and fish, siakas, and water dragons swim in their depths. At the end of each session, Water Aspects gain an Exalt milestone if they adapted their plans to accommodate a significant change of circumstances.",
    Passive: "Surface Skimmer (Passive): The Water Aspect may move along any liquid surface like it was solid ground — though this doesn’t afford her protection from acid or demon-tar — and breathes water as easily as air. She suffers no penalty to move or attack while underwater.",
    Active: "Flow of Daana’d (Active): Add Essence automatic successes to gambits where the Water Aspect attempts to disarm an opponent or pilfer an item. When an opponent targets her with a grapple or attempts to ensnare her, the Exalt adds her Essence to Defense.",
    Iconic: "Flow Like Water (Iconic): Once per turn, the Water Aspect may roll an attack twice on Step 3 and choose to keep the better result. In non-combat scenes, she may reroll any roll involving investigation, negotiation, or relentless pursuit.",
  },
  Fire: {
    description: "Passionate and dynamic, Fire Aspects’ emotions burn brightly. They sear their marks across the world as warriors, politicians, and iconoclasts. Their fiery red, orange, and gold animas smell of smoke or hot metal. At the Iconic level, volcanoes erupt within, and dragons and phoenixes cavort in the flames. At the end of each session, Fire Aspects gain an Exalt milestone if their passionate deeds or speeches influenced a significant character or group to take action.",
    Passive: "Where There’s Smoke (Passive): At the start of any scene, the Fire Aspect may sense anyone present in the scene who harbors grudges or heated emotions. Figuring out the cause of their enmity is up to the character. She gains a bonus die to any social actions to uncover or leverage those emotions.",
    Active: "Hesiesh’s Passion (Active): The Fire Aspect gains her Essence in automatic successes on social actions to inspire a crowd or persuade a target to act on his ambitions. She also becomes immune to mundane environmental hazards based on fire and heat for the scene and reduces the damage of magical sources or attacks by two dice (or 1 health level if it is not rolled).",
    Iconic: "Wildfire Dance (Iconic): The Fire Aspect’s fury ignites her weapons. The Exalt subtracts her Essence from the target’s Soak on Step 6. On a hit, the target catches fire and suffers from the burning surroundings hazard (p. 146) and increases the difficulty on the resistance roll by the Exalt’s Essence. The target rolls reflexively for this hazard at the end of the Exalt’s turn.",
  },
  Wood: {
    description: "Deeply attuned to the cycle of life and death, Wood Aspects are healers and poisoners, thrill seekers, and beast-tamers. New experiences exhilarate them. Vibrant greens color their animas, which smell of fresh-mown grass and blooming flowers. At the Iconic level riotous vines surround them, and forest animals and wood dragons stalk their branches. At the end of each session, Wood Aspects gain an Exalt milestone if they experienced something new and exciting to them with a significant character or group or their actions fostered change in a significant character or group.",
    Passive: "Natural Immunity (Passive): The Wood Aspect is immune to plant-based poisons and applies a two-success bonus on rolls to resist other poisons or disease.",
    Active: "Spring of Sextes Jylis (Active): Spend 1 anima on Step 2. Add the Exalt’s Essence to Defense against one attack.",
    Iconic: "Sap of Life (Iconic): Spend 1 Anima reflexively to heal one health level, either that the Wood Aspect’s taken or an ally within short range has suffered, starting with the most severe. She may spend up to 10 anima on this effect and may apply it to multiple targets.",
  }
}

};
