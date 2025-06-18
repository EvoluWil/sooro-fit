import { studentsService } from '@/services/student.service';
import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DrawerStudentFormProps } from './drawer-student-form';
import {
  StudentForm,
  studentFormEditSchema,
  studentFormInitialValues,
  studentFormSchema,
} from './schema-student-form';

export const useStudentForm = ({ student }: DrawerStudentFormProps) => {
  const isEditing = !!student;
  const { refresh } = useRouter();
  const { open, onClose, onToggle } = useDisclosure();
  const { control, handleSubmit, reset } = useForm<StudentForm>({
    defaultValues: isEditing
      ? {
          name: student?.name || '',
        }
      : studentFormInitialValues,
    resolver: yupResolver(
      isEditing ? studentFormEditSchema : studentFormSchema,
    ),
  });

  const handleCreateStudent = async (data: StudentForm) => {
    const result = await studentsService.create(data);

    if (result) {
      toast.success('Aluno criado com sucesso!');
      refresh();
      handleClose();
    }
  };

  const handleUpdateStudent = async (data: StudentForm) => {
    if (!student) {
      return toast.error('Aluno não encontrado.');
    }

    const result = await studentsService.update(student.id, data);

    if (result) {
      toast.success('Aluno atualizado com sucesso!');
      refresh();
      handleClose();
    }
  };

  const onSubmit = handleSubmit(
    isEditing ? handleUpdateStudent : handleCreateStudent,
  );

  const handleClose = () => {
    reset(studentFormInitialValues);
    onClose();
  };

  return {
    control,
    onSubmit,
    isEditing,
    open,
    handleClose,
    onToggle,
  };
};
