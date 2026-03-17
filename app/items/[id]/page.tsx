import { notFound } from "next/navigation";

import { ItemDetailView } from "@/components/items/item-detail-view";

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return notFound();
  return <ItemDetailView id={id} />;
}
