import { formatCurrency } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { Transaction } from './financial.types'

export const MonthSummary = ({ transactions }: { transactions: Transaction[] }) => {
	const income = transactions
		.filter((t) => t.type === 'income')
		.reduce((acc, curr) => acc + (curr.amount || 0), 0)

	const expenses = transactions
		.filter((t) => t.type !== 'income')
		.reduce((acc, curr) => acc + (curr.amount || 0), 0)

	const total = income - expenses

	return (
		<div className="space-y-2">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
						<Plus className="w-4 h-4 text-green-500" />
					</div>
					<span>Entradas</span>
				</div>
				<span className="text-green-500">{formatCurrency(income)}</span>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
						<Minus className="w-4 h-4 text-red-500" />
					</div>
					<span>Saídas</span>
				</div>
				<span className="text-red-500">{formatCurrency(expenses)}</span>
			</div>
			<div className="flex justify-between items-center pt-2 border-t">
				<span className="font-medium">Total do mês</span>
				<span className="font-medium">{formatCurrency(total)}</span>
			</div>
		</div>
	)
}
