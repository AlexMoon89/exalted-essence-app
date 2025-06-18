import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

console.log('📦 SUPABASE URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('📦 SUPABASE KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

const supabase = createServerClient(
  'https://bvbjvcbzprzhalczqhjc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Ymp2Y2J6cHJ6aGFsY3pxaGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxOTg3NTgsImV4cCI6MjA2NTc3NDc1OH0.xW4HnZWyA1SYBKw3Zd0aXRqbG4VzBE5FYKYtPBU3EqA',
  {
    cookies: {
      get: (name) => req.cookies.get(name)?.value,
      set: (name, value, options) => {
        res.cookies.set({ name, value, ...options });
      },
      remove: (name, options) => {
        res.cookies.delete({ name, ...options });
      },
    },
  }
);

  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: ['/characters/:path*', '/characters/new'],
};
