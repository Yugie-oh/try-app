import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from 'next/headers';
import { db } from "@/db";
import { nextCookies } from 'better-auth/next-js';
import { verificationEmail, requestResetPasswordEmail } from '@/email/send-email';

export const auth = betterAuth({
  //...other options
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  emailVerification: {
    sendVerificationEmail: async ({url, user}) => {
      await verificationEmail(url, user)
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
    maxPasswordLength: 100,
    requireEmailVerification: true,
    sendResetPassword: async ({user, url, token}, request) => {
      await requestResetPasswordEmail(url, user);
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  pages: {
    signIn: '/login',
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()], // for email and password, keep at the bottom
});

export const getSession = async () => auth.api.getSession({
  headers: await headers()
})
