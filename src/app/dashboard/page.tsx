"use client"

import React from 'react'
import { useCurrentUser } from '@/hooks/use-current-user';

export default function Dashboard() {
  const user = useCurrentUser();

  return (
    <main>

    </main>
  )
}
