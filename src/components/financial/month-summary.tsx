import { FinancialEntry } from '@/lib/types/Entry.type'
import { formatCurrency } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'

export const MonthSummary = ({ transactions }: { transactions: FinancialEntry[] }) => {
	const income = transactions
		.filter((t) => t.amount > 0)
		.reduce((acc, curr) => acc + curr.amount, 0)

	const expenses = transactions
		.filter((t) => t.amount <= 0)
		.reduce((acc, curr) => acc - curr.amount, 0)

	const total = income - expenses

	return (
		<div className="space-y-2">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
						<Plus className="w-4 h-4 text-blue-500" />
					</div>
					<span>Entradas</span>
				</div>
				<span className="text-blue-500">{formatCurrency(income)}</span>
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
