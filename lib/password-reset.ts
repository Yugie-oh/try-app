"use server"

import { auth } from '@/lib/auth'
import { APIError } from 'better-auth/api'

export async function passwordReset(formData: FormData, token: string) {
  // const token = new URLSearchParams(window.location.search).get("token");

  if (!token) {
    return;
  }
  const password = formData.get('password') as string;
  try {
    await auth.api.resetPassword({
      body: {
        newPassword: password, // required
        token,
      },
    });
    return {success: true};
  } catch (error) {
    if (error instanceof APIError) {
      console.log('API Error:', error.message);
      return { success: false, error: error.message };
    }
  }
}
