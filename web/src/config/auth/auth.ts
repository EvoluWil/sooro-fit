import { authService, SignInResponse } from '@/services/auth.service';
import { UserWithTokens } from '@/types/user.type';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '../api/api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const result = (await authService.signIn({
          username: credentials?.username as string,
          password: credentials?.password as string,
        })) as SignInResponse;

        if (result) {
          return {
            ...result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            expiresAt: result.expiresAt,
            token: result.accessToken,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const userWithTokens = user as unknown as UserWithTokens;
        token.id = userWithTokens.id;
        token.name = userWithTokens.name;
        token.role = userWithTokens.role;
        token.accessToken = userWithTokens.accessToken;
        token.refreshToken = userWithTokens.refreshToken;
        token.expiresAt = userWithTokens.expiresAt;
      }

      if (trigger === 'update' && session) {
        token.name = session.name;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token as UserWithTokens;
      api.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
