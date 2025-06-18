'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function NewCharacterPage() {
  const router = useRouter();
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
    if (!userId) return;

    const slug = form.name.toLowerCase().replace(/\s+/g, '-');

    const { error } = await supabase.from('characters').insert([
      {
        owner_id: userId,
        name: form.name,
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
      router.push(`/characters/${slug}`);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Character</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          required
          placeholder="Character Name"
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
          placeholder="Exalt Type (e.g. Solar, Lunar)"
          value={form.exalt_type}
          onChange={(e) => setForm({ ...form, exalt_type: e.target.value })}
        />
        <Input
          placeholder="Caste (e.g. Zenith)"
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
          placeholder="Anima (e.g. Dim, Burning)"
          value={form.anima}
          onChange={(e) => setForm({ ...form, anima: e.target.value })}
        />

        <Button type="submit" className="mt-4">
          Create Character
        </Button>
      </form>
    </div>
  );
}
