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
    recurrency_type: string;
    payment_status: string;
    updated_date: Date;
};

export type FinanceState = {
    incomes: Income[];
    expenses: Expense[];
    balance: number;
    selectedMonth: string;
    isLoadingExpenses: boolean;
    isLoadingIncome: boolean;
    isLoadingBalance: boolean;
    isExpensesInitialized: boolean;
    
    totalIncome: () => number;
    totalExpense: () => number;

    setIsExpensesInitialized: (res: boolean) => void;

    setIncomes: (incomes: Income[]) => void;
    setExpenses: (expenses: Expense[]) => void;
    setBalance: (value: number) => void;
    setSelectedMonth: (month: string) => void;

    addIncome: (income: Income) => void;
    addExpense: (expense: Expense) => void;

    setIsLoadingIncome: (loading: boolean) => void;
    setIsLoadingExpenses: (loading: boolean) => void;
    setIsLoadingBalance: (loading: boolean) => void;
};

export enum PaymentStatus {
    Concluded = 0,
    'On Going' = 1,
    Canceled = 2
}
  
export function isPaymentStatus(status: number): status is PaymentStatus {
    return Object.values(PaymentStatus).includes(status as PaymentStatus);
}