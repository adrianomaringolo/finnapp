import { cn, formatCurrency } from '@/lib/utils'

export const AmountValue = (props: { value: number; className?: string }) => {
	const { value, className } = props

	const color = value >= 0 ? 'text-income' : 'text-expense'

	return <span className={cn(color, className)}>{formatCurrency(Math.abs(value))}</span>
}
