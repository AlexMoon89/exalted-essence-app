'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Session } from '@supabase/auth-js';

export function SupabaseProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession?: Session | null;
}) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  );
}
