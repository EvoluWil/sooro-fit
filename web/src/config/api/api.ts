import { authService } from '@/services/auth.service';
import axios, { AxiosRequestConfig } from 'axios';
import { getServerSession } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { authOptions } from '../auth/auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const handleRefreshToken = async (
  refreshToken: string,
  originalRequest: AxiosRequestConfig,
) => {
  try {
    const result = await authService.refreshToken(refreshToken);

    if (result?.accessToken && originalRequest?.headers) {
      originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
      return api(originalRequest);
    }

    throw new Error('Failed to refresh token');
  } catch {
    toast?.error('Sessão expirada. Faça login novamente.');
    signOut({
      callbackUrl: '/auth/sign-in',
      redirect: true,
    });
  }
};

api.interceptors.response.use(null, async (err) => {
  if (global?.window) {
    const defaultMessage = 'Ops! Algo deu errado. Tente novamente mais tarde.';
    if (typeof err.response?.data?.message === 'string') {
      toast?.error(err.response?.data?.message);
    } else {
      toast?.error(err.response?.data?.message[0] || defaultMessage);
    }

    if (err?.response?.data?.statusCode === 401) {
      const session = await getSession();
      if (session?.user?.refreshToken) {
        return handleRefreshToken(session.user.refreshToken, err.config);
      }
    }
  } else {
    if (err?.response?.data?.statusCode === 401) {
      const session = await getServerSession(authOptions);
      if (session?.user?.refreshToken) {
        return handleRefreshToken(session.user.refreshToken, err.config);
      }
    }
  }
  return { data: null };
});

api.interceptors.request.use(async (config) => {
  if (!config.headers.Authorization) {
    if (!global?.window) {
      const session = await getServerSession(authOptions);
      config.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
    }
    if (global?.window) {
      const session = await getSession();
      if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
      }
    }
  }

  return config;
});
