import { differenceInDays, isWithinDays } from "@/lib/utils/dates";
import { AppState, DocumentRecord, Item, ItemCategory } from "@/types";

export function getOverdueItems(items: Item[]) {
  return items.filter(
    (item) => item.dueDate && differenceInDays(item.dueDate, new Date()) < 0 && item.status !== "completed"
  );
}

export function getDueSoonItems(items: Item[]) {
  return items.filter((item) => isWithinDays(item.dueDate, 7) && item.status !== "completed");
}

export function getExpiringDocuments(documents: DocumentRecord[]) {
  return documents.filter((document) => isWithinDays(document.expirationDate, 30));
}

export function getCategoryCounts(items: Item[]) {
  return items.filter((item) => item.status !== "completed").reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<ItemCategory, number>
  );
}

export function getOwnerCounts(state: AppState) {
  return state.members.map((member) => ({
    memberId: member.id,
    displayName: member.displayName,
    count: state.items.filter((item) => item.ownerUserId === member.userId && item.status !== "completed").length
  }));
}

export function getWeeklyBriefing(state: AppState) {
  const dueThisWeek = getDueSoonItems(state.items);
  const overdue = getOverdueItems(state.items);
  const expiringDocuments = getExpiringDocuments(state.documents);

  return {
    dueThisWeek,
    overdue,
    expiringDocuments,
    ownerCounts: getOwnerCounts(state),
    categoryCounts: getCategoryCounts(state.items)
  };
}
