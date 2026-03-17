import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/client";
import { computeNextDueDate } from "@/lib/utils/recurrence";
import { Item, ItemFormInput } from "@/types";

export function buildItemFromForm(input: ItemFormInput, householdId: string, createdBy: string): Item {
  const now = new Date().toISOString();
  const nextDueDate = computeNextDueDate(input.dueDate, input.recurrenceType);

  return {
    id: crypto.randomUUID(),
    householdId,
    title: input.title,
    description: input.description,
    category: input.category,
    status: "active",
    ownerUserId: input.ownerUserId,
    dueDate: input.dueDate,
    recurrenceType: input.recurrenceType,
    recurrenceInterval: 1,
    reminderOffsets: input.reminderOffsets,
    note: input.note,
    attachmentIds: input.attachmentIds ?? [],
    lastCompletedAt: null,
    completedAt: null,
    nextDueDate: nextDueDate ?? input.dueDate,
    createdBy,
    createdAt: now,
    updatedAt: now,
    completionHistory: []
  };
}

export function completeItem(item: Item, actorUserId: string): Item {
  const completedAt = new Date().toISOString();
  const nextDueDate = computeNextDueDate(item.dueDate, item.recurrenceType, item.recurrenceInterval);
  const isRecurring = item.recurrenceType !== "none" && Boolean(item.dueDate);

  return {
    ...item,
    status: isRecurring ? "active" : "completed",
    lastCompletedAt: completedAt,
    completedAt: isRecurring ? null : completedAt,
    dueDate: nextDueDate ?? item.dueDate,
    nextDueDate,
    updatedAt: completedAt,
    completionHistory: [
      {
        id: crypto.randomUUID(),
        completedAt,
        completedBy: actorUserId,
        previousDueDate: item.dueDate
      },
      ...item.completionHistory
    ]
  };
}

export function subscribeToItems(
  householdId: string,
  onValue: (items: Item[]) => void,
  onError: (error: Error) => void
) {
  return onSnapshot(
    query(collection(db, "items"), where("householdId", "==", householdId)),
    (snapshot) =>
      onValue(
        snapshot.docs
          .map((entry) => entry.data() as Item)
          .sort((a, b) => {
            if (!a.dueDate && !b.dueDate) return a.title.localeCompare(b.title);
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          })
      ),
    (error) => onError(error)
  );
}

export async function createItemRecord(input: ItemFormInput, householdId: string, createdBy: string) {
  const item = buildItemFromForm(input, householdId, createdBy);
  await setDoc(doc(db, "items", item.id), item);
}

export async function updateItemRecord(itemId: string, updates: Partial<Item>) {
  await updateDoc(doc(db, "items", itemId), {
    ...updates,
    updatedAt: new Date().toISOString()
  });
}

export async function markItemCompleteRecord(item: Item, actorUserId: string) {
  const next = completeItem(item, actorUserId);
  await setDoc(doc(db, "items", item.id), next);
}
