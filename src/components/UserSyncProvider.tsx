"use client";

import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { syncUserWithSupabase } from '@/lib/userService';

export function UserSyncProvider({ children }: { children: React.ReactNode }) {
  const { user, authenticated } = usePrivy();

  useEffect(() => {
    const syncUser = async () => {
      console.log('UserSyncProvider: authenticated =', authenticated, 'user =', user);
      
      if (authenticated && user) {
        console.log('Attempting to sync user with Supabase:', user.id);
        try {
          const result = await syncUserWithSupabase(user);
          console.log('User sync result:', result);
        } catch (error) {
          console.error('Failed to sync user with Supabase:', error);
        }
      }
    };

    syncUser();
  }, [authenticated, user]);

  return <>{children}</>;
}
