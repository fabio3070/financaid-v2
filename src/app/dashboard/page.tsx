"use client"

import React, { useEffect } from 'react'
import TotalBalance from './_components/total-balance/index'
import { useCurrentUser } from '@/hooks/use-current-user';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function Dashboard() {
  const user = useCurrentUser();
  const { subscribeToChanges } = useFinanceStore();

  useEffect(() => {
    const unsubscribe = subscribeToChanges();
    return unsubscribe;
  }, [subscribeToChanges]);

  if(!user) return <p>Error</p>

  return (
    <main>
      <TotalBalance user={user}/>
    </main>
  )
}
