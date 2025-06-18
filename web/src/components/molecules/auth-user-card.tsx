import { useSession } from '@/providers/session.provider';
import { Avatar, Card, HStack, Stack, Text } from '@chakra-ui/react';

export const AuthUserCard = () => {
  const { user } = useSession();

  if (!user) {
    return null;
  }

  return (
    <Card.Root
      minW="140px"
      maxW="200px"
      variant="outline"
      borderColor="gray.100"
    >
      <Card.Body>
        <HStack gap="3" p={1}>
          <Avatar.Root>
            <Avatar.Fallback name={user?.name} />
          </Avatar.Root>
          <Stack gap="0" maxWidth="100%" overflow="hidden">
            <Text
              fontWeight="semibold"
              textStyle="sm"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              color="brand.500"
            >
              {user?.name}
            </Text>
            <Text
              color="gray.500"
              textStyle="xs"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              @{user?.username}
            </Text>
          </Stack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};
