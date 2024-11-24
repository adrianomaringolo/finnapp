'use client'

import {
	Month,
	MonthYearNavigatorComponent,
} from '@/components/navigation/month-year-navigator'
import { CategoryChart } from '@/components/reports/category-chart'
import { ExpensesCategoryTotal } from '@/components/reports/expenses-category'
import { IncomeExpensesTotal } from '@/components/reports/income-expenses-total'
import { MapsCategories } from '@/components/reports/maps-categories'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/context/AuthContext'
import { useGetEntries } from '@/services/entries/useGetEntries'
import { TabsList } from '@radix-ui/react-tabs'
import { Gauge, HandCoins } from 'lucide-react'
import { useState } from 'react'

export default function Reports() {
	const [currentMonth, setCurrentMonth] = useState<Month>(new Date().getMonth() as Month)
	const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())

	const { user } = useAuth()

	const { data: entries = [] } = useGetEntries({
		userId: user?.uid as string,
		monthYear: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`,
	})

	return (
		<div>
			<div className="rounded-xl bg-gray-100 py-2 px-4">
				<MonthYearNavigatorComponent
					currentMonth={currentMonth}
					currentYear={currentYear}
					onChangeMonthYear={(month, year) => {
						setCurrentMonth(month)
						setCurrentYear(year)
					}}
				/>
			</div>

			<Tabs defaultValue="categories" className="mt-8">
				<TabsList>
					<TabsTrigger value="categories" className="px-4 py-3 gap-2 bg-gray-50">
						<HandCoins />
						Despesas
					</TabsTrigger>
					<TabsTrigger value="map" className="px-4 py-3 gap-2 bg-gray-50">
						<Gauge />
						Mapa
					</TabsTrigger>
				</TabsList>
				<TabsContent value="categories" className="p-2">
					<section className="mt-4">
						<IncomeExpensesTotal entries={entries} />
					</section>
					<section className="mt-4">
						<ExpensesCategoryTotal entries={entries} />
					</section>
					<section className="mt-4">
						<CategoryChart entries={entries} />
					</section>
				</TabsContent>
				<TabsContent value="map" className="p-2">
					<section className="mt-4">
						<MapsCategories entries={entries} />
					</section>
				</TabsContent>
			</Tabs>
		</div>
	)
}
