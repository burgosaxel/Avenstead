export function LoadingState({ label = "Loading Avenstead..." }: { label?: string }) {
  return (
    <div className="flex min-h-[240px] items-center justify-center rounded-xl2 border border-border bg-white/80">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-ink-200 border-t-ink-700" />
        <p className="text-sm text-ink-600">{label}</p>
      </div>
    </div>
  );
}
