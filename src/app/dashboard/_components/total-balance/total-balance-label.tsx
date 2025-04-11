"use client"

import React from 'react'

interface TotalBalanceProps {
    balance: number | null | undefined;
}
export default function TotalBalanceLabel({balance}: TotalBalanceProps) {
    console.log("balance: ", balance);
    return (
        <div>
            <h1>Your balance: </h1>
            {
                balance ? 
                (<p>{balance}€</p>)
                :
                (<p>N/A</p>)
            }
        </div>
    )
}
