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
};

export const wikiEntries: WikiEntry[] = [
  {
    slug: "flow-like-water",
    name: "Flow Like Water",
    category: "Charms",
    description: "Allows the character to move with fluid grace, avoiding blows.",
    tags: ["Solar", "Dodge"],
    essenceCost: "1m",
    mode: "Reflexive",
    sourcebook: "Exalted Essence Core",
    ability: "Dodge",
    pageRef: "p.124",
  },
  {
    slug: "unbreakable-skin-technique",
    name: "Unbreakable Skin Technique",
    category: "Charms",
    description: "The user's skin becomes as hard as jade, reducing damage.",
    tags: ["Lunar", "Resistance"],
    essenceCost: "3m",
    mode: "Simple",
    sourcebook: "Exalted Essence Core",
    ability: "Resistance",
    pageRef: "p.130",
  },
  // Add more as needed
];
