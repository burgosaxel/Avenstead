import { STARTER_TEMPLATES } from "@/lib/constants/templates";
import { addDays, toIsoDate } from "@/lib/utils/dates";
import { Item, ItemCategory, Template } from "@/types";

const TEMPLATE_GROUPS: Record<string, string[]> = {
  bills: ["rent-mortgage", "electricity-bill", "internet-bill"],
  subscriptions: ["streaming-subscription"],
  vehicle: ["car-insurance", "car-registration", "vehicle-inspection"],
  home: ["hvac-filter"],
  school: ["school-form"],
  health: ["pediatric-appointment"],
  documents: [],
  chores: [],
  family: []
};

export function getStarterTemplates() {
  return STARTER_TEMPLATES;
}

export function buildTemplateInitialValues(template: Template) {
  const dueDate =
    template.suggestedDueOffsetDays == null
      ? null
      : toIsoDate(addDays(new Date(), template.suggestedDueOffsetDays));

  return {
    title: template.title,
    description: template.suggestedDescription,
    category: template.category,
    recurrenceType: template.defaultRecurrenceType,
    reminderOffsets: template.defaultReminderOffsets,
    dueDate,
    note: template.suggestedNote ?? ""
  };
}

export function getTemplatesForCategory(category: string) {
  const ids = TEMPLATE_GROUPS[category] ?? [];
  return STARTER_TEMPLATES.filter((template) => ids.includes(template.id));
}

export function createItemsFromTemplateSelection(
  templateCategoryIds: string[],
  householdId: string,
  createdBy: string
) {
  const templates = templateCategoryIds.flatMap((categoryId) => getTemplatesForCategory(categoryId));

  return templates.map((template, index) => seedItemFromTemplate(template, householdId, createdBy, index));
}

function seedItemFromTemplate(
  template: Template,
  householdId: string,
  createdBy: string,
  index: number
): Item {
  const dueOffsets: Record<ItemCategory, number> = {
    bills: 5,
    subscriptions: 6,
    home: 10,
    vehicle: 21,
    health: 18,
    school: 7,
    family: 8,
    documents: 12,
    chores: 3
  };

  const dueDate = toIsoDate(
    addDays(new Date(), (template.suggestedDueOffsetDays ?? dueOffsets[template.category]) + index)
  );

  return {
    id: `seed-${template.id}-${index}`,
    householdId,
    title: template.title,
    description: template.suggestedDescription,
    category: template.category,
    status: "active",
    ownerUserId: createdBy,
    dueDate,
    recurrenceType: template.defaultRecurrenceType,
    recurrenceInterval: 1,
    reminderOffsets: template.defaultReminderOffsets,
    note: template.suggestedNote ?? "",
    attachmentIds: [],
    lastCompletedAt: null,
    completedAt: null,
    nextDueDate: dueDate,
    createdBy,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completionHistory: []
  };
}
