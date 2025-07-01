// lib/exaltAdvantages.ts

export type ExaltAdvantage = {
  title: string;
  text: string;
};

export type ExaltAdvantagesGroup = {
  name: string;
  advantages: ExaltAdvantage[];
};

export const exaltAdvantages: Record<string, ExaltAdvantagesGroup> = {
  Solar: {
    name: 'Solar Exalt Advantages',
    advantages: [
      {
        title: 'First Among Equals',
        text: `Solar Exalted always win ties on opposed rolls, even when there’s no clear defender. Solar player characters win ties against Solar Storyteller characters. A contest between two players’ characters should be resolved out of character. Treat the “winning” result as having 0 successes where results would require them.`,
      },
      {
        title: 'Supremacy of Ability',
        text: `Solars don’t pay the mote cost to activate Excellencies. This still counts as a Charm use on Step 1.`,
      },
      {
        title: 'Divine Resonance',
        text: `Solars are resonant with all magical materials, especially orichalcum.`,
      },
    ],
  },

  Sidereal: {
    name: 'Sidereal Exalt Advantages',
    advantages: [
      {
        title: 'Arcane Fate',
        text: `After a scene interacting with a Sidereal, other characters forget her appearance, voice, and other defining traits. Instead, they attribute the Sidereal’s actions to a passerby or happenstance. Nontrivial characters may resist with a difficulty 5 Integrity-based roll. A character’s Intimacies or personal history with the Sidereal may add bonus dice on the roll. The Sidereal’s circle is immune, as are other Sidereals and the Bureau of Destiny’s gods. Demons, fae, the undead, and other otherworldly beings are also immune, as are Abyssals, Getimians, Infernals, and Liminals, who lie outside of fate.`,
      },
      {
        title: 'Weaving Destiny',
        text: `Spend 1 mote reflexively to weave a destiny based on a broad archetype, profession, or social role, granting it to a character with a touch. Once per scene, when attempting a task that resonates with that archetype, the target may transform up to the Sidereal’s Essence dice into automatic successes. New destinies override old ones. The Sidereal may weave a destiny for herself; while active, she loses Arcane Fate, allowing others to remember their destiny’s false persona. Casting off this destiny reasserts Arcane Fate, causing others to forget the false identity.`,
      },
      {
        title: 'Resonance',
        text: `Sidereals are resonant with starmetal.`,
      },
    ],
  },

  Lunar: {
    name: 'Lunar Exalt Advantages',
    advantages: [
      {
        title: 'Ten Thousand Forms',
        text: `The Lunar gains access to an animal shape, representative of their character and called their “spirit shape,” during their Exaltation. They also have a mode of Sacred Hunt, which the player chooses at character creation. Lunars must invoke the Sacred Hunt to acquire new forms. Predators must ritually hunt their target and drink their heart’s blood; tricksters must outwit or beguile their target; stalkers must observe and pursue their target (if the target is sapient, that means learning at least one of their Virtues or Intimacies). If the hunt is successful, the Lunar adds this target to the shapes they know. The Lunar can spend one mote to shift into these shapes. Shapeshifting is reflexive and ends whenever the Lunar chooses to change back. Even shifted, however, they retain a unique Tell such as silver eyes, black nails, or razor teeth — choose this, too, during character creation. Trivial characters cannot spot it. Non-trivial characters trying to notice the Tell must make an Awareness or Integrity roll at difficulty 7. A character who has previously detected the Tell gains a three-dice bonus to spot it again. A Lunar may start play with as many forms as the player and Storyteller deem appropriate. Unless the character takes the Charm Antand-Yeddim Wisdom (p. 259), these forms cannot have the tiny creature (p. 325) or legendary size (p. 317) qualities. The Lunar can acquire additional forms throughout the course of the game. While in the form of the animal, the Lunar gains access to the animal’s special quality (for example: a jellyfish’s ability to sting), plus any other narratively appropriate bonuses or penalties. She uses her dice pools as normal. See the section on animals on p. 324. Transforming into another human grants their appearance and voice but no other special skills or traits without the use of magic.`,
      },
      {
        title: 'Passionate Ideals',
        text: `Once per story, if the Lunar would gain a new Intimacy, she may create it at the Major rather than Minor rating. Furthermore, the Lunar gains an extra die when her roll is supported by any of her Major Intimacies or Virtues.`,
      },
      {
        title: 'Resonance',
        text: `Lunars are resonant with moonsilver.`,
      },
    ],
  },

  'Dragon-Blooded': {
    name: 'Dragon-Blooded Exalt Advantages',
    advantages: [
      {
        title: 'Prince of the Earth',
        text: `As the Exalted that rule much of the world, Dragon-Blooded find support anywhere. Once per session, the character may select one Merit from the list on p. 106 and treat it as though it had a rating based on her Essence (tertiary at Essence 1, secondary at Essence 2, primary at Essence 5), working its acquisition with the Storyteller. This benefit lasts for the duration of the session.`,
      },
      {
        title: 'Ten Thousand Dragons Fight as One',
        text: `When making teamwork actions, after calculating the total successes to add as dice, add an additional die. If making a teamwork action with someone in the Dragon-Blooded’s Circle or Hearth (p. 231), add another die.`,
      },
      {
        title: 'Resonance',
        text: `Dragon-Blooded are resonant with all types of jade.`,
      },
    ],
  },

  Abyssal: {
    name: 'Abyssal Exalt Advantages',
    advantages: [
      {
        title: 'Death’s Champions',
        text: `Abyssals are considered undead whenever it is beneficial to them. In places touched by death, such as the Underworld or a blood-soaked battlefield, they gain a one-success bonus on any action that evokes fear, sorrow, dread, or acceptance.`,
      },
      {
        title: 'Cruel Banquet',
        text: `Drawing might from blood and terror, an Abyssal may replenish their motes by inflicting a level of damage or committing an act that frightens, subdues, or angers the target. Draining or terrifying a trivial character restores 1 mote, an elite character restores 2, and a powerful character — such as another Exalt — restores 3. The Abyssal may benefit from Cruel Banquet only once per scene outside of combat.`,
      },
      {
        title: 'Resonance',
        text: `Abyssals are resonant with soulsteel.`,
      },
    ],
  },

  Alchemical: {
    name: 'Alchemical Exalt Advantages',
    advantages: [
      {
        title: 'Living Artifact',
        text: `The Alchemical is a carefully created machine, as much like an artifact as a living being. She may hold an artifact to replicate one of its Evocations as her own installed Charm during the Rite of Reconfiguration. If the Evocation has any prerequisites, she must meet those. Once installed, the Alchemical can use the Evocation as if it were an innate Charm, without needing access to the artifact itself. The Alchemical can only have one such Evocation at a time but may switch between existing ones during Reconfiguration.`,
      },
      {
        title: 'Community Spirit',
        text: `Alchemicals often form bonds with communities that will accept her as their own, and to whose purpose she may lend her strength. This doesn’t mean she’s fixed in place, as her chosen community may range far, such as “orphaned children” or “oppressed laborers.” They believe in her as a guardian, and once she’s found them, this awakens a power deep inside her. Design this as a custom effect based around the Exalt’s purpose, one that should be tied to her community. Examples include: 
• Increase Resolve by 1 when someone targets an Intimacy toward her community. 
• Increase Defense by 2 when using defend other on a community member. 
• Add a three-dice bonus to attacks when fighting for the community. Whatever it is, it grants a small but meaningful effect. Refer to Bonuses and Penalties on p. 118.`,
      },
      {
        title: 'Resonance',
        text: `Alchemicals are resonant with the material that matches their caste.`,
      },
    ],
  },

  Getimian: {
    name: 'Getimian Exalt Advantages',
    advantages: [
      {
        title: 'Getimian Alchemy',
        text: `Divide the Getimian’s motes into two pools — Flowing and Still. They may reallocate motes between their pools between sessions or during downtime but must leave at least 1 mote in either pool. When they regain motes, they may choose which pool to restore first. They gain a one-success bonus on rolls with Force when their Flowing pool is larger or with Finesse when Still is larger, and with Fortitude when the pools are balanced (within 1 mote of each other if the total number of motes is odd. In this case, you may decide which Attribute to favor).`,
      },
      {
        title: 'Infected Fate',
        text: `The Getimian may spend 1 mote to bind a target to her, naming a role in relation to the Getimian, such as bodyguard, business partner, or apprentice. While acting in that role, the character transforms the Getimian’s Essence in dice into successes before rolling; if they act against it, they suffer a one-success penalty. This lasts for the session.`,
      },
      {
        title: 'Resonance',
        text: `Getimians are resonant with starmetal.`,
      },
    ],
  },

  Infernal: {
    name: 'Infernal Exalt Advantages',
    advantages: [
      {
        title: 'Corona of Fury',
        text: `While the Infernal is at her Critical Health level or at 4 or more anima, the breath of war (p. 183) restores 2 motes instead of 1, and she recovers 1 mote between actions during social influence scenes or ventures.`,
      },
      {
        title: 'Unwoven Coadjutor',
        text: `An Infernal develops a direct spiritual connection with the Essence of hell. This manifests as a nascent demonic soul budding within the Infernal that only she can access. Once per session, the Infernal may ask up to her Essence in questions to learn about a specific situation, such as: Can you tell me the nature of this spirit? What strange history happened here? What do you know about this place or object? What unusual weaknesses does it have? What would it take to destroy it?`,
      },
      {
        title: 'Resonance',
        text: `Infernals are resonant with orichalcum.`,
      },
    ],
  },

  Liminal: {
    name: 'Liminal Exalt Advantages',
    advantages: [
      {
        title: 'Undying',
        text: `The Liminal resurrects herself so long as her brain remains intact. At the end of the scene in which she was killed, the Liminal returns to her last Critical health level. A Liminal with access to appropriate body parts, such as the remains of their enemies, can replace missing limbs or organs through necrosurgery, healing dramatic injuries in a recovery scene. Undying doesn’t work if the Liminal drowns or lies buried under running water — the former holds true death, and the latter requires someone moving her body before she can regenerate.`,
      },
      {
        title: 'Child of Death',
        text: `Liminals are considered undead (p. 65). They automatically sense ghosts in long range, including those possessing objects or people, and may physically interact with incorporeal dead. Ghosts can see, touch, and communicate with the Liminal regardless of language barriers. Their anima powers affect the living and the dead.`,
      },
      {
        title: 'Resonance',
        text: `Liminals are resonant with soulsteel.`,
      },
    ],
  },
};

export {}; // Ensure this file is always treated as a module
