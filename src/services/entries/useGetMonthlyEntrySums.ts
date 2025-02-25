import { createClient } from '@/lib/supabase/client'
import { MonthlyEntriesSum } from '@/lib/types/Entry.type'
import { objectToCamel } from '@/lib/utils/convertCase'
import { useQuery } from '@tanstack/react-query'

export interface GetMonthlyEntrySumsVariables {
	userId: string
}

const fetchMontlyEntrySums = async () => {
	const supabase = createClient()
	const query = supabase
		.from('monthly_income_expense_summary')
		.select()
		.order('year', { ascending: true })

	const { data, error } = await query

	if (error) {
		throw new Error(error.message)
	}

	return objectToCamel(data)
}

export const useGetMonthlyEntrySums = () => {
	const query = useQuery({
		queryKey: ['monthly_income_expense_summary'],
		queryFn: () => fetchMontlyEntrySums(),
	})
	return { ...query, data: query.data as MonthlyEntriesSum[] }
}
