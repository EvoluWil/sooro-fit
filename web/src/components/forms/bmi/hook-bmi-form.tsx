import { SelectOption } from '@/components/atoms/select-base';
import { useBmiMutation } from '@/hooks/queries/bmi';
import { useStudentQuery } from '@/hooks/queries/student'; // <--- novo hook aqui
import { User } from '@/types/user.type';
import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DrawerBmiFormProps } from './drawer-bmi-form';
import {
  BmiForm,
  bmiFormBaseSchema,
  bmiFormInitialValues,
} from './schema-bmi-form';

export const useBmiForm = ({ bmi, onClose: emitClose }: DrawerBmiFormProps) => {
  const isEditing = !!bmi;
  const { open, onClose, onToggle } = useDisclosure();
  const mutation = useBmiMutation();

  const { data: studentsData, isError } = useStudentQuery({ active: true });

  const students: SelectOption[] = useMemo(() => {
    if (!studentsData) return [];
    return studentsData.map((student: User) => ({
      label: student.name,
      value: student.id,
    }));
  }, [studentsData]);

  const { control, handleSubmit, reset } = useForm<BmiForm>({
    defaultValues: bmiFormInitialValues,
    resolver: yupResolver(bmiFormBaseSchema),
  });

  const handleCreateBmi = async (data: BmiForm) => {
    const result = await mutation.mutateAsync({
      type: 'create',
      data,
    });

    if (result) {
      toast.success('Avaliação de IMC criada com sucesso!');
      handleClose();
    }
  };

  const handleUpdateBmi = async (data: BmiForm) => {
    if (!bmi) {
      return toast.error('Avaliação de IMC não encontrada.');
    }

    const result = await mutation.mutateAsync({
      type: 'update',
      id: bmi.id,
      data,
    });

    if (result) {
      toast.success('Avaliação de IMC atualizada com sucesso!');
      handleClose();
    }
  };

  const handleClose = () => {
    reset(bmiFormInitialValues);
    onClose();
    if (emitClose) {
      emitClose();
    }
  };

  useEffect(() => {
    if (bmi) {
      onToggle();
      reset({
        height: String(bmi.height),
        weight: String(bmi.weight),
        studentId: bmi.student?.id,
      });
    }
  }, [bmi]);

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao carregar alunos.');
    }
  }, [isError]);

  const onSubmit = handleSubmit(isEditing ? handleUpdateBmi : handleCreateBmi);

  return {
    control,
    onSubmit,
    isEditing,
    open,
    handleClose,
    onToggle,
    students,
  };
};
