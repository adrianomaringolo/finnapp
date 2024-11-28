import { User } from '@/lib/types/User.type'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { Claims } from 'next-firebase-auth-edge/lib/auth/claims'
import { useEffect, useState } from 'react'

export const UserNameDisplay = ({ user }: { user: User }) => {
	const [claims, setClaims] = useState<Claims>()

	const functions = getFunctions()

	useEffect(() => {
		const getUserClaims = httpsCallable(functions, 'getUserClaims')

		try {
			getUserClaims({ uid: user.uid }).then((res) => {
				const data = res.data as { claims: Claims }
				setClaims(data.claims)
			})
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error fetching user claims:', error.message)
			} else {
				console.error('Error fetching user claims:', error)
			}
		}
	}, [functions, user.uid])

	const isAdmin = claims?.admin ?? false
	console.log('claims', claims)

	return (
		<div className="flex items-center">
			<div className="flex flex-col">
				<span>
					{user.displayName}
					{isAdmin && <span className="text-xs text-gray-400 ml-1">(Admin)</span>}
				</span>
				<span className="text-sm text-gray-500">{user.email}</span>
			</div>
		</div>
	)
}
