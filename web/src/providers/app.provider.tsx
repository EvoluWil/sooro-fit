'use client';

import customTheme from '@/components/ui/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { QueryProvider } from './query.provider';
import AuthProvider from './session.provider';

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider value={customTheme}>
      <ToastContainer />
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ChakraProvider>
  );
};
