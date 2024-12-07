import { db } from '@/firebase'
import { useFirestoreDocumentData } from '@react-query-firebase/firestore'
import { collection, doc } from 'firebase/firestore'

const COLLECTION = 'users'
const userRef = collection(db, COLLECTION)

export interface GetUserVariables {
	userId: string
}

export const useGetList = (variables: GetUserVariables) => {
	const getUserDoc = doc(userRef, variables.userId)

	const firestoreQuery = useFirestoreDocumentData(
		[COLLECTION, variables],
		getUserDoc,
		{
			idField: 'uid',
			subscribe: true,
		},
		{
			cacheTime: Infinity,
			staleTime: Infinity,
		},
	)

	return { ...firestoreQuery, data: firestoreQuery.data }
}
