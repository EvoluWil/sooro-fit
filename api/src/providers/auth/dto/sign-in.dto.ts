import * as yup from 'yup';

export const SignInSchema = yup.object({
  username: yup
    .string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export class SignInDto {
  username: string;
  password: string;
}
