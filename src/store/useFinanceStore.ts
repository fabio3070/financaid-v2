import { FinanceState } from '@/types/transactions';
import { create } from 'zustand';

export const useFinanceStore = create<FinanceState>((set, get) => ({
  incomes: [],
  expenses: [],
  balance: 0,
  isLoadingExpenses: true,
  isLoadingIncome: true,
  isLoadingBalance: true,

  // Derived values
  totalIncome: () => get().incomes.reduce((sum, i) => sum + i.value, 0),
  totalExpense: () => get().expenses.reduce((sum, e) => sum + e.value, 0),

  setIncomes: (incomes) => set({ incomes }),
  setExpenses: (expenses) => set({ expenses }),
  setBalance: (value: number) => set({ balance: value }),

  setIsLoadingIncome: (loading) => set({ isLoadingIncome: loading }),
  setIsLoadingExpenses: (loading) => set({ isLoadingExpenses: loading }),
  setIsLoadingBalance: (loading) => set({ isLoadingBalance: loading }),

  addIncome: (income) => set((state) => ({ incomes: [...state.incomes, income] })),
  addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
}));
