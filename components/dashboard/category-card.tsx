import { Card } from "@/components/ui/card";

export function CategoryCard({
  label,
  count,
  description,
  href
}: {
  label: string;
  count: number;
  description: string;
  href?: string;
}) {
  return (
    <Card className="space-y-2">
      <p className="text-sm font-medium text-ink-600">{label}</p>
      {href ? (
        <a href={href} className="text-2xl font-semibold text-ink-900 hover:underline">
          {count}
        </a>
      ) : (
        <p className="text-2xl font-semibold text-ink-900">{count}</p>
      )}
      <p className="text-sm leading-6 text-ink-500">{description}</p>
    </Card>
  );
}
