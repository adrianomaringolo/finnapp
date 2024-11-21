'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useAuth } from '@/lib/context/AuthContext'
import { useAddEntry } from '@/services/entries/useAddEntry'
import { DateFormField } from '../forms/date-form-field'
import { SelectorFormField } from '../forms/selector-form-field'
import { TextFormField } from '../forms/text-form-field'
import { DialogClose, DialogFooter } from '../ui/dialog'
import { AmountType, AmountTypes, TransactionTypes } from './financial.types'

const formSchema = z.object({
	type: z.enum([AmountTypes.expanses, AmountTypes.income]),
	amount: z.string().min(1, 'Amount is required'),
	description: z.string().min(1, 'Description is required'),
	category: z.string().min(1, 'Category is required'),
	notes: z.string().optional(),
	date: z.date({
		required_error: 'Please select a date',
	}),
	completed: z.boolean().default(false),
})

type AddTransactionFormProps = {
	handleClose: () => void
}

export default function AddTransactionForm(props: AddTransactionFormProps) {
	const { user } = useAuth()
	const [formType, setFormType] = useState<AmountType>(AmountTypes.expanses as AmountType)

	const addEntryMutation = useAddEntry({ userId: user?.uid as string })

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			type: AmountTypes.expanses as AmountType,
			amount: '',
			description: '',
			category: '',
			notes: '',
			date: new Date(),
			completed: false,
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		const { amount, description, category, notes, date, completed } = values

		const newTransaction: Omit<FinancialEntry, 'id'> = {
			amount: parseFloat(amount),
			description,
			category,
			notes,
			isCompleted: completed,
			date: date.toISOString(),
			createdAt: new Date().toISOString(),
			monthYear: new Date(date).toISOString().slice(0, 7),
		}

		addEntryMutation.mutate(newTransaction, {
			onSuccess: () => {
				//toast.success('A notícia foi criada com sucesso!')
				props.handleClose()
				form.reset()
			},
			onError: () => {
				//toast.success('Não foi possível criar a notícia!')
			},
		})
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

	return (
		<div className="w-full max-w-md mx-auto p-6 space-y-6">
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
							? '!bg-green-500 !text-white hover:!bg-green-600 flex-1'
							: '!bg-green-100 !text-green-600 hover:!bg-green-200'
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
									<Input
										type="number"
										step="0.01"
										placeholder="0.00"
										{...field}
										sizing="2xl"
										className={`${
											formType === AmountTypes.expanses
												? 'border-red-500'
												: 'border-green-500'
										}`}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<TextFormField name="description" label="Descrição" />

					<DateFormField label="Data" />

					<SelectorFormField
						label="Categoria"
						name="category"
						options={Object.entries(TransactionTypes).map(([key, value]) => ({
							value: key,
							label: (
								<>
									{value.icon}
									<span>{value.label}</span>
								</>
							),
						}))}
					/>

					<TextFormField mode="textarea" name="notes" label="Observações" />

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
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button type="button" variant="secondary">
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
					<Button
						type="submit"
						className={`w-full ${
							formType === AmountTypes.expanses
								? 'bg-red-500 hover:bg-red-600'
								: 'bg-green-500 hover:bg-green-600'
						}`}
					>
						Salvar
					</Button>
				</form>
			</Form>
		</div>
	)
}
