import { Center, Icon, Text } from '@chakra-ui/react';
import { FiInbox } from 'react-icons/fi';

type NoDataProps = {
  message?: string;
};

export const NoData = ({
  message = 'Nenhum dado encontrado.',
}: NoDataProps) => {
  return (
    <Center w="100%" h="100%" minH="200px" flexDirection="column" gap={4}>
      <Icon as={FiInbox} boxSize={12} color="gray.300" />
      <Text color="gray.500" fontSize="lg" fontWeight="medium">
        {message}
      </Text>
    </Center>
  );
};
