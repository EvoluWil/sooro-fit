import { usersService } from '@/services/user.service';
import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
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
  const { refresh } = useRouter();
  const { open, onClose, onToggle } = useDisclosure();
  const { control, handleSubmit, reset } = useForm<UserForm>({
    defaultValues: isEditing
      ? {
          name: user?.name || '',
        }
      : userFormInitialValues,
    resolver: yupResolver(isEditing ? userFormEditSchema : userFormSchema),
  });

  const handleCreateUser = async (data: UserForm) => {
    const result = await usersService.create(data);

    if (result) {
      toast.success('Aluno criado com sucesso!');
      refresh();
      handleClose();
    }
  };

  const handleUpdateUser = async (data: UserForm) => {
    if (!user) {
      return toast.error('Aluno não encontrado.');
    }

    const result = await usersService.update(user.id, data);

    if (result) {
      toast.success('Aluno atualizado com sucesso!');
      refresh();
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
