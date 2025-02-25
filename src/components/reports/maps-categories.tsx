import { useUser } from '@/lib/hooks/use-user'
import { formatCurrency } from '@/lib/utils'
import { useGetEntries } from '@/services/entries/useGetEntries'
import { Month, MonthNavigator } from 'buildgrid-ui'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { DangerGauge } from '../danger-gauge'
import { AmountValue } from '../financial/amount-value'
import { AmountTypes, TransactionTypes } from '../financial/financial.types'

export const MapsCategories = () => {
	const [year, setYear] = useState(new Date().getFullYear())
	const [month, setMonth] = useState(new Date().getMonth())

	const { user } = useUser()

	const { data: entries = [] } = useGetEntries({
		userId: user?.id as string,
		monthYear: `${year}-${(month + 1).toString().padStart(2, '0')}`,
	})

	// sum incomes
	const income = entries
		.filter((entry) => entry.amount > 0)
		.reduce((acc, entry) => acc + entry.amount, 1)

	// for each categories, sum the total amount
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
		<section className="mt-4">
			<div className="rounded-xl bg-gray-100 py-2 px-4 mb-4">
				<MonthNavigator
					locale={ptBR}
					currentYear={year}
					onChangeMonthYear={(month, year) => {
						setMonth(month)
						setYear(year)
					}}
					currentMonth={month as Month}
				/>
			</div>

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
		</section>
	)
}
