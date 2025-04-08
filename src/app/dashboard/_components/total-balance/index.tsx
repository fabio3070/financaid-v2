'use client'

import { palette } from '@/lib/palette';
import React, { useState } from 'react';
import TotalBalanceLabel from './total-balance-label';
import { MonthSelectionBox } from './month-picker';

export default function TotalBalance(){
    const [isNegativeBalance, setIsNegativeBalance] = useState(true);

    return (
        <section
        style={
            isNegativeBalance ? 
            {backgroundColor: palette.background['total-balance-positive']} 
            :
            {backgroundColor: palette.background['total-balance-negative']} 
        }
        className='w-[480px] p-3 rounded-2xl'
        >
            <MonthSelectionBox />
            <TotalBalanceLabel />
        </section>
    )
}
