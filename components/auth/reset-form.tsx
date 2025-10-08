'use client'

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card,  CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import z from "zod"
import { passwordReset } from "@/lib/password-reset"
import { useActionState, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import ButtonWithLoader from '../custom/button-with-loader'

const formSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})
export function ResetForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  console.log('token', token)
  const [state, formAction] = useActionState(
     (prevState: { success: boolean } | undefined, formData: FormData) =>
      passwordReset(formData, token),
    { success: false }
  )

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!validatePasswords()) {
      e.preventDefault();
      return;
    }
    // Form will submit normally if validation passes
  };

  if (state?.success) {
    setTimeout(() => {
      router.push('/login')
    }, 1000);
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <CardHeader className='px-0'>
      <CardTitle className="text-2xl font-bold mb-2">Reset password</CardTitle>
      <CardDescription className="text-gray-500">An email will be sent to the provided email address.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
            <FormLabel className="font-semibold">Password</FormLabel>
            <FormControl>
              <Input
              placeholder="Password"
              type="password"
              className="focus:ring-2 focus:ring-blue-500"
              {...field}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormMessage />
            </FormItem>
          )}
          />

          <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
            <FormLabel className="font-semibold">Confirm password</FormLabel>
            <FormControl>
              <Input
              placeholder="Confirm password"
              type="password"
              className="focus:ring-2 focus:ring-blue-500"
              {...field}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validatePasswords}
              />
            </FormControl>
            <FormMessage />
            </FormItem>
          )}
          />

          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <ButtonWithLoader
            loadingText="Processing..."
          >
            Change password
          </ButtonWithLoader>

          {state?.success && (
            <div className="mt-1 flex justify-center text-center">
              <span className="w-full px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium shadow-sm border border-green-300">
                Reset successful! Redirecting...
              </span>
            </div>
          )}
          {state?.error && (
            <div className="mt-1 flex justify-center text-center">
              <span className="w-full px-4 py-2 rounded-lg bg-red-100 text-red-700 font-medium shadow-sm border border-red-300">
                {state?.error}
              </span>
            </div>
          )}
        </form>
      </Form>
    </Card>
  )
}
