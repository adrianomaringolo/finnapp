'use client'

import { useUser } from '@/lib/hooks/use-user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
	const router = useRouter()
	const { user } = useUser()

	useEffect(() => {
		if (user) {
			router.push('/inicio')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return <></>
}
