import { doc, onSnapshot, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/client";
import { User } from "@/types";

export function buildUserProfile(input: {
  id: string;
  email: string;
  fullName: string;
  householdId: string | null;
}) {
  const now = new Date().toISOString();

  return {
    id: input.id,
    email: input.email,
    fullName: input.fullName,
    householdId: input.householdId,
    createdAt: now,
    updatedAt: now
  } satisfies User;
}

export function subscribeToUserProfile(
  uid: string,
  onValue: (user: User | null) => void,
  onError: (error: Error) => void
) {
  return onSnapshot(
    doc(db, "users", uid),
    (snapshot) => onValue(snapshot.exists() ? (snapshot.data() as User) : null),
    (error) => onError(error)
  );
}

export async function saveUserProfile(user: User) {
  await setDoc(doc(db, "users", user.id), user, { merge: true });
}
