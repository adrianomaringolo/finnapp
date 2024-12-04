'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useAuth } from '@/lib/context/AuthContext'
import { FinancialEntry } from '@/lib/types/Entry.type'
import { formatCurrency } from '@/lib/utils'
import { useAddEntry } from '@/services/entries/useAddEntry'
import { useUpdateEntry } from '@/services/entries/useUpdateEntry'
import { toast } from 'sonner'
import { CurrencyField } from '../forms/currency-field'
import { DateFormField } from '../forms/date-form-field'
import { LoadButton } from '../forms/load-button'
import { SelectorFormField } from '../forms/selector-form-field'
import { TextFormField } from '../forms/text-form-field'
import { TextareaFormField } from '../forms/textarea-form-field'
import { AmountType, AmountTypes, TransactionTypes } from './financial.types'

const formSchema = z.object({
	type: z.enum([AmountTypes.expanses, AmountTypes.income]),
	amount: z.string().min(1, 'Amount is required'),
	description: z.string().min(1, 'Description is required'),
	category: z.string().min(1, 'Category is required'),
	times: z.string().optional(),
	notes: z.string().optional(),
	date: z.date({
		required_error: 'Please select a date',
	}),
	completed: z.boolean().default(true),
})

type TransactionFormProps = {
	transactionToEdit?: FinancialEntry
	monthYear: string
	handleClose: () => void
}

export const TransactionForm = (props: TransactionFormProps) => {
	const { monthYear, handleClose, transactionToEdit } = props
	const { user } = useAuth()
	const [formType, setFormType] = useState<AmountType>(AmountTypes.expanses as AmountType)

	const addEntryMutation = useAddEntry({ userId: user?.uid as string, monthYear })
	const editUpdateMutation = useUpdateEntry({ userId: user?.uid as string, monthYear })

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			type:
				(transactionToEdit?.amount ?? 0) > 0 ? AmountTypes.income : AmountTypes.expanses,
			amount: Math.abs(transactionToEdit?.amount ?? 0).toString() ?? '',
			description: transactionToEdit?.description ?? '',
			category: transactionToEdit?.category ?? '',
			times: transactionToEdit?.times ?? '1',
			notes: transactionToEdit?.notes ?? '',
			date: transactionToEdit?.date ? new Date(transactionToEdit?.date) : new Date(),
			completed: transactionToEdit?.isCompleted ?? true,
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		const { amount, description, category, notes, date, completed } = values

		const correctAmount =
			formType === AmountTypes.expanses
				? -Math.abs(parseFloat(amount))
				: Math.abs(parseFloat(amount))

		const newTransaction: Omit<FinancialEntry, 'id'> = {
			amount: correctAmount,
			description,
			category,
			notes,
			isCompleted: completed,
			date: date.toISOString(),
			createdAt: new Date().toISOString(),
			monthYear: new Date(date).toISOString().slice(0, 7),
		}

		if (transactionToEdit) {
			editUpdateMutation.mutate(
				{ ...transactionToEdit, ...newTransaction },
				{
					onSuccess: () => {
						toast.success('O lançamento foi atualizada com sucesso!')
						handleClose()
						form.reset()
					},
					onError: () => {
						toast.error('Não foi possível atualizar o lançamento!')
					},
				},
			)
			return
		} else {
			addEntryMutation.mutate(newTransaction, {
				onSuccess: () => {
					toast.success('O lançamento foi criada com sucesso!')
					handleClose()
					form.reset()
				},
				onError: () => {
					toast.success('Não foi possível criar o lançamento!')
				},
			})
		}
	}

	const handleTypeChange = (value: string) => {
		if (value === AmountTypes.expanses || value === AmountTypes.income) {
			setFormType(value as AmountType)
			form.setValue('type', value as AmountType)
			if (value === AmountTypes.income) {
				form.setValue('category', '')
			}
		}
	}

	const getTypeCategories = (type: AmountType) => {
		return Object.entries(TransactionTypes)
			.map(([key, value]) => {
				if (value.type === type) {
					return {
						value: key,
						label: (
							<>
								{value.icon()}
								<span>{value.label}</span>
							</>
						),
					}
				}
				return undefined
			})
			.filter(Boolean) as { value: string; label: string | JSX.Element }[]
	}

	const expensesCategories = getTypeCategories(AmountTypes.expanses as AmountType)
	const incomeCategories = getTypeCategories(AmountTypes.income as AmountType)

	//  create an array of options to select the amount of times an expense is divided. It will go from 1 to 24. the label of 1 should be "A vista"
	const timesOptions = Array.from({ length: 24 }, (_, i) => ({
		value: (i + 1).toString(),
		label: i === 0 ? 'À vista' : `${i + 1} vezes`,
	}))

	return (
		<div className="w-full max-w-md mx-auto p-2 md:p-6 space-y-6">
			<ToggleGroup
				type="single"
				value={formType}
				onValueChange={handleTypeChange}
				className="justify-center mb-6"
			>
				<ToggleGroupItem
					value={AmountTypes.expanses}
					className={`transition-all ${
						formType === AmountTypes.expanses
							? '!bg-red-500 !text-white hover:!bg-red-600 flex-1'
							: '!bg-red-100 !text-red-600 hover:!bg-red-200'
					}`}
				>
					Despesa
				</ToggleGroupItem>
				<ToggleGroupItem
					value={AmountTypes.income}
					className={`transition-all ${
						formType === AmountTypes.income
							? '!bg-blue-500 !text-white hover:!bg-blue-600 flex-1'
							: '!bg-blue-100 !text-blue-600 hover:!bg-blue-200'
					}`}
				>
					Receita
				</ToggleGroupItem>
			</ToggleGroup>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<CurrencyField
										sizing="2xl"
										className={`${
											formType === AmountTypes.expanses
												? 'border-expense'
												: 'border-income'
										}`}
										decimalSeparator=","
										thousandSeparator="."
										value={field.value}
										onValueChange={(value) => {
											field.onChange(value.toString())
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<TextFormField name="description" placeholder="Descrição" />

					<DateFormField />

					{formType === AmountTypes.expanses ? (
						<SelectorFormField
							key={'expanses-category-' + formType}
							name="category"
							options={expensesCategories}
						/>
					) : (
						<SelectorFormField
							key={'income-category-' + formType}
							name="category"
							options={incomeCategories}
						/>
					)}
					<TextareaFormField
						name="notes"
						placeholder="Adicione observações se necessário"
					/>

					{formType === AmountTypes.expanses && (
						<>
							<SelectorFormField
								key={'times-' + formType}
								label="Parcelas"
								name="times"
								options={timesOptions}
							/>
							{+(form.watch('times') ?? 1) > 1 ? (
								<p className="text-xs !mt-1 italic text-gray-600">
									Você pagará em {form.watch('times')} parcelas de{' '}
									{formatCurrency(+form.watch('amount'))}
								</p>
							) : null}
						</>
					)}

					<FormField
						control={form.control}
						name="completed"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">Efetivada</FormLabel>
								</div>
								<FormControl>
									<Switch checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
							</FormItem>
						)}
					/>

					<LoadButton
						type="submit"
						size="xl"
						className={`w-full ${
							formType === AmountTypes.expanses
								? 'bg-red-500 hover:bg-red-600'
								: 'bg-blue-500 hover:bg-blue-600'
						}`}
						isLoading={addEntryMutation.isLoading || editUpdateMutation.isLoading}
					>
						Salvar
					</LoadButton>
				</form>
			</Form>
		</div>
	)
}
