import { FinancialEntry } from '@/lib/types/Entry.type'
import { AmountValue } from '../financial/amount-value'
import { TransactionTypes } from '../financial/financial.types'

type ExpensesCategoryTotalProps = {
	entries: FinancialEntry[]
}

export const ExpensesCategoryTotal = (props: ExpensesCategoryTotalProps) => {
	const { entries } = props

	// group the entries by category
	const groupedEntries = entries.reduce(
		(acc, entry) => {
			const category = entry.category
			const amount = entry.amount

			if (!acc[category]) {
				acc[category] = 0
			}

			acc[category] += amount

			return acc
		},
		{} as Record<string, number>,
	)

	return (
		<div>
			{Object.entries(groupedEntries).map(([category, total]) => {
				const typeDefinition = TransactionTypes[category as keyof typeof TransactionTypes]
				return (
					<div
						key={category}
						className="flex justify-between py-4 border-b hover:bg-gray-50"
					>
						<div className="flex gap-2">
							{typeDefinition.icon}
							{typeDefinition.label}
						</div>
						<AmountValue value={total} />
					</div>
				)
			})}
		</div>
	)
}
