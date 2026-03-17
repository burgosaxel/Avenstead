import { Card } from "@/components/ui/card";

export function DashboardStatCard({
  label,
  value,
  tone = "default",
  detail,
  href
}: {
  label: string;
  value: string | number;
  tone?: "default" | "positive" | "warning" | "danger";
  detail?: string;
  href?: string;
}) {
  return (
    <Card className="space-y-3">
      <p className="text-sm font-medium text-ink-600">{label}</p>
      <div className="flex items-end justify-between gap-4">
        {href ? (
          <a
            href={href}
            className={[
              "text-3xl font-semibold tracking-tight hover:underline",
              tone === "positive" && "text-moss",
              tone === "warning" && "text-amber",
              tone === "danger" && "text-rose",
              tone === "default" && "text-ink-900"
            ].join(" ")}
          >
            {value}
          </a>
        ) : (
          <p
            className={[
              "text-3xl font-semibold tracking-tight",
              tone === "positive" && "text-moss",
              tone === "warning" && "text-amber",
              tone === "danger" && "text-rose",
              tone === "default" && "text-ink-900"
            ].join(" ")}
          >
            {value}
          </p>
        )}
        {detail ? <p className="text-right text-xs text-ink-500">{detail}</p> : null}
      </div>
    </Card>
  );
}
