import { formatCurrency } from '@/lib/utils'
import { formatDateAndWeekday } from '@/lib/utils/date'
import { Card, CardContent } from '../ui/card'
import { Transaction } from './financial.types'
import { TransactionItem } from './transaction-item'

export interface DayGroupProps {
	previousAmount: number
	date: string
	transactions: Transaction[]
}

export const DayGroup = ({ previousAmount, date, transactions }: DayGroupProps) => {
	const balance = transactions.reduce(
		(acc, curr) =>
			curr.amount > 0 ? acc + Math.abs(curr.amount) : acc - Math.abs(curr.amount),
		0,
	)

	console.log('balance', balance)

	return (
		<div className="mb-6">
			<h2 className="text-lg text-muted-foreground mb-4">{formatDateAndWeekday(date)}</h2>
			<Card>
				<CardContent className="divide-y">
					{transactions.map((transaction) => (
						<TransactionItem
							key={transaction.id}
							transaction={transaction}
							onEdit={() => {}}
							onRemove={() => {}}
						/>
					))}
				</CardContent>
			</Card>
			<div className="flex justify-end mt-2">
				<span className="text-lg">
					Saldo do dia: {formatCurrency(previousAmount + balance)}
				</span>
			</div>
		</div>
	)
}