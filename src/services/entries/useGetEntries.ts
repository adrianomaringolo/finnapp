import { db } from '@/firebase'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, orderBy, query, where } from 'firebase/firestore'

const COLLECTION = 'entries'

export interface GetEntriesVariables {
	userId: string
	monthYear: string
}

export const useGetEntries = (variables: GetEntriesVariables) => {
	const entriesRef = collection(db, 'users', variables.userId, COLLECTION)

	const getListsQuery = query(
		entriesRef,
		where('monthYear', '==', variables.monthYear),
		orderBy('createdAt', 'desc'),
	)

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
