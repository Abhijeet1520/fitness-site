import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Add user to firestore
  // Here you can add code to add the user to Firestore

    return user;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
    const user = auth.currentUser;
    if (user) {
        return updatePassword(user, password);
    }
    // Handle the case when auth.currentUser is null
    // For example, you can throw an error or return a rejected promise
    throw new Error("User is not authenticated.");
};

export const doSendEmailVerification = () => {
    const user = auth.currentUser;
    if (user) {
        return sendEmailVerification(user, {
            url: `${window.location.origin}/home`,
        });
    }
    throw new Error("User is not authenticated.");
};
