import { SignoutButton } from '@/components/auth/signout-button';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect('/login');

  return (
    <>
      <div>Home Page, you are logged in</div>
      <SignoutButton />
    </>
  );
}
