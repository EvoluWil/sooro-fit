import { UserRole } from 'src/enums/user-role.enum';
import * as yup from 'yup';

export const createUserSchema = yup.object({
  username: yup.string().required('Usuário é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
  name: yup.string().required('Nome é obrigatório'),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole), 'Nível de acesso inválido')
    .required('Nível de acesso é obrigatório'),
});

export class CreateUserDto {
  name: string;
  username: string;
  password: string;
  role: UserRole;
}
