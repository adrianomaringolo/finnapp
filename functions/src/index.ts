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

export const setAdminClaim = functions.https.onCall(async (data /*, context*/) => {
	// Check if the request is authenticated and the caller is an admin
	// if (!context.auth?.token.admin) {
	//   throw new functions.https.HttpsError(
	//     "permission-denied",
	//     "Only administrators can set admin claims."
	//   );
	// }

	const { uid } = data

	if (!uid) {
		throw new functions.https.HttpsError(
			'invalid-argument',
			'The function must be called with a valid user ID.',
		)
	}

	try {
		// Add 'admin' custom claim to the specified user
		await admin.auth().setCustomUserClaims(uid, { admin: true })
		return { message: `Admin claim successfully added to user: ${uid}` }
	} catch (error) {
		console.error('Error setting admin claim:', error)
		throw new functions.https.HttpsError('internal', 'Failed to set admin claim.')
	}
})

export const getUserClaims = functions.https.onCall(async (data) => {
	const { uid } = data

	if (!uid) {
		throw new functions.https.HttpsError(
			'invalid-argument',
			'The function must be called with a valid user ID.',
		)
	}

	try {
		// Get the user's authentication record
		const userRecord = await admin.auth().getUser(uid)

		// Return the user's custom claims
		return { claims: userRecord.customClaims || {} }
	} catch (error) {
		console.error('Error retrieving user claims:', error)
		throw new functions.https.HttpsError('internal', 'Failed to retrieve user claims.')
	}
})
