"use client"

import React, { Suspense, useEffect } from 'react'
import TotalBalance from './_components/total-balance/index'
import { useCurrentUser } from '@/hooks/use-current-user';
import { useFinanceStore } from '@/store/useFinanceStore';
import TotalBalanceSkeleton from './_components/total-balance/skeleton';

export default function Dashboard() {
  const user = useCurrentUser();
  const { subscribeToChanges } = useFinanceStore();

  useEffect(() => {
    const unsubscribe = subscribeToChanges();
    return unsubscribe;
  }, [subscribeToChanges]);

  if(!user) return <p>Error</p>

  return (
    <main className='mt-8'>
      <TotalBalance user={user}/>
    </main>
  )
}
