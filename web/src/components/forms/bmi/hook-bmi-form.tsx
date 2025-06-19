import { SelectOption } from '@/components/atoms/select-base';
import { bmiService } from '@/services/bmi.service';
import { studentsService } from '@/services/student.service';
import { User } from '@/types/user.type';
import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [students, setStudents] = useState<SelectOption[]>([]);
  const { refresh } = useRouter();
  const { open, onClose, onToggle } = useDisclosure();

  const { control, handleSubmit, reset } = useForm<BmiForm>({
    defaultValues: bmiFormInitialValues,
    resolver: yupResolver(bmiFormBaseSchema),
  });

  const handleCreateBmi = async (data: BmiForm) => {
    const result = await bmiService.create(data);

    if (result) {
      toast.success('Avaliação de IMC criada com sucesso!');
      refresh();
      handleClose();
    }
  };

  const handleUpdateBmi = async (data: BmiForm) => {
    if (!bmi) {
      return toast.error('Avaliação de IMC não encontrada.');
    }
    const result = await bmiService.update(bmi.id, {
      height: data.height,
      weight: data.weight,
    });

    if (result) {
      toast.success('Avaliação de IMC atualizada com sucesso!');
      refresh();
      handleClose();
    }
  };

  const fetchStudents = async () => {
    try {
      const studentsData = await studentsService.findAll({ active: true });
      if (studentsData) {
        setStudents(
          studentsData?.map((student: User) => ({
            label: student.name,
            value: student.id,
          })),
        );
      }
    } catch {
      toast.error('Erro ao carregar alunos.');
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
    if (open) {
      fetchStudents();
    }
  }, [open]);

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
