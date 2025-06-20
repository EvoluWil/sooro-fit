import { useStudentMutation } from '@/hooks/queries/student';
import { UserStatus } from '@/types/user.type';
import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DrawerStudentFormProps } from './drawer-student-form';
import {
  StudentForm,
  studentFormBaseSchema,
  studentFormCreateSchema,
  studentFormInitialValues,
} from './schema-student-form';

export const useStudentForm = ({
  student,
  onClose: emitClose,
}: DrawerStudentFormProps) => {
  const isEditing = !!student;
  const mutation = useStudentMutation();
  const { open, onClose, onToggle } = useDisclosure();
  const { control, handleSubmit, reset } = useForm<StudentForm>({
    defaultValues: isEditing
      ? {
          name: student?.name || '',
          status: student?.status as UserStatus,
        }
      : studentFormInitialValues,
    resolver: yupResolver(
      isEditing ? studentFormBaseSchema : studentFormCreateSchema,
    ),
  });

  const handleCreateStudent = async (data: StudentForm) => {
    const result = await mutation.mutateAsync({
      type: 'create',
      data,
    });

    if (result) {
      toast.success('Aluno criado com sucesso!');
      handleClose();
    }
  };

  const handleUpdateStudent = async (data: StudentForm) => {
    if (!student) {
      return toast.error('Aluno não encontrado.');
    }

    const result = await mutation.mutateAsync({
      type: 'update',
      id: student.id,
      data,
    });

    if (result) {
      toast.success('Aluno atualizado com sucesso!');
      handleClose();
    }
  };

  const onSubmit = handleSubmit(
    isEditing ? handleUpdateStudent : handleCreateStudent,
  );

  const handleClose = () => {
    reset(studentFormInitialValues);
    onClose();
    if (emitClose) {
      emitClose();
    }
  };

  useEffect(() => {
    if (student) {
      onToggle();
      reset({
        name: student.name,
        status: student.status,
      });
    }
  }, [student]);

  return {
    control,
    onSubmit,
    isEditing,
    open,
    handleClose,
    onToggle,
  };
};
