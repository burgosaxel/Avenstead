import { Template } from "@/types";

export const STARTER_TEMPLATES: Template[] = [
  {
    id: "rent-mortgage",
    title: "Rent or mortgage",
    category: "bills",
    defaultRecurrenceType: "monthly",
    defaultReminderOffsets: [7, 3, 1],
    suggestedDescription: "Keep your primary housing payment on a predictable rhythm.",
    suggestedDueOffsetDays: 5,
    suggestedNote: "Add your payment method, autopay status, or landlord portal details."
  },
  {
    id: "electricity-bill",
    title: "Electricity bill",
    category: "bills",
    defaultRecurrenceType: "monthly",
    defaultReminderOffsets: [5, 2],
    suggestedDescription: "Avoid late fees and keep utility payments easy to review.",
    suggestedDueOffsetDays: 6,
    suggestedNote: "Include account number and whether the bill amount varies each month."
  },
  {
    id: "internet-bill",
    title: "Internet bill",
    category: "bills",
    defaultRecurrenceType: "monthly",
    defaultReminderOffsets: [5, 1],
    suggestedDescription: "Track a monthly service bill that quietly becomes urgent if missed.",
    suggestedDueOffsetDays: 8,
    suggestedNote: "Note the provider login or contract renewal details."
  },
  {
    id: "car-insurance",
    title: "Car insurance renewal",
    category: "vehicle",
    defaultRecurrenceType: "yearly",
    defaultReminderOffsets: [30, 14, 7],
    suggestedDescription: "Stay ahead of renewal paperwork and premium changes.",
    suggestedDueOffsetDays: 30,
    suggestedNote: "Attach your current policy and add a note about comparison shopping before renewal."
  },
  {
    id: "car-registration",
    title: "Car registration renewal",
    category: "vehicle",
    defaultRecurrenceType: "yearly",
    defaultReminderOffsets: [45, 14, 3],
    suggestedDescription: "Catch state registration before the deadline sneaks up.",
    suggestedDueOffsetDays: 45,
    suggestedNote: "Include plate number, VIN, or DMV login details."
  },
  {
    id: "vehicle-inspection",
    title: "Vehicle inspection",
    category: "vehicle",
    defaultRecurrenceType: "yearly",
    defaultReminderOffsets: [30, 7],
    suggestedDescription: "Keep compliance tasks visible before they become a rush job.",
    suggestedDueOffsetDays: 21,
    suggestedNote: "Add the local inspection location or prep checklist."
  },
  {
    id: "hvac-filter",
    title: "HVAC filter replacement",
    category: "home",
    defaultRecurrenceType: "quarterly",
    defaultReminderOffsets: [7, 1],
    suggestedDescription: "A simple maintenance task that helps prevent bigger issues.",
    suggestedDueOffsetDays: 14,
    suggestedNote: "Record the filter size so replacements are easy to buy."
  },
  {
    id: "school-form",
    title: "School form deadline",
    category: "school",
    defaultRecurrenceType: "yearly",
    defaultReminderOffsets: [14, 7, 2],
    suggestedDescription: "Keep paperwork visible before it gets buried in backpacks or inboxes.",
    suggestedDueOffsetDays: 7,
    suggestedNote: "Add the child name, teacher, or where the paper usually arrives from."
  },
  {
    id: "pediatric-appointment",
    title: "Pediatric appointment",
    category: "health",
    defaultRecurrenceType: "yearly",
    defaultReminderOffsets: [14, 3],
    suggestedDescription: "Track routine health admin alongside the supporting documents.",
    suggestedDueOffsetDays: 18,
    suggestedNote: "Attach the insurance card and note any forms to complete before the visit."
  },
  {
    id: "streaming-subscription",
    title: "Streaming subscription",
    category: "subscriptions",
    defaultRecurrenceType: "monthly",
    defaultReminderOffsets: [2],
    suggestedDescription: "Keep recurring subscriptions visible so they stay intentional.",
    suggestedDueOffsetDays: 4,
    suggestedNote: "Add the service login or cancellation deadline if billing changes."
  }
];
