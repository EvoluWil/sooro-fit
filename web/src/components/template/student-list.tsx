'use client';

import { User } from '@/types/user.type';
import { Box, Grid, Heading, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { DrawerStudentForm } from '../forms/student/drawer-student-form';
import { StudentCard } from '../molecules/student-card';

type StudentListProps = {
  students: User[];
};

export const StudentList = ({ students }: StudentListProps) => {
  const { push } = useRouter();

  const handleSelectStudent = (studentId: string) => {
    push(`/students/${studentId}`);
  };

  return (
    <>
      <HStack justify="space-between" align="center">
        <Box>
          <Heading size="2xl" color="brand.700">
            Alunos
          </Heading>
        </Box>
        <DrawerStudentForm />
      </HStack>

      <Grid
        templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
        gap={4}
        mt={8}
      >
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onClick={() => handleSelectStudent(student.id)}
          />
        ))}
      </Grid>
    </>
  );
};
