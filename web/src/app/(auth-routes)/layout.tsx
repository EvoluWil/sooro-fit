import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { getUserSession } from '../../utils/session';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const user = await getUserSession();

  if (user) {
    return redirect('/movies');
  }

  return <div className="p-4">{children}</div>;
}
