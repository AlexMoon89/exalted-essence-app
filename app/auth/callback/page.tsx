'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleOAuth = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error during auth callback:', error.message);
      }

      // ✅ redirect to your app’s home or dashboard
      router.push('/characters');
    };

    handleOAuth();
  }, [router]);

  return <p className="p-6">Logging in...</p>;
}
