import { db } from '@/firebase'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, orderBy, query } from 'firebase/firestore'

const COLLECTION = 'entries'

export interface GetEntriesVariables {
	userId: string
}

export const useGetEntries = (variables: GetEntriesVariables) => {
	const entriesRef = collection(db, 'users', variables.userId, COLLECTION)

	const getListsQuery = query(entriesRef, orderBy('createdAt', 'desc'))

	const firestoreQuery = useFirestoreQueryData(
		[COLLECTION, variables],
		getListsQuery,
		{
			idField: 'id',
			subscribe: true,
		},
		{
			cacheTime: Infinity,
			staleTime: Infinity,
		},
	)

	return { ...firestoreQuery, data: firestoreQuery.data as FinancialEntry[] }
}
