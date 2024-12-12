'use client'

import { ExpansesCategoryCard } from '@/components/dashboard/expanses-category-card'
import { MonthSummaryCard } from '@/components/dashboard/month-summary-card'
import { PendentExpansesCard } from '@/components/dashboard/pendent-expanses-card'
import { ShortcutsCard } from '@/components/dashboard/shortcuts-card'
import { TopExpansesCard } from '@/components/dashboard/top-expanses-card'
import { useDialog } from '@/components/dialog-context'
import { useUser } from '@/lib/hooks/use-user'
import { authErrors } from '@/lib/types/Auth.type'
import { formatDateAndWeekday } from '@/lib/utils/date'
import { useGetEntries } from '@/services/entries/useGetEntries'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const Dashboard = () => {
	const { user } = useUser()
	const searchParams = useSearchParams()

	const dialog = useDialog()

	useEffect(() => {
		const errorCode = searchParams.get('error_code')

		if (errorCode) {
			dialog.error({
				title: 'Erro ao acessar sua conta',
				message: authErrors[errorCode as keyof typeof authErrors],
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	const { data: entries = [] } = useGetEntries({
		userId: user?.id as string,
		monthYear: new Date().toISOString().slice(0, 7),
	})

	return (
		<section>
			<p className="text-2xl font-bold">Olá, {user?.name?.split(' ')[0]} 👋</p>
			<h2 className="text-lg text-gray-800 mb-5">
				Hoje é {formatDateAndWeekday(new Date())}
			</h2>

			<div className="gap-8 columns-1 md:columns-2">
				<ShortcutsCard />
				<MonthSummaryCard entries={entries} />
				<ExpansesCategoryCard entries={entries} />
				<TopExpansesCard entries={entries} />
				<PendentExpansesCard entries={entries} />
			</div>
		</section>
	)
}

export default Dashboard
