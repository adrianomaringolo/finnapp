'use client'

import { ExpansesCategoryCard } from '@/components/dashboard/expanses-category-card'
import { MonthSummaryCard } from '@/components/dashboard/month-summary-card'
import { PendentExpansesCard } from '@/components/dashboard/pendent-expanses-card'
import { ShortcutsCard } from '@/components/dashboard/shortcuts-card'
import { TopExpansesCard } from '@/components/dashboard/top-expanses-card'
import { useAuth } from '@/lib/context/AuthContext'
import { formatDateAndWeekday } from '@/lib/utils/date'
import { useGetEntries } from '@/services/entries/useGetEntries'

export default function Dashboard() {
	const { user } = useAuth()

	const { data: entries = [] } = useGetEntries({
		userId: user?.uid as string,
		monthYear: new Date().toISOString().slice(0, 7),
	})

	return (
		<section>
			<p className="text-2xl font-bold">Olá, {user?.displayName?.split(' ')[0]} 👋</p>
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
