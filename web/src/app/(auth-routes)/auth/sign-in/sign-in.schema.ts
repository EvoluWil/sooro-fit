import * as yup from 'yup';

export type SignInFormDto = {
  username: string;
  password: string;
};

export const signInFormInitialValues: SignInFormDto = {
  username: '',
  password: '',
};

export const signInFormSchema = yup.object().shape({
  username: yup.string().required('Nome de usuário é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});
