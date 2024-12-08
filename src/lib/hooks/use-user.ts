import { createClient } from '@/lib/supabase/client'
import { AuthError, Session } from '@supabase/supabase-js'
import type { JwtPayload } from 'jwt-decode'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { User } from '../types/User.type'

type SupabaseJwtPayload = JwtPayload & {
	app_metadata: {
		role: string
	}
}

export function useUser() {
	const [user, setUser] = useState<User | null>(null)
	const [session, setSession] = useState<Session | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<AuthError | null>(null)
	const [role, setRole] = useState<string | null>(null)
	const supabase = createClient()

	useEffect(() => {
		async function fetchUser() {
			try {
				const {
					data: { session },
					error,
				} = await supabase.auth.getSession()
				if (error) throw error

				debugger

				if (session) {
					const loggedUser = {
						id: session.user.id,
						name: session.user.user_metadata.full_name,
						picture: session.user.user_metadata.picture,
						email: session.user.email as string,
						createdAt: session.user.created_at,
						lastSignInAt: session.user.last_sign_in_at,
					}
					setSession(session)
					setUser(loggedUser)
					const decodedJwt = jwtDecode<SupabaseJwtPayload>(session.access_token)
					setRole(decodedJwt.app_metadata.role)
				}
			} catch (error) {
				setError(error as AuthError)
			} finally {
				setLoading(false)
			}
		}
		fetchUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { loading, error, session, user, role }
}
