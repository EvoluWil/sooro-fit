'use client';

import { useSession } from '@/providers/session.provider';
import { bmiService } from '@/services/bmi.service';
import { BmiAssessment } from '@/types/bmi-assessment.type';
import { UsersFilterOptions } from '@/utils/get-searchable-users';
import { roleValidator } from '@/utils/role-validator';
import { Box, Heading, HStack, Stack, Table } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert2';
import { NoData } from '../atoms/no-data';
import { DrawerBmiForm } from '../forms/bmi/drawer-bmi-form';
import { BmiCell } from '../molecules/bmi-cell';
import { DrawerBmiFilter } from '../organisms/bmi-assessments-filter/drawer-bmi-filter';
import { BmiFilterForm } from '../organisms/bmi-assessments-filter/schema-bmi-filter';

type BmiAssessmentListProps = {
  bmiAssessments: BmiAssessment[];
  usersFilterOptions: UsersFilterOptions;
};

export const BmiAssessmentList: React.FC<BmiAssessmentListProps> = ({
  bmiAssessments,
  usersFilterOptions,
}) => {
  const [bmiAssessmentsState, setBmiAssessmentsState] =
    useState<BmiAssessment[]>(bmiAssessments);
  const [selectedBmiAssessment, setSelectedBmiAssessment] =
    useState<BmiAssessment | null>(null);

  const { refresh } = useRouter();
  const { user } = useSession();

  const handleSelectBmiAssessmentToEdit = (bmiAssessment: BmiAssessment) => {
    setSelectedBmiAssessment(bmiAssessment);
  };

  const handleDeleteBmiAssessment = (bmiAssessment: BmiAssessment) => {
    swal.fire({
      title: 'Tem certeza?',
      text: `Você está prestes a excluir a avaliação de IMC de ${bmiAssessment.student?.name}. Esta ação não pode ser desfeita.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const result = await bmiService.delete(bmiAssessment.id);
        if (result) {
          refresh();
          toast.success('Avaliação de IMC excluída com sucesso!');
        }
      },
    });
  };

  const handleFilter = async (data: BmiFilterForm) => {
    const filteredBmiAssessments = await bmiService.findAll(data);
    if (Array.isArray(filteredBmiAssessments)) {
      setBmiAssessmentsState(filteredBmiAssessments);
    }
  };

  return (
    <Box>
      <HStack justify="space-between" align="center">
        <Box>
          <Heading size="2xl" color="brand.700">
            Avaliações de IMC
          </Heading>
        </Box>
        <Box display="flex" gap={2}>
          <DrawerBmiForm
            bmi={selectedBmiAssessment}
            onClose={() => setSelectedBmiAssessment(null)}
            onSuccess={() => handleFilter({} as BmiFilterForm)}
          />
          {user && roleValidator.isTeacher(user) && (
            <DrawerBmiFilter
              onFilter={handleFilter}
              students={usersFilterOptions.students || []}
              teachers={
                roleValidator.isAdmin(user)
                  ? usersFilterOptions.teachers || []
                  : []
              }
            />
          )}
        </Box>
      </HStack>

      {bmiAssessmentsState?.length === 0 && (
        <NoData message="Nenhuma avaliação de IMC encontrada." />
      )}

      {bmiAssessmentsState.length > 0 && (
        <Stack p={4} mt={4} bg="gray.50" rounded="md">
          <Table.Root size="md" p={4}>
            <Table.Header>
              <Table.Row bg="transparent" h={12}>
                <Table.ColumnHeader p={2}>#</Table.ColumnHeader>
                <Table.ColumnHeader p={2}>ALUNO</Table.ColumnHeader>
                <Table.ColumnHeader p={2} textAlign="center">
                  AVALIAÇÃO
                </Table.ColumnHeader>
                <Table.ColumnHeader p={2} textAlign="end">
                  IMC
                </Table.ColumnHeader>
                <Table.ColumnHeader p={2} textAlign="end">
                  ALTURA(CM)
                </Table.ColumnHeader>
                <Table.ColumnHeader p={2} textAlign="end">
                  PESO(KG)
                </Table.ColumnHeader>
                <Table.ColumnHeader p={2} textAlign="center">
                  DATA
                </Table.ColumnHeader>
                <Table.ColumnHeader p={2}>RESPONSÁVEL</Table.ColumnHeader>
                {user && roleValidator.isTeacher(user) && (
                  <Table.ColumnHeader p={2}>AÇÕES</Table.ColumnHeader>
                )}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {bmiAssessmentsState?.map((bmiAssessment, index) => (
                <BmiCell
                  key={bmiAssessment.id}
                  bmiAssessment={bmiAssessment}
                  index={index}
                  onEditClick={() =>
                    handleSelectBmiAssessmentToEdit(bmiAssessment)
                  }
                  onDeleteClick={() => handleDeleteBmiAssessment(bmiAssessment)}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
      )}
    </Box>
  );
};
