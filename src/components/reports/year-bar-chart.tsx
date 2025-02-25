'use client'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { MonthlyEntriesSum } from '@/lib/types/Entry.type'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
	totalIncome: {
		label: 'Receitas',
		color: '#295f9d',
	},
	totalExpanse: {
		label: 'Despesas',
		color: '#da5151',
	},
} satisfies ChartConfig

type YearBarChartProps = {
	year: number
	summary: MonthlyEntriesSum[]
}

export function YearBarChart(props: YearBarChartProps) {
	const getNumbersFromMonthYear = (month: number, year: number) => {
		const item = props.summary.find(
			(entry) => entry.month === month && entry.year === year,
		)
		return {
			totalIncome: Math.abs(item?.totalIncome ?? 0),
			totalExpanse: Math.abs(item?.totalExpense ?? 0),
		}
	}

	const hasItemsForYear = props.summary.some((item) => item.year === props.year)

	const chartData = [
		{ month: 'Janeiro', ...getNumbersFromMonthYear(1, props.year) },
		{ month: 'Fevereiro', ...getNumbersFromMonthYear(2, props.year) },
		{ month: 'Março', ...getNumbersFromMonthYear(3, props.year) },
		{ month: 'Abril', ...getNumbersFromMonthYear(4, props.year) },
		{ month: 'Maio', ...getNumbersFromMonthYear(5, props.year) },
		{ month: 'Junho', ...getNumbersFromMonthYear(6, props.year) },
		{ month: 'Julho', ...getNumbersFromMonthYear(7, props.year) },
		{ month: 'Agosto', ...getNumbersFromMonthYear(8, props.year) },
		{ month: 'Setembro', ...getNumbersFromMonthYear(9, props.year) },
		{ month: 'Outubro', ...getNumbersFromMonthYear(10, props.year) },
		{ month: 'Novembro', ...getNumbersFromMonthYear(11, props.year) },
		{ month: 'Dezembro', ...getNumbersFromMonthYear(12, props.year) },
	]

	return (
		<section className="h-80 w-full">
			{!hasItemsForYear ? (
				<div className="text-center bg-gray-100 h-full flex items-center justify-center">
					Nenhum lançamento encontrado para esse ano
				</div>
			) : (
				<ChartContainer config={chartConfig} className="h-80 w-full">
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<Bar dataKey="totalIncome" fill="#295f9d" radius={4} />
						<Bar dataKey="totalExpanse" fill="#da5151" radius={4} />
					</BarChart>
				</ChartContainer>
			)}
		</section>
	)
}
