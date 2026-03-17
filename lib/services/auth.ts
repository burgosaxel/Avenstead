import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

import { auth } from "@/lib/firebase/client";
import { getReadableFirebaseError } from "@/lib/services/firebase-errors";

export function subscribeToAuthState(
  onValue: (user: FirebaseUser | null) => void,
  onError: (error: Error) => void
) {
  return onAuthStateChanged(auth, onValue, onError);
}

export async function signUpWithEmailPassword(input: {
  fullName: string;
  email: string;
  password: string;
}) {
  const credential = await createUserWithEmailAndPassword(auth, input.email, input.password);

  if (input.fullName.trim()) {
    await updateProfile(credential.user, { displayName: input.fullName.trim() });
  }

  return credential.user;
}

export async function logInWithEmailPassword(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logOut() {
  await signOut(auth);
}

export function getReadableAuthError(error: unknown) {
  if (error instanceof Error && "code" in error) {
    switch ((error as Error & { code?: string }).code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "That email or password did not match an account.";
      case "auth/email-already-in-use":
        return "An account with that email already exists. Try signing in instead.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Choose a stronger password with at least 6 characters.";
      case "auth/too-many-requests":
        return "Too many attempts were made. Please wait a moment and try again.";
      case "auth/operation-not-allowed":
        return "Email/password sign-in is not enabled in Firebase Authentication yet.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection and try again.";
      default:
        return getReadableFirebaseError(error);
    }
  }

  return getReadableFirebaseError(error);
}
