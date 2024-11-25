import { FinancialEntry } from '@/lib/types/Entry.type'
import { formatCurrency } from '@/lib/utils'
import { DangerGauge } from '../danger-gauge'
import { AmountValue } from '../financial/amount-value'
import { AmountTypes, TransactionTypes } from '../financial/financial.types'

type MapsCategoriesProps = {
	entries: FinancialEntry[]
}

export const MapsCategories = (props: MapsCategoriesProps) => {
	// sum incomes
	const income = props.entries
		.filter((entry) => entry.amount > 0)
		.reduce((acc, entry) => acc + entry.amount, 1)

	// for each categories, sum the total amount
	const groupedEntries = props.entries.reduce(
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
			{Object.entries(TransactionTypes).map(([key, value]) => {
				if (value.type !== AmountTypes.expanses) return null
				return (
					<div className="mb-3" key={key}>
						<DangerGauge
							key={key}
							title={
								<div className="flex gap-1 items-center mb-4">
									{value.icon()}
									{value.label}
								</div>
							}
							value={(Math.abs(groupedEntries[key] ?? 0) / income) * 100}
							maxValue={value.max}
						/>
						<div className="mt-2">
							<p className="text-sm text-gray-600 italic">Usado</p>
							<AmountValue value={groupedEntries[key] ?? 0} /> /{' '}
							{formatCurrency(income * (value.max / 100))}
						</div>
					</div>
				)
			})}
		</div>
	)
}
