import { LoginForm } from '@/components/login/Form'
import { palette } from '@/lib/palette'
import React from 'react'

export default function page() {
  return (
    <main className={`min-h-screen relative`} style={{ backgroundColor: palette.neutral[800]}}>
        <LoginForm />
    </main>
  )
}
