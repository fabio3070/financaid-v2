import { useFinanceStore } from '@/store/useFinanceStore';
import React from 'react'
import ExpensesListSkeleton from './skeleton';

export default function Expenses() {
  const {expenses, isLoadingExpenses} = useFinanceStore();

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
