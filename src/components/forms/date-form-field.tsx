'use client'

import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AdaptiveInput } from 'buildgrid-ui'
import { useFormContext } from 'react-hook-form'

type DateFormFieldProps = {
	label?: string
}

export const DateFormField = (props: DateFormFieldProps) => {
	const { label } = props

	const form = useFormContext()
	return (
		<FormField
			control={form.control}
			name="date"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					{label && <FormLabel>{label}</FormLabel>}
					<AdaptiveInput {...field} type="date" className="" />

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
