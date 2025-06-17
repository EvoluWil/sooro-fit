'use client';

import customTheme from '@/components/ui/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider value={customTheme}>
      <ToastContainer />
      {children}
    </ChakraProvider>
  );
};
