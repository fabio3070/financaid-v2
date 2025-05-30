import React from 'react'
import ExpensesTable from './_components/expenses-list'

export default function page() {
  return (
    <section className='mt-8'>
        <h1>Expenses</h1>
        <p className='mt-6 md:w-[600px]'>All your expenses will be added here. You can check the expense list for detail, add new expenses and create expenses groups.</p>
        <ExpensesTable />
    </ section>
  )
}
