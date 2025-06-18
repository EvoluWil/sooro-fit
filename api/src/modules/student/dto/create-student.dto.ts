import * as yup from 'yup';

export const createStudentSchema = yup.object({
  username: yup.string().required('Usuário é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
  name: yup.string().required('Nome é obrigatório'),
});

export class CreateStudentDto {
  name: string;
  username: string;
  password: string;
}
