'use client'

import { Card, CardContent } from '@/components/ui/card'
import { groupTransactionsByDate } from '@/lib/utils/groupTransactionsByDate'
import { DayGroup } from './day-group'
import { Transaction } from './financial.types'
import { MonthSummary } from './month-summary'

export function FinancialTracker() {
	const transactions: Transaction[] = [
		{
			id: '1',
			type: 'income',
			description: 'Salário',
			amount: 10000,
			date: '2024-11-01',
		},
		{
			id: '2',
			type: 'essential',
			description: 'Escola Felipe',
			amount: -2000,
			date: '2024-11-05',
		},
		{
			id: '3',
			type: 'essential',
			description: 'Escola Cecilia',
			amount: -2000,
			date: '2024-11-05',
		},
		{
			id: '4',
			type: 'leisure',
			description: 'Restaurante',
			amount: -500,
			date: '2024-11-02',
		},
	]

	const groupedTransactions = groupTransactionsByDate(transactions)

	return (
		<div className="max-w-2xl mx-auto p-4 space-y-6">
			{groupedTransactions.map(({ date, previousAmount, transactions }) => (
				<DayGroup
					key={date}
					previousAmount={previousAmount}
					date={date}
					transactions={transactions}
				/>
			))}
			<Card>
				<CardContent className="p-4">
					<MonthSummary transactions={transactions} />
				</CardContent>
			</Card>
		</div>
	)
}
