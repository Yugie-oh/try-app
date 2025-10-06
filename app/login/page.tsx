import { LoginButtons } from '@/components/auth/login-buttons';
import { LoginForm } from '@/components/auth/login-form';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect('/home');

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <LoginButtons/>
      <LoginForm/>
    </div>
  );
}
