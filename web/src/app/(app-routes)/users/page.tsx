import { User } from '@/types/user.type';
import { roleValidator } from '@/utils/role-validator';
import { getUserSession } from '@/utils/session';
import { redirect } from 'next/navigation';

export default async function UserPage() {
  const user = (await getUserSession()) as User;

  if (!roleValidator.isAdmin(user)) {
    return redirect('/');
  }

  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}
