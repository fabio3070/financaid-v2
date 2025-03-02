import LoginForm  from '@/components/login/Form'
import { palette } from '@/lib/palette'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <main className={`min-h-screen relative`} style={{ backgroundColor: palette.background.dark}}>
      <section>
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={50}
          priority
          className="object-cover p-8"
          quality={100}
        />
      </section>
      <section className='max-w-xs m-auto'>
        <LoginForm />
      </section>
    </main>
  )
}
