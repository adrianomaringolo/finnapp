import { db } from '@/firebase'
import { User } from '@/lib/types/User.type'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useQuery } from 'react-query'

const COLLECTION = 'users'

const fetchUsers = async () => {
	const usersRef = collection(db, COLLECTION)

	const q = query(usersRef, orderBy('displayName', 'asc'))

	const snapshot = await getDocs(q)
	return snapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id })) as User[]
}

export const useGetUsers = () => {
	const query = useQuery([COLLECTION], () => fetchUsers())
	return { ...query, data: query.data }
}
