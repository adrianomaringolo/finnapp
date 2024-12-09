'use client'

import { GoogleLoginButton } from '@/components/access/google-login-button'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, Suspense, useState } from 'react'
import { app } from '../../firebase'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()

	// useEffect(() => {
	// 	const handleAuthRedirect = async () => {
	// 		try {
	// 			const result = await getRedirectResult(auth)
	// 			debugger
	// 			if (result) {
	// 				const credential = GoogleAuthProvider.credentialFromResult(result)
	// 				const user: User = result.user

	// 				const idToken = await user.getIdToken()

	// 				await fetch('/api/login', {
	// 					headers: {
	// 						Authorization: `Bearer ${idToken}`,
	// 					},
	// 				})

	// 				router.push('/')
	// 				console.log('User signed in via redirect:', user)
	// 			}
	// 		} catch (error) {
	// 			console.error('Error handling redirect:', error)
	// 		}
	// 	}

	// 	handleAuthRedirect()
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

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
		<Suspense>
			<div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
				<div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
					<div>
						<Image
							src="/logo.png"
							alt={`Logo ${process.env.NEXT_PUBLIC_APP_NAME}`}
							width={100}
							height={100}
							className="mb-4"
						/>
						<h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
							Controle suas finanças de forma simples e eficiente
						</h2>
						<p className="text-sm mt-6 text-gray-800">
							Com o {process.env.NEXT_PUBLIC_APP_NAME} você pode controlar suas finanças
							de forma simples e eficiente. Com ele você pode adicionar, editar e excluir
							lançamentos, categorias e contas e ter uma clara visão de como está sua
							situação financeira.
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
							<Input
								sizing="lg"
								name="email"
								type="email"
								autoComplete="email"
								required
								placeholder="Endereço de email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Input
								sizing="lg"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								placeholder="Senha"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<div className="flex flex-wrap items-center justify-between gap-4">
								<div className="flex items-center">
									<Checkbox id="remember-me" name="remember-me" />
									<Label
										htmlFor="remember-me"
										className="ml-3 block text-sm text-gray-800"
									>
										Lembre de mim
									</Label>
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

						<div
							className={cn(
								'relative text-center my-6 text-sm text-gray-800',
								'before:border-b before:w-[40%]',
								'before:absolute before:left-0 before:top-1/2',
								'after:border-b after:w-[40%]',
								'after:absolute after:right-0 after:top-1/2',
							)}
						>
							ou
						</div>

						<div className="space-x-6 flex justify-center">
							<GoogleLoginButton />
						</div>
					</form>
				</div>
			</div>
		</Suspense>
	)
}
