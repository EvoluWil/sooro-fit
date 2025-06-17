import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { getUserSession } from '../../utils/session';

export default async function PrivateLayout({ children }: PropsWithChildren) {
  const user = await getUserSession();

  if (!user) {
    return redirect('/auth/sign-in');
  }

  return <div>{children}</div>;
}
