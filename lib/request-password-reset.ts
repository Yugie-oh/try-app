"use server"

import { auth } from '@/lib/auth'
import { APIError } from 'better-auth/api'

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;
  try {
    const result = await auth.api.requestPasswordReset({
      body: {
        email: email, // required
        redirectTo: "/reset-password",
      },
    });
    // await auth.api.forgetPassword({
    //   body: {
    //     email: email, // required
    //     redirectTo: "/reset-password",
    //   },
    // });
    // return {success: true, result};
    return {success: true};
  } catch (error) {
    if (error instanceof APIError) {
      console.log('API Error:', error.message);
      return { success: false, error: error.message };
    }
  }
}
