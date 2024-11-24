import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'

type SelectorFormFieldProps = {
	label: string
	name: string
	options: { value: string; label: string | JSX.Element }[]
}

export const SelectorFormField = (props: SelectorFormFieldProps) => {
	const { label, name, options } = props
	const form = useFormContext()

	// useEffect(() => {
	// 	form.setValue(name, options[0].value)
	// }, [form, name, options])

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={options[0].value}>
						<FormControl>
							<SelectTrigger>
								<div className="flex items-center">
									<SelectValue placeholder="Selecione" />
								</div>
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									<div className="flex items-center gap-2">{option.label}</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
