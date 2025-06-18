import { roleValidator } from '@/utils/role-validator';
import { getUserSession } from '@/utils/session';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const user = await getUserSession();

  if (user) {
    if (roleValidator.isStudent(user)) {
      return redirect(`/students/${user.id}`);
    }
    return redirect('/dashboard');
  }

  redirect('/auth/sign-in');
}
