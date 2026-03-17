import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
  writeBatch
} from "firebase/firestore";

import { db } from "@/lib/firebase/client";
import { createItemsFromTemplateSelection } from "@/lib/services/templates";
import { buildUserProfile } from "@/lib/services/users";
import { Household, HouseholdMember, HouseholdType } from "@/types";

export function buildHousehold(name: string, type: HouseholdType, createdBy: string): Household {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name,
    type,
    createdBy,
    createdAt: now,
    updatedAt: now
  };
}

export function buildHouseholdOwnerMember(householdId: string, userId: string, email: string, displayName: string): HouseholdMember {
  return {
    id: `${userId}_${householdId}`,
    householdId,
    userId,
    role: "owner",
    displayName,
    email,
    status: "active",
    createdAt: new Date().toISOString()
  };
}

export function subscribeToHousehold(
  householdId: string,
  onValue: (household: Household | null) => void,
  onError: (error: Error) => void
) {
  return onSnapshot(
    doc(db, "households", householdId),
    (snapshot) => onValue(snapshot.exists() ? (snapshot.data() as Household) : null),
    (error) => onError(error)
  );
}

export function subscribeToHouseholdMembers(
  householdId: string,
  onValue: (members: HouseholdMember[]) => void,
  onError: (error: Error) => void
) {
  return onSnapshot(
    query(collection(db, "householdMembers"), where("householdId", "==", householdId)),
    (snapshot) => onValue(snapshot.docs.map((entry) => entry.data() as HouseholdMember)),
    (error) => onError(error)
  );
}

export async function createHouseholdSetup(input: {
  uid: string;
  email: string;
  fullName: string;
  householdName: string;
  householdType: HouseholdType;
  inviteEmail?: string;
  selectedTemplateGroups: string[];
}) {
  const householdRef = doc(collection(db, "households"));
  const household = buildHousehold(input.householdName, input.householdType, input.uid);
  const owner = buildHouseholdOwnerMember(householdRef.id, input.uid, input.email, input.fullName);
  const userProfile = buildUserProfile({
    id: input.uid,
    email: input.email,
    fullName: input.fullName,
    householdId: householdRef.id
  });
  const seededItems = createItemsFromTemplateSelection(
    input.selectedTemplateGroups,
    householdRef.id,
    input.uid
  );

  const batch = writeBatch(db);
  batch.set(householdRef, { ...household, id: householdRef.id });
  batch.set(doc(db, "users", input.uid), userProfile);
  batch.set(doc(db, "householdMembers", owner.id), { ...owner, householdId: householdRef.id });

  if (input.inviteEmail?.trim()) {
    const invitedMemberRef = doc(collection(db, "householdMembers"));
    batch.set(invitedMemberRef, {
      id: invitedMemberRef.id,
      householdId: householdRef.id,
      userId: null,
      role: "adult",
      displayName: input.inviteEmail.split("@")[0],
      email: input.inviteEmail.trim(),
      status: "invited",
      createdAt: new Date().toISOString()
    });
  }

  await batch.commit();

  if (seededItems.length > 0) {
    const itemsBatch = writeBatch(db);

    seededItems.forEach((item) => {
      const itemRef = doc(collection(db, "items"));
      itemsBatch.set(itemRef, { ...item, id: itemRef.id, householdId: householdRef.id });
    });

    await itemsBatch.commit();
  }
}
