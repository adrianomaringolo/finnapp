import { FinancialEntry } from '@/lib/types/Entry.type'
import { AmountValue } from '../financial/amount-value'
import { Card, CardContent } from '../ui/card'

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
		<Card>
			<CardContent className="grid md:grid-cols-3 gap-4 py-3">
				<div>
					<div className="text-gray-600">Receitas</div>
					<AmountValue value={income} className="text-2xl font-medium" />
				</div>
				<div>
					<div className="text-gray-600">Despesas</div>
					<AmountValue value={expenses} className="text-2xl font-medium" />
				</div>
				<div>
					<div className="text-gray-600">Total</div>
					<AmountValue value={total} className="text-2xl font-medium" />
				</div>
			</CardContent>
		</Card>
	)
}
