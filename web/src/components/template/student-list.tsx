'use client';

import { useStudentMutation, useStudentQuery } from '@/hooks/queries/student';
import { User } from '@/types/user.type';
import { Box, Grid, Heading, HStack } from '@chakra-ui/react';
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
  const { data = students } = useStudentQuery();

  const mutation = useStudentMutation();

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
        const result = await mutation.mutateAsync({
          type: 'delete',
          id: student.id,
        });
        if (result) {
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

      {data.length === 0 && <NoData message="Nenhum aluno encontrado." />}
      <Grid
        templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
        gap={4}
        mt={8}
      >
        {data.map((student) => (
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
