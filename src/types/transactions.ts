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
    isLoadingBalance: boolean;
    
    totalIncome: () => number;
    totalExpense: () => number;

    setIncomes: (incomes: Income[]) => void;
    setExpenses: (expenses: Expense[]) => void;
    setBalance: (value: number) => void; 

    addIncome: (income: Income) => void;
    addExpense: (expense: Expense) => void;

    setIsLoadingIncome: (loading: boolean) => void;
    setIsLoadingExpenses: (loading: boolean) => void;
    setIsLoadingBalance: (loading: boolean) => void;
  };
  