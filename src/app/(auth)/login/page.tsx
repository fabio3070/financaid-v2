"use client"

import { inter } from '@/app/ui/fonts'
import LoginForm  from '@/components/login/Form'
import { Button } from '@/components/ui/Button'
import Logo from '@/components/ui/logo'
import { palette } from '@/lib/palette'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter();

  return (
    <main className={`min-h-screen relative`} style={{ backgroundColor: palette.background.dark}}>
      <section>
        <Logo/>
      </section>
      <div className='flex m-auto justify-center'>
        <section className=''>
          <div>
            <h1 
            className={`${inter.className} text-4xl font-bold`}
            style={{
              color: palette.text['form-label']
            }}>
              Welcome to Financaid
            </h1>
            <h3 
            className={`${inter.className} mt-3 text-l`}
            style={{
              color: palette.text['form-label']
            }}>
              Login with your credentials to have access
            </h3>
          </div>
          <div className='max-w-xs'>
            <LoginForm />
          </div>
        </section>
        <p
        className='mx-12 self-center'
        style={{
          color: palette.text['form-label']
        }}
        >or</p>
        <section className='self-center'>
          <h3 
            className={`${inter.className} mt-3 text-l`}
            style={{
              color: palette.text['form-label']
            }}
          >
              Sign up if you dont have an account already
          </h3>
          <div className="mt-10">
            <Button 
            variant='reverse' 
            type="submit"
            size="xlg"
            onClick={() => router.push('/register')}
            >Sign Up</Button>
          </div>
        </section>
      </div>

    </main>
  )
}
