"use client"

import React, { useEffect, useState } from 'react'
import TotalBalance from './_components/total-balance/index'
import { useCurrentUser } from '@/hooks/use-current-user';
import { useFinanceStore } from '@/store/useFinanceStore';
import TotalBalanceSkeleton from './_components/total-balance/skeleton';
import Expenses from './_components/expenses';
import Income from './_components/income';

export default function Dashboard() {
  const user = useCurrentUser();
  const { subscribeToChanges } = useFinanceStore();
  const [selectedMonth, setSelectedMonth] = useState<string>("0");

  useEffect(() => {
    const unsubscribe = subscribeToChanges();
    return unsubscribe;
  }, [subscribeToChanges]);

  if(!user) return <p>Error</p>

  return (
    <main className='mt-8'>
      <TotalBalance user={user} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>
      <section className='mt-16 flex'>
        <Expenses user={user} selectedMonth={selectedMonth}/>
        <Income user={user} selectedMonth={selectedMonth}/>
      </section>
    </main>
  )
}
