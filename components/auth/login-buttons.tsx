"use client";

import { authClient } from '@/lib/auth-client';
import { Button } from '../ui/button';

export const LoginButtons = () => {
  const signinWithGithub = async () => await authClient.signIn.social({
    callbackURL: '/home',
    provider: 'github'
  });
  const signinWithGoogle = async () => await authClient.signIn.social({
    callbackURL: '/home',
    provider: 'google'
  });
  return (
    <>
      <Button onClick={signinWithGithub} className='w-[45%]' variant='outline'>
        github
      </Button>
      <Button onClick={signinWithGoogle} className='w-[45%]' variant='outline'>
        google
      </Button>
    </>
  )
}
