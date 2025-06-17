import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { getUserSession } from '../../utils/session';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const user = await getUserSession();

  if (user) {
    return redirect('/movies');
  }

  return (
    <Box position="relative" height="100vh">
      <Image
        src="/images/auth-background.jpg"
        alt="Auth Background"
        layout="fill"
        objectFit="cover"
        priority
        style={{ filter: 'blur(4px)' }}
      />
      <Box position="relative">{children}</Box>
    </Box>
  );
}
