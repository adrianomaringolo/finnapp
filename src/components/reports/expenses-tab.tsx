import { useUser } from '@/lib/hooks/use-user'
import { useGetEntries } from '@/services/entries/useGetEntries'
import { Card, CardContent, Month, MonthNavigator } from 'buildgrid-ui'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { CategoryChart } from './category-chart'
import { ExpensesCategoryTotal } from './expenses-category'
import { IncomeExpensesTotal } from './income-expenses-total'

export const ExpensesTab = () => {
	const [year, setYear] = useState(new Date().getFullYear())
	const [month, setMonth] = useState(new Date().getMonth())

	const { user } = useUser()

	const { data: entries = [] } = useGetEntries({
		userId: user?.id as string,
		monthYear: `${year}-${(month + 1).toString().padStart(2, '0')}`,
	})

	return (
		<>
			<section className="mt-4">
				<div className="rounded-xl bg-gray-100 py-2 px-4 mb-4">
					<MonthNavigator
						locale={ptBR}
						mode="month"
						currentYear={year}
						onChangeMonthYear={(month, year) => {
							setMonth(month)
							setYear(year)
						}}
						currentMonth={month as Month}
					/>
				</div>

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
		</>
	)
}
