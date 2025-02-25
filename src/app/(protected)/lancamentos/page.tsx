'use client'

import { FinancialTracker } from '@/components/financial/financial-tracker'
import { Month, MonthNavigator } from 'buildgrid-ui'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

export default function Entries() {
	const [currentMonth, setCurrentMonth] = useState<Month>(new Date().getMonth() as Month)
	const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())

	return (
		<section>
			<div className="rounded-xl bg-gray-100 py-2 px-4">
				<MonthNavigator
					locale={ptBR}
					currentMonth={currentMonth}
					currentYear={currentYear}
					onChangeMonthYear={(month, year) => {
						setCurrentMonth(month)
						setCurrentYear(year)
					}}
				/>
			</div>

			<FinancialTracker
				monthYear={`${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`}
			/>
		</section>
	)
}
