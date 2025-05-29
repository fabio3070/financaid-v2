import { supabase } from "@/lib/supabaseClient";
import { BalanceResult } from "@/types/balance";
import { getDateRange } from "@/utils/date";

/**
 * 
 * @param userId 
 * @returns Promise with balance, income and expense value
 * @description Where all the logic behind the total balance, expenses and income values are calculated
 */
export const fetchAndUpdateBalance = async (userId: string, selectedMonth: string): Promise<BalanceResult | null> => {
    console.log("fetchAndUpdateBalnce values:  ", userId, selectedMonth);
    if (!userId) {
        console.error("No userId provided");
        return null;
    }

    const { beginDate, endDate } = getDateRange(selectedMonth);

    try {
        const [incomeRes, expenseRes] = await Promise.all([
        supabase
            .from('income')
            .select('value, created_at')
            .eq('user_id', userId)
            .filter('created_at', 'gte', `${beginDate}`)
            .filter('created_at', 'lt', `${endDate}`),
        supabase
            .from('expenses')
            .select('value, created_at')
            .eq('user_id', userId)
            .filter('created_at', 'gte', `${beginDate}`)
            .filter('created_at', 'lt', `${endDate}`),
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