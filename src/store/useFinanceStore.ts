import { FinanceState, Income } from '@/types/transactions';
import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';

export const useFinanceStore = create<FinanceState>((set, get) => ({
  // Initial state
  incomes: [],
  expenses: [],
  balance: 0,

  // Derived values
  totalIncome: () => get().incomes.reduce((sum, i) => sum + i.value, 0),
  totalExpense: () => get().expenses.reduce((sum, e) => sum + e.value, 0),

  setIncomes: (incomes) => set({ incomes }),
  setExpenses: (expenses) => set({ expenses }),

  addIncome: (income) => set((state) => ({ incomes: [...state.incomes, income] })),
  addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),

  // Supabase realtime subscriptions
  subscribeToChanges: () => {
      const incomeChannel = supabase
      .channel('income_changes')
      .on(
          'postgres_changes',
          {
              event: '*',
              schema: 'public',
              table: 'income',
          },
          (payload) => {
          const eventType = payload.eventType;
          const newRecord = payload.new as Income;

          switch (eventType) {
              case 'INSERT':
              get().addIncome(newRecord);
              break;
              case 'UPDATE':
              set((state) => ({
                  incomes: state.incomes.map((i) => 
                  i.id === newRecord.id ? newRecord : i
                  ),
              }));
              break;
              case 'DELETE':
              set((state) => ({
                  incomes: state.incomes.filter((i) => i.id !== payload.old.id),
              }));
              break;
          }
          }
      )
      .subscribe();

      return () => {
          supabase.removeChannel(incomeChannel);
          //supabase.removeChannel(expenseChannel);
      };

      // Repeat similar channel for expenses...
  },

  // Data fetchers
  fetchIncomes: async () => {
    const { data, error } = await supabase
      .from('income')
      .select('*')
      .order('date', { ascending: false });

    if (error) console.error('Error fetching incomes:', error);
    if (data) set({ incomes: data });
  },

  fetchExpenses: async () => {
    const { data, error } = await supabase
      .from('expense')
      .select('*')
      .order('date', { ascending: false });

    if (error) console.error('Error fetching expenses:', error);
    if (data) set({ expenses: data });
  },
}));