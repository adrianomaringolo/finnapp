'use client'

import { CalendarIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { formatLongDate } from '@/lib/utils/date'
import { useState } from 'react'

type DateFormFieldProps = {
	label: string
}

export const DateFormField = (props: DateFormFieldProps) => {
	const { label } = props
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

	const form = useFormContext()
	return (
		<FormField
			control={form.control}
			name="date"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>{label}</FormLabel>
					<Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant={'outline'}
									className={cn(
										'w-full pl-3 text-left font-normal',
										!field.value && 'text-muted-foreground',
									)}
								>
									{field.value ? formatLongDate(field.value) : <span>Selecione</span>}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="center">
							<Calendar
								mode="single"
								selected={field.value}
								onSelect={(date) => {
									field.onChange(date)
									setIsDatePickerOpen(false)
								}}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
