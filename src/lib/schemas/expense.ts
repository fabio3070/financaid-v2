import * as z from "zod"

export const expenseFormSchema = z.object({
    type: z.number(),
    value: z.number(),
    recurrency_type: z.string(),
    payment_status: z.number(),
    user_id: z.string()
});

export type ExpenseFormType = z.infer<typeof expenseFormSchema>