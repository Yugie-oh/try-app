"use server"

import { auth } from '@/lib/auth'
import { APIError } from 'better-auth/api'

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password
      }
    })
    return {success: true};
  } catch (error) {
    if (error instanceof APIError) {
      console.log('API Error:', error.message);
    }
  }
}
