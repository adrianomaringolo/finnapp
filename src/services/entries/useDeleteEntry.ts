import { createClient } from '@/lib/supabase/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface DeleteEntryVariables {
	userId: string
	monthYear: string
}

const deleteEntry = async (entryId: string) => {
	const supabase = createClient()

	const { status } = await supabase.from('entries').delete().eq('id', entryId)
	return status
}

export const useDeleteEntry = (variables: DeleteEntryVariables) => {
	const queryClient = useQueryClient()

	const firestoreMutationQuery = useMutation({
		mutationFn: (entryId: string) => deleteEntry(entryId),
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: [
					'entries',
					{ userId: variables.userId, monthYear: variables.monthYear },
				],
			})
		},
	})

	return firestoreMutationQuery
}
