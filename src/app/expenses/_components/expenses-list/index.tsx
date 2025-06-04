"use client"

import { Button } from '@/components/ui/Button';
import { MonthSelectionBox } from '@/components/ui/month-picker';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useFinanceStore } from '@/store/useFinanceStore';
import { toISODate } from '@/utils/date';
import { getPaymentStatusText } from '@/utils/payment_status';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import React, { useState } from 'react'
import ExpensesDrawer from '../expenses-drawer';

export default function ExpensesTable() {
    const {expenses, isLoadingExpenses, selectedMonth, setSelectedMonth} = useFinanceStore();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // falta criar um loading skeleton
    return (
        <div data-slot="table-container" className='relative w-full overflow-x-auto mt-10'>
            <div className='flex justify-end mb-4 gap-2'>
                <Button variant={'outline'} onClick={() => setIsDrawerOpen(true)}>
                    <IconSquareRoundedPlus /> Add expense
                </Button>
                <MonthSelectionBox selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            </div>
            <Table>
                <TableCaption>A list of your invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Payment Day</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">State</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses?.map(({id, description, payment_status, created_at, recurrency_type, value}) => (
                        <TableRow key={id}>
                            <TableCell className="font-medium">{description}</TableCell>
                            <TableCell>{recurrency_type}</TableCell>
                            <TableCell>{toISODate(created_at)}</TableCell>
                            <TableCell>{value}€</TableCell>
                            <TableCell className="text-right">{getPaymentStatusText(Number(payment_status))}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ExpensesDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
        </div>
    )
}
