'use client';

import { api } from '@/config/api/api';
import { User } from '@/types/user.type';
import { SessionProvider, useSession as useSessionBase } from 'next-auth/react';
import { PropsWithChildren, useMemo } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

export const useSession = () => {
  const session = useSessionBase();

  const user = useMemo(() => {
    if (!session?.data?.user) return null;

    api.defaults.headers.common.Authorization = `Bearer ${session?.data?.user?.accessToken}`;
    return session?.data?.user as User;
  }, [session]);

  return { user };
};
