import { User } from '@/types/user.type';
import { roleValidator } from '@/utils/role-validator';
import { getUserSession } from '@/utils/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = (await getUserSession()) as User;

  if (!roleValidator.isTeacher(user)) {
    return redirect('/');
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
