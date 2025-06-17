import * as yup from 'yup';

export const createBmiAssessmentSchema = yup.object().shape({
  height: yup
    .number()
    .required('Altura é obrigatória')
    .positive('Altura deve ser positiva')
    .max(3, 'Altura não pode exceder 3 metros'),
  weight: yup
    .number()
    .required('Peso é obrigatório')
    .positive('Peso deve ser positivo')
    .max(500, 'Peso não pode exceder 500 kg'),
  studentId: yup
    .string()
    .uuid('Formato de ID de aluno inválido')
    .required('ID de aluno é obrigatório'),
  evaluatorId: yup
    .string()
    .uuid('Formato de ID de avaliador inválido')
    .required('ID de avaliador é obrigatório'),
});

export class CreateBmiAssessmentDto {
  height: number;
  weight: number;
  bmi: number;
  studentId: string;
  evaluatorId: string;
}
