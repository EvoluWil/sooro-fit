import { BmiForm } from '@/components/forms/bmi/schema-bmi-form';
import { BmiFilterForm } from '@/components/organisms/bmi-assessments-filter/schema-bmi-filter';
import { bmiService } from '@/services/bmi.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type MutationInput =
  | { type: 'create'; data: BmiForm }
  | { type: 'update'; id: string; data: BmiForm }
  | { type: 'delete'; id: string };

type MutationResponse = { ok: boolean; message: string };

export const useBmiMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (
    input: MutationInput,
  ): Promise<MutationResponse> => {
    switch (input.type) {
      case 'create':
        return bmiService.create(input.data);
      case 'update':
        return bmiService.update(input.id, input.data);
      case 'delete':
        return bmiService.delete(input.id);
    }
  };

  return useMutation<MutationResponse, Error, MutationInput>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bmi'] });
    },
  });
};

export function useBmiQuery(params?: BmiFilterForm) {
  return useQuery({
    queryKey: ['bmi', params],
    queryFn: () => bmiService.findAll(params),
  });
}
