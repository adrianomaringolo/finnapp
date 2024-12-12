'use client'

import { useDialog } from '@/components/dialog-context'
import { LoadButton } from '@/components/forms/load-button'
import { PasswordInputComponent } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { Key } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ResetPassword() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmation, setConfirmation] = useState('')

	const [isLoading, setIsLoading] = useState(true)

	const router = useRouter()
	const dialog = useDialog()

	const supabase = createClient()

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()
		setIsLoading(true)

		if (password !== confirmation) {
			toast.error('As senhas não coincidem')
			return
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const result = await supabase.auth.updateUser({
			password: password,
		})

		dialog.success({
			icon: Key,
			title: 'Senha atualizada',
			message: 'Você será redirecionado para a página de login',
		})
		setIsLoading(false)

		supabase.auth.signOut()
		router.push('/login')
	}

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (session) {
				setEmail(session?.user?.email as string)
				setIsLoading(false)
			} else {
				router.push('/login')
			}
		})

		return () => {
			supabase.auth.signOut()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8">
			<div className="w-96 mx-auto p-6">
				<div className="flex flex-col items-center text-center mb-8">
					<Image
						src="/logo.png"
						alt="Amigo do Bolso"
						width={100}
						height={100}
						className="mb-4"
					/>

					<h4 className="text-gray-800 text-base font-semibold">Recuperação da senha</h4>
					<p>Defina sua nova senha abaixo</p>
				</div>

				<form onSubmit={handleSubmit} className="md:w-full">
					<div className="grid gap-4">
						<div>
							<label className="text-gray-800 text-sm mb-2 block">Email</label>
							<Input
								name="email"
								type="text"
								disabled
								value={email}
								placeholder="Informe seu email"
							/>
						</div>

						<div>
							<label className="text-gray-800 text-sm mb-2 block">Senha</label>
							<PasswordInputComponent
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Informe sua senha"
							/>
						</div>
						<div>
							<label className="text-gray-800 text-sm mb-2 block">Confirmação</label>
							<Input
								name="cpassword"
								type="password"
								value={confirmation}
								onChange={(e) => setConfirmation(e.target.value)}
								placeholder="Confirme sua senha"
							/>
						</div>
					</div>

					<div className="!mt-12">
						<LoadButton size="lg" type="submit" className="w-full" isLoading={isLoading}>
							Alterar senha
						</LoadButton>
					</div>
				</form>
				<Button variant="link" className="w-full" asChild>
					<Link href="/login">Voltar para login</Link>
				</Button>
			</div>
		</main>
	)
}
