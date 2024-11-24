import { db } from '@/firebase'
import { FinancialEntry } from '@/lib/types/Entry.type'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useQuery } from 'react-query'

const COLLECTION = 'entries'

export interface GetEntriesVariables {
	userId: string
	monthYear: string
}

const fetchEntries = async (userId: string, monthYear: string) => {
	const entriesRef = collection(db, 'users', userId, COLLECTION)

	const q = query(
		entriesRef,
		where('monthYear', '==', monthYear),
		orderBy('createdAt', 'desc'),
	)

	const snapshot = await getDocs(q)
	return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as FinancialEntry[]
}

export const useGetEntries = (variables: GetEntriesVariables) => {
	const query = useQuery([COLLECTION, variables], () =>
		fetchEntries(variables.userId, variables.monthYear),
	)
	return { ...query, data: query.data }
}
