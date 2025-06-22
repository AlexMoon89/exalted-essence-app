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

  full?: {
    prerequisites?: string;
    modes?: {
      name: string;
      title: string;
      effect: string;
    }[];
  };
};

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

  const unique = new Map<string, any>();
  for (const charm of flattened) {
    const slug = charm.name.toLowerCase().replace(/\s+/g, '-');
    if (!unique.has(slug)) {
      unique.set(slug, charm);
    }
  }

  return Array.from(unique.values()).map((charm: any) => {
    const slug = charm.name.toLowerCase().replace(/\s+/g, '-');

    const isSolar = charm.modes?.some((m: any) => m.name === 'Solar');
    const category = isSolar ? 'Solar Charm' : 'Charms';

    return {
      slug,
      name: charm.name,
      category,
      description: charm.description,
      tags: charm.modes?.map((m: any) => m.name) || [],
      ability: charm.ability?.join(', ') ?? '',
      sourcebook: charm.source,
      pageRef: charm.page?.join(', ') ?? '',
      full: {
        prerequisites: charm.prerequisites,
        modes: charm.modes,
      }
    };
  });
}
