export type Income = {
    id: string;
    created_at: Date;
    type: number;
    description: string;
    value: number;
    recurency_type: string;
    payment_status: string;
    updated_date: Date;
};
  
export type Expense = {
    id: string;
    created_at: Date;
    type: number;
    description: string;
    value: number;
    recurency_type: string;
    payment_status: string;
    updated_date: Date;
};

export type FinanceState = {
    incomes: Income[];
    expenses: Expense[];
    balance: number;
    isLoadingExpenses: boolean;
    isLoadingIncome: boolean;
    totalIncome: () => number;
    totalExpense: () => number;
    setIncomes: (incomes: Income[]) => void;
    setExpenses: (expenses: Expense[]) => void;
    addIncome: (income: Income) => void;
    addExpense: (expense: Expense) => void;
    subscribeToChanges: () => void;
    fetchIncomes: () => Promise<void>;
    fetchExpenses: (userId: string) => Promise<void>;
};