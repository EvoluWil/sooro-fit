'use client';

import { useUserMutation, useUsersQuery } from '@/hooks/queries/user';
import { User } from '@/types/user.type';
import { Box, Grid, Heading, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert2';
import { NoData } from '../atoms/no-data';
import { DrawerUserForm } from '../forms/user/drawer-user-form';
import { UserCard } from '../molecules/user-card';

type UserListProps = {
  users: User[];
};

export const UserList = ({ users }: UserListProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data = users } = useUsersQuery();

  const mutation = useUserMutation();

  const handleSelectUserToEdit = (user: User) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (user: User) => {
    swal.fire({
      title: 'Tem certeza?',
      text: `Você está prestes a excluir ${user.name}. Esta ação não pode ser desfeita.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const result = await mutation.mutateAsync({
          type: 'delete',
          id: user.id,
        });

        if (result) {
          toast.success('Usuário excluído com sucesso!');
        }
      },
    });
  };

  return (
    <>
      <HStack justify="space-between" align="center">
        <Box>
          <Heading size="2xl" color="brand.700">
            Usuários
          </Heading>
        </Box>
        <DrawerUserForm
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      </HStack>

      {data?.length === 0 && <NoData message="Nenhum usuário encontrado." />}

      <Grid
        templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
        gap={4}
        mt={8}
      >
        {data.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEditClick={() => handleSelectUserToEdit(user)}
            onDeleteClick={() => handleDeleteUser(user)}
          />
        ))}
      </Grid>
    </>
  );
};
