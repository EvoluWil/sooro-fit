import { UserStatus } from '@/types/user.type';
import * as yup from 'yup';

export type StudentForm = {
  name: string;
  username?: string;
  status: UserStatus;
  password?: string;
  passwordConfirmation?: string;
};

export const studentFormInitialValues: StudentForm = {
  name: '',
  username: '',
  status: UserStatus.ACTIVE,
  password: '',
  passwordConfirmation: '',
};

export const studentFormBaseSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  status: yup
    .mixed<UserStatus>()
    .oneOf(Object.values(UserStatus), 'Status deve ser ativo ou inativo')
    .required('Status é obrigatório'),
});

export const studentFormCreateSchema = yup
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
  .concat(studentFormBaseSchema);
