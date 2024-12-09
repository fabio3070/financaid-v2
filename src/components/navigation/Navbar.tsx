'use client'

import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold text-xl">Your Logo</div>
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </nav>
  )
}