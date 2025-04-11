import { supabase } from "@/lib/supabaseClient";
import { BalanceResult } from "@/types/balance";

export const fetchAndUpdateBalance = async (userId: string): Promise<BalanceResult | null> => {
    console.log("userId: ", userId);
    if (!userId) {
        console.error("No userId provided");
        return null;
    }

    try {
        const [incomeRes, expenseRes] = await Promise.all([
        supabase
            .from('income')
            .select('value')
            .eq('user_id', userId),
        supabase
            .from('expenses')
            .select('value')
            .eq('user_id', userId),
        ]);

        if (incomeRes.error || expenseRes.error) {
            console.error("Supabase error:", incomeRes.error || expenseRes.error);
            return null;
        }

        const income = incomeRes.data || [];
        const expenses = expenseRes.data || [];

        const totalIncome = income.reduce((sum, i) => sum + (i.value || 0), 0);
        const totalExpenses = expenses.reduce((sum, e) => sum + (e.value || 0), 0);
        const balance = totalIncome - totalExpenses;

        console.log("res: ", incomeRes, expenseRes)

        return {
            balance,
            income: totalIncome,
            expenses: totalExpenses
        };

    } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
    }
};