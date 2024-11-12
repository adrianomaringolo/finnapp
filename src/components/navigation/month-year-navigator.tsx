'use client'

import { Button } from '@/components/ui/button'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

interface MonthYearNavigatorProps {
	currentMonth: Month
	currentYear: number
	onChangeMonthYear: (month: Month, year: number) => void
}

export function MonthYearNavigatorComponent({
	currentMonth,
	currentYear,
	onChangeMonthYear,
}: MonthYearNavigatorProps) {
	const navigateMonth = (direction: 'prev' | 'next') => {
		let newMonth = currentMonth
		let newYear = currentYear

		if (direction === 'prev') {
			if (newMonth === 0) {
				newMonth = 11
				newYear--
			} else {
				newMonth--
			}
		} else {
			if (newMonth === 11) {
				newMonth = 0
				newYear++
			} else {
				newMonth++
			}
		}

		onChangeMonthYear(newMonth as Month, newYear)
	}

	return (
		<div className="flex items-center justify-between">
			<Button
				variant="outline"
				size="icon"
				onClick={() => navigateMonth('prev')}
				aria-label="Mês anterior"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			<div className="text-center">
				<h2 className="text-2xl font-bold capitalize">
					{ptBR.localize.month(currentMonth, { width: 'wide' })}
				</h2>
				<p className="text-sm text-muted-foreground">{currentYear}</p>
			</div>
			<Button
				variant="outline"
				size="icon"
				onClick={() => navigateMonth('next')}
				aria-label="Próximo mês"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	)
}
