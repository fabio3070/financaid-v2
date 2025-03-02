'use client'

import React from 'react'
import { useSession, SessionProvider } from "next-auth/react"

export default function Dashboard() {
  const { data: session, status } = useSession();

  if(status === 'loading') return <div>Loading...</div>

  if(status === 'authenticated') return <SessionProvider><div>Welcome {session.user?.name}</div></SessionProvider>

  return (
    <div>page</div>
  )
}
