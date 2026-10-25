export const CollectionFormSkeleton = () => (
  <div role="status" aria-label="Loading collection" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
    <div className="space-y-5 motion-safe:animate-pulse">
      <div className="h-72 rounded-2xl bg-surface-secondary" />
      <div className="h-60 rounded-2xl bg-surface-secondary" />
      <div className="h-28 rounded-2xl bg-surface-secondary" />
    </div>
    <div className="h-80 rounded-2xl bg-surface-secondary motion-safe:animate-pulse" />
    <span className="sr-only">Loading collection…</span>
  </div>
);
