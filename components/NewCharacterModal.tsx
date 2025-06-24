'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';

export function NewCharacterModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    concept: '',
    description: '',
    exalt_type: 'Solar',
    caste: 'Zenith',
    essence: 1,
    anima: 'Dim',
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push('/login');
      } else {
        setUserId(session.user.id);
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !form.name.trim()) return;

    const slug = form.name.toLowerCase().replace(/\s+/g, '-');

    const { error } = await supabase.from('characters').insert([
      {
        owner_id: userId,
        name: form.name.trim(),
        slug,
        concept: form.concept,
        description: form.description,
        exalt_type: form.exalt_type,
        caste: form.caste,
        essence: form.essence,
        anima: form.anima,
        charms: [],
      },
    ]);

    if (error) {
      alert('Error creating character: ' + error.message);
    } else {
      setOpen(false);
      router.push(`/characters/${slug}`);
    }
  };

  if (loading) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">New Character</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Character</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <Input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Concept"
            value={form.concept}
            onChange={(e) => setForm({ ...form, concept: e.target.value })}
          />
          <Textarea
            placeholder="Backstory / description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Input
            placeholder="Exalt Type"
            value={form.exalt_type}
            onChange={(e) => setForm({ ...form, exalt_type: e.target.value })}
          />
          <Input
            placeholder="Caste"
            value={form.caste}
            onChange={(e) => setForm({ ...form, caste: e.target.value })}
          />
          <Input
            type="number"
            min={1}
            max={5}
            placeholder="Essence"
            value={form.essence}
            onChange={(e) => setForm({ ...form, essence: Number(e.target.value) })}
          />
          <Input
            placeholder="Anima"
            value={form.anima}
            onChange={(e) => setForm({ ...form, anima: e.target.value })}
          />

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
