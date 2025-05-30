"use client"

import React, { useState } from 'react'
import TotalBalance from './_components/total-balance/index'
import { useCurrentUser } from '@/hooks/use-current-user';
import Expenses from './_components/expenses';
import Income from './_components/income';
import { useFetchFinanceData } from '@/hooks/use-finance-data';

export default function Dashboard() {
  const user = useCurrentUser();
  const [selectedMonth, setSelectedMonth] = useState<string>("0");//Vai passar a ser estado global

  useFetchFinanceData(user?.id, selectedMonth);

  if(!user) return <p>Error</p>

  return (
    <main className='mt-8'>
      <TotalBalance user={user} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>
      <section className='mt-16 flex'>
        <Expenses />
        <Income />
      </section>
    </main>
  )
}
