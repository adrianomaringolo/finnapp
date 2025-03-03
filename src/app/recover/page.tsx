'use client'

import { createClient } from '@/lib/supabase/client'
import { Button, Input, toast, useDialog } from 'buildgrid-ui'
import { MailCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

export default function Register() {
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const supabase = createClient()
	const dialog = useDialog()

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()

		if (!email) {
			toast.error('Informe seu email')
			return
		}

		setIsLoading(true)

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const response = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset-password`,
		})

		dialog.success({
			icon: MailCheck,
			title: 'E-mail enviado',
			message: `Verifique sua caixa de entrada em ${email} para recuperar sua senha.`,
		})

		setIsLoading(false)
	}

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

					<h4 className="text-gray-800 text-base font-semibold">
						Insira seu e-mail de cadastro abaixo para receber as orientações de
						recuperação da senha.
					</h4>
				</div>

				<form onSubmit={handleSubmit} className="md:w-full">
					<div className="grid gap-4">
						<div>
							<label className="text-gray-800 text-sm mb-2 block">E-mail</label>
							<Input
								name="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Informe seu e-mail"
							/>
						</div>
					</div>

					<div className="!mt-12">
						<Button
							size="lg"
							type="submit"
							className="w-full"
							isLoading={isLoading}
							disabled={!email}
						>
							Enviar
						</Button>
					</div>
				</form>
				<Button variant="link" className="w-full" asChild>
					<Link href="/login">Voltar para login</Link>
				</Button>
			</div>
		</main>
	)
}
