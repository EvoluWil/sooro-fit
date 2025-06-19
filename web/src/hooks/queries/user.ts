import { UserForm } from '@/components/forms/user/schema-user-form';
import { usersService } from '@/services/user.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type UserMutationInput =
  | { type: 'create'; data: UserForm }
  | { type: 'update'; id: string; data: UserForm }
  | { type: 'delete'; id: string };

type UserMutationResponse = { ok: boolean; message: string };

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (
    input: UserMutationInput,
  ): Promise<UserMutationResponse> => {
    switch (input.type) {
      case 'create':
        return usersService.create(input.data);
      case 'update':
        return usersService.update(input.id, input.data);
      case 'delete':
        return usersService.delete(input.id);
    }
  };

  return useMutation<UserMutationResponse, Error, UserMutationInput>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export function useUsersQuery() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.findAll(),
  });
}
