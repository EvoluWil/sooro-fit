import { DrawerBase } from '@/components/atoms/drawer-base';
import { Select } from '@/components/molecules/select';
import { Button } from '@chakra-ui/react';
import { SelectOption } from '../../atoms/select-base';
import { useBmiFilter } from './hook-bmi-filter';
import { BmiFilterForm } from './schema-bmi-filter';

export type BmiAssessmentsFilterProps = {
  students: SelectOption[];
  teachers: SelectOption[];
  onFilter: (data: BmiFilterForm) => Promise<void>;
};

export const DrawerBmiFilter: React.FC<BmiAssessmentsFilterProps> = (props) => {
  const {
    control,
    onSubmit,
    students,
    teachers,
    handleClose,
    onToggle,
    open,
    isAdmin,
  } = useBmiFilter(props);
  return (
    <>
      <Button onClick={onToggle} p={4} variant="outline">
        Filtrar
      </Button>
      <DrawerBase
        title="filtrar de Avaliações de IMC"
        subtitle="Selecione os filtros desejados para visualizar as avaliações de IMC"
        body={
          <>
            <Select
              name="studentId"
              control={control}
              label="Aluno"
              placeholder="Selecione o aluno"
              options={students}
            />

            {isAdmin && (
              <Select
                name="teacherId"
                control={control}
                label="Professor"
                placeholder="Selecione o professor"
                options={teachers}
              />
            )}
          </>
        }
        footer={
          <>
            <Button variant="outline" p={4} onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={onSubmit} p={4}>
              Filtrar
            </Button>
          </>
        }
        isOpen={open}
        onClose={handleClose}
      />
    </>
  );
};
