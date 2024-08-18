import { initializeApp } from "firebase/app"
import { browserLocalPersistence, getAuth } from "firebase/auth"
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MSID,
	appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

auth.setPersistence(browserLocalPersistence);

const functionsBridge = getFunctions(app);

export namespace functions {
	export const getReceiptUploadPresignUrl = httpsCallable<undefined, { presignedUrl: string; resourceName: string; }>(functionsBridge, 'getReceiptUploadPresignUrl', { timeout: 5000 })
}

export default app
