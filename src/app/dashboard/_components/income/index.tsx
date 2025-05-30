import { useFinanceStore } from '@/store/useFinanceStore';
import React from 'react'
import IncomeListSkeleton from './skeleton';

export default function Income() {
  const {incomes, isLoadingIncome} = useFinanceStore();

  return (
    <div>
      <h2>Income</h2>
      {isLoadingIncome ? <IncomeListSkeleton />
      :       
      <ul className='flex flex-col gap-8 mt-4'>
        {incomes.map((income) => (
          <li key={income.id} className='expenses-list'>
            <p>{income.description}</p>
            <p>- {income.value}€</p>
          </li>
        ))}
      </ul>
      }
    </div>
  )
}
