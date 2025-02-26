'use client'

import { useUser } from '@/lib/hooks/use-user'
import { useGetEntries } from '@/services/entries/useGetEntries'
import { Button, Card, CardContent, CardFooter, CardTitle, cn } from 'buildgrid-ui'
import { useRouter } from 'next/navigation'
import { AmountTypes, TransactionTypes } from '../financial/financial.types'

export const CategoryAlertCard = () => {
	const { user } = useUser()
	const router = useRouter()

	const { data: entries = [] } = useGetEntries({
		userId: user?.id as string,
		monthYear: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`,
	})

	// sum incomes
	const income = entries
		.filter((entry) => entry.amount > 0)
		.reduce((acc, entry) => acc + entry.amount, 0)

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

	const alerts = Object.entries(TransactionTypes)
		.map(([key, value]) => {
			if (value.type !== AmountTypes.expanses) return null

			const allowedToUse = income * (value.max / 100)
			const percentage = (Math.abs(groupedEntries[key] ?? 0) / allowedToUse) * 100

			if (percentage < 85) return null

			return {
				category: key,
				label: value.label,
				percentage,
				totalUsed: Math.abs(groupedEntries[key] ?? 0),
				totalToUse: income * (value.max / 100),
				icon: value.icon(),
			}
		})
		.filter((alert) => alert)

	return (
		<Card className="break-inside-avoid-column inline-block w-full my-4 p-4">
			<CardTitle className="border-b">Alertas de gastos</CardTitle>
			<CardContent className="flex flex-col px-0 pt-2 gap-2">
				{alerts.length === 0 && (
					<div className="text-center text-gray-500 mt-4">Nenhum alerta de gastos</div>
				)}
				{alerts
					.sort((a, b) => b!.percentage - a!.percentage)
					.map((alert) => {
						return (
							<div className="mb-3" key={alert!.category}>
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
										{alert?.icon}
									</div>

									{alert?.label}
									<span
										className={cn(
											alert!.percentage >= 100 ? 'bg-red-500' : 'bg-orange-500',
											'ml-auto text-lg font-semibold text-white px-2 py-1 rounded-xl',
										)}
									>
										{Number(alert?.percentage).toFixed(0)}%
										<span className="text-xs font-medium block">usado</span>
									</span>
								</div>
							</div>
						)
					})}
			</CardContent>
			<CardFooter className="p-0">
				<Button
					className="w-full"
					variant="outline"
					onClick={() => router.push('/relatorios?t=mapa')}
				>
					Ver mapa de categorias
				</Button>
			</CardFooter>
		</Card>
	)
}
