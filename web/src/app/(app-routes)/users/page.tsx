import { UserList } from '@/components/template/user-list';
import { usersService } from '@/services/user.service';
import { User } from '@/types/user.type';
import { roleValidator } from '@/utils/role-validator';
import { getUserSession } from '@/utils/session';
import { redirect } from 'next/navigation';

export default async function UserPage() {
  const user = (await getUserSession()) as User;

  if (!roleValidator.isAdmin(user)) {
    return redirect('/');
  }

  const users = await usersService.findAll();

  return <UserList users={users || []} />;
}
