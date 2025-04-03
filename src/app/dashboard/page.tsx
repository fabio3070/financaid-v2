"use client"

import React from 'react'
import TotalBalance from './_components/total-balance'
//import { useCurrentUser } from '@/hooks/use-current-user';

export default function Dashboard() {
  //const user = useCurrentUser();

  return (
    <main>
      <TotalBalance />
    </main>
  )
}
