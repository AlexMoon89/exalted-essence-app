'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/useUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const { user, supabase, loading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/characters');
    }
  }, [user, router]);

  const handleLoginOrRegister = async () => {
    setError('');
    setPending(true);

    // Intentar login
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginData.session) {
      setPending(false);
      // El efecto de arriba redirige
      return;
    }

    if (loginError?.message === 'Invalid login credentials') {
      // Intentar registro si el login falla
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setPending(false);
        return;
      }
      // El efecto de arriba redirige cuando el usuario se loguea
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
