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
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export default function MyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm < z.infer < typeof loginFormSchema >> ({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: LoginFormType ) {
    console.log("Begin Login...");
    try {
      setIsLoading(true);
      const result = await credentialLogin(values);

      console.log("✅ Login sucessful!")
      if(!result) {
        toast("Invalid login");
        return;
      }

      window.location.replace("/dashboard");
    } catch (error) {
      toast("Invalid login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`${inter.className} space-y-8 max-w-3xl mx-auto py-10`}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                placeholder="Email"
                type=""
                {...field} />
              </FormControl>
              <FormDescription>This is your account email.</FormDescription>
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