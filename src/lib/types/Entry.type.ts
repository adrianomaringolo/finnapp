export interface FinancialEntry {
	id: string
	amount: number
	description: string
	notes?: string
	isCompleted: boolean
	date: string
	createdAt: string
	category: string
	monthYear: string
}
