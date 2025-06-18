import { Box, Container } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { getUserSession } from '../../utils/session';

export default async function PrivateLayout({ children }: PropsWithChildren) {
  const user = await getUserSession();

  if (!user) {
    return redirect('/auth/sign-in');
  }

  return (
    <Box
      as="main"
      minHeight="calc(100vh - 72px)"
      display="flex"
      flexDirection="column"
      p={{ base: 4, md: 6, lg: 8 }}
    >
      <Container maxW="container.md" mx="auto">
        {children}
      </Container>
    </Box>
  );
}
