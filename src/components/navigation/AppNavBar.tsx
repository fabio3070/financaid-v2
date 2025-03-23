"use client"

import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/Button'
import { useRouter, usePathname } from 'next/navigation'

const mainNavigationRoutes = [
    {
        title: "Dashboard",
        path: '/dashboard'
    },
    {
        title: 'Accounts',
        path: '/accounts'
    },
    {
        title: 'Expenses',
        path: '/expenses'
    },
    {
        title: 'Income',
        path: '/income'
    }
]

export default function AppNavBar() {
    const router = useRouter()
    const pathname = usePathname()

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
                    {mainNavigationRoutes.map(({title, path}, index) => (
                        <Button 
                            key={index} 
                            variant='nav' 
                            size="lg" 
                            onClick={() => router.push(path)}
                            className={pathname === path ? 'active-nav' : ''}
                        >
                            {title}
                        </Button>
                    ))}
                </div>
            </div>
        </nav>     
    )
}
