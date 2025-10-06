import { LoginButtons } from '@/components/auth/login-buttons';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect('/home');

  return (
    <div>
      <LoginButtons/>
    </div>
  );
}
