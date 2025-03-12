import * as z from "zod"

export const loginFormSchema = z.object({
    email: z.string().email({message: "Wrong format for email."}),
    password: z.string().min(2, {
      message: "Password must be at least 8 characters.",
    })
});

export type LoginFormType = z.infer<typeof loginFormSchema>