'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useSession } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
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
  player: string;
  image: string | null;
  campaign_name?: string | null;
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
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCampaignAndCharacters() {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('slug', slug)
        .single();

      if (session?.user?.id) {
        const { data: ownedChars } = await supabase
          .from('characters')
          .select('id, name, player, image')
          .eq('user_id', session.user.id)
          .or(`campaign_id.is.null,campaign_id.eq.`);

        setMyCharacters(ownedChars || []);
      }

      if (data) {
        setCampaign(data);
        setTitle(data.name);
        setDescription(data.description || '');
        setNotes(data.session_notes || '');

        const { data: charactersData } = await supabase
          .from('characters')
          .select('id, name, player, image, campaign_id')
          .eq('campaign_id', data.id);

        setCharacters(charactersData || []);
      } else {
        console.error(error?.message);
      }
    }

    loadCampaignAndCharacters();
  }, [slug]);

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

    if (error) console.error('Error saving campaign changes:', error.message);
    else setEditMode(false);
  }

  const handleSaveNotes = async () => {
    const { error } = await supabase
      .from('campaigns')
      .update({ session_notes: notes })
      .eq('slug', slug);

    if (error) console.error('Failed to save notes:', error.message);
  };

  const handleAddCharacterToCampaign = async () => {
    if (!selectedCharId || !campaign?.id) return;

    const { data, error } = await supabase
      .from('characters')
      .update({ campaign_id: campaign.id })
      .eq('id', selectedCharId);

    if (error) {
      console.error('Error adding character:', error.message);
      console.log('Supabase error object:', error);
    } else {
      console.log('Character successfully added:', data);
      location.reload();
    }
  };

  if (!campaign) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-8">
      {/* Campaign Header */}
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
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-2 text-2xl font-bold"
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Campaign Description"
              />
              <Input
                type="file"
                accept="image/*"
                className="mt-2"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              <button
                onClick={handleSaveCampaignDetails}
                className="mt-2 px-4 py-2 bg-primary border border-primary text-steel hover:bg-aura-sidereal hover:text-white transition"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl text-steel font-bold">{campaign.name}</h1>
              <p className="text-muted-foreground mt-1">{campaign.description}</p>
              {isGM && (
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-2 text-sm underline text-aura-sidereal"
                >
                  Edit Campaign
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Character Grid */}
      <div>
        <h2 className="text-2xl text-aura-abyssal font-semibold mt-6">Characters</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {characters.map((char) => (
            <div key={char.id} className="border p-3 rounded shadow-sm bg-card">
              {char.image && (
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <h3 className="font-semibold">{char.name}</h3>
              <p className="text-sm text-muted-foreground">
                Player: {char.player}
                <br />
                Campaign: {campaign?.name || 'Unassigned'}
              </p>
            </div>
          ))}
        </div>

        {/* Add Character Dialog */}
        {isGM && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">+ Add Character to Campaign</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <h3 className="text-xl font-semibold mb-2">Add a Character</h3>
              {myCharacters.length > 0 ? (
                <>
                  <Select
                    value={selectedCharId}
                    onChange={setSelectedCharId}
                    placeholder="Select a character"
                    options={myCharacters.map((c) => ({
                      label: c.name,
                      value: c.id,
                    }))}
                    className="mt-2"
                  />
                  <Button onClick={handleAddCharacterToCampaign} className="mt-4">
                    Add to Campaign
                  </Button>
                </>
              ) : (
                <p className="text-muted-foreground">You have no unassigned characters.</p>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Session Notes */}
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
