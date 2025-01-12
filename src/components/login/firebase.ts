import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

const alertFirebaseError = (error: { code: string }, notifications: any) => {
  if (error.code === "auth/account-exists-with-different-credential") {
    notifications.showNotification({
      color: "red",
      message:
        "There is already an account registered with this email address!",
    });
  }
};

const loginWithGoogle = (notifications: any) => {
  try {
    signInWithPopup(auth, googleAuthProvider);
  } catch (e: any) {
    alertFirebaseError(e, notifications);
  }
};

const loginWithGithub = async (notifications: any) => {
  try {
    await signInWithPopup(auth, githubAuthProvider);
  } catch (e: any) {
    alertFirebaseError(e, notifications);
  }
};

const logout = () => signOut(auth);

export {
  loginWithGoogle,
  loginWithGithub,
  logout,
  getAuth,
  onAuthStateChanged,
  googleAuthProvider,
  database as default,
};
