"use client"

import React from 'react'

interface TotalBalanceProps {
    balance: number | null | undefined;
}
export default function TotalBalanceLabel({balance}: TotalBalanceProps) {
    console.log("balance: ", balance);
    return (
        <div>
            <p className='text-custom-text-form-label text-4xl mb-8'>{balance ? balance : '1200'}€</p>
        </div>
    )
}
