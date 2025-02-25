import { useGetMonthlyEntrySums } from '@/services/entries/useGetMonthlyEntrySums'
import { MonthNavigator } from 'buildgrid-ui'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { YearBarChart } from './year-bar-chart'

export const AnnualChart = () => {
	const { data: entries } = useGetMonthlyEntrySums()

	const [year, setYear] = useState(new Date().getFullYear())

	if (!entries) {
		return null
	}

	return (
		<section className="mt-4">
			<div className="rounded-xl bg-gray-100 py-2 px-4 mb-4">
				<MonthNavigator
					locale={ptBR}
					mode="year"
					currentYear={year}
					onChangeMonthYear={(_, year) => setYear(year)}
					currentMonth={0}
				/>
			</div>
			<YearBarChart summary={entries} year={year} />
		</section>
	)
}
