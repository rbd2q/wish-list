import { Lightbulb } from 'lucide-react';

export const IdeasEmptyState = () => (
  <div role="status" className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
    <Lightbulb className="mx-auto mb-4 text-muted-foreground" size={32} aria-hidden="true" />
    <h2 className="text-lg font-semibold">A little inspiration is on its way</h2>
    <p className="mt-2 text-sm text-muted-foreground">Public wishes from other people will appear here.</p>
  </div>
);
