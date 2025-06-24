'use client';

import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Character = {
  id: string;
  slug: string;
  name: string;
  exaltType: string;
  caste: string;
  essence: number;
  anima: string;
  player: string;
  image: string | null;
};

function getCasteImage(char: { exaltType?: string; caste?: string }): string {
  const { exaltType, caste } = char;

  if (!exaltType || !caste) return '/castes/default.png';

  switch (exaltType.toLowerCase()) {
    case 'solar':
      return `/castes/Caste${caste.replace(/\s+/g, '')}3.png`;
    case 'lunar':
      return `/castes/${caste.replace(/\s+/g, '')}Caste.png`;
    case 'dragon-blooded':
      return `/castes/Dragon${caste.replace(/\s+/g, '')}1.png`;
    case 'sidereal':
      return `/castes/${caste.replace(/\s+/g, '')}Caste.png`;
    case 'getimian':
      return `/castes/GetimianCaste${caste.replace(/\s+/g, '')}.png`;
    default:
      return `/castes/default.png`;
  }
}

export default function CharactersPage({ characters }: { characters: Character[] }) {
  return (
    <div className="p-10 text-foreground dark:text-dark-foreground">
      <h1 className="font-heading text-4xl mb-6 text-steel dark:text-dark-steel">
        Your Characters
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((char) => {
          const imageSrc = char.image || getCasteImage(char);
          return (
            <Link
              key={char.id}
              href={`/characters/${char.slug}`}
              className="block rounded-xl border border-highlight bg-white/80 dark:bg-dark-foreground/10 shadow-sm backdrop-blur-sm p-6 space-y-3 transition hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl">{char.name}</h2>
                <span className="text-sm text-aura-solar">Essence {char.essence}</span>
              </div>

              <div className="w-full h-32 relative rounded-md overflow-hidden border border-muted">
                <Image
                  src={imageSrc}
                  alt={`${char.caste} symbol`}
                  fill
                  className="object-contain p-2"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <p className="text-sm text-muted-foreground italic">
                {char.exaltType} • {char.caste}
              </p>

              <p className="text-sm">
                Anima: <span className="font-semibold">{char.anima}</span>
              </p>

              <div className="flex items-center gap-2 text-sm mt-2">
                <User className="h-4 w-4 text-steel" />
                <span>{char.player}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
