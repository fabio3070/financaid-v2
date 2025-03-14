'use client';

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="w-full shadow-sm fixed inset-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Image
          src="/logo.png"
          alt="Background"
          height={40}
          width={150}
          priority
          className="w-[150px] h-auto max-w-[200px] sm:max-w-[100px] md:max-w-[150px]"
        />
        <div className='flex gap-8'>
          <Button variant='shadow' size="lg" onClick={() => router.push('/register')}>Sign Up</Button>
          <Button variant='shadow' size="lg" onClick={() => router.push('/login')}>Login</Button>
        </div>
      </div>
    </nav>
  )
}