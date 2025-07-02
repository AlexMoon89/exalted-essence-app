export type Technique = {
  name: string;
  prerequisites?: string;
  description: string;
  modes?: {
    name: string;
    effect: string;
    title?: string;
  }[];
};

export type WikiEntry = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  essenceCost?: string;
  mode?: string;
  sourcebook?: string;
  ability?: string;
  pageRef?: string;
  circle?: string; // <-- Add this line
  full?: {
    prerequisites?: string;
    modes?: {
      name: string;
      effect: string;
      title?: string;
    }[];
    techniques?: Technique[];
    armor?: string;
    weaponTags?: string[];
    complementaryAbilities?: string[];
  };
};

export async function loadAllCharmsAsWikiEntries(): Promise<WikiEntry[]> {
  const indexRes = await fetch('/data/charms/index.json', { cache: 'no-store' });
  const files: string[] = await indexRes.json();
  const allEntries: WikiEntry[] = [];
  const seenSlugs = new Set<string>();

  for (const file of files) {
    const res = await fetch(`/data/charms/${file}`, { cache: 'no-store' });
    const data = await res.json();

    // Derive category from filename
    let sourceType = 'Universal';
    if (file.startsWith('solar_')) sourceType = 'Solar';
    else if (file.startsWith('lunar_')) sourceType = 'Lunar';
    else if (file.startsWith('abyssal_')) sourceType = 'Abyssal';
    else if (file.startsWith('sidereal_')) sourceType = 'Sidereal';
    else if (file.startsWith('dragon_blooded')) sourceType = 'Dragon Blooded';
    else if (file.startsWith('alchemical_')) sourceType = 'Alchemical';
    else if (file.startsWith('getimian_')) sourceType = 'Getimian';
    else if (file.startsWith('infernal_')) sourceType = 'Infernal';

    const category = `${sourceType} Charm`;

    for (const entry of data) {
      const slug = entry.name.toLowerCase().replace(/\s+/g, '-');
      if (seenSlugs.has(slug)) continue; // Avoid duplicates
      seenSlugs.add(slug);

      const modeTags = (entry.modes || [])
        .map((m: any) => m.name)
        .filter(Boolean);

      const abilityTags = Array.isArray(entry.ability)
        ? entry.ability
        : (entry.ability?.split(',').map((s: string) => s.trim()) ?? []);

      const tagSet = new Set([...abilityTags, ...modeTags]);
      if (!tagSet.has(sourceType)) tagSet.add(sourceType);

      allEntries.push({
        ...entry,
        slug,
        category,
        tags: Array.from(tagSet),
        ability: abilityTags.join(', '),
        description: entry.description,
        full: {
          prerequisites: entry.prerequisites,
          modes: entry.modes || [],
        },
        sourcebook: entry.source,
        pageRef: Array.isArray(entry.page) ? entry.page.join(', ') : (entry.page?.toString() || ''),
      });
    }
  }

  return allEntries;
}

export async function loadAllMartialArtsAsWikiEntries(): Promise<WikiEntry[]> {
  const indexRes = await fetch('/data/martialArts/index.json', { cache: 'no-store' });
  const files: string[] = await indexRes.json();
  const allEntries: WikiEntry[] = [];
  const seenSlugs = new Set<string>();

  for (const file of files) {
    const res = await fetch(`/data/martialArts/${file}`, { cache: 'no-store' });
    const style = await res.json();

    const slug = style.name.toLowerCase().replace(/\s+/g, '-');
    if (seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    const tags = Array.isArray(style.tags) ? style.tags : [];

    allEntries.push({
      slug,
      name: style.name,
      category: 'Martial Arts',
      description: style.description,
      tags,
      sourcebook: style.source || 'Exalted Essence Core Rulebook',
      pageRef: Array.isArray(style.page) ? style.page.join(', ') : (style.page?.toString() || ''),
      full: {
        techniques: style.techniques,
        armor: style.armor,
        weaponTags: style.weaponTags,
        complementaryAbilities: style.complementaryAbilities,
      }
    });
  }

  return allEntries;
}

export async function loadAllSpellsAsWikiEntries(): Promise<WikiEntry[]> {
  const indexRes = await fetch('/data/spells/index.json', { cache: 'no-store' });
  const files: string[] = await indexRes.json();
  const allEntries: WikiEntry[] = [];
  const seenSlugs = new Set<string>();

  for (const file of files) {
    // e.g. "necromancySpells"
    const res = await fetch(`/data/spells/${file}.json`, { cache: 'no-store' });
    const spells = await res.json();

    // Category and type
    let spellType = 'Universal';
    if (file.toLowerCase().includes('necromancy')) spellType = 'Necromancy';
    else if (file.toLowerCase().includes('sorcery')) spellType = 'Sorcery';
    else if (file.toLowerCase().includes('universal')) spellType = 'Universal';

    for (const spell of spells) {
      const slug = spell.name.toLowerCase().replace(/\s+/g, '-');
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      allEntries.push({
        slug,
        name: spell.name,
        category: 'Spell',
        description: spell.description,
        tags: [
          spellType,
          ...(spell.circle ? [spell.circle + ' Circle'] : []),
          ...(spell.type && spell.type !== spellType ? [spell.type] : [])
        ],
        circle: spell.circle || '', // <-- Add this line
        sourcebook: spell.source || 'Exalted Essence Core Rulebook',
        pageRef: Array.isArray(spell.page) ? spell.page.join(', ') : (spell.page?.toString() || ''),
        full: {
          modes: spell.modes || []
        }
      });
    }
  }
  return allEntries;
}

export async function loadAllShapingRitualsAsWikiEntries(): Promise<WikiEntry[]> {
  const res = await fetch('/data/spells/shapingRituals.json', { cache: 'no-store' });
  const rituals = await res.json();
  const allEntries: WikiEntry[] = [];
  for (const ritual of rituals) {
    const slug = ritual.name.toLowerCase().replace(/\s+/g, '-');
    allEntries.push({
      slug,
      name: ritual.name,
      category: 'Spell', // Ensure this!
      description: ritual.description,
      tags: [
        'Shaping Ritual',   // Must appear here!
        ...(ritual.type ? [ritual.type] : []),
        ...(ritual.circle ? [ritual.circle + ' Circle'] : []),
      ],
      circle: ritual.circle || '',
      sourcebook: ritual.source || 'Exalted Essence Core Rulebook',
      pageRef: Array.isArray(ritual.page) ? ritual.page.join(', ') : (ritual.page?.toString() || ''),
      full: {}
    });
  }
  return allEntries;
}