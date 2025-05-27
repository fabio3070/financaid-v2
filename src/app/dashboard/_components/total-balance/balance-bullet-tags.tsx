import BulletTag from '@/components/ui/bullet-tag'
import React from 'react'

export default function BalanceBulletTags() {
  return (
    <div className='flex items-center'>
        <div className='mt-4 flex flex-col gap-2 w-1/2'>
            <label className='text-custom-text-form-label'>Expenses</label>
            <BulletTag value={-300} backgroundColor='bg-custom-details-red'/>
        </div>
        <div className='mt-4 flex flex-col gap-2 w-1/2'>
            <label className='text-custom-text-form-label'>Income</label>
            <BulletTag value={1500} backgroundColor='bg-custom-details-green'/>
        </div>
    </div>
  )
}
