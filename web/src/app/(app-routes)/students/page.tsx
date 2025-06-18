import { StudentList } from '@/components/template/student-list';
import { studentsService } from '@/services/student.service';
import { User } from '@/types/user.type';
import { roleValidator } from '@/utils/role-validator';
import { getUserSession } from '@/utils/session';
import { redirect } from 'next/navigation';

export default async function StudentPage() {
  const user = (await getUserSession()) as User;

  if (!roleValidator.isTeacher(user)) {
    return redirect('/');
  }

  const students = await studentsService.findAll();

  return <StudentList students={students || []} />;
}
