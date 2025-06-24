import { supabase } from './supabase';

export async function getCharactersForUser(userId: string) {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('owner_id', userId);

  if (error) throw error;
  return data;
}
