import * as yup from 'yup';

export const updateBmiAssessmentSchema = yup.object().shape({
  height: yup
    .number()
    .required()
    .positive('Altura deve ser positiva')
    .max(3, 'Altura não pode exceder 3 metros'),
  weight: yup
    .number()
    .required()
    .positive('Peso deve ser positivo')
    .max(500, 'Peso não pode exceder 500 kg'),
});

export class UpdateBmiAssessmentDto {
  height: number;
  weight: number;
  bmi: number;
}
