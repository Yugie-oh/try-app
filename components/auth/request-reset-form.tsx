'use client'

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card,  CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import z from "zod"
import { requestPasswordReset } from "@/lib/request-password-reset"
import { useActionState } from "react"
// import { useRouter } from 'next/navigation'
import ButtonWithLoader from '../custom/button-with-loader'

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
})
export function RequestResetForm() {
  // const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  const [state, formAction] = useActionState(
     (prevState: { success: boolean } | undefined, formData: FormData) =>
      requestPasswordReset(formData),
    { success: false }

  )
  console.log('state',{state})
  // if (state?.success) {
  //   setTimeout(() => {
  //     router.push('/login')
  //   }, 1000);
  // }

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <CardHeader className='px-0'>
      <CardTitle className="text-2xl font-bold mb-2">Reset password</CardTitle>
      <CardDescription className="text-gray-500">An email will be sent to the provided email address.</CardDescription>
      </CardHeader>
      <Form {...form}>
      <form action={formAction} className="space-y-6">
        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
          <FormLabel className="font-semibold">Email</FormLabel>
          <FormControl>
            <Input
            placeholder="johndoe@gmail.com"
            type="email"
            autoComplete="email"
            className="focus:ring-2 focus:ring-blue-500"
            {...field}
            />
          </FormControl>
          <FormMessage />
          </FormItem>
        )}
        />

        <ButtonWithLoader
          loadingText="Processing..."
        >
          Reset password
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
