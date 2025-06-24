'use client';

import { useUser } from '@/lib/useUser';
import Link from 'next/link';
import { LogoutButton } from '@/components/LogoutButton';
import ThemeToggle from '@/components/ThemeToggle';

export default function TopBar() {
  const { user, loading } = useUser();

  console.log('🧪 TopBar → {user, loading}', { user, loading });
  console.log('🧪 About to render LogoutButton');

  if (loading) return null;

  return (
    <div className="flex justify-end items-center gap-4 mb-4 px-6">
      {user ? (
        <>
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <LogoutButton />
        </>
      ) : (
        <Link href="/login" className="text-blue-600 hover:underline text-sm">
          Login
        </Link>
      )}
      <ThemeToggle />
    </div>
  );
}
