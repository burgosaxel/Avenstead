import { DocumentCategory, ItemCategory } from "@/types";

export const ITEM_CATEGORIES: { value: ItemCategory; label: string; description: string }[] = [
  { value: "bills", label: "Bills", description: "Monthly payments, rent, utilities, and recurring costs." },
  { value: "home", label: "Home", description: "Repairs, maintenance, warranties, and home upkeep." },
  { value: "vehicle", label: "Vehicle", description: "Insurance, registration, inspection, and service." },
  { value: "health", label: "Health", description: "Appointments, paperwork, renewals, and care admin." },
  { value: "school", label: "School", description: "Forms, fees, deadlines, and recurring school needs." },
  { value: "family", label: "Family", description: "Shared household responsibilities and family logistics." },
  { value: "documents", label: "Documents", description: "Identity records, expirations, and linked paperwork." },
  { value: "subscriptions", label: "Subscriptions", description: "Recurring services and membership renewals." },
  { value: "chores", label: "Chores", description: "Routine upkeep that keeps daily life running smoothly." }
];

export const DOCUMENT_CATEGORIES: { value: DocumentCategory; label: string }[] = [
  { value: "insurance", label: "Insurance" },
  { value: "vehicle", label: "Vehicle" },
  { value: "medical", label: "Medical" },
  { value: "school", label: "School" },
  { value: "warranty", label: "Warranty" },
  { value: "home", label: "Home" },
  { value: "identity", label: "Identity" },
  { value: "other", label: "Other" }
];

export const HOUSEHOLD_TYPE_OPTIONS = [
  { value: "individual", label: "Just me" },
  { value: "couple", label: "Couple" },
  { value: "family", label: "Family" },
  { value: "caregiver", label: "Caregiver" }
] as const;
