'use client'

import {
	Month,
	MonthYearNavigatorComponent,
} from '@/components/navigation/month-year-navigator'
import { CategoryChart } from '@/components/reports/category-chart'
import { ExpensesCategoryTotal } from '@/components/reports/expenses-category'
import { IncomeExpensesTotal } from '@/components/reports/income-expenses-total'
import { MapsCategories } from '@/components/reports/maps-categories'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/context/AuthContext'
import { useGetEntries } from '@/services/entries/useGetEntries'
import { TabsList } from '@radix-ui/react-tabs'
import { Gauge, HandCoins } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Reports() {
	const [currentMonth, setCurrentMonth] = useState<Month>(new Date().getMonth() as Month)
	const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())

	const { user } = useAuth()

	const { data: entries = [] } = useGetEntries({
		userId: user?.uid as string,
		monthYear: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`,
	})

	const searchParams = useSearchParams()

	return (
		<section>
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

			<Tabs defaultValue={searchParams.get('t') ?? 'despesas'} className="mt-8">
				<TabsList>
					<TabsTrigger value="despesas" className="px-4 py-3 gap-2 bg-gray-50">
						<HandCoins />
						Despesas
					</TabsTrigger>
					<TabsTrigger value="mapa" className="px-4 py-3 gap-2 bg-gray-50">
						<Gauge />
						Mapa
					</TabsTrigger>
				</TabsList>
				<TabsContent value="despesas" className="p-2">
					<section className="mt-4">
						<Card>
							<CardContent className="grid md:grid-cols-3 gap-4 py-4">
								<IncomeExpensesTotal entries={entries} />
							</CardContent>
						</Card>
					</section>
					<section className="mt-4">
						<ExpensesCategoryTotal entries={entries} />
					</section>
					<section className="mt-4">
						<CategoryChart entries={entries} />
					</section>
				</TabsContent>
				<TabsContent value="mapa" className="p-2">
					<section className="mt-4">
						<MapsCategories entries={entries} />
					</section>
				</TabsContent>
			</Tabs>
		</section>
	)
}
