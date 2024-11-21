import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { FinancialEntry } from '@/lib/types/Entry.type'
import { formatCurrency } from '@/lib/utils'
import { BadgeAlert, BadgeCheck, Edit, Trash2 } from 'lucide-react'
import { TransactionTypes } from './financial.types'

type TransactionItemProps = {
	transaction: FinancialEntry
	onEdit: () => void
	onRemove: () => void
}

export const TransactionItem = (props: TransactionItemProps) => {
	const { transaction, onEdit, onRemove } = props

	const { category, description, amount, isCompleted } = transaction

	const typeDefinition = TransactionTypes[category as keyof typeof TransactionTypes]
	const amountColor = amount > 0 ? 'text-green-500' : 'text-red-500'

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex items-center justify-between py-3 cursor-pointer ">
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
						{isCompleted ? (
							<BadgeCheck className="w-5 h-5 text-green-500" />
						) : (
							<BadgeAlert className="w-5 h-5 text-gray-500" />
						)}
					</div>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{description}</DialogTitle>
					<DialogDescription className="sr-only">{description}</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<div className={`font-semibold text-xl mb-4 ${amountColor}`}>
						{formatCurrency(amount)}
					</div>
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
							{typeDefinition?.icon}
						</div>
						{typeDefinition?.label}
					</div>
				</div>
				<DialogFooter>
					<Button onClick={onEdit} className="my-1">
						<Edit className="w-4 h-4" />
						Editar
					</Button>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive" className="my-1">
								<Trash2 className="w-4 h-4" />
								Remover
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Tem certeza?</AlertDialogTitle>
								<AlertDialogDescription>
									Essa ação não pode ser desfeita. Você tem certeza que deseja excluir
									essa transação?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction onClick={onRemove}>Excluir</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
