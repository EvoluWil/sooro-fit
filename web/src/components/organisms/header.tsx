'use client';

import { useSession } from '@/providers/session.provider';
import { routes } from '@/routes/index.route';
import { authService } from '@/services/auth.service';
import {
  Box,
  Button,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Portal,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { Divider } from '../atoms/divider';
import { Logo } from '../atoms/logo';
import { AuthUserCard } from '../molecules/auth-user-card';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSession();
  const pathName = usePathname();

  if (routes.every((route) => !pathName.includes(route.path))) {
    return null;
  }

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    const result = await authService.signOut();
    setIsOpen(false);
    if (result) {
      return signOut({
        callbackUrl: '/auth/sign-in',
        redirect: true,
      });
    }
  };

  return (
    <>
      <Flex
        bg="white"
        _dark={{ bg: 'gray.800' }}
        px={4}
        py={3}
        justify="space-between"
        align="center"
        boxShadow="sm"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={10}
      >
        <HStack spaceX={4}>
          <Drawer.Root
            open={isOpen}
            onOpenChange={() => setIsOpen((prev) => !prev)}
            placement="start"
          >
            <Drawer.Trigger asChild>
              <IconButton aria-label="open-menu" variant="ghost">
                <FiMenu size={20} />
              </IconButton>
            </Drawer.Trigger>

            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content bg="gray.100" _dark={{ bg: 'gray.700' }} p={0}>
                  <HStack justify="space-between" align="center" px={4} pt={3}>
                    <Box>
                      <Logo />
                    </Box>
                    <Drawer.CloseTrigger asChild>
                      <IconButton aria-label="close-menu" variant="ghost">
                        <FiX size={20} />
                      </IconButton>
                    </Drawer.CloseTrigger>
                  </HStack>
                  <Divider />
                  <Drawer.Body p={2}>
                    {routes
                      .filter((route) => (user ? route.rule(user) : false))
                      .map((route) => {
                        const isActive = pathName.includes(route.path);
                        return (
                          <React.Fragment key={route.path}>
                            <Link href={route.path}>
                              <Button
                                variant={isActive ? 'solid' : 'ghost'}
                                w="full"
                                onClick={handleCloseMenu}
                                px={4}
                              >
                                <HStack
                                  align="center"
                                  spaceX={2}
                                  justify="flex-start"
                                  w="full"
                                  textTransform="uppercase"
                                >
                                  {route.icon}
                                  {route.label}
                                </HStack>
                              </Button>
                            </Link>
                            <Divider />
                          </React.Fragment>
                        );
                      })}

                    <Button
                      variant="ghost"
                      w="full"
                      onClick={handleSignOut}
                      px={4}
                      mt="auto"
                    >
                      <HStack
                        align="center"
                        spaceX={2}
                        justify="flex-start"
                        w="full"
                        textTransform="uppercase"
                      >
                        <FiLogOut />
                        Sair
                      </HStack>
                    </Button>
                  </Drawer.Body>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
          <Logo />
        </HStack>

        <AuthUserCard />
      </Flex>
      <Box h="72px" />
    </>
  );
};
