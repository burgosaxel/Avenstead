import { addDays, toIsoDate } from "@/lib/utils/dates";
import { AppState, DocumentRecord, Household, HouseholdMember, Item, NotificationRecord, User } from "@/types";

const now = new Date("2026-03-16T09:00:00.000Z");

function item(partial: Partial<Item> & Pick<Item, "id" | "title" | "category" | "dueDate" | "recurrenceType">): Item {
  return {
    householdId: "household-avenstead-demo",
    description: "",
    status: "active",
    ownerUserId: "user-1",
    reminderOffsets: [7, 2],
    note: "",
    attachmentIds: [],
    lastCompletedAt: null,
    completedAt: null,
    nextDueDate: partial.dueDate,
    createdBy: "user-1",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    recurrenceInterval: 1,
    completionHistory: [],
    ...partial
  };
}

function document(partial: Partial<DocumentRecord> & Pick<DocumentRecord, "id" | "title" | "category">): DocumentRecord {
  return {
    householdId: "household-avenstead-demo",
    fileUrl: "#",
    filePath: `households/household-avenstead-demo/documents/${partial.id}/placeholder.pdf`,
    mimeType: "application/pdf",
    linkedItemId: null,
    expirationDate: null,
    uploadedBy: "user-1",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    ...partial
  };
}

const user: User = {
  id: "user-1",
  email: "alex@avenstead.demo",
  fullName: "Alex Morgan",
  householdId: "household-avenstead-demo",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString()
};

const household: Household = {
  id: "household-avenstead-demo",
  name: "Morgan Household",
  type: "family",
  createdBy: "user-1",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString()
};

const members: HouseholdMember[] = [
  {
    id: "member-1",
    householdId: household.id,
    userId: "user-1",
    role: "owner",
    displayName: "Alex Morgan",
    email: "alex@avenstead.demo",
    status: "active",
    createdAt: now.toISOString()
  },
  {
    id: "member-2",
    householdId: household.id,
    userId: null,
    role: "adult",
    displayName: "Jordan Morgan",
    email: "jordan@example.com",
    status: "invited",
    createdAt: now.toISOString()
  }
];

const items: Item[] = [
  item({
    id: "item-1",
    title: "Rent payment",
    category: "bills",
    dueDate: toIsoDate(addDays(now, 2)),
    recurrenceType: "monthly",
    description: "Main monthly housing payment.",
    reminderOffsets: [7, 3, 1]
  }),
  item({
    id: "item-2",
    title: "Electric bill",
    category: "bills",
    dueDate: toIsoDate(addDays(now, 5)),
    recurrenceType: "monthly",
    description: "Utility payment from the power provider."
  }),
  item({
    id: "item-3",
    title: "Car registration renewal",
    category: "vehicle",
    dueDate: toIsoDate(addDays(now, -3)),
    recurrenceType: "yearly",
    status: "overdue",
    description: "State registration deadline for the family car.",
    attachmentIds: ["doc-2"]
  }),
  item({
    id: "item-4",
    title: "HVAC filter replacement",
    category: "home",
    dueDate: toIsoDate(addDays(now, 6)),
    recurrenceType: "quarterly",
    description: "Replace filter for the downstairs unit."
  }),
  item({
    id: "item-5",
    title: "School permission slip",
    category: "school",
    dueDate: toIsoDate(addDays(now, 1)),
    recurrenceType: "none",
    ownerUserId: null,
    description: "Sign and return by Friday.",
    attachmentIds: ["doc-3"]
  }),
  item({
    id: "item-6",
    title: "Pediatric annual checkup",
    category: "health",
    dueDate: toIsoDate(addDays(now, 18)),
    recurrenceType: "yearly",
    description: "Confirm appointment and update insurance card."
  }),
  item({
    id: "item-7",
    title: "Streaming subscription review",
    category: "subscriptions",
    dueDate: toIsoDate(addDays(now, 4)),
    recurrenceType: "monthly",
    description: "Decide whether to keep or pause this month."
  }),
  item({
    id: "item-8",
    title: "Kitchen deep clean",
    category: "chores",
    dueDate: toIsoDate(addDays(now, 3)),
    recurrenceType: "weekly",
    ownerUserId: null,
    description: "Shared weekly reset task."
  })
];

const documents: DocumentRecord[] = [
  document({
    id: "doc-1",
    title: "Home warranty coverage",
    category: "warranty",
    linkedItemId: "item-4",
    expirationDate: toIsoDate(addDays(now, 28))
  }),
  document({
    id: "doc-2",
    title: "Vehicle registration card",
    category: "vehicle",
    linkedItemId: "item-3",
    expirationDate: toIsoDate(addDays(now, 10))
  }),
  document({
    id: "doc-3",
    title: "Spring field trip packet",
    category: "school",
    linkedItemId: "item-5",
    expirationDate: toIsoDate(addDays(now, 1))
  }),
  document({
    id: "doc-4",
    title: "Insurance card",
    category: "insurance",
    linkedItemId: "item-6",
    expirationDate: toIsoDate(addDays(now, 40))
  })
];

const notifications: NotificationRecord[] = [
  {
    id: "notification-1",
    householdId: household.id,
    userId: user.id,
    itemId: "item-1",
    type: "reminder",
    scheduledFor: toIsoDate(addDays(now, 1)),
    sentAt: null,
    status: "pending",
    channel: "in_app",
    createdAt: now.toISOString()
  }
];

export const DEFAULT_APP_STATE: AppState = {
  user,
  household,
  members,
  items,
  documents,
  notifications,
  activityLog: [],
  settings: {
    reminderLeadDays: [7, 2, 1],
    weeklySummaryEnabled: true,
    weeklySummaryDay: 0,
    householdName: household.name
  },
  onboardingCompleted: true
};

export const EMPTY_APP_STATE: AppState = {
  user: {
    id: "",
    email: "",
    fullName: "Avenstead User",
    householdId: null,
    createdAt: "",
    updatedAt: ""
  },
  household: null,
  members: [],
  items: [],
  documents: [],
  notifications: [],
  activityLog: [],
  settings: {
    reminderLeadDays: [7, 2, 1],
    weeklySummaryEnabled: true,
    weeklySummaryDay: 0,
    householdName: ""
  },
  onboardingCompleted: false
};
