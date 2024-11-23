import { db } from '@/firebase'
import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore'
import { doc } from 'firebase/firestore'
import { useQueryClient } from 'react-query'

const COLLECTION = 'entries'

export interface DeleteEntryVariables {
	userId: string
	entryId: string
}

export const useDeleteEntry = (variables: DeleteEntryVariables) => {
	const queryClient = useQueryClient()
	const entryDocRef = doc(db, 'users', variables.userId, COLLECTION, variables.entryId)

	const firestoreMutationQuery = useFirestoreDocumentDeletion(entryDocRef, {
		onSuccess() {
			queryClient.invalidateQueries(['entries', { userId: variables.userId }])
		},
	})

	return firestoreMutationQuery
}
