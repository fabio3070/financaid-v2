"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormFieldInput } from "./FormFieldInput"
import { signIn } from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 8 characters.",
  })
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false
      });
      
      console.log({ result });


  
      console.log("Login successful:", result);
      // Redirect to a secure page after login (e.g., dashboard)
      //window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      // Display an error message to the user
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormFieldInput
          name="username"
          description="This is username input"
          control={form.control}
        />
        <FormFieldInput
          name="password"
          description="This is password input"
          control={form.control}
        />
        <Button variant='shadow' type="submit">Submit</Button>
      </form>
    </Form>
  )
}
