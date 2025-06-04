import { useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { useFinanceStore } from "@/store/useFinanceStore";

export function useFetchFinanceData(userId: string | undefined, selectedMonth: string) {
  const {
    setIncomes, 
    setBalance, 
    setExpenses,
    setIsExpensesInitialized,
    setIsLoadingIncome,
    setIsLoadingBalance,
    setIsLoadingExpenses
} = useFinanceStore();

  const params = new URLSearchParams({ userId: userId || '', month: selectedMonth });

  // Use useQueries to fetch income and expenses simultaneously
  const results = useQueries({
    queries: [
      {
        queryKey: ['income', userId, selectedMonth],
        queryFn: async () => {
          const res = await fetch(`/api/income?${params}`);
          if (!res.ok) throw new Error('Failed to fetch incomes');
          return res.json();
        },
        enabled: !!userId,
      },
      {
        queryKey: ['expenses', userId, selectedMonth],
        queryFn: async () => {
          const res = await fetch(`/api/expenses?${params}`);
          if (!res.ok) throw new Error('Failed to fetch expenses');
          return res.json();
        },
        enabled: !!userId,
      }
    ]
  });

  const [incomeQuery, expensesQuery] = results;

  useEffect(() => {
    setIsLoadingIncome(incomeQuery.isLoading || incomeQuery.isFetching);
    setIsLoadingExpenses(expensesQuery.isLoading || expensesQuery.isFetching);
    setIsLoadingBalance(expensesQuery.isLoading || expensesQuery.isFetching || incomeQuery.isLoading || incomeQuery.isFetching);
  }, [
    incomeQuery.isLoading, incomeQuery.isFetching,
    expensesQuery.isLoading, expensesQuery.isFetching,
    setIsLoadingIncome, setIsLoadingExpenses
  ]);

  useEffect(() => {
    if (incomeQuery.data && expensesQuery.data) {
      setIncomes(incomeQuery.data);
      setExpenses(expensesQuery.data);

      setIsExpensesInitialized(true);

      const totalIncome = incomeQuery?.data?.reduce((sum: number, i: { value: number }) => sum + i.value, 0);
      const totalExpenses = expensesQuery?.data?.reduce((sum: number, e: { value: number }) => sum + e.value, 0);

      setBalance(totalIncome - totalExpenses);
    }
  }, [incomeQuery.data, expensesQuery.data, setIncomes, setExpenses, setBalance]);
}
