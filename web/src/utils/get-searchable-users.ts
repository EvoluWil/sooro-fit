import { SelectOption } from '@/components/atoms/select-base';
import { BmiAssessment } from '@/types/bmi-assessment.type';
import { User } from '@/types/user.type';
import { roleValidator } from './role-validator';

export type UsersFilterOptions = {
  students: SelectOption[];
  teachers: SelectOption[];
};

export const getUsersFilterOptions = (
  bmiAssessments: BmiAssessment[],
  user: User,
): UsersFilterOptions => {
  if (roleValidator.isStudentOnly(user) || !bmiAssessments?.length) {
    return { students: [], teachers: [] };
  }

  const studentsMap = new Map<string, SelectOption>();
  const teachersMap = new Map<string, SelectOption>();

  for (const assessment of bmiAssessments) {
    const student = assessment.student;
    const evaluator = assessment.evaluator;

    if (!studentsMap.has(student.id)) {
      studentsMap.set(student.id, {
        value: student.id,
        label: student.name,
      });
    }

    if (roleValidator.isAdmin(user) && !teachersMap.has(evaluator.id)) {
      teachersMap.set(evaluator.id, {
        value: evaluator.id,
        label: evaluator.name,
      });
    }
  }

  return {
    students: Array.from(studentsMap.values()),
    teachers: Array.from(teachersMap.values()),
  };
};
