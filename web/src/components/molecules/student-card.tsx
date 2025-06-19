import { useSession } from '@/providers/session.provider';
import { User, UserStatus } from '@/types/user.type';
import { roleValidator } from '@/utils/role-validator';
import {
  Avatar,
  Card,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash } from 'react-icons/fi';

type StudentCardProps = {
  student: User;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEditClick,
  onDeleteClick,
}) => {
  const isActive = student.status === UserStatus.ACTIVE;

  const { user } = useSession();
  return (
    <Card.Root
      key={student.id}
      variant={isActive ? 'elevated' : 'subtle'}
      borderRadius="md"
      p={4}
    >
      <Card.Body>
        <HStack gap="3">
          <Avatar.Root colorPalette="brand">
            <Avatar.Fallback name={student.name} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm" textAlign="left">
              {student.name}
            </Text>
            <Text color="gray.500" textStyle="sm" textAlign="left">
              @{student.username}
            </Text>
          </Stack>
          <VStack ml="auto">
            <HStack justify="flex-end" gap="2" w="full">
              <IconButton onClick={onEditClick} rounded="full" size="xs">
                <FiEdit2 />
              </IconButton>
              {!!user && roleValidator.isAdmin(user) && (
                <IconButton onClick={onDeleteClick} rounded="full" size="xs">
                  <FiTrash />
                </IconButton>
              )}
            </HStack>
          </VStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};
