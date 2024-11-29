'use client'

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
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Check,
	CircleDollarSign,
	Edit,
	Heart,
	Minus,
	Plus,
	ShoppingCart,
	Trash2,
} from 'lucide-react'
import { useState } from 'react'

interface Transaction {
	id: string
	type: 'income' | 'expense' | 'test'
	description: string
	amount?: number
	date: string
}

interface DayGroup {
	date: string
	transactions: Transaction[]
}

const TransactionItem = ({
	transaction,
	onEdit,
	onRemove,
}: {
	transaction: Transaction
	onEdit: () => void
	onRemove: () => void
}) => {
	const { type, description, amount } = transaction
	const icons = {
		income: <CircleDollarSign className="w-6 h-6 text-blue-500" />,
		expense: <ShoppingCart className="w-6 h-6 text-blue-400" />,
		test: <Heart className="w-6 h-6 text-red-500" />,
	}

	const amountColor = type === 'income' ? 'text-blue-500' : 'text-red-500'

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex items-center justify-between py-3 cursor-pointer hover:bg-muted/50 rounded-md px-2">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
							{icons[type]}
						</div>
						<span className="text-lg">{description}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className={`text-lg font-medium ${amountColor}`}>
							{type === 'income' ? '' : '-'}R${' '}
							{amount ? amount.toFixed(2).replace('.', ',') : '0,00'}
						</span>
						<Check className="w-5 h-5 text-blue-500" />
					</div>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Transaction Details</DialogTitle>
					<DialogDescription>View and manage transaction details.</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p>
						<strong>Type:</strong> {type}
					</p>
					<p>
						<strong>Description:</strong> {description}
					</p>
					<p>
						<strong>Amount:</strong> R${' '}
						{amount ? amount.toFixed(2).replace('.', ',') : '0,00'}
					</p>
				</div>
				<DialogFooter>
					<Button onClick={onEdit} className="mr-2">
						<Edit className="w-4 h-4 mr-2" />
						Edit
					</Button>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive">
								<Trash2 className="w-4 h-4 mr-2" />
								Remove
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete the
									transaction.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={onRemove}>Delete</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const DayGroup = ({
	date,
	transactions,
	onEdit,
	onRemove,
}: DayGroup & { onEdit: (id: string) => void; onRemove: (id: string) => void }) => {
	const balance = transactions.reduce(
		(acc, curr) =>
			acc + (curr.type === 'income' ? curr.amount || 0 : -(curr.amount || 0)),
		0,
	)

	return (
		<div className="mb-6">
			<h2 className="text-lg text-muted-foreground mb-4">{date}</h2>
			<Card>
				<CardContent className="divide-y">
					{transactions.map((transaction) => (
						<TransactionItem
							key={transaction.id}
							transaction={transaction}
							onEdit={() => onEdit(transaction.id)}
							onRemove={() => onRemove(transaction.id)}
						/>
					))}
				</CardContent>
			</Card>
			<div className="flex justify-end mt-2">
				<span className="text-lg">
					Saldo do dia: {balance >= 0 ? '' : '-'}R${' '}
					{Math.abs(balance).toFixed(2).replace('.', ',')}
				</span>
			</div>
		</div>
	)
}

const MonthSummary = ({ transactions }: { transactions: Transaction[] }) => {
	const income = transactions
		.filter((t) => t.type === 'income')
		.reduce((acc, curr) => acc + (curr.amount || 0), 0)

	const expenses = transactions
		.filter((t) => t.type !== 'income')
		.reduce((acc, curr) => acc + (curr.amount || 0), 0)

	const total = income - expenses

	return (
		<div className="space-y-2">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
						<Plus className="w-4 h-4 text-blue-500" />
					</div>
					<span>Entradas</span>
				</div>
				<span className="text-blue-500">R$ {income.toFixed(2).replace('.', ',')}</span>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
						<Minus className="w-4 h-4 text-red-500" />
					</div>
					<span>Saídas</span>
				</div>
				<span className="text-red-500">-R$ {expenses.toFixed(2).replace('.', ',')}</span>
			</div>
			<div className="flex justify-between items-center pt-2 border-t">
				<span className="font-medium">Total do mês</span>
				<span className="font-medium">
					{total >= 0 ? '' : '-'}R$ {Math.abs(total).toFixed(2).replace('.', ',')}
				</span>
			</div>
		</div>
	)
}

export function FinancialTracker() {
	const [transactions, setTransactions] = useState<Transaction[]>([
		{
			id: '1',
			type: 'test',
			description: 'Teste',
			amount: 300,
			date: '1 DE NOVEMBRO, SEXTA-FEIRA',
		},
		{
			id: '2',
			type: 'income',
			description: 'Receita',
			amount: 1000,
			date: '7 DE NOVEMBRO, QUINTA-FEIRA',
		},
		{
			id: '3',
			type: 'expense',
			description: 'Despesa',
			amount: 500,
			date: '7 DE NOVEMBRO, QUINTA-FEIRA',
		},
	])

	const groupedTransactions: Record<string, Transaction[]> = transactions.reduce(
		(acc, transaction) => {
			if (!acc[transaction.date]) {
				acc[transaction.date] = []
			}
			acc[transaction.date].push(transaction)
			return acc
		},
		{} as Record<string, Transaction[]>,
	)

	const handleEdit = (id: string) => {
		// Implement edit functionality
		console.log(`Editing transaction with id: ${id}`)
	}

	const handleRemove = (id: string) => {
		setTransactions(transactions.filter((t) => t.id !== id))
	}

	return (
		<div className="max-w-2xl mx-auto p-4 space-y-6">
			{Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
				<DayGroup
					key={date}
					date={date}
					transactions={dayTransactions}
					onEdit={handleEdit}
					onRemove={handleRemove}
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
