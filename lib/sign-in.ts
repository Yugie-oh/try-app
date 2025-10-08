"use server"

import { auth } from '@/lib/auth';
import { APIError } from 'better-auth/api';

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    })
    return {success: true};
  } catch (error) {
    if (error instanceof APIError) {
      console.log('API Error:', error.message);
      return { success: false, error: error.message };
    }
  }
}
