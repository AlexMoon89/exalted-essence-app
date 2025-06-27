'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';


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
      .select(`
        *,
        profiles:owner_id (
          display_name,
          avatar_url
        )
        campaign:campaign_id (
        name,
        slug
        )  
      `)
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
    anima_passive, anima_active, anima_iconic,
    image_url: character.image_url, // ✅ Add this line
    charms: character.charms || []
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
        <section>
            <h2 className="text-xl text-steel font-semibold mb-1 text-center">Portrait</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-48 h-48 relative rounded overflow-hidden border border-muted shadow-md">
              <img
                src={character.image_url || getCasteImage(character)}
                alt="Character portrait"
                className="w-full h-full object-cover"
              />
            </div>
            {edit && (
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const fileName = `${character.id}-${Date.now()}.${file.name.split('.').pop()}`;
                    const { data, error } = await supabase.storage
                      .from('characters')
                      .upload(fileName, file, { upsert: true });

                    if (error) {
                      console.error('Image upload failed:', error.message);
                      return;
                    }

                    const { data: urlData } = supabase
                      .storage
                      .from('characters')
                      .getPublicUrl(fileName);

                    if (urlData?.publicUrl) {
                      const imageUrl = urlData.publicUrl;

                      // Guardamos inmediatamente en Supabase
                      const { error: updateError } = await supabase
                        .from('characters')
                        .update({ image_url: imageUrl })
                        .eq('id', character.id);

                      if (updateError) {
                        console.error('❌ Failed to update character:', updateError);
                      } else {
                        console.log('✅ Image URL updated in characters table');
                        setCharacter((prev: any) => ({ ...prev, image_url: imageUrl }));
                      }
                    }
                  }}

                />
                <div className="text-steel space-y-2">
                  <Button
                    variant="outline"
                    onClick={async () => {
                      if (!character.image_url) return;
                      const filePath = character.image_url.split('/storage/v1/object/public/characters/')[1];
                      if (!filePath) return;

                      const { error } = await supabase.storage
                        .from('characters')
                        .remove([filePath]);

                      if (!error) {
                        setCharacter((prev: any) => ({ ...prev, image_url: null }));
                      } else {
                        console.error('Failed to remove image:', error.message);
                      }
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

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

        <div className="text-sm text-aura-abyssal space-y-2">
          {edit ? (
            <>
              <div className="flex gap-2 items-center">
                <label className="w-20 font-medium">Exalt Type:</label>
                <Input
                  value={character.exalt_type}
                  onChange={(e) => setCharacter({ ...character, exalt_type: e.target.value })}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="w-20 font-medium">Caste:</label>
                <Input
                  value={character.caste}
                  onChange={(e) => setCharacter({ ...character, caste: e.target.value })}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="w-20 font-medium">Essence:</label>
                <Input
                  type="number"
                  value={character.essence}
                  onChange={(e) => setCharacter({ ...character, essence: Number(e.target.value) })}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="w-20 font-medium">Anima:</label>
                <Input
                  value={character.anima}
                  onChange={(e) => setCharacter({ ...character, anima: e.target.value })}
                />
              </div>
            </>
          ) : (
            <>
              <p>{character.exalt_type} • {character.caste}</p>
              <p>Essence: <span className="font-semibold">{character.essence}</span></p>
              <p>Anima: {character.anima}</p>
            </>
          )}

          <p> Player: <span className="font-semibold">{character.profiles?.display_name || 'Unknown'}</span>
          </p>
          <p> Campaign: <span className="font-semibold">{character.campaign?.name || 'Unassigned'}</span>
          </p>
        </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEditToggle}>
              {edit ? 'Save' : 'Edit'}
            </Button>
            {edit && (
              <Button variant="outline" onClick={() => window.location.reload()}>
                Cancel
              </Button>
            )}
          </div>
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
        {edit ? (
          <div className="text-aura-abyssal space-y-4">
            {character.weapons?.map((weapon: any, i: number) => (
              <div key={i} className="border border-muted rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Weapon {i + 1}</h3>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const updated = [...character.weapons];
                      updated.splice(i, 1);
                      setCharacter((prev: any) => ({ ...prev, weapons: updated }));
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['type', 'accuracy', 'damage', 'overwhelming', 'defense'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm capitalize mb-1">{field}</label>
                      <Input
                        value={weapon[field] || ''}
                        onChange={(e) => {
                          const updated = [...character.weapons];
                          updated[i][field] = e.target.value;
                          setCharacter((prev: any) => ({ ...prev, weapons: updated }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setCharacter((prev: any) => ({
                ...prev,
                weapons: [
                  ...(prev.weapons || []),
                  { type: '', accuracy: '', damage: '', overwhelming: '', defense: '' },
                ],
              }))}
            >
              + Add Weapon
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {character.weapons?.map((weapon: any, i: number) => (
              <div key={i} className="border border-muted rounded p-4">
                <h3 className="font-semibold mb-1">Weapon {i + 1}</h3>
                <ul className="text-sm space-y-1">
                  {['type', 'accuracy', 'damage', 'overwhelming', 'defense'].map((field) => (
                    <li key={field}>
                      <strong className="capitalize">{field}:</strong> {weapon[field] || '—'}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Armor */}
      <section>
        <h2 className="text-xl text-steel font-semibold mb-1">Armor</h2>
        {edit ? (
          <div className="space-y-4 text-aura-abyssal">
            {character.armors?.map((armor: any, i: number) => (
              <div key={i} className="border border-muted rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Armor {i + 1}</h3>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const updated = [...character.armors];
                      updated.splice(i, 1);
                      setCharacter((prev: any) => ({ ...prev, armors: updated }));
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['type', 'soak', 'hardness', 'mobility_penalty'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm capitalize mb-1">{field.replace('_', ' ')}</label>
                      <Input
                        value={armor[field] || ''}
                        onChange={(e) => {
                          const updated = [...character.armors];
                          updated[i][field] = e.target.value;
                          setCharacter((prev: any) => ({ ...prev, armors: updated }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setCharacter((prev: any) => ({
                ...prev,
                armors: [
                  ...(prev.armors || []),
                  { type: '', soak: '', hardness: '', mobility_penalty: '' },
                ],
              }))}
            >
              + Add Armor
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {character.armors?.map((armor: any, i: number) => (
              <div key={i} className="border border-muted rounded p-4">
                <h3 className="font-semibold text-steel mb-1">Armor {i + 1}</h3>
                <ul className="text-sm space-y-1">
                  {['type', 'soak', 'hardness', 'mobility_penalty'].map((field) => (
                    <li key={field}>
                      <strong className="capitalize">{field.replace('_', ' ')}:</strong> {armor[field] || '—'}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
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
        <h2 className="text-2xl text-steel font-bold mb-3">Charms</h2>
        {edit ? (
          <div className="space-y-4">
            {character.charms?.map((charm: any, i: number) => (
              <div key={i} className="border border-border rounded-md p-4 bg-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <Input
                    placeholder="Charm Name"
                    value={charm.name}
                    onChange={(e) => {
                      const updated = [...character.charms];
                      updated[i].name = e.target.value;
                      setCharacter((prev: any) => ({ ...prev, charms: updated }));
                    }}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const updated = [...character.charms];
                      updated.splice(i, 1);
                      setCharacter((prev: any) => ({ ...prev, charms: updated }));
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <Textarea
                  placeholder="Effect / Description"
                  value={charm.description || ''}
                  onChange={(e) => {
                    const updated = [...character.charms];
                    updated[i].description = e.target.value;
                    setCharacter((prev: any) => ({ ...prev, charms: updated }));
                  }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input
                    placeholder="Mode"
                    value={charm.mode}
                    onChange={(e) => {
                      const updated = [...character.charms];
                      updated[i].mode = e.target.value;
                      setCharacter((prev: any) => ({ ...prev, charms: updated }));
                    }}
                  />
                  <Input
                    placeholder="Cost"
                    value={charm.cost}
                    onChange={(e) => {
                      const updated = [...character.charms];
                      updated[i].cost = e.target.value;
                      setCharacter((prev: any) => ({ ...prev, charms: updated }));
                    }}
                  />
                  <Input
                    placeholder="Page"
                    type="number"
                    value={charm.page}
                    onChange={(e) => {
                      const updated = [...character.charms];
                      updated[i].page = Number(e.target.value);
                      setCharacter((prev: any) => ({ ...prev, charms: updated }));
                    }}
                  />
                  <Input
                    placeholder="Step"
                    type="number"
                    value={charm.step}
                    onChange={(e) => {
                      const updated = [...character.charms];
                      updated[i].step = Number(e.target.value);
                      setCharacter((prev: any) => ({ ...prev, charms: updated }));
                    }}
                  />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setCharacter((prev: any) => ({
                ...prev,
                charms: [
                  ...(prev.charms || []),
                  { name: '', mode: '', cost: '', page: 0, step: 0, description: '' },
                ],
              }))}
            >
              + Add Charm
            </Button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {character.charms?.map((charm: any, i: number) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <li className="border border-border rounded-md p-4 bg-white/5 cursor-pointer">
                    <p className="font-semibold text-lg line-clamp-1 bg-gradient-to-r from-steel to-aura-lunar text-transparent bg-clip-text">{charm.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {charm.description || '—'}
                    </p>
                  </li>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <span className="bg-gradient-to-r from-steel to-aura-lunar text-transparent bg-clip-text">
                        {charm.name}
                      </span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="text-sm space-y-2 text-aura-abyssal">
                    <p><strong>Mode:</strong> {charm.mode}</p>
                    <p><strong>Cost:</strong> {charm.cost}</p>
                    <p><strong>Page:</strong> {charm.page} • <strong>Step:</strong> {charm.step}</p>
                    <p><strong>Effect:</strong></p>
                    <p className="whitespace-pre-wrap">{charm.description || '—'}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </ul>
        )}
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
