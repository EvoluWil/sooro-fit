import { UserRole } from '@/types/user.type';
import * as yup from 'yup';

export type UserForm = {
  name: string;
  role: UserRole;
  username?: string;
  password?: string;
  passwordConfirmation?: string;
};

export const userFormInitialValues: UserForm = {
  name: '',
  role: UserRole.TEACHER,
  username: '',
  password: '',
  passwordConfirmation: '',
};

export const userFormEditSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole), 'Nível de acesso inválido')
    .required('Nível de acesso é obrigatório')
    .notOneOf(
      [UserRole.STUDENT],
      'Apenas usuários com nível de acesso PROFESSOR e ADMINISTRADOR podem ser criados',
    ),
});

export const userFormSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required('Nome de usuário é obrigatório')
      .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres')
      .max(20, 'Nome de usuário deve ter no máximo 20 caracteres')
      .matches(
        /^[a-zA-Z0-9]+$/,
        'Nome de usuário deve conter apenas letras e números',
      ),
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    passwordConfirmation: yup
      .string()
      .required('Confirmação de senha é obrigatória')
      .oneOf([yup.ref('password')], 'Senhas não coincidem'),
  })
  .concat(userFormEditSchema);
