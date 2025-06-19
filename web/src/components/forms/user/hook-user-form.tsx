import { useUserMutation } from '@/hooks/queries/user';
import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DrawerUserFormProps } from './drawer-user-form';
import {
  UserForm,
  userFormEditSchema,
  userFormInitialValues,
  userFormSchema,
} from './schema-user-form';

export const useUserForm = ({
  user,
  onClose: emitClose,
}: DrawerUserFormProps) => {
  const isEditing = !!user;
  const { open, onClose, onToggle } = useDisclosure();
  const mutation = useUserMutation();

  const { control, handleSubmit, reset } = useForm<UserForm>({
    defaultValues: isEditing
      ? {
          name: user?.name || '',
        }
      : userFormInitialValues,
    resolver: yupResolver(isEditing ? userFormEditSchema : userFormSchema),
  });

  const handleCreateUser = async (data: UserForm) => {
    const result = await mutation.mutateAsync({
      type: 'create',
      data,
    });

    if (result) {
      toast.success('Aluno criado com sucesso!');
      handleClose();
    }
  };

  const handleUpdateUser = async (data: UserForm) => {
    if (!user) {
      return toast.error('Aluno não encontrado.');
    }

    const result = await mutation.mutateAsync({
      type: 'update',
      id: user.id,
      data,
    });

    if (result) {
      toast.success('Aluno atualizado com sucesso!');
      handleClose();
    }
  };

  const onSubmit = handleSubmit(
    isEditing ? handleUpdateUser : handleCreateUser,
  );

  const handleClose = () => {
    reset(userFormInitialValues);
    onClose();
    if (emitClose) {
      emitClose();
    }
  };

  useEffect(() => {
    if (user) {
      onToggle();
      reset({
        name: user.name,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  return {
    control,
    onSubmit,
    isEditing,
    open,
    handleClose,
    onToggle,
  };
};
