'use client'

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
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
			setError("Passwords don't match")
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
			<div className="max-w-4xl mx-auto p-6">
				<div className="text-center mb-16">
					<a href="javascript:void(0)">
						<img
							src="https://readymadeui.com/readymadeui.svg"
							alt="logo"
							className="w-52 inline-block"
						/>
					</a>
					<h4 className="text-gray-800 text-base font-semibold mt-6">
						Sign up into your account
					</h4>
				</div>

				<form onSubmit={handleSubmit} className="md:w-full">
					<div className="grid gap-8">
						<div>
							<label className="text-gray-800 text-sm mb-2 block">Email</label>
							<input
								name="email"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
								placeholder="Enter email"
							/>
						</div>

						<div>
							<label className="text-gray-800 text-sm mb-2 block">Password</label>
							<input
								name="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
								placeholder="Enter password"
							/>
						</div>
						<div>
							<label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
							<input
								name="cpassword"
								type="password"
								value={confirmation}
								onChange={(e) => setConfirmation(e.target.value)}
								className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
								placeholder="Enter confirm password"
							/>
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
						<button
							type="button"
							className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
						>
							Sign up
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}
