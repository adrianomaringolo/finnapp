'use client'

import { Button } from '@/components/ui/button'
import {
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { app } from '../../firebase'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()

	const signWithGoogle = async () => {
		setError('')

		try {
			const provider = new GoogleAuthProvider()
			const credential = await signInWithPopup(getAuth(app), provider)
			const idToken = await credential.user.getIdToken()

			await fetch('/api/login', {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			})

			router.push('/')
		} catch (e) {
			setError((e as Error).message)
		}
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()
		setError('')

		try {
			const credential = await signInWithEmailAndPassword(getAuth(app), email, password)
			const idToken = await credential.user.getIdToken()

			await fetch('/api/login', {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			})

			router.push('/')
		} catch (e) {
			setError((e as Error).message)
		}
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
			<div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
				<div>
					<Image
						src="/finnapp-logo.png"
						alt="FinnApp"
						width={100}
						height={100}
						className="mb-4"
					/>
					<h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
						Controle suas finanças de forma simples e eficiente
					</h2>
					<p className="text-sm mt-6 text-gray-800">
						Com o FinnApp você pode controlar suas finanças de forma simples e eficiente.
						Com ele você pode adicionar, editar e excluir transações, categorias e contas
						e ter uma clara visão de como está sua situação financeira.
					</p>
					<p className="mt-5 text-sm font-light text-gray-500 dark:text-gray-400">
						Não tem uma conta?{' '}
						<Link
							href="/register"
							className="text-blue-600 font-semibold hover:underline ml-1"
						>
							Cadastre-se
						</Link>
					</p>
				</div>

				<form className="md:max-w-md md:ml-auto w-full" onSubmit={handleSubmit}>
					<h3 className="text-gray-800 text-3xl font-extrabold mb-8">Acesse</h3>

					<div className="space-y-4">
						<div>
							<input
								name="email"
								type="email"
								autoComplete="email"
								required
								className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
								placeholder="Endereço de email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<input
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
								placeholder="Senha"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="flex flex-wrap items-center justify-between gap-4">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
									Lembre de mim
								</label>
							</div>
							<div className="text-sm">
								<a
									href="jajvascript:void(0);"
									className="text-blue-600 hover:text-blue-500 font-semibold"
								>
									Esqueci minha senha
								</a>
							</div>
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

					<div className="!mt-8">
						<Button type="submit" size="lg" className="w-full">
							Entrar
						</Button>
					</div>

					<div className="space-x-6 flex justify-center mt-8">
						<Button
							type="button"
							variant="outline"
							size="xl"
							className="w-full text-sm"
							onClick={signWithGoogle}
						>
							<FcGoogle size={40} /> Entrar com Google
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
