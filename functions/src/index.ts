import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

// Initialize Firebase Admin SDK
admin.initializeApp()

// Reference Firestore
const db = admin.firestore()

// Cloud Function triggered on new user signup
export const createUserDocument = functions.auth.user().onCreate(async (user) => {
	const { uid, email, displayName, photoURL } = user

	// Create user document in Firestore
	const userDoc = {
		uid,
		email: email || null,
		displayName: displayName || 'Anonymous',
		photoURL: photoURL || null,
		createdAt: admin.firestore.FieldValue.serverTimestamp(),
	}

	try {
		await db.collection('users').doc(uid).set(userDoc)
		console.log(`User document created for UID: ${uid}`)
	} catch (error) {
		console.error(`Error creating user document for UID: ${uid}`, error)
	}
})
