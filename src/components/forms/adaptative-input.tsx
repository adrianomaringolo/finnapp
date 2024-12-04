import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import * as React from 'react'

export interface AdaptiveInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
}

const AdaptiveInput = React.forwardRef<HTMLInputElement, AdaptiveInputProps>(
	({ className, leftIcon, rightIcon, ...props }, ref) => {
		return (
			<div className="relative">
				{leftIcon && (
					<div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
						{leftIcon}
					</div>
				)}
				<Input
					className={cn(leftIcon && 'pl-8', rightIcon && 'pr-8', className)}
					ref={ref}
					{...props}
				/>
				{rightIcon && (
					<div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
						{rightIcon}
					</div>
				)}
			</div>
		)
	},
)
AdaptiveInput.displayName = 'AdaptiveInput'

export { AdaptiveInput }
