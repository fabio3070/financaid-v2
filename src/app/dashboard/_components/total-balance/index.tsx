'use client'

import React from 'react';
import TotalBalanceLabel from './total-balance-label/total-balance-label';
import { MonthSelectionBox } from './month-picker/month-picker';
import { User } from 'next-auth';
import BalanceBulletTags from './balance-bullet-tags/balance-bullet-tags';
import TotalBalanceSkeleton from './skeleton';
import { useFinanceStore } from '@/store/useFinanceStore';

type TotalBalanceProps = {
    user: User;
    selectedMonth: string;
    setSelectedMonth: (value: string) => void;
}

const checkIfBalanceNegative = (balance: number): boolean => {
    return balance < 0;
}

export default function TotalBalance({selectedMonth, setSelectedMonth}: TotalBalanceProps) {
    const {balance, totalExpense, totalIncome, isLoadingBalance} = useFinanceStore()
    const isBalanceNegative = balance && checkIfBalanceNegative(balance) as boolean;

    return (
        <>
            {isLoadingBalance ? <TotalBalanceSkeleton /> 
            : 
            <section
                className={`w-full md:w-[480px] p-6 rounded-2xl ${
                    isBalanceNegative 
                    ? 'bg-custom-background-total-balance-negative'
                    : 'bg-custom-background-total-balance-positive'
                }`}
            >
                <div className='flex justify-between items-center'>
                    <label className='text-custom-text-form-label'>Total balance:</label>
                    <MonthSelectionBox selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                </div>
                <TotalBalanceLabel balance={balance}/>
                <div className='divider'></div>
                <BalanceBulletTags expenses={totalExpense() ?? 0} income={totalIncome() ?? 0} />
            </section>
            }
        </>
    )
}
