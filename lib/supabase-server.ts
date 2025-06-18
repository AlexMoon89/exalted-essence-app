// lib/supabase-server.ts
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    'https://bvbjvcbzprzhalczqhjc.supabase.co', // 🔒 safe for now
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Ymp2Y2J6cHJ6aGFsY3pxaGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxOTg3NTgsImV4cCI6MjA2NTc3NDc1OH0.xW4HnZWyA1SYBKw3Zd0aXRqbG4VzBE5FYKYtPBU3EqA',
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: () => {},
        remove: () => {},
      },
    }
  );
}

