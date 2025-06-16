import * as yup from 'yup';

export const SignInSchema = yup.object({
  username: yup.string().required('Usuário é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export class SignInDto {
  username: string;
  password: string;
}
