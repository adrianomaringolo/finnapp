'use client'

import { useFormContext } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type TextFormFieldProps = {
	label: string
	name: string
	mode?: 'input' | 'textarea'
}

export const TextFormField = (props: TextFormFieldProps) => {
	const { label, name, mode = 'input' } = props

	const form = useFormContext()

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{mode === 'textarea' ? (
							<Textarea className="resize-none" {...field} />
						) : (
							<Input {...field} />
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
