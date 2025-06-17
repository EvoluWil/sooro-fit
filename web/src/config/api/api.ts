import axios from 'axios';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { authOptions } from '../auth/auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(null, (err) => {
  if (global?.window) {
    const defaultMessage = 'Ops! Algo deu errado. Tente novamente mais tarde.';
    if (typeof err.response?.data?.message === 'string') {
      toast?.error(err.response?.data?.message);
    } else {
      toast?.error(err.response?.data?.message[0] || defaultMessage);
    }
  } else {
    if (err?.response?.data?.statusCode === 401) {
      redirect('/');
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
