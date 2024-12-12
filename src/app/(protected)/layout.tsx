'use client'

import { useDialog } from '@/components/dialog-context'
import { FooterComponent } from '@/components/navigation/footer'
import { ResponsiveNav } from '@/components/navigation/responsive-nav'
import { createClient } from '@/lib/supabase/client'
import { authErrors } from '@/lib/types/Auth.type'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FileKey, Loader, MailCheck } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
	const supabase = createClient()
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const router = useRouter()

	const dialog = useDialog()
	const searchParams = useSearchParams()

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				retry: 1,
			},
		},
	})

	const validateAccess = async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession()

		if (session) {
			setIsAuthenticated(true)
		} else {
			router.push('/login')
		}
	}

	const checkError = () => {
		const errorCode = searchParams.get('error_code')

		if (errorCode) {
			dialog.confirm({
				icon: FileKey,
				title: 'Erro ao acessar sua conta',
				message: authErrors[errorCode as keyof typeof authErrors],
				onConfirm: () => {
					router.push('/login')
				},
				confirmLabel: 'Ir para login',
			})

			return true
		}
	}

	const checkCodeVerification = () => {
		const code = searchParams.get('code')

		if (code) {
			dialog.confirm({
				icon: MailCheck,
				title: 'Sua conta foi verificada com sucesso 🎉',
				message:
					'Agora você já pode acessar sua conta e começar a controlar suas finanças.',
				onConfirm: () => {
					router.push('/inicio')
				},
				confirmLabel: 'Ir para meu dashboard',
			})

			return true
		}
	}

	useEffect(() => {
		if (checkError()) return
		if (checkCodeVerification()) return

		validateAccess()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	if (!isAuthenticated)
		return (
			<div className="w-full h-dvh flex justify-center items-center">
				<Loader className="animate-spin w-20 h-20 text-gray-500" />
			</div>
		)

	return (
		<QueryClientProvider client={queryClient}>
			<div className="bg-gray-100 min-h-dvh flex flex-col">
				<ResponsiveNav />
				<main className="m-5 rounded-xl max-w-4xl mx-auto bg-white p-2 md:p-6 flex-1 w-full">
					{children}
				</main>
				<FooterComponent />
			</div>
		</QueryClientProvider>
	)
}
