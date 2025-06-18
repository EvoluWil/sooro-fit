import { Box } from '@chakra-ui/react';

type DividerProps = {
  space: number;
};

export const Divider = ({ space = 3 }: DividerProps) => {
  return <Box borderBottom="1px solid" borderColor="gray.200" my={space} />;
};
