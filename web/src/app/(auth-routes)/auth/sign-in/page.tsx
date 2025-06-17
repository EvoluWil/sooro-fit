import { Center, VStack } from '@chakra-ui/react';
import { SignInForm } from './sign-in.form';

export default function SignInPage() {
  return (
    <VStack align="center" justify="center" h="100vh" w="full">
      <Center>
        <SignInForm />
      </Center>
    </VStack>
  );
}
