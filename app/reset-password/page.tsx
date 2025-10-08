import { ResetForm } from '@/components/auth/reset-form';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect('/home');

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <ResetForm/>
    </div>
  );
}
