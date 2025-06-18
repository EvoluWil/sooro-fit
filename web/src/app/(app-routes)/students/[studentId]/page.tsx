import { User } from '@/types/user.type';
import { roleValidator } from '@/utils/role-validator';
import { getUserSession } from '@/utils/session';
import { redirect } from 'next/navigation';

type StudentDetailPageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function StudentDetailPage({
  params,
}: StudentDetailPageProps) {
  const user = (await getUserSession()) as User;
  const { studentId } = await params;

  if (!roleValidator.isTeacher(user) && user.id !== studentId) {
    return redirect('/');
  }

  return (
    <div>
      <h1>Student Details</h1>
    </div>
  );
}
