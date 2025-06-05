"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { expenseFormSchema } from "@/lib/schemas/expense";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ExpenseCreationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useCurrentUser();

  const form = useForm < z.infer < typeof expenseFormSchema >> ({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      type: 0,
      value: 0,
      recurrency_type: "",
      payment_status: 0,
      user_id: user?.id
    },
  })

  async function onSubmit(values: LoginFormType ) {
    console.log("Begin submitting expense...");
    try {
      setIsLoading(true);
      const result = await credentialLogin(values);

      console.log("✅ Login sucessful!")
      if(!result) {
        toast("Invalid login");
        return;
      }

    } catch (error) {
      console.log(error);
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
          name="type"
          render={({ field }) => (
            <FormItem>
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
          name="type"
          render={({ field }) => (
            <FormItem>
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
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                placeholder="Value"
                type="number"
                {...field}/>
              </FormControl>
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