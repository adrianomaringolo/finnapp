import { formatCurrency } from '@/lib/utils'
import { Check } from 'lucide-react'
import { Transaction, TransactionTypes } from './financial.types'

export const TransactionItem = ({
	type,
	description,
	amount,
}: Omit<Transaction, 'id' | 'date'>) => {
	const typeDefinition = TransactionTypes[type]
	const amountColor = type === 'income' ? 'text-green-500' : 'text-red-500'

	return (
		<div className="flex items-center justify-between py-3">
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
					{typeDefinition?.icon}
				</div>
				<span className="text-lg">{description}</span>
			</div>
			<div className="flex items-center gap-2">
				<span className={`text-lg font-medium ${amountColor}`}>
					{formatCurrency(amount ?? 0)}
				</span>
				<Check className="w-5 h-5 text-green-500" />
			</div>
		</div>
	)
}
