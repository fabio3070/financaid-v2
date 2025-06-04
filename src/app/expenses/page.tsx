"use client";

import React from 'react'
import ExpensesTable from './_components/expenses-list'
import { useFetchFinanceData } from '@/hooks/use-finance-data';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function Expenses() {
  const user = useCurrentUser();
  const {selectedMonth} = useFinanceStore();

  useFetchFinanceData(user?.id, selectedMonth);

  return (
    <section className='mt-8'>
        <h1>Expenses</h1>
        <p className='mt-6 md:w-[600px]'>All your expenses will be added here. You can check the expense list for detail, add new expenses and create expenses groups.</p>
        <ExpensesTable />
    </ section>
  )
}
