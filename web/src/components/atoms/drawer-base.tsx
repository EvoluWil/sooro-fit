import { CloseButton, Drawer, Portal, Stack, Text } from '@chakra-ui/react';
import { JSX } from 'react';

type DrawerBaseProps = {
  title: string;
  subtitle?: string;
  body: JSX.Element;
  footer: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
};

export const DrawerBase: React.FC<DrawerBaseProps> = ({
  title,
  subtitle,
  body,
  footer,
  isOpen,
  onClose,
}) => {
  return (
    <Drawer.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content p={4}>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {subtitle && <Text color="gray.500">{subtitle}</Text>}
              <Stack mt={8}>{body}</Stack>
            </Drawer.Body>
            <Drawer.Footer>{footer}</Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
