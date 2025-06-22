// lib/wikiData.ts
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

  // ✅ Add this entire block inside the object, not below it
  full?: {
    prerequisites?: string;
    modes?: {
      name: string;
      title: string;
      effect: string;
    }[];
  };
};

// 🔥 This function loads all universal charms from your public/data/charms folder
export async function loadUniversalCharmsAsWikiEntries(): Promise<WikiEntry[]> {
  const indexRes = await fetch('/data/charms/index.json', { cache: 'no-store' });
  const files: string[] = await indexRes.json();

  const allCharms = await Promise.all(
    files.map(async (file) => {
      const res = await fetch(`/data/charms/${file}.json`, { cache: 'no-store' });
      return res.ok ? await res.json() : [];
    })
  );

  const flattened = allCharms.flat();

  // ✅ Deduplicate by charm name
  const unique = new Map();
  for (const charm of flattened) {
    if (!unique.has(charm.name)) {
      unique.set(charm.name, charm);
    }
  }

  return Array.from(unique.values()).map((charm: any) => ({
    slug: charm.name.toLowerCase().replace(/\s+/g, '-'),
    name: charm.name,
    category: 'Charms',
    description: charm.description,
    tags: charm.modes?.map((m: any) => m.name) || [],
    ability: charm.ability?.join(', ') ?? '',
    sourcebook: charm.source,
    pageRef: charm.page?.join(', ') ?? '',
    // ✅ Add extra fields for modal use
    full: {
      prerequisites: charm.prerequisites,
      modes: charm.modes,
    }
  }));
}
