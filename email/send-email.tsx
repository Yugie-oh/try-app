import { Session } from '@/lib/auth-client';
import ResetPasswordEmailTemplate from '@/mail/reset-password-template';
import VerificationEmailTemplate from '@/mail/verification-template';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const verificationEmail = async (url: string, user: Session) => {
  const newUrl = url + 'login'
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: ['delivered@resend.dev'],
    subject: 'Verify your email',
    react: VerificationEmailTemplate({url: newUrl, name: user.name})
  });

  // PRODUCTION
  // await resend.emails.send({
  //   from: 'noreply@invoice.robustcode.co.za',
  //   // to: [user.email],
  //   to: ['muthige.l@gmail.com'],
  //   subject: 'Verify your email',
  //   react: VerificationEmailTemplate({url, name: user.name})
  // });
}

export const requestResetPasswordEmail = async (url: string, user: Session) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: ['delivered@resend.dev'],
    subject: 'Verify your email',
    react: ResetPasswordEmailTemplate({url, name: user.name, email: user.email})
  });

  // {
  //   to: user.email,
  //   subject: "Reset your password",
  //   text: `Click the link to reset your password: ${url}`,
  // }
}
