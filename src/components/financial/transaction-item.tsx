import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/lib/context/AuthContext'
import { FinancialEntry } from '@/lib/types/Entry.type'
import { formatCurrency } from '@/lib/utils'
import { useUpdateEntry } from '@/services/entries/useUpdateEntry'
import { BadgeAlert, BadgeCheck, Edit } from 'lucide-react'
import { toast } from 'sonner'

import { formatDateAndWeekdayAndYear } from '@/lib/utils/date'
import { useState } from 'react'
import { TooltipMessage } from '../helpers/tooltip-message'
import { TransactionTypes } from './financial.types'
import { TransactionForm } from './transaction-form'
import { TransactionItemRemove } from './transaction-item-remove'

type TransactionItemProps = {
	transaction: FinancialEntry
}

export const TransactionItem = (props: TransactionItemProps) => {
	const { user } = useAuth()
	const { transaction } = props

	const [isDetailOpen, setIsDetailOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	const { category, date, description, amount, isCompleted } = transaction

	const typeDefinition = TransactionTypes[category as keyof typeof TransactionTypes]
	const amountColor = amount > 0 ? 'text-green-500' : 'text-red-500'

	const updateEntryMutation = useUpdateEntry({
		userId: user?.uid as string,
		monthYear: transaction.monthYear,
	})

	const handleComplete = async () => {
		await updateEntryMutation.mutateAsync({
			...transaction,
			isCompleted: !isCompleted,
		})
		toast.success('Transação atualizada com sucesso')
	}

	const handleEdit = () => {
		setIsEditing(true)
	}

	return (
		<>
			<div
				className="flex items-center justify-between py-3 cursor-pointer"
				onClick={() => setIsDetailOpen(true)}
			>
				<div className="flex items-center gap-4">
					<TooltipMessage message={typeDefinition.label}>
						<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
							{typeDefinition?.icon()}
						</div>
					</TooltipMessage>
					<span className="text-lg">{description}</span>
				</div>
				<div className="flex items-center gap-2">
					<span className={`text-lg font-medium ${amountColor}`}>
						{formatCurrency(amount ?? 0)}
					</span>
					<TooltipMessage message={isCompleted ? 'Efetivada' : 'Pendente'}>
						<button
							onClick={(e) => {
								e.preventDefault()
								handleComplete()
							}}
							className="hover:border-gray-400 hover:bg-gray-50 p-1 rounded-full"
						>
							{isCompleted ? (
								<BadgeCheck className="w-5 h-5 text-green-500" />
							) : (
								<BadgeAlert className="w-5 h-5 text-gray-300" />
							)}
						</button>
					</TooltipMessage>
				</div>
			</div>
			<Dialog open={isDetailOpen} onOpenChange={(open) => setIsDetailOpen(open)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{description}</DialogTitle>
						<DialogDescription>{formatDateAndWeekdayAndYear(date)}</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<div className={`font-semibold text-xl mb-4 ${amountColor}`}>
							{formatCurrency(amount)}
						</div>
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
								{typeDefinition?.icon()}
							</div>

							{typeDefinition?.label}
						</div>
					</div>
					<DialogFooter>
						<Button onClick={handleEdit} className="my-1">
							<Edit className="w-4 h-4" />
							Editar
						</Button>
						<TransactionItemRemove transaction={transaction} />
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog modal open={isEditing} onOpenChange={(open) => setIsEditing(open)}>
				<DialogHeader className="sr-only">
					<DialogTitle>Editar transação</DialogTitle>
					<DialogDescription>Edite os dados da transação</DialogDescription>
				</DialogHeader>
				<DialogContent>
					<TransactionForm
						handleClose={() => {
							setIsEditing(false)
							setIsDetailOpen(false)
						}}
						monthYear={transaction.monthYear}
						transactionToEdit={transaction}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}
