import { useSession } from '@/providers/session.provider';
import {
  AssessmentLevelLabels,
  BmiAssessment,
} from '@/types/bmi-assessment.type';
import { formatDate, formatNumber } from '@/utils/format';
import { roleValidator } from '@/utils/role-validator';
import { Badge, HStack, IconButton, Table } from '@chakra-ui/react';
import { FiEdit2, FiTrash } from 'react-icons/fi';

type BmiCellProps = {
  bmiAssessment: BmiAssessment;
  index: number;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

export const BmiCell: React.FC<BmiCellProps> = ({
  bmiAssessment,
  index,
  onEditClick,
  onDeleteClick,
}) => {
  const { user } = useSession();
  return (
    <Table.Row bg="transparent" h={12} p={4}>
      <Table.Cell p={2}>{index + 1}</Table.Cell>
      <Table.Cell p={2}>{bmiAssessment.student?.name}</Table.Cell>
      <Table.Cell p={2} textAlign="center">
        <Badge
          variant="solid"
          colorPalette={
            AssessmentLevelLabels[bmiAssessment.assessment]?.color || 'gray'
          }
          px={2}
        >
          {AssessmentLevelLabels[bmiAssessment.assessment]?.label || 'Usuário'}
        </Badge>
      </Table.Cell>
      <Table.Cell p={2} textAlign="end">
        {formatNumber(bmiAssessment.bmi)}
      </Table.Cell>
      <Table.Cell p={2} textAlign="end">
        {formatNumber(bmiAssessment.height)}
      </Table.Cell>
      <Table.Cell p={2} textAlign="end">
        {formatNumber(bmiAssessment.weight)}
      </Table.Cell>
      <Table.Cell p={2} textAlign="center">
        {formatDate(bmiAssessment.createdAt)}
      </Table.Cell>
      <Table.Cell p={2}>{bmiAssessment.evaluator?.name}</Table.Cell>
      {!!user && roleValidator.isTeacher(user) && (
        <Table.Cell p={2}>
          <HStack gap="2">
            <IconButton onClick={onEditClick} rounded="full" size="xs">
              <FiEdit2 />
            </IconButton>
            {roleValidator.isAdmin(user) && (
              <IconButton onClick={onDeleteClick} rounded="full" size="xs">
                <FiTrash />
              </IconButton>
            )}
          </HStack>
        </Table.Cell>
      )}
    </Table.Row>
  );
};
