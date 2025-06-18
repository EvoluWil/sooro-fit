import { User } from '@/types/user.type';
import { Avatar, Button, Card, HStack, Stack, Text } from '@chakra-ui/react';

type StudentCardProps = {
  student: User;
  onClick?: () => void;
};

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onClick,
}) => {
  return (
    <Card.Root key={student.id} variant="elevated" borderRadius="md">
      <Button variant="ghost" w="full" p={4} py={8} onClick={onClick}>
        <Card.Body>
          <HStack gap="3">
            <Avatar.Root>
              <Avatar.Fallback name={student.name} />
            </Avatar.Root>
            <Stack gap="0">
              <Text fontWeight="semibold" textStyle="sm">
                {student.name}
              </Text>
              <Text color="gray.500" textStyle="sm" textAlign="left">
                @{student.username}
              </Text>
            </Stack>
          </HStack>
        </Card.Body>
      </Button>
    </Card.Root>
  );
};
