import React from 'react'

type BulletTagProps = {
    value: number;
    backgroundColor: string;
}
export default function BulletTag({value, backgroundColor}: BulletTagProps) {
  return (
    <div className={`bullet-tag center ${backgroundColor}`}>
        <p className='text-custom-text-form-label'>{value}€</p>
    </div>
  )
}
