'use client'

import { Month, MonthYearNavigatorComponent } from '@/components/month-year-navigator'
import { useState } from 'react'

export default function Entries() {
	const [currentMonth, setCurrentMonth] = useState<Month>(new Date().getMonth() as Month)
	const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())

	return (
		<div>
			<MonthYearNavigatorComponent
				currentMonth={currentMonth}
				currentYear={currentYear}
				onChangeMonthYear={(month, year) => {
					setCurrentMonth(month)
					setCurrentYear(year)
				}}
			/>
		</div>
	)
}
