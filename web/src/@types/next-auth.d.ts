import { UserWithTokens } from '@/types/user.type';
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: UserWithTokens;
  }

  interface User extends DefaultUser {
    id: string;
    token: string;
  }
}
