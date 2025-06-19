'use client';

import { usersService } from '@/services/user.service';
import { User } from '@/types/user.type';
import { Box, Grid, Heading, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
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

  const { refresh } = useRouter();

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
        const result = await usersService.delete(user.id);
        if (result) {
          refresh();
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

      {users?.length === 0 && <NoData message="Nenhum usuário encontrado." />}

      <Grid
        templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
        gap={4}
        mt={8}
      >
        {users.map((user) => (
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
