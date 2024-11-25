'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuth } from '@/lib/context/AuthContext'
import { groupTransactionsByDate } from '@/lib/utils/groupTransactionsByDate'
import { useGetEntries } from '@/services/entries/useGetEntries'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import AddTransactionForm from './add-transaction-form'
import { DayGroup } from './day-group'
import { MonthSummary } from './month-summary'

type FinancialTrackerProps = {
	monthYear: string
}

export function FinancialTracker(props: FinancialTrackerProps) {
	const { user } = useAuth()

	const searchParams = useSearchParams()
	const [isOpen, setIsOpen] = useState(searchParams.get('m') === 'nova')

	const { data: entries = [], isLoading } = useGetEntries({
		userId: user?.uid as string,
		monthYear: props.monthYear,
	})

	const groupedTransactions = groupTransactionsByDate(entries)

	if (isLoading) {
		return (
			<div className="max-w-2xl mx-auto p-4 space-y-6">
				<Skeleton className="w-full h-10" />
				<Skeleton className="w-64 h-6" />
				<div className="mt-6 flex gap-4 items-center">
					<Skeleton className="h-12 min-w-12 rounded-full" />
					<Skeleton className="w-full  h-7" />
					<Skeleton className="w-32 h-7" />
					<Skeleton className="h-5 min-w-5 rounded-full" />
				</div>
				<div className="mt-6 flex gap-4 items-center">
					<Skeleton className="h-12 min-w-12 rounded-full" />
					<Skeleton className="w-full  h-7" />
					<Skeleton className="w-32 h-7" />
					<Skeleton className="h-5 min-w-5 rounded-full" />
				</div>
			</div>
		)
	}

	return (
		<div className="max-w-2xl mx-auto p-4 space-y-6">
			<Button className="w-full" onClick={() => setIsOpen(true)}>
				<Plus className="w-4 h-4 mr-2" />
				Adicionar transação
			</Button>
			<Dialog modal open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
				<DialogContent>
					<DialogHeader className="sr-only">
						<DialogTitle>Adicionar transação</DialogTitle>
						<DialogDescription>Adicione os dados da nova transação</DialogDescription>
					</DialogHeader>
					<AddTransactionForm
						handleClose={() => setIsOpen(false)}
						monthYear={props.monthYear}
					/>
				</DialogContent>
			</Dialog>
			{groupedTransactions.length === 0 ? (
				<Card>
					<CardContent className="p-4 text-center text-muted-foreground">
						Nenhuma transação encontrada
					</CardContent>
				</Card>
			) : (
				groupedTransactions.map(({ date, previousAmount, transactions }) => (
					<DayGroup
						key={date}
						previousAmount={previousAmount}
						date={date}
						transactions={transactions}
					/>
				))
			)}
			<Card>
				<CardContent className="p-4">
					<MonthSummary transactions={entries} />
				</CardContent>
			</Card>
		</div>
	)
}
