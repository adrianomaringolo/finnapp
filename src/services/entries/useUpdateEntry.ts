import { createClient } from '@/lib/supabase/client'
import { FinancialEntry } from '@/lib/types/Entry.type'
import { objectToSnake } from '@/lib/utils/convertCase'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const COLLECTION = 'entries'

export interface UpdateEntryVariables {
	userId: string
	monthYear: string
}

const updateEntry = async (userId: string, entry: Partial<FinancialEntry>) => {
	const supabase = createClient()
	const { data } = await supabase
		.from('entries')
		.update(
			objectToSnake({
				...entry,
				user_id: userId,
				updated_at: new Date().toISOString(),
			}),
		)
		.eq('id', entry.id)

	return data
}

export const useUpdateEntry = (variables: UpdateEntryVariables) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (entry: Partial<FinancialEntry>) => updateEntry(variables.userId, entry),
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: [COLLECTION, variables] })
		},
	})
}
