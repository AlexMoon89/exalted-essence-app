'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginOrRegister = async () => {
    setError('');

    // Primero: intentar login
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginData.session) {
      router.push('/characters');
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
        return;
      }

      // Intentar login de nuevo después del registro
      const { error: retryError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (retryError) {
        setError(retryError.message);
        return;
      }

      router.push('/characters');
    } else {
      setError(loginError?.message || 'Login failed.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login / Registro</h1>

      <Input
        type="email"
        placeholder="Tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3"
      />
      <Input
        type="password"
        placeholder="Contraseña (mínimo 6 caracteres)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3"
      />
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <Button onClick={handleLoginOrRegister}>Login / Registro</Button>
    </div>
  );
}
