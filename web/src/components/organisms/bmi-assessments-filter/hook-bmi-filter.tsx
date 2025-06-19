import { useSession } from '@/providers/session.provider';
import { roleValidator } from '@/utils/role-validator';
import { useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BmiAssessmentsFilterProps } from './drawer-bmi-filter';
import { BmiFilterForm, bmiFilterFormInitialValues } from './schema-bmi-filter';

export const useBmiFilter = ({
  onFilter,
  students,
  teachers,
}: BmiAssessmentsFilterProps) => {
  const { open, onClose, onToggle } = useDisclosure();
  const { user } = useSession();
  const { control, handleSubmit, reset } = useForm<BmiFilterForm>({
    defaultValues: bmiFilterFormInitialValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    await onFilter(data);
    handleClose();
  });

  const handleClose = () => {
    reset(bmiFilterFormInitialValues);
    onClose();
  };

  const isAdmin = !!user && roleValidator.isAdmin(user);

  return {
    control,
    onSubmit,
    students,
    teachers,
    open,
    handleClose,
    onToggle,
    isAdmin,
  };
};
