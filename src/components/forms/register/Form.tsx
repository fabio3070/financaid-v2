"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema, RegisterFormType } from '@/lib/schemas/register';
import { Input } from "@/components/ui/input"
import { PasswordInput } from '../ui/password-input';
import { Button } from '../ui/Button';
import { inter } from '@/app/ui/fonts';
import { registerUser } from '@/lib/actions/register/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();
  
  const form = useForm < z.infer < typeof registerFormSchema >> ({
      resolver: zodResolver(registerFormSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
  });

  async function onSubmit(values: RegisterFormType ) {
    try {
      console.log("submitted...")
      setIsloading(true);
      const result = await registerUser(values);

      if(!result) {
        toast("Invalid register, please try again later.");
      }

      toast("Registered with success!");
      router.push('/login');
    } catch (error) {
      toast("Invalid register, please try again later.");
      console.error("Register failed:", error);
    } finally {
      setIsloading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`${inter.className} space-y-6 max-w-3xl mx-auto py-10`}>
        <FormField 
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First name</FormLabel>
            <FormControl>
              <Input 
              placeholder="First name"
              type=""
              {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />

        <FormField 
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input 
              placeholder="Last name"
              type=""
              {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />

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
            <FormMessage />
          </FormItem>
        )}
        />

        <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm password</FormLabel>
            <FormControl>
              <PasswordInput placeholder="Confirm password" {...field} />
            </FormControl>
            <FormDescription>Re-enter your password.</FormDescription>
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
