'use client';

import { usersService } from '@/services/user.service';
import { User } from '@/types/user.type';
import { Box, Grid, Heading, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert2';
import { NoData } from '../atoms/no-data';
import { DrawerStudentForm } from '../forms/student/drawer-student-form';
import { StudentCard } from '../molecules/student-card';

type StudentListProps = {
  students: User[];
};

export const StudentList = ({ students }: StudentListProps) => {
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  const { refresh } = useRouter();

  const handleSelectStudentToEdit = (student: User) => {
    setSelectedStudent(student);
  };

  const handleDeleteStudent = (student: User) => {
    swal.fire({
      title: 'Tem certeza?',
      text: `Você está prestes a excluir ${student.name}. Esta ação não pode ser desfeita.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const result = await usersService.delete(student.id);
        if (result) {
          refresh();
          toast.success('Aluno excluído com sucesso!');
        }
      },
    });
  };

  return (
    <>
      <HStack justify="space-between" align="center">
        <Box>
          <Heading size="2xl" color="brand.700">
            Alunos
          </Heading>
        </Box>
        <DrawerStudentForm
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      </HStack>

      {students.length === 0 && <NoData message="Nenhum aluno encontrado." />}
      <Grid
        templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
        gap={4}
        mt={8}
      >
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEditClick={() => handleSelectStudentToEdit(student)}
            onDeleteClick={() => handleDeleteStudent(student)}
          />
        ))}
      </Grid>
    </>
  );
};
