'use client'

import { useUser } from '@/lib/hooks/use-user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
	const router = useRouter()
	const { session } = useUser()

	useEffect(() => {
		if (session) {
			router.push('/inicio')
		} else {
			router.push('/login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session])

	return <></>
}
