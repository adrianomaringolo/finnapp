import { db } from '@/firebase'
import { FinancialEntry } from '@/lib/types/Entry.type'
import { doc, updateDoc } from 'firebase/firestore'
import { useMutation, useQueryClient } from 'react-query'

const COLLECTION = 'entries'

export interface UpdateEntryVariables {
	userId: string
	monthYear: string
}

const updateEntry = async (userId: string, entry: Partial<FinancialEntry>) => {
	const entryRef = doc(db, 'users', userId, COLLECTION, entry.id as string)

	return await updateDoc(entryRef, entry)
}

export const useUpdateEntry = (variables: UpdateEntryVariables) => {
	const queryClient = useQueryClient()

	return useMutation(
		(entry: Partial<FinancialEntry>) => updateEntry(variables.userId, entry),
		{
			onSuccess: () => {
				queryClient.refetchQueries([COLLECTION, variables])
			},
		},
	)
}
