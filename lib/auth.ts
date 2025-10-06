import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from 'next/headers';
import { db } from "@/db";

export const auth = betterAuth({
  //...other options
  emailVerification: {
    sendVerificationEmail: async ({url, user}) => {
      await sendEmail(url, user)
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
    maxPasswordLength: 100,
    requireEmailVerification: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
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
});

export const getSession = async () => auth.api.getSession({
  headers: await headers()
})
