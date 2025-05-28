import BulletTag from '@/components/ui/bullet-tag'
import React from 'react'

type BalanceBulletTagProps = {
  income: number;
  expenses: number;
}
export default function BalanceBulletTags({income, expenses}: BalanceBulletTagProps) {
  return (
    <div className='flex items-center' data-testid="balance-bullet-tags">
        <div className='mt-4 flex flex-col gap-2 w-1/2'>
            <label className='text-custom-text-form-label'>Expenses</label>
            <BulletTag value={-expenses} backgroundColor='bg-custom-details-red'/>
        </div>
        <div className='mt-4 flex flex-col gap-2 w-1/2'>
            <label className='text-custom-text-form-label'>Income</label>
            <BulletTag value={income} backgroundColor='bg-custom-details-green'/>
        </div>
    </div>
  )
}
