import { useFinanceStore } from '@/store/useFinanceStore';
import React, { useEffect } from 'react'
import { User } from 'next-auth';
import IncomeListSkeleton from './skeleton';

type IncomeProps = {
  user: User;
  selectedMonth: string;
}

export default function Income({ user, selectedMonth }: IncomeProps) {
  const { fetchIncomes, incomes, isLoadingIncome } = useFinanceStore();

  useEffect(() => {
    if (user?.id) {
        fetchIncomes(user.id, selectedMonth);
    }
  }, [user?.id, fetchIncomes, selectedMonth]);

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
