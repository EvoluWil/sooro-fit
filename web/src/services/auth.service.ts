import { api } from '@/config/api/api';
import { User } from '@/types/user.type';
import { signIn } from 'next-auth/react';

export type SignInResponse = {
  user: User;
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
};

type Credentials = {
  username: string;
  password: string;
};

class AuthService {
  async signIn(credentials: Credentials) {
    const { data } = await api.post<SignInResponse>(
      '/auth/sign-in',
      credentials,
    );

    return data;
  }

  async credentials(credentials: Credentials) {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    return result;
  }

  async getMe() {
    const { data } = await api.get<User>('/auth/me');
    return data;
  }

  async signOut() {
    const { data } = await api.post('/auth/sign-out');
    return data;
  }

  async refreshToken(refreshToken: string) {
    const { data } = await api.post<SignInResponse>('/auth/refresh-token', {
      refreshToken,
    });

    if (data) {
      await signIn('credentials', {
        ...data,
        user: JSON.stringify(data.user),
        redirect: false,
      });

      return data;
    }

    throw new Error('Failed to refresh token');
  }
}

export const authService = new AuthService();
