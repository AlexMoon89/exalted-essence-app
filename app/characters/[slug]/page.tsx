'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Character = {
  id: string;
  name: string;
  slug: string;
  concept: string;
  description: string;
  exalt_type: string;
  caste: string;
  essence: number;
  anima: string;
  image: string | null;
  player?: string;
  charms: {
    name: string;
    mode: string;
    page: number;
    cost: string;
    step: number;
  }[];
};

export default function CharacterDetailPage() {
  const { slug } = useParams();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [character, setCharacter] = useState<Character | null>(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error) setCharacter(data);
      setLoading(false);
    };

    fetchCharacter();
  }, [slug]);

  const handleSave = async () => {
    if (!character) return;
    await supabase.from('characters').update(character).eq('id', character.id);
    setEdit(false);
  };

  const handleEditToggle = async () => {
    if (edit) {
      await handleSave();
    } else {
      setEdit(true);
    }
  };

  const getCasteImage = (char: Character): string => {
    const caste = char.caste.replace(/\s+/g, '');
    switch (char.exalt_type.toLowerCase()) {
      case 'solar':
        return `/castes/Caste${caste}3.png`;
      case 'lunar':
        return `/castes/${caste}Caste.png`;
      case 'dragon-blooded':
        return `/castes/Dragon${caste}1.png`;
      case 'sidereal':
        return `/castes/${caste}Caste.png`;
      case 'getimian':
        return `/castes/GetimianCaste${caste}.png`;
      default:
        return `/castes/default.png`;
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!character) return <div className="p-6 text-red-500">Character not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-foreground dark:text-dark-foreground">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-40 h-40 relative rounded overflow-hidden border border-muted">
          <Image
            src={character.image || getCasteImage(character)}
            alt="Character portrait"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1 space-y-2">
          {edit ? (
            <Input
              value={character.name}
              onChange={(e) =>
                setCharacter({ ...character, name: e.target.value })
              }
              className="text-3xl font-heading"
            />
          ) : (
            <h1 className="text-4xl font-heading">{character.name}</h1>
          )}

          <p className="italic text-muted-foreground">
            {character.exalt_type} • {character.caste} • Essence {character.essence}
          </p>
        </div>

        <Button variant="outline" onClick={handleEditToggle}>
          {edit ? 'Save' : 'Edit'}
        </Button>
      </div>

      <section>
        <h2 className="text-xl font-semibold">Concept</h2>
        {edit ? (
          <Input
            value={character.concept}
            onChange={(e) =>
              setCharacter({ ...character, concept: e.target.value })
            }
          />
        ) : (
          <p>{character.concept}</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Anima</h2>
        {edit ? (
          <Input
            value={character.anima}
            onChange={(e) =>
              setCharacter({ ...character, anima: e.target.value })
            }
          />
        ) : (
          <p>{character.anima}</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Description</h2>
        {edit ? (
          <Textarea
            value={character.description}
            onChange={(e) =>
              setCharacter({ ...character, description: e.target.value })
            }
          />
        ) : (
          <p>{character.description}</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Charms</h2>
        <ul className="space-y-2">
          {character.charms?.map((charm, i) => (
            <li
              key={i}
              className="border border-border rounded-md p-3 bg-white/10"
            >
              <p className="font-semibold">{charm.name}</p>
              <p className="text-sm text-muted-foreground">
                Mode: {charm.mode} | Cost: {charm.cost} | Page: {charm.page} | Step: {charm.step}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
