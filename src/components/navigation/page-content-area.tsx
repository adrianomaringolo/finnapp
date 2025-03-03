'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DialogProvider, Toaster } from 'buildgrid-ui'
import { Suspense } from 'react'
import { ReactQueryClientProvider } from '../react-query-client-provider'

export const PageContentArea = ({ children }: { children: React.ReactNode }) => {
	return (
		<ReactQueryClientProvider>
			<DialogProvider>
				<Suspense>{children}</Suspense>
			</DialogProvider>
			<ReactQueryDevtools initialIsOpen={false} />
			<Toaster expand />
		</ReactQueryClientProvider>
	)
}
