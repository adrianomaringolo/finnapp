import { db } from '@/firebase'
import { FinancialEntry } from '@/lib/types/Entry.type'
import { addDoc, collection } from 'firebase/firestore'
import { useMutation, useQueryClient } from 'react-query'

const COLLECTION = 'entries'

export interface AddEntryVariables {
	userId: string
	monthYear: string
}

const insertEntry = async (userId: string, entry: Partial<FinancialEntry>) => {
	const entriesRef = collection(db, 'users', userId, COLLECTION)

	const docRef = await addDoc(entriesRef, entry)

	return docRef.id
}

export const useAddEntry = (variables: AddEntryVariables) => {
	const queryClient = useQueryClient()

	return useMutation(
		(entry: Partial<FinancialEntry>) => insertEntry(variables.userId, entry),
		{
			onSuccess: () => {
				queryClient.refetchQueries([COLLECTION, variables])
			},
		},
	)
}
