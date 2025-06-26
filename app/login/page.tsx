'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/lib/useUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/characters';

  const hasRedirected = useRef(false); // ✅ evita múltiples redirecciones

  const { user, supabase, loading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push(redirectTo);
    }
  }, [user, redirectTo, router]);

  const handleLoginOrRegister = async () => {
    setError('');
    setPending(true);

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginData.session) {
      setPending(false);
      // Redirige manualmente si el efecto aún no se disparó
      if (!hasRedirected.current) {
        hasRedirected.current = true;
        router.push(redirectTo);
      }
      return;
    }

    if (loginError?.message === 'Invalid login credentials') {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        setError(signUpError.message);
        setPending(false);
        return;
      }
    } else if (loginError) {
      setError(loginError.message);
      setPending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white/80 dark:bg-dark-background/10 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Log In or Register</h1>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3"
        autoComplete="email"
      />
      <Input
        type="password"
        placeholder="Password (6 characters minimum)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3"
        autoComplete="current-password"
      />
      {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}
      <Button onClick={handleLoginOrRegister} disabled={pending || loading} className="w-full">
        {pending ? 'Processing...' : 'Login / Register'}
      </Button>
    </div>
  );
}
