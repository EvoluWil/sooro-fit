import { DrawerBase } from '@/components/atoms/drawer-base';
import { InputNumber } from '@/components/molecules/input-number';
import { Select } from '@/components/molecules/select';
import { BmiAssessment } from '@/types/bmi-assessment.type';
import { Button } from '@chakra-ui/react';
import { useBmiForm } from './hook-bmi-form';

export type DrawerBmiFormProps = {
  bmi?: BmiAssessment | null;
  onClose: () => void;
  onSuccess: () => void;
};

export const DrawerBmiForm: React.FC<DrawerBmiFormProps> = (props) => {
  const {
    control,
    onSubmit,
    isEditing,
    open,
    handleClose,
    onToggle,
    students,
  } = useBmiForm(props);
  return (
    <>
      <Button onClick={onToggle} p={4}>
        Adicionar avaliação
      </Button>
      <DrawerBase
        title={isEditing ? 'Editar Avaliação de IMC' : 'Nova Avaliação de IMC'}
        subtitle={
          isEditing
            ? 'Preencha os dados do aluno para atualizar a avaliação'
            : 'Preencha os dados do aluno para criar uma nova avaliação'
        }
        body={
          <>
            {!isEditing && (
              <Select
                name="studentId"
                control={control}
                label="Aluno"
                placeholder="Selecione o aluno"
                options={students}
              />
            )}

            <InputNumber
              name="height"
              control={control}
              label="Altura (cm)"
              placeholder="Ex: 175.5"
              max={300}
              min={100}
              step={0.1}
            />

            <InputNumber
              name="weight"
              control={control}
              label="Peso (kg)"
              placeholder="Ex: 70.5"
              max={500}
              min={30}
              step={0.1}
            />
          </>
        }
        footer={
          <>
            <Button variant="outline" p={4} onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={onSubmit} p={4}>
              {isEditing ? 'Atualizar avaliação' : 'Criar avaliação'}
            </Button>
          </>
        }
        isOpen={open}
        onClose={handleClose}
      />
    </>
  );
};
