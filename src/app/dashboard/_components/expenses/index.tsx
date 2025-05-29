import { useFinanceStore } from '@/store/useFinanceStore';
import React, { useEffect } from 'react'
import { User } from 'next-auth';
import ExpensesListSkeleton from './skeleton';

type ExpensesProps = {
  user: User;
  selectedMonth: string;
}

export default function Expenses({ user, selectedMonth }: ExpensesProps) {
  const { fetchExpenses, expenses, isLoadingExpenses } = useFinanceStore();

  useEffect(() => {
    if (user?.id) {
      fetchExpenses(user.id, selectedMonth);
    }
  }, [user?.id, fetchExpenses, selectedMonth]);

  return (
    <div className='w-6/12'>
      <h2>Expenses</h2>
      {isLoadingExpenses ? <ExpensesListSkeleton />
      :       
      <ul className='flex flex-col gap-8 mt-4'>
        {expenses.map((expense) => (
          <li key={expense.id} className='expenses-list'>
            <p>{expense.description}</p>
            <p>- {expense.value}€</p>
          </li>
        ))}
      </ul>
      }
    </div>
  )
}
