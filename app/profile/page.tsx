'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        router.push('/login?redirectTo=/profile'); // 👈 Redirigir si no hay usuario
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single();

      if (data?.display_name) setDisplayName(data.display_name);
      setLoading(false);
    };

    loadProfile();
  }, [router, supabase]);

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl text-steel font-bold">Profile Settings</h1>

      <div>
        <label className="block text-aura-abyssal font-medium mb-1">Display Name</label>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your player name"
        />
      </div>

      <Button onClick={handleSave}>Save</Button>
    </div>
  );

  async function handleSave() {
    if (!userId) return;
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: userId, display_name: displayName });

    if (!error) alert('Profile updated!');
    else console.error('Error updating profile:', error.message);
  }
}
