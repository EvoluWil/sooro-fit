import { User } from '@/types/user.type';
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

type StudentDetailProps = {
  student: User;
};

export const StudentDetail: React.FC<StudentDetailProps> = ({ student }) => {
  console.log('Student Detail Component Rendered', student);
  return (
    <Stack>
      <HStack justify="space-between" align="center">
        <Box>
          <Heading size="2xl" color="brand.700">
            Detalhe do aluno
          </Heading>
          <VStack spaceY={0} align="start">
            <Text fontSize="lg">{student.name}</Text>
            <Text position="relative" fontSize="sm" color="gray.500" top={-4}>
              @{student.username}
            </Text>
          </VStack>
        </Box>

        <Button>Ações</Button>
      </HStack>
    </Stack>
  );
};
