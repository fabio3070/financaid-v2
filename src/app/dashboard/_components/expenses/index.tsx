import { useFinanceStore } from '@/store/useFinanceStore';
import React, { useEffect } from 'react'
import { User } from 'next-auth';
import ExpensesListSkeleton from './skeleton';

type ExpensesProps = {
  user: User;
}

export default function Expenses({ user }: ExpensesProps) {
  const { fetchExpenses, expenses, isLoadingExpenses, setExpenses } = useFinanceStore();

  useEffect(() => {
    if (user?.id) {
      setExpenses([]); // Clear previous expenses
      fetchExpenses(user.id);
    }
  }, [user?.id, fetchExpenses, setExpenses]);

  return (
    <div>
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
