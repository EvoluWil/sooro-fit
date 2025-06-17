'use client';

import { Title } from '@/components/atoms/title';
import { InputText } from '@/components/molecules/input-text';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useSignIn } from './sign-in.hook';

export const SignInForm = () => {
  const { control, loading, handleSignIn } = useSignIn();

  return (
    <Box
      as="form"
      onSubmit={handleSignIn}
      bg="gray.50"
      p={6}
      borderRadius="xl"
      w="full"
      maxW="412px"
    >
      <VStack spaceY={2} align="stretch">
        <Box textAlign="center" mb={6}>
          <Title
            title={
              <>
                Boas vindas ao
                <Text
                  as="span"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="brand.700"
                >
                  {' '}
                  Sooro Fit!
                </Text>
              </>
            }
            subtitle="Digite suas credenciais para acessar sua conta"
          />
        </Box>

        <InputText
          label="Nome de usuário"
          name="username"
          placeholder="Digite seu nome de usuário"
          disabled={loading}
          control={control}
        />

        <InputText
          label="Senha"
          name="password"
          placeholder="Digite sua senha"
          type="password"
          disabled={loading}
          control={control}
        />

        <Box>
          <Button loading={loading} mt={8} w="full" type="submit">
            Entrar
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
