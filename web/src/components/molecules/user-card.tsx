import { User, UserRoleLabel, UserStatus } from '@/types/user.type';
import {
  Avatar,
  Badge,
  Card,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash } from 'react-icons/fi';

type UserCardProps = {
  user: User;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEditClick,
  onDeleteClick,
}) => {
  const isActive = user.status === UserStatus.ACTIVE;
  return (
    <Card.Root
      key={user.id}
      variant={isActive ? 'elevated' : 'subtle'}
      borderRadius="md"
      p={4}
    >
      <Card.Body>
        <HStack gap="3">
          <Avatar.Root colorPalette="brand">
            <Avatar.Fallback name={user.name} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm" textAlign="left">
              {user.name}
            </Text>
            <Text color="gray.500" textStyle="sm" textAlign="left">
              @{user.username}
            </Text>
          </Stack>

          <VStack ml="auto">
            <Badge
              variant="solid"
              colorPalette={UserRoleLabel[user.role]?.color || 'gray'}
              px={2}
            >
              {UserRoleLabel[user.role]?.label || 'Usuário'}
            </Badge>
            <HStack justify="flex-end" gap="2" w="full">
              <IconButton onClick={onEditClick} rounded="full" size="xs">
                <FiEdit2 />
              </IconButton>
              <IconButton onClick={onDeleteClick} rounded="full" size="xs">
                <FiTrash />
              </IconButton>
            </HStack>
          </VStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};
