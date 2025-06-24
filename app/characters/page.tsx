'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/useUser';
import CharactersPage from '@/components/CharactersPage';
import { getCharactersForUser } from '@/lib/getCharactersForUser';

type Character = {
  id: string;
  name: string;
  exaltType: string;
  caste: string;
  essence: number;
  anima: string;
  player: string;
  image: string | null;
};

export default function ProtectedCharactersPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    }

    const fetchCharacters = async () => {
      if (user?.id) {
        try {
          const data = await getCharactersForUser(user.id);
          setCharacters(data);
        } catch (err: any) {
          setFetchError(err.message || 'Error loading characters.');
        } finally {
          setFetching(false);
        }
      }
    };

    if (user?.id) {
      fetchCharacters();
    }
  }, [user, loading, router]);

  if (loading || fetching) return <div className="p-6">Cargando personajes...</div>;
  if (user === null) return null;
  if (fetchError) return <div className="p-6 text-red-600">{fetchError}</div>;

  return <CharactersPage characters={characters} />;
}
