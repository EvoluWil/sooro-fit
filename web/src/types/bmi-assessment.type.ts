import { User } from './user.type';

export enum AssessmentLevel {
  UNDERWEIGHT = 'underweight',
  NORMAL = 'normal',
  OVERWEIGHT = 'overweight',
  OBESITY_1 = 'obesity_1',
  OBESITY_2 = 'obesity_2',
  OBESITY_3 = 'obesity_3',
}

export const AssessmentLevelLabels: Record<
  AssessmentLevel,
  { label: string; color: string }
> = {
  [AssessmentLevel.UNDERWEIGHT]: {
    label: 'Abaixo do peso',
    color: 'cyan',
  },
  [AssessmentLevel.NORMAL]: { label: 'Peso normal', color: 'green' },
  [AssessmentLevel.OVERWEIGHT]: { label: 'Sobrepeso', color: 'yellow' },
  [AssessmentLevel.OBESITY_1]: { label: 'Obesidade grau I', color: 'orange' },
  [AssessmentLevel.OBESITY_2]: {
    label: 'Obesidade grau II',
    color: 'red',
  },
  [AssessmentLevel.OBESITY_3]: { label: 'Obesidade grau III', color: 'purple' },
};

export type BmiAssessment = {
  id: string;
  height: number;
  weight: number;
  bmi: number;
  assessment: AssessmentLevel;
  student: User;
  evaluator: User;
  createdAt: string;
};
