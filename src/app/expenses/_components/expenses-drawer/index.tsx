import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

type ExpensesDrawerProps = {
    isOpen: boolean,
    onOpenChange: (open: boolean) => void
}

export default function ExpensesDrawer({isOpen, onOpenChange}: ExpensesDrawerProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Disclaimer
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  )
}
