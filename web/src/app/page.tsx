import { getUserSession } from '@/utils/session';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const user = await getUserSession();

  if (user) {
    return redirect('/bmi-assessment');
  }

  redirect('/auth/sign-in');
}
