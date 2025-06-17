import { authService } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  SignInFormDto,
  signInFormInitialValues,
  signInFormSchema,
} from './sign-in.schema';

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<SignInFormDto>({
    defaultValues: signInFormInitialValues,
    resolver: yupResolver(signInFormSchema),
  });

  const { replace } = useRouter();

  const handleSignIn = handleSubmit(async (signInFormDto: SignInFormDto) => {
    setLoading(true);

    const result = await authService.credentials(signInFormDto);

    if (result?.error) {
      setLoading(false);
      return toast.error('Usuário ou senha inválidos!');
    }

    replace('/dashboard');
  });

  return {
    control,
    loading,
    handleSignIn,
  };
};
