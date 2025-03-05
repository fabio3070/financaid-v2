'use client';

import Image from 'next/image'
import React from 'react'

export default function Logo() {
    const handleClick = () => {
        window.location.href = "/";
    }

    return (
        <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={50}
        priority
        className="object-cover p-8 cursor-pointer"
        quality={100}
        onClick={handleClick}
        />
    )
}
Logo.displayName = "Logo";
