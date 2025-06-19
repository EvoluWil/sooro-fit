import * as yup from 'yup';

export type BmiForm = {
  height: string;
  weight: string;
  studentId: string;
};

export const bmiFormInitialValues: BmiForm = {
  height: '',
  weight: '',
  studentId: '',
};

export const bmiFormBaseSchema = yup.object().shape({
  height: yup
    .string()
    .required('Altura é obrigatória')
    .matches(/^\d+(\.\d+)?$/, 'Altura deve ser um número válido')
    .test('max', 'Altura não pode exceder 300 cm', (value) => {
      const num = parseFloat(value);
      return !value || (num > 100 && num <= 300);
    }),
  weight: yup
    .string()
    .required('Peso é obrigatório')
    .matches(/^\d+(\.\d+)?$/, 'Peso deve ser um número válido')
    .test('max', 'Peso não pode exceder 500 kg', (value) => {
      const num = parseFloat(value);
      return !value || (num > 30 && num <= 500);
    }),
  studentId: yup
    .string()
    .uuid('Formato de ID de aluno inválido')
    .required('ID de aluno é obrigatório'),
});
