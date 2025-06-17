import { Heading, Text } from '@chakra-ui/react';
import { JSX } from 'react';

type TitleProps = {
  title: string | JSX.Element;
  subtitle?: string;
};

export const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <>
      <Heading p={2}>{title}</Heading>
      {subtitle && (
        <Text color="gray.500" fontSize="sm">
          {subtitle}
        </Text>
      )}
    </>
  );
};
