import { render, screen } from '@testing-library/react'
import BalanceBulletTags from './balance-bullet-tags'

describe('BalanceBulletTags', () => {
    it('renders income and expenses with correct values', () => {
        render(<BalanceBulletTags income={1000} expenses={500} />)
        
        // Check if labels are present
        expect(screen.getByText('Income')).toBeInTheDocument()
        expect(screen.getByText('Expenses')).toBeInTheDocument()
        
        // Check if values are displayed correctly
        expect(screen.getByText('1000€')).toBeInTheDocument()
        expect(screen.getByText('-500€')).toBeInTheDocument()
    })

    it('handles zero values correctly', () => {
        render(<BalanceBulletTags income={0} expenses={0} />)
        
        expect(screen.getByText('0€')).toBeInTheDocument()
        expect(screen.getByText('-0€')).toBeInTheDocument()
    })

    it('applies correct background colors', () => {
        render(<BalanceBulletTags income={1000} expenses={500} />)
        
        const incomeTag = screen.getByText('1000€').closest('div')
        const expensesTag = screen.getByText('-500€').closest('div')
        
        expect(incomeTag).toHaveClass('bg-custom-details-green')
        expect(expensesTag).toHaveClass('bg-custom-details-red')
    })

    it('maintains layout structure', () => {
        render(<BalanceBulletTags income={1000} expenses={500} />)
        
        const container = screen.getByRole('generic').firstChild
        expect(container).toHaveClass('flex items-center')
        
        const sections = container?.childNodes
        expect(sections).toHaveLength(2)
        sections?.forEach(section => {
            expect(section).toHaveClass('mt-4 flex flex-col gap-2 w-1/2')
        })
    })
}) 