'use client'

import { PasswordInputComponent } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { app } from '../../firebase'

export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmation, setConfirmation] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()

		setError('')

		if (password !== confirmation) {
			setError('As senhas não coincidem')
			return
		}

		try {
			await createUserWithEmailAndPassword(getAuth(app), email, password)
			router.push('/login')
		} catch (e) {
			setError((e as Error).message)
		}
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

					<h4 className="text-gray-800 text-base font-semibold">Registre sua conta</h4>
				</div>

				<form onSubmit={handleSubmit} className="md:w-full">
					<div className="grid gap-4">
						<div>
							<label className="text-gray-800 text-sm mb-2 block">Email</label>
							<Input
								name="email"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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

						<div className="flex items-center gap-2">
							<Checkbox
								id="agreement"
								name="remember-me"
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
							/>
							<Label htmlFor="agreement">Concordo com os termos</Label>
						</div>
					</div>

					{error && (
						<div
							className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
							role="alert"
						>
							<span className="block sm:inline">{error}</span>
						</div>
					)}

					<div className="!mt-12">
						<Button size="lg" type="submit" className="w-full">
							Registrar
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
