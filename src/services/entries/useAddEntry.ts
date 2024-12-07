import { createClient } from '@/lib/supabase/client'
import { FinancialEntry } from '@/lib/types/Entry.type'
import { objectToSnake } from '@/lib/utils/convertCase'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const COLLECTION = 'entries'

export interface AddEntryVariables {
	userId: string
	monthYear: string
}

const insertEntry = async (userId: string, entry: Partial<FinancialEntry>) => {
	const supabase = createClient()
	const { data } = await supabase
		.from('entries')
		.insert(objectToSnake({ ...entry, user_id: userId }))
		.select()
	return data?.[0].id
}

export const useAddEntry = (variables: AddEntryVariables) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (entry: Partial<FinancialEntry>) => insertEntry(variables.userId, entry),
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: [COLLECTION, variables],
			})
		},
	})
}
