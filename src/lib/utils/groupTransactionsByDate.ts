import { Transaction } from '@/components/financial/financial.types'

type GroupedTransaction = {
	date: string
	previousAmount: number
	transactions: Transaction[]
}

export function groupTransactionsByDate(
	transactions: Transaction[],
): GroupedTransaction[] {
	// Sort transactions by date to ensure previous amount is calculated in order
	const sortedTransactions = [...transactions].sort((a, b) =>
		a.date.localeCompare(b.date),
	)

	const grouped: { [date: string]: GroupedTransaction } = {}
	let cumulativeAmount = 0

	for (const transaction of sortedTransactions) {
		// Use the current cumulative amount as the previous amount for the current date
		if (!grouped[transaction.date]) {
			grouped[transaction.date] = {
				date: transaction.date,
				previousAmount: cumulativeAmount,
				transactions: [],
			}
		}

		// Add transaction amount to cumulative total and add it to the group for the current date
		cumulativeAmount += transaction.amount ?? 0
		grouped[transaction.date].transactions.push(transaction)
	}

	// Convert grouped object to an array
	return Object.values(grouped)
}
