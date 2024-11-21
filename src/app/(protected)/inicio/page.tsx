'use client'

import { useAuth } from '@/lib/context/AuthContext'
import { useGetList } from '@/services/users/useGetUser'

export default function Dashboard() {
	const { user } = useAuth()
	const { data } = useGetList({ userId: user?.uid as string })
	return <div>{data?.email}</div>
}
