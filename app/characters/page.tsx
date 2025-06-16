'use client';
import { User } from 'lucide-react';

const sampleCharacters = [
  {
    name: 'Nia Oren',
    exaltType: 'Solar',
    caste: 'Zenith',
    essence: 2,
    anima: 'Dim',
    player: 'Alejandra Reyes',
  },
  {
    name: 'Cathak Caiji',
    exaltType: 'Dragon-Blooded',
    caste: 'Fire Aspect',
    essence: 3,
    anima: 'Active',
    player: 'GM',
  },
];

export default function CharactersPage() {
  return (
    <div className="p-10 text-foreground dark:text-dark-foreground">
      <h1 className="font-heading text-4xl mb-6 text-steel dark:text-dark-steel">
        Your Characters
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCharacters.map((char, i) => (
          <div
            key={i}
            className="rounded-xl border border-highlight bg-white/80 dark:bg-dark-foreground/10 shadow-sm backdrop-blur-sm p-6 space-y-2 transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl">{char.name}</h2>
              <span className="text-sm text-aura-solar">Essence {char.essence}</span>
            </div>

            <p className="text-sm text-muted-foreground italic">
              {char.exaltType} • {char.caste}
            </p>

            <p className="text-sm">Anima: <span className="font-semibold">{char.anima}</span></p>

            <div className="flex items-center gap-2 text-sm mt-2">
              <User className="h-4 w-4 text-steel" />
              <span>{char.player}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
