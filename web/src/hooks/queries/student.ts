import { StudentForm } from '@/components/forms/student/schema-student-form';
import { studentsService } from '@/services/student.service';
import { User } from '@/types/user.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type StudentMutationInput =
  | { type: 'create'; data: StudentForm }
  | { type: 'update'; id: string; data: StudentForm }
  | { type: 'delete'; id: string };

type StudentMutationResponse = { ok: boolean; message: string };

export const useStudentMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (
    input: StudentMutationInput,
  ): Promise<StudentMutationResponse> => {
    switch (input.type) {
      case 'create':
        return studentsService.create(input.data);
      case 'update':
        return studentsService.update(input.id, input.data);
      case 'delete':
        return studentsService.delete(input.id);
    }
  };

  return useMutation<StudentMutationResponse, Error, StudentMutationInput>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

type StudentQueryParams = {
  active?: boolean;
};

export const useStudentQuery = (params?: StudentQueryParams) => {
  return useQuery<User[]>({
    queryKey: ['students', params],
    queryFn: () => studentsService.findAll(params),
  });
};
