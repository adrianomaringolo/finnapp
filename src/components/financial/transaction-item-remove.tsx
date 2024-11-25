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
import { useAuth } from '@/lib/context/AuthContext'
import { FinancialEntry } from '@/lib/types/Entry.type'
import { useDeleteEntry } from '@/services/entries/useDeleteEntry'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { LoadButton } from '../forms/load-button'

type TransactionItemRemoveProps = {
	transaction: FinancialEntry
}

export const TransactionItemRemove = (props: TransactionItemRemoveProps) => {
	const { user } = useAuth()
	const { transaction } = props

	const deleteMutation = useDeleteEntry({
		userId: user?.uid as string,
		monthYear: transaction.monthYear,
		entryId: transaction.id,
	})

	const onRemove = () => {
		deleteMutation.mutateAsync().then(() => {
			toast.success('Transação removida com sucesso')
		})
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<LoadButton
					variant="destructive"
					className="my-1"
					isLoading={deleteMutation.isLoading}
				>
					<Trash2 className="w-4 h-4" />
					Remover
				</LoadButton>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Tem certeza?</AlertDialogTitle>
					<AlertDialogDescription>
						Essa ação não pode ser desfeita. Você tem certeza que deseja excluir essa
						transação?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={onRemove}>Excluir</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
