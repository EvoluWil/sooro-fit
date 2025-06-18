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
        refreshToken: { label: 'refreshToken', type: 'text' },
        accessToken: { label: 'accessToken', type: 'text' },
        expiresAt: { label: 'expiresAt', type: 'number' },
        user: { label: 'user', type: 'text' },
      },
      async authorize(credentials) {
        if (
          !credentials?.username &&
          !credentials?.password &&
          credentials?.refreshToken
        ) {
          const user = JSON.parse(credentials?.user);
          return {
            ...user,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
            expiresAt: credentials.expiresAt,
          };
        }

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
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userWithTokens = user as unknown as UserWithTokens;
        token.id = userWithTokens.id;
        token.name = userWithTokens.name;
        token.username = userWithTokens.username;
        token.role = userWithTokens.role;
        token.accessToken = userWithTokens.accessToken;
        token.refreshToken = userWithTokens.refreshToken;
        token.expiresAt = userWithTokens.expiresAt;
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
