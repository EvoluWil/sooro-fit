import { Heading, HStack } from '@chakra-ui/react';
import Image from 'next/image';

export const Logo = () => {
  return (
    <HStack align="center" spaceX={1} display={{ base: 'none', sm: 'flex' }}>
      <Image src="/images/logo.png" alt="Sooro Fit" width={40} height={40} />
      <Heading fontWeight="bold" color="brand.500">
        Sooro Fit
      </Heading>
    </HStack>
  );
};
