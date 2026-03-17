export type HouseholdType = "individual" | "couple" | "family" | "caregiver";
export type HouseholdRole = "owner" | "adult" | "member";
export type MemberStatus = "active" | "invited";
export type ItemCategory =
  | "bills"
  | "subscriptions"
  | "home"
  | "vehicle"
  | "health"
  | "school"
  | "family"
  | "documents"
  | "chores";
export type ItemStatus = "active" | "completed" | "overdue" | "archived";
export type RecurrenceType =
  | "none"
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly"
  | "custom";
export type DocumentCategory =
  | "insurance"
  | "vehicle"
  | "medical"
  | "school"
  | "warranty"
  | "home"
  | "identity"
  | "other";
export type NotificationType = "reminder" | "weekly_summary" | "document_expiry";
export type NotificationStatus = "pending" | "sent" | "failed";
export type NotificationChannel = "email" | "push" | "in_app";

export interface User {
  id: string;
  email: string;
  fullName: string;
  householdId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Household {
  id: string;
  name: string;
  type: HouseholdType;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface HouseholdMember {
  id: string;
  householdId: string;
  userId: string | null;
  role: HouseholdRole;
  displayName: string;
  email: string;
  status: MemberStatus;
  createdAt: string;
}

export interface ItemCompletionEntry {
  id: string;
  completedAt: string;
  completedBy: string;
  previousDueDate: string | null;
  note?: string;
}

export interface Item {
  id: string;
  householdId: string;
  title: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  ownerUserId: string | null;
  dueDate: string | null;
  recurrenceType: RecurrenceType;
  recurrenceInterval?: number;
  reminderOffsets: number[];
  note?: string;
  attachmentIds: string[];
  lastCompletedAt: string | null;
  completedAt: string | null;
  nextDueDate: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  completionHistory: ItemCompletionEntry[];
}

export interface DocumentRecord {
  id: string;
  householdId: string;
  title: string;
  category: DocumentCategory;
  fileUrl: string;
  filePath: string;
  mimeType: string;
  linkedItemId: string | null;
  expirationDate: string | null;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationRecord {
  id: string;
  householdId: string;
  userId: string;
  itemId: string | null;
  type: NotificationType;
  scheduledFor: string;
  sentAt: string | null;
  status: NotificationStatus;
  channel: NotificationChannel;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  householdId: string;
  actorUserId: string;
  entityType: "item" | "document" | "member";
  entityId: string;
  action: string;
  createdAt: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface Template {
  id: string;
  title: string;
  category: ItemCategory;
  defaultRecurrenceType: RecurrenceType;
  defaultReminderOffsets: number[];
  suggestedDescription: string;
  suggestedDueOffsetDays?: number | null;
  suggestedNote?: string;
}

export interface AppSettings {
  reminderLeadDays: number[];
  weeklySummaryEnabled: boolean;
  weeklySummaryDay: number;
  householdName: string;
}

export interface AppState {
  user: User;
  household: Household | null;
  members: HouseholdMember[];
  items: Item[];
  documents: DocumentRecord[];
  notifications: NotificationRecord[];
  activityLog: ActivityLog[];
  settings: AppSettings;
  onboardingCompleted: boolean;
}

export interface ItemFormInput {
  title: string;
  description: string;
  category: ItemCategory;
  dueDate: string | null;
  recurrenceType: RecurrenceType;
  ownerUserId: string | null;
  reminderOffsets: number[];
  note?: string;
  attachmentIds?: string[];
}

export interface DocumentFormInput {
  title: string;
  category: DocumentCategory;
  linkedItemId: string | null;
  expirationDate: string | null;
  file: File | null;
}
