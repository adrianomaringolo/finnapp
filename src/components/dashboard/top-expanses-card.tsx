import { FinancialEntry } from '@/lib/types/Entry.type'
import { formatCurrency } from '@/lib/utils'
import { BadgeAlert, BadgeCheck } from 'lucide-react'
import { TransactionTypes } from '../financial/financial.types'
import { TooltipMessage } from '../helpers/tooltip-message'
import { Card, CardContent, CardTitle } from '../ui/card'

type TopExpansesCardProps = {
	entries: FinancialEntry[]
}

export const TopExpansesCard = (props: TopExpansesCardProps) => {
	const topExpanses = props.entries
		.filter((entry) => entry.amount < 0)
		.sort((a, b) => a.amount - b.amount)
		.slice(0, 5)

	return (
		<Card className="break-inside-avoid-column inline-block w-full my-4 mt-0 p-4">
			<CardTitle>Top 5 despesas</CardTitle>
			<CardContent className="px-0 py-4">
				{topExpanses.map((entry) => {
					const typeDefinition =
						TransactionTypes[entry.category as keyof typeof TransactionTypes]
					const amountColor = entry.amount > 0 ? 'text-green-500' : 'text-red-500'

					return (
						<div key={entry.id} className="w-full">
							<div className="flex items-center justify-between cursor-pointer py-1 ">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
										{typeDefinition?.icon()}
									</div>
									<span className="text-lg">{entry.description}</span>
								</div>
								<div className="flex items-center gap-2">
									<span className={`text-lg font-medium ${amountColor}`}>
										{formatCurrency(entry.amount ?? 0)}
									</span>
									<TooltipMessage message={entry.isCompleted ? 'Efetivada' : 'Pendente'}>
										{entry.isCompleted ? (
											<BadgeCheck className="w-5 h-5 text-green-500" />
										) : (
											<BadgeAlert className="w-5 h-5 text-gray-300" />
										)}
									</TooltipMessage>
								</div>
							</div>
						</div>
					)
				})}
			</CardContent>
		</Card>
	)
}