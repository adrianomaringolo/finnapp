'use client'

import { FinancialTracker } from '@/components/financial/financial-tracker'
import {
	Month,
	MonthYearNavigatorComponent,
} from '@/components/navigation/month-year-navigator'
import { Suspense, useState } from 'react'

export default function Entries() {
	const [currentMonth, setCurrentMonth] = useState<Month>(new Date().getMonth() as Month)
	const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())

	return (
		<Suspense fallback={<div>Carregando...</div>}>
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

				<FinancialTracker
					monthYear={`${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`}
				/>
			</section>
		</Suspense>
	)
}
