import { UserStatus } from 'src/enums/user-status.enum';
import * as yup from 'yup';

export const updateStudentSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  status: yup
    .mixed<UserStatus>()
    .oneOf(Object.values(UserStatus), 'Status deve ser ativo ou inativo')
    .required('Status é obrigatório'),
});

export class UpdateStudentDto {
  name: string;
  status: UserStatus;
}
