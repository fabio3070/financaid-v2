"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { inter } from "@/app/ui/fonts"
import { loginFormSchema, LoginFormType } from "@/lib/schemas/auth"
import { z } from "zod"
import { credentialLogin } from "@/lib/actions/login/actions"

export default function MyForm() {

  const form = useForm < z.infer < typeof loginFormSchema >> ({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  async function onSubmit(values: LoginFormType ) {
    try {
      console.log("credentialLogin");
      const result = await credentialLogin(values);

      if(!result) {
        //throw a error toast
      }
      window.location.href = "/dashboard";
    } catch (error) {
      // Handle login error here
      console.error("Login failed:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`${inter.className} space-y-8 max-w-3xl mx-auto py-10`}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input 
                placeholder="Username"
                type=""
                {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-10">
          <Button 
          variant='shadow' 
          type="submit"
          size="xlg"
          darkBackground={true}
          >Sign In</Button>
        </div>
      </form>
    </Form>
  )
}