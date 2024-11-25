import { FinancialEntry } from '@/lib/types/Entry.type'
import { ExpensesCategoryTotal } from '../reports/expenses-category'
import { Card, CardContent, CardTitle } from '../ui/card'

type ExpansesCategoryCardProps = {
	entries: FinancialEntry[]
}

export const ExpansesCategoryCard = (props: ExpansesCategoryCardProps) => {
	return (
		<Card className="break-inside-avoid-column inline-blockw-full my-4 p-4">
			<CardTitle>Gastos por categoria</CardTitle>
			<CardContent className="px-0 py-2">
				<ExpensesCategoryTotal entries={props.entries} />
			</CardContent>
		</Card>
	)
}
