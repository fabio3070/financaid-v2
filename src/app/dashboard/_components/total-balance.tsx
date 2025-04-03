'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { palette } from '@/lib/palette';
import React, { useState } from 'react';

interface MonthOption {
    value: number;
    label: string;
}

const monthsToPick: MonthOption[] = [
    {
        value: 0,
        label: 'All'
    },
    {
        value: 1,
        label: 'Janeiro'
    },
    {
        value: 2,
        label: 'Fevereiro'
    },
    {
        value: 3,
        label: 'Março'
    },
    {
        value: 4,
        label: 'Abril'
    },
    {
        value: 5,
        label: 'Maio'
    },
    {
        value: 6,
        label: 'Junho'
    },
    {
        value: 7,
        label: 'Julho'
    },
    {
        value: 8,
        label: 'Agosto'
    },
    {
        value: 9,
        label: 'Setembro'
    },
    {
        value: 10,
        label: 'Outubro'
    },
    {
        value: 11,
        label: 'Novembro'
    },
    {
        value: 12,
        label: 'Dezembro'
    },
]

const MonthSelectionBox: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>("0");

    return (
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger 
                className="w-[280px]" 
                style={{backgroundColor: palette.background['dark'], color: palette.text['form-label']}}
            >
                <SelectValue placeholder="Select a month"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Choose an option...</SelectLabel>
                    {monthsToPick.map(({value, label}) => (
                        <SelectItem 
                        key={value} 
                        value={value.toString()}
                        >
                            {label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}


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
        </section>
    )
}
