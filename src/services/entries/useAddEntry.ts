import { db } from '@/firebase'
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore'
import { collection } from 'firebase/firestore'
import { useQueryClient } from 'react-query'

const COLLECTION = 'entries'

export interface AddEntryVariables {
	userId: string
}

export const useAddEntry = (variables: AddEntryVariables) => {
	const entriesRef = collection(db, 'users', variables.userId, COLLECTION)

	const queryClient = useQueryClient()

	const firestoreMutationQuery = useFirestoreCollectionMutation(entriesRef, {
		onSuccess() {
			queryClient.invalidateQueries(['entries', variables])
		},
	})

	return firestoreMutationQuery
}
