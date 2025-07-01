export type MartialArtsTechniqueMode = {
  name: string; // e.g. "Celestial", "Terrestrial"
  effect: string;
};

export type MartialArtsTechnique = {
  name: string;
  prerequisites: string;
  description: string;
  modes?: MartialArtsTechniqueMode[];
  page?: number[];
};

export type MartialArtsStyle = {
  name: string;
  description: string;
  weaponTags: string[];
  armor: string;
  complementaryAbilities: string[];
  techniques: MartialArtsTechnique[];
};
