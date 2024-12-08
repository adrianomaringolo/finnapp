import { createClient } from '@/lib/supabase/client'
import { objectToCamel } from '@/lib/utils/convertCase'
import { useQuery } from '@tanstack/react-query'

const COLLECTION = 'entries'

export interface GetEntriesVariables {
	userId: string
	monthYear: string
}

const fetchEntries = async (userId: string, monthYear: string) => {
	const supabase = createClient()
	const query = supabase
		.from('entries')
		.select()
		.eq('user_id', userId)
		.like('date', `${monthYear}%`)
		.order('created_at', { ascending: true })

	const { data, error } = await query

	if (error) {
		throw new Error(error.message)
	}

	return objectToCamel(data)
}

export const useGetEntries = (variables: GetEntriesVariables) => {
	const query = useQuery({
		queryKey: [COLLECTION, variables],
		enabled: !!variables.userId,
		queryFn: () => fetchEntries(variables.userId, variables.monthYear),
	})
	return { ...query, data: query.data }
}
