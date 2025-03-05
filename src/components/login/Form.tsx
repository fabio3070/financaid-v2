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
import { useState } from "react";
import { toast } from "sonner"


export default function MyForm() {
  const [isLoading, setIsloading] = useState(false);

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
      setIsloading(true);
      const result = await credentialLogin(values);

      if(!result) {
        toast("Invalid login");
      }
      window.location.href = "/dashboard";
    } catch (error) {
      // Handle login error here
      toast("Invalid login");
      console.error("Login failed:", error);
    } finally {
      setIsloading(false);
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
          isLoading={isLoading}
          >Sign In</Button>
        </div>
      </form>
    </Form>
  )
}