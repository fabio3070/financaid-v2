'use client'

import { palette } from '@/lib/palette';
import React from 'react';
import TotalBalanceLabel from './total-balance-label';
import { MonthSelectionBox } from './month-picker';
import { useBalance } from '@/hooks/use-balance';
import { User } from 'next-auth';
import BalanceBulletTags from './balance-bullet-tags';

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
            className={`w-[480px] p-6 rounded-2xl ${
                isBalanceNegative 
                ? 'bg-custom-background-total-balance-negative'
                : 'bg-custom-background-total-balance-positive'
            }`}
        >
            <div className='flex justify-between items-center'>
                <label className='text-custom-text-form-label'>Total balance:</label>
                <MonthSelectionBox />
            </div>
            <TotalBalanceLabel balance={data.balance}/>
            <div className='divider'></div>
            <BalanceBulletTags />
        </section>
    )
}
