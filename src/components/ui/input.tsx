import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const inputVariants = cva(
	'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
	{
		variants: {
			sizing: {
				sm: 'h-8 text-xs px-2',
				md: 'h-10 text-sm px-3',
				lg: 'h-12 text-base px-4',
				xl: 'h-14 text-lg px-5',
			},
		},
		defaultVariants: {
			sizing: 'md',
		},
	},
)

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, sizing, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputVariants({ sizing, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Input.displayName = 'Input'

export { Input }
