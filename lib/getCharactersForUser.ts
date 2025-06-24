import { supabase } from './supabase';

export async function getCharactersForUser(userId: string) {
  const { data, error } = await supabase
    .from('characters')
    .select('id, slug, name, exalt_type, caste, essence, anima, image_url') // explicitly include all needed fields
    .eq('owner_id', userId);

  if (error) throw error;

  // Optional: Normalize field names to match your `Character` type
  return data.map((char) => ({
    id: char.id,
    slug: char.slug,
    name: char.name,
    exaltType: char.exalt_type,
    caste: char.caste,
    essence: char.essence,
    anima: char.anima,
    player: 'Unknown', // or update if stored
    image: char.image_url,
  }));
}