'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CharacterDetailPage() {
  const { slug } = useParams();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [character, setCharacter] = useState<any | null>(null);
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

  const {
    id, name, concept, description, exalt_type, caste, essence, anima,
    major_virtue, minor_virtue, intimacies,
    finesse, force, fortitude,
    athletics, awareness, close_combat, craft, embassy, integrity,
    navigate, performance, physique, presence, ranged_combat,
    sagacity, stealth, war,
    anima_passive, anima_active, anima_iconic
  } = character;

  const updateData = {
    name, concept, description, exalt_type, caste, essence, anima,
    major_virtue, minor_virtue, intimacies,
    finesse, force, fortitude,
    athletics, awareness, close_combat, craft, embassy, integrity,
    navigate, performance, physique, presence, ranged_combat,
    sagacity, stealth, war,
    anima_passive, anima_active, anima_iconic
  };

  const { error } = await supabase
    .from('characters')
    .update(updateData)
    .eq('id', id);

     if (!error) setEdit(false);
    else console.error('Supabase update error:', error.message);
  };


  const handleEditToggle = () => {
    if (edit) {
      handleSave();
    } else {
      setEdit(true);
    }
  };

  const getCasteImage = (char: any): string => {
    const caste = char.caste?.replace(/\s+/g, '');
    switch (char.exalt_type?.toLowerCase()) {
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
    <div className="p-6 max-w-5xl mx-auto text-foreground dark:text-dark-foreground space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start gap-6 border-b pb-6">
        <div className="w-48 h-48 relative rounded overflow-hidden border border-muted shadow-md">
          <Image
            src={character.image || getCasteImage(character)}
            alt="Character portrait"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1 space-y-3 text-steel dark:text-dark-steel">
          {edit ? (
            <Input
              value={character.name}
              onChange={(e) => setCharacter({ ...character, name: e.target.value })}
              className="text-3xl text-steel font-heading"
            />
          ) : (
            <h1 className="text-4xl font-heading bg-gradient-to-r from-steel to-aura-solar text-transparent bg-clip-text">{character.name}</h1>
          )}

          <div className="text-sm text-aura-abyssal space-y-1">
            <p>{character.exalt_type} • {character.caste}</p>
            <p>Essence: <span className="font-semibold">{character.essence}</span></p>
            <p>Anima: {character.anima}</p>
          </div>

          <Button variant="outline" onClick={handleEditToggle}>
            {edit ? 'Save' : 'Edit'}
          </Button>
        </div>
      </div>

      {/* Concept and Description */}
      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-xl text-steel font-semibold mb-1">Concept</h2>
          {edit ? (
            <Input
              value={character.concept}
              onChange={(e) => setCharacter({ ...character, concept: e.target.value })}
            />
          ) : (
            <p>{character.concept}</p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-steel mb-1">Backstory</h2>
          {edit ? (
            <Textarea
              value={character.description}
              onChange={(e) => setCharacter({ ...character, description: e.target.value })}
            />
          ) : (
            <p>{character.description}</p>
          )}
        </section>
      </div>

      {/* Virtues & Intimacies */}
      <section>
        <h2 className="text-xl text-steel font-semibold mb-1">Virtues & Intimacies</h2>
        {edit ? (
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Major Virtue"
              value={character.major_virtue || ''}
              onChange={(e) => setCharacter({ ...character, major_virtue: e.target.value })}
            />
            <Input
              placeholder="Minor Virtue"
              value={character.minor_virtue || ''}
              onChange={(e) => setCharacter({ ...character, minor_virtue: e.target.value })}
            />
            <Textarea
              placeholder="Intimacies"
              value={character.intimacies || ''}
              onChange={(e) => setCharacter({ ...character, intimacies: e.target.value })}
            />
          </div>
        ) : (
          <div className="space-y-2 text-aura-abyssal">
            <p><strong>Major Virtue:</strong> {character.major_virtue || '—'}</p>
            <p><strong>Minor Virtue:</strong> {character.minor_virtue || '—'}</p>
            <p><strong>Intimacies:</strong> {character.intimacies || '—'}</p>
          </div>
        )}
      </section>

      {/* Re-inserted updated Attributes and Abilities here (unchanged from last version) */}

      {/* Anima Effects */}
      <section>
        <h2 className="text-xl font-semibold text-steel mb-1">Anima Effects</h2>
        <div className="grid md:grid-cols-3 gap-4 text-aura-abyssal">
          {['anima_passive', 'anima_active', 'anima_iconic'].map((field) => (
            <div key={field} className="space-y-1">
              <label className="block font-medium capitalize" htmlFor={field}>{field.split('_')[1]}</label>
              {edit ? (
                <Textarea
                  id={field}
                  value={character[field] || ''}
                  onChange={(e) => setCharacter({ ...character, [field]: e.target.value })}
                />
              ) : (
                <p>{character[field] || '—'}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Attributes */}
      <section>
        <h2 className="text-xl text-steel font-semibold mb-1">Attributes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-aura-abyssal font-bold">
          {['finesse', 'force', 'fortitude'].map((attr) => (
            <div key={attr} className="space-y-1">
              <label className="block font-medium capitalize" htmlFor={attr}>{attr}</label>
              {edit ? (
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCharacter((prev: any) => ({ ...prev, [attr]: i }))}
                      className={cn(
                        'w-6 h-6 rounded-full border border-steel transition-colors',
                        character[attr] >= i ? 'bg-steel' : 'bg-background'
                      )}
                      aria-label={`Set ${attr} to ${i}`}
                    />
                  ))}
                  <span className="ml-2 text-sm">{character[attr] || 0}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-5 h-5 rounded-full border border-steel',
                        character[attr] >= i ? 'bg-steel' : 'bg-background'
                      )}
                    />
                  ))}
                  <span className="ml-2 text-sm">{character[attr] || 0}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Abilities */}
      <section>
        <h2 className="text-xl text-steel font-semibold mb-1">Abilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-bold text-aura-abyssal">
          {["athletics","awareness","close_combat","craft","embassy","integrity","navigate","performance","physique","presence","ranged_combat","sagacity","stealth","war"].map((ability) => (
            <div key={ability} className="space-y-1">
              <label className="block font-medium capitalize" htmlFor={ability}>{ability.replace('_', ' ')}</label>
              {edit ? (
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCharacter((prev: any) => ({ ...prev, [ability]: i }))}
                      className={cn(
                        'w-5 h-5 rounded-full border border-aura-abyssal transition-colors',
                        character[ability] >= i ? 'bg-aura-abyssal' : 'bg-background'
                      )}
                      aria-label={`Set ${ability} to ${i}`}
                    />
                  ))}
                  <span className="ml-2 text-sm">{character[ability] || 0}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-4 h-4 rounded-full border border-aura-abyssal',
                        character[ability] >= i ? 'bg-aura-abyssal' : 'bg-background'
                      )}
                    />
                  ))}
                  <span className="ml-2 text-sm">{character[ability] || 0}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

            {/* Combat Stats */}
      <section>
        <h2 className="text-xl font-semibold mb-1 text-steel">Combat Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-aura-abyssal">
          {['power', 'will', 'resolve', 'soak', 'defense', 'hardness'].map((field) => (
            <div key={field} className="space-y-1">
              <label className="block font-medium capitalize" htmlFor={field}>{field}</label>
              {edit ? (
                <Input
                  id={field}
                  type="number"
                  value={character[field] || ''}
                  onChange={(e) => setCharacter((prev: any) => ({ ...prev, [field]: Number(e.target.value) }))}
                />
              ) : (
                <p>{character[field] ?? '—'}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Health Track */}
      <section>
        <h2 className="text-xl font-semibold mb-1 text-steel">Health</h2>
        <div className="grid text-aura-abyssal grid-cols-2 sm:grid-cols-4 gap-4">
          {['bruised', 'injured', 'critical', 'incapacitated'].map((level) => (
            <label key={level} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={character[`health_${level}`] || false}
                onChange={(e) =>
                  setCharacter((prev: any) => ({
                    ...prev,
                    [`health_${level}`]: e.target.checked,
                  }))
                }
                disabled={!edit}
              />
              <span className="capitalize">{level}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Weapons */}
      <section>
        <h2 className="text-xl text-steel font-semibold mb-1">Weapons</h2>
        {[1, 2].map((w) => (
          <div key={w} className="border border-muted rounded p-4 mb-4 text-aura-abyssal">
            <h3 className="font-semibold mb-2">Weapon {w}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['type', 'accuracy', 'damage', 'overwhelming', 'defense'].map((field) => (
                <div key={field}>
                  <label className="block text-sm capitalize mb-1">{field}</label>
                  {edit ? (
                    <Input
                      value={character[`weapon${w}_${field}`] || ''}
                      onChange={(e) => setCharacter((prev: any) => ({
                        ...prev,
                        [`weapon${w}_${field}`]: e.target.value,
                      }))}
                    />
                  ) : (
                    <p>{character[`weapon${w}_${field}`] || '—'}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Armor */}
      <section>
        <h2 className="text-xl text-steel font-semibold mb-1">Armor</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['type', 'soak', 'hardness', 'mobility_penalty'].map((field) => (
            <div key={field}>
              <label className="block text-aura-abyssal text-sm capitalize mb-1">{field.replace('_', ' ')}</label>
              {edit ? (
                <Input
                  value={character[`armor_${field}`] || ''}
                  onChange={(e) => setCharacter((prev: any) => ({
                    ...prev,
                    [`armor_${field}`]: e.target.value,
                  }))}
                />
              ) : (
                <p>{character[`armor_${field}`] || '—'}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Merits */}
      <section>
        <h2 className="text-xl font-semibold text-steel mb-1">Merits</h2>
        {edit ? (
          <Textarea
            placeholder="List your character's merits here..."
            value={character.merits || ''}
            onChange={(e) => setCharacter((prev: any) => ({ ...prev, merits: e.target.value }))}
          />
        ) : (
          <p>{character.merits || '—'}</p>
        )}
      </section>

      {/* Charms */}
      <section>
        <h2 className="text-2xl font-bold text-steel mb-3">Charms</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {character.charms?.map((charm: any, i: number) => (
            <li key={i} className="border border-border rounded-md p-4 bg-white/5">
              <p className="font-semibold text-steel text-lg">{charm.name}</p>
              <p className="text-sm text-aura-abyssal text-muted-foreground mt-1">
                Mode: {charm.mode}<br />
                Cost: {charm.cost}<br />
                Page: {charm.page} • Step: {charm.step}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Milestones */}
      <section>
        <h2 className="text-xl text-steel font-semibold mb-1">Milestones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {['minor', 'major', 'personal', 'exalt'].map((type) => (
            <div key={type}>
              <label className="block text-aura-abyssal text-sm font-medium capitalize mb-1">{type} milestone</label>
              {edit ? (
                <Input
                  value={character[`milestone_${type}`] || ''}
                  onChange={(e) => setCharacter((prev: any) => ({
                    ...prev,
                    [`milestone_${type}`]: e.target.value,
                  }))}
                />
              ) : (
                <p>{character[`milestone_${type}`] || '—'}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
