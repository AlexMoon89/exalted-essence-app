'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useSession } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';



type Campaign = {
  id: string;
  name: string;
  description: string;
  session_notes?: string;
  image?: string;
  gm_id: string;
};

type Character = {
  id: string;
  name: string;
  campaign_id?: string | null;
  owner_id: string;
  image?: string | null;
};

export default function CampaignDetailPage() {
  const supabase = createClientComponentClient();
  const session = useSession();
  const { slug } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [notes, setNotes] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [myCharacters, setMyCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;

    async function loadCampaignAndCharacters() {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('slug', slug)
        .single();

      const { data: ownedChars } = await supabase
        .from('characters')
        .select('id, name, campaign_id, owner_id')
        .eq('owner_id', userId)
        .is('campaign_id', null);

      setMyCharacters(ownedChars || []);

      if (data) {
        setCampaign(data);
        setTitle(data.name);
        setDescription(data.description || '');
        setNotes(data.session_notes || '');

        const { data: chars } = await supabase
          .from('characters')
          .select('id, name, campaign_id, owner_id, image')
          .eq('campaign_id', data.id);

        setCharacters(chars || []);
      } else {
        console.error('[DEBUG] Campaign load error:', error?.message);
      }
    }

    loadCampaignAndCharacters();
  }, [slug, session]);

  const isGM = session?.user?.id === campaign?.gm_id;

  async function handleSaveCampaignDetails() {
    let imageUrl = campaign?.image;

    if (imageFile) {
      const { data, error } = await supabase.storage
        .from('campaigns')
        .upload(`${slug}/${imageFile.name}`, imageFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from('campaigns')
          .getPublicUrl(data.path);
        imageUrl = urlData?.publicUrl ?? imageUrl;
      }
    }

    const { error } = await supabase
      .from('campaigns')
      .update({
        name: title,
        description,
        image: imageUrl,
      })
      .eq('slug', slug);

    if (!error) setEditMode(false);
  }

  const handleSaveNotes = async () => {
    const { error } = await supabase
      .from('campaigns')
      .update({ session_notes: notes })
      .eq('slug', slug);
  };

  const handleAddCharacterToCampaign = async (selectedCharId: string) => {
    if (!selectedCharId || !campaign?.id || !session?.user?.id) return;

    await supabase
      .from('characters')
      .update({ campaign_id: campaign.id })
      .eq('id', selectedCharId);

    const { data: updatedChars } = await supabase
      .from('characters')
      .select('id, name, campaign_id, owner_id, image')
      .eq('campaign_id', campaign.id);

    setCharacters(updatedChars || []);

    const { data: unassignedChars } = await supabase
      .from('characters')
      .select('id, name, campaign_id, owner_id')
      .eq('owner_id', session.user.id)
      .is('campaign_id', null);

    setMyCharacters(unassignedChars || []);
  };

  if (!campaign) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Image
          src={campaign.image || '/castes/default.png'}
          alt="Campaign"
          width={128}
          height={128}
          className="rounded object-cover"
        />

        <div className="flex-1">
          {editMode && isGM ? (
            <>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mb-2 text-2xl font-bold" />
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Campaign Description" />
              <Input type="file" accept="image/*" className="mt-2" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              <button onClick={handleSaveCampaignDetails} className="mt-2 px-4 py-2 bg-primary border border-primary text-steel hover:bg-aura-sidereal hover:text-white transition">
                Save Changes
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl text-steel font-bold">{campaign.name}</h1>
              <p className="text-muted-foreground mt-1">{campaign.description}</p>
              {isGM && (
                <button onClick={() => setEditMode(true)} className="mt-2 text-sm underline text-aura-sidereal">
                  Edit Campaign
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl text-aura-abyssal font-semibold mt-6">Characters</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {characters.map((char) => (
            <div key={char.id} className="border p-3 rounded shadow-sm bg-card">
              {char.image && <img src={char.image} alt={char.name} className="w-full h-32 object-cover rounded mb-2" />}
              <h3 className="font-semibold">{char.name}</h3>
              <p className="text-sm text-muted-foreground">
                Owner: {char.owner_id}
                <br />
                Campaign: {campaign.name}
              </p>
            </div>
          ))}
        </div>

        {isGM && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">+ Add Character to Campaign</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogTitle className="text-steel">Add a Character</DialogTitle>
              {myCharacters.length > 0 ? (
                <>
                  <Select
                    placeholder="Select a character"
                    options={myCharacters.map((c) => ({ label: c.name, value: c.id }))}
                    value={null}
                    onChange={(val) => handleAddCharacterToCampaign(val)}
                    className="mt-2"
                  />
                </>
              ) : (
                <p className="text-muted-foreground">You have no unassigned characters.</p>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div>
        <h2 className="text-2xl text-steel font-semibold mt-6">Session Notes</h2>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-40 mt-2"
        />
        <button
          onClick={handleSaveNotes}
          className="mt-2 px-4 py-2 border border-primary rounded text-steel hover:bg-aura-sidereal hover:text-white transition"
        >
          Save Notes
        </button>
      </div>
    </div>
  );
}
