'use client';

import { useState, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export function NewCampaignModal() {
  const supabase = createClientComponentClient();
  const session = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleCreateCampaign() {
    if (!title || !session?.user) return;

    const slug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().slice(0, 6);
    let imageUrl = null;

    if (imageFile) {
      const { data, error } = await supabase.storage
        .from('campaigns')
        .upload(`${slug}/${imageFile.name}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from('campaigns')
          .getPublicUrl(data.path);
        imageUrl = urlData?.publicUrl ?? null;
      }
    }

    const { data, error } = await supabase
      .from('campaigns')
      .insert([
        {
          name: title,
          description,
          slug,
          gm_id: session.user.id,
          participants: [session.user.id],
          image: imageUrl,
        },
      ])
      .select()
      .single();

    if (!error && data) {
      setOpen(false);
      router.push(`/campaigns/${slug}`);
    } else {
      console.error('Error creating campaign:', error?.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ New Campaign</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg">
        <h2 className="text-xl font-semibold">Create New Campaign</h2>
        <Input
          placeholder="Campaign Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          ref={fileInputRef}
        />
        <div className="text-sm text-muted-foreground">
          GM: {session?.user?.user_metadata?.name || session?.user.email}
        </div>
        <Button onClick={handleCreateCampaign} className="mt-2">
          Create Campaign
        </Button>
      </DialogContent>
    </Dialog>
  );
}
