'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuth } from '@/lib/context/AuthContext'
import { groupTransactionsByDate } from '@/lib/utils/groupTransactionsByDate'
import { useGetEntries } from '@/services/entries/useGetEntries'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddTransactionForm from './add-transaction-form'
import { DayGroup } from './day-group'
import { MonthSummary } from './month-summary'

type FinancialTrackerProps = {
	monthYear: string
}

export function FinancialTracker(props: FinancialTrackerProps) {
	const { user } = useAuth()

	const [isOpen, setIsOpen] = useState(false)

	console.log('monthYear', props.monthYear)

	const { data: entries = [] } = useGetEntries({
		userId: user?.uid as string,
		monthYear: props.monthYear,
	})

	const groupedTransactions = groupTransactionsByDate(entries)

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
					<AddTransactionForm handleClose={() => setIsOpen(false)} />
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
