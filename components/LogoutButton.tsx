'use client';

import { useUser } from '@/lib/useUser';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  const { supabase } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return <Button variant="outline" onClick={handleLogout}>Log Out</Button>;
}