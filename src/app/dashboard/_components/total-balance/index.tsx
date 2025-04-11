'use client'

import { palette } from '@/lib/palette';
import React from 'react';
import TotalBalanceLabel from './total-balance-label';
import { MonthSelectionBox } from './month-picker';
import { useBalance } from '@/hooks/use-balance';
import { User } from 'next-auth';

const checkIfBalanceNegative = (balance: number): boolean => {
    return balance < 0;
}

export default function TotalBalance({user}: {user: User}) {
    const { data } = useBalance(user.id);
    const isBalanceNegative = data?.balance && checkIfBalanceNegative(data.balance) as boolean;

    if (!data) {
        return null;
    }

    return (
        <section
            style={
                isBalanceNegative ? 
                {backgroundColor: palette.background['total-balance-negative']} 
                :
                {backgroundColor: palette.background['total-balance-positive']} 
            }
            className='w-[480px] p-3 rounded-2xl'
        >
            <MonthSelectionBox />
            <TotalBalanceLabel balance={data.balance}/>
        </section>
    )
}
