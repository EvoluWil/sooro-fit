import * as yup from 'yup';

export const updateStudentSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
});

export class UpdateStudentDto {
  name: string;
}
