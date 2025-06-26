import { supabase } from './supabase';

export async function getCharactersForUser(userId: string) {
  const { data, error } = await supabase
    .from('characters')
    .select(`
      *,
      profiles:owner_id (
        display_name,
        avatar_url
      )
    `)
    .eq('owner_id', userId);

  if (error) throw error;

  return data.map((char) => ({
    id: char.id,
    slug: char.slug,
    name: char.name,
    exaltType: char.exalt_type,
    caste: char.caste,
    essence: char.essence,
    anima: char.anima,
    player: char.profiles?.display_name || 'Unknown',
    image: char.image_url,
    profiles: char.profiles ?? {},
  }));
}
