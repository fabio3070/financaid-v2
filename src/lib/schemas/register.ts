import * as z from "zod"

export const registerFormSchema = z.object({
    email: z.string().email({ message: "This is not a valid email" }),
    firstName: z.string().min(2, {
      message: "First name must be at least 8 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 8 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 8 characters.",
    })
}).superRefine(({ confirmPassword, password}, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords dont match",
      path: ['confirmPassword']
    })
  }
});

export type RegisterFormType = z.infer<typeof registerFormSchema>