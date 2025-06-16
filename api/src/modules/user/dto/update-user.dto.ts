import * as yup from 'yup';

export const updateUserSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
});

export class UpdateUserDto {
  name: string;
}
