import RegisterForm from '@/components/register/Form'
import Logo from '@/components/ui/logo'
import { palette } from '@/lib/palette'
import React from 'react'

export default function page() {
  return (
    <main className={`min-h-screen relative`} style={{ backgroundColor: palette.background.dark}}>
      <section>
        <Logo />
      </section>
      <section className='max-w-xs m-auto'>
        <RegisterForm />
      </section>
    </main>
  )
}
