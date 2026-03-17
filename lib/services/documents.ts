import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from "@/lib/firebase/client";
import { DocumentFormInput, DocumentRecord } from "@/types";

export function buildDocumentFromForm(input: DocumentFormInput, householdId: string, uploadedBy: string): DocumentRecord {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  return {
    id,
    householdId,
    title: input.title,
    category: input.category,
    fileUrl: "#",
    filePath: `households/${householdId}/documents/${id}/${input.title.replaceAll(" ", "-").toLowerCase()}.pdf`,
    mimeType: "application/pdf",
    linkedItemId: input.linkedItemId,
    expirationDate: input.expirationDate,
    uploadedBy,
    createdAt: now,
    updatedAt: now
  };
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
}

export function subscribeToDocuments(
  householdId: string,
  onValue: (documents: DocumentRecord[]) => void,
  onError: (error: Error) => void
) {
  return onSnapshot(
    query(collection(db, "documents"), where("householdId", "==", householdId)),
    (snapshot) =>
      onValue(
        snapshot.docs
          .map((entry) => entry.data() as DocumentRecord)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      ),
    (error) => onError(error)
  );
}

export async function uploadDocumentRecord(input: DocumentFormInput, householdId: string, uploadedBy: string) {
  if (!input.file) {
    throw new Error("Please choose a file to upload.");
  }

  const documentRef = doc(collection(db, "documents"));
  const filePath = `households/${householdId}/documents/${input.category}/${documentRef.id}/${sanitizeFilename(input.file.name)}`;
  const storageRef = ref(storage, filePath);
  await uploadBytes(storageRef, input.file);
  const fileUrl = await getDownloadURL(storageRef);
  const now = new Date().toISOString();

  const record: DocumentRecord = {
    id: documentRef.id,
    householdId,
    title: input.title,
    category: input.category,
    fileUrl,
    filePath,
    mimeType: input.file.type || "application/octet-stream",
    linkedItemId: input.linkedItemId,
    expirationDate: input.expirationDate,
    uploadedBy,
    createdAt: now,
    updatedAt: now
  };

  await setDoc(documentRef, record);
  return record;
}
