// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA-gJO1ARG3eQixpk-xW88KjT9kGYaleTw",
	authDomain: "loginapp-70.firebaseapp.com",
	projectId: "loginapp-70",
	storageBucket: "loginapp-70.firebasestorage.app",
	messagingSenderId: "853972326817",
	appId: "1:853972326817:web:a3ca49e9564289f29493e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		return user;
	} catch (error) {
		console.error("Error during sign-in:", error);
		return null;
	}
};

export const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error("Error during logout:", error);
	}
};
