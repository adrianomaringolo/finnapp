import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'buildgrid-ui'

type TooltipMessageProps = {
	message: string
	children: React.ReactNode
}

export const TooltipMessage = (props: TooltipMessageProps) => {
	const { message, children } = props
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>{message}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
