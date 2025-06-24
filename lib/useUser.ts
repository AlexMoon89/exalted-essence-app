'use client';

import { useSessionContext } from '@supabase/auth-helpers-react';

export function useUser() {
  const { session, isLoading, supabaseClient } = useSessionContext();

  return {
    user: session?.user ?? null,
    loading: isLoading,
    supabase: supabaseClient,
  };
}
