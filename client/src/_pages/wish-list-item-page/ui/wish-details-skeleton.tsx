export const WishDetailsSkeleton = () => (
  <div role="status" className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
    <span className="sr-only">Loading wish…</span>
    <div className="aspect-square animate-pulse rounded-2xl border border-border bg-surface-secondary" />
    <div aria-hidden="true" className="space-y-6">
      <div className="h-9 w-4/5 animate-pulse rounded bg-surface-secondary" />
      <div className="h-8 w-1/3 animate-pulse rounded bg-surface-secondary" />
      <div className="h-28 animate-pulse rounded bg-surface-secondary" />
      <div className="h-12 animate-pulse rounded-xl bg-surface-secondary" />
    </div>
  </div>
);
