import { FinancialEntry } from '@/lib/types/Entry.type'
import { CircleEqual, CircleMinus, CirclePlus } from 'lucide-react'
import { AmountValue } from '../financial/amount-value'

type IncomeExpensesTotalProps = {
	entries: FinancialEntry[]
}

export const IncomeExpensesTotal = (props: IncomeExpensesTotalProps) => {
	const { entries } = props

	const income = entries
		.filter((entry) => entry.amount > 0)
		.reduce((acc, entry) => acc + entry.amount, 0)

	const expenses = entries
		.filter((entry) => entry.amount < 0)
		.reduce((acc, entry) => acc + entry.amount, 0)

	const total = income + expenses

	return (
		<>
			<div className="flex items-center gap-2">
				<CirclePlus size={45} className="text-blue-500" />
				<div>
					<div className="text-gray-600">Receitas</div>
					<AmountValue value={income} className="text-xl font-medium" />
				</div>
			</div>
			<div className="flex items-center gap-2">
				<CircleMinus size={45} className="text-red-500" />
				<div>
					<div className="text-gray-600">Despesas</div>
					<AmountValue value={expenses} className="text-xl font-medium" />
				</div>
			</div>
			<div className="flex items-center gap-2">
				<CircleEqual size={45} className="text-gray-500" />
				<div>
					<div className="text-gray-600">Balanço</div>
					<AmountValue value={total} className="text-2xl font-medium" />
				</div>
			</div>
		</>
	)
}
