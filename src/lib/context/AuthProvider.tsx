'use client'

import { AuthContext, type User } from './AuthContext'

export interface AuthProviderProps {
	user: User | null
	children: React.ReactNode
}

export const AuthProvider = (props: AuthProviderProps) => {
	const { user, children } = props
	return (
		<AuthContext.Provider
			value={{
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
