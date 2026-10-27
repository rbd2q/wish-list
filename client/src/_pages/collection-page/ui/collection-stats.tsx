interface CollectionStatsProps {
  wishCount: number;
  total?: string;
  highPriorityCount?: number;
}

export const CollectionStats = ({ wishCount, total, highPriorityCount }: CollectionStatsProps) => (
  <div
    className="mt-2 grid grid-cols-[auto_auto] justify-start gap-x-4 gap-y-1 text-xs leading-4 text-muted-foreground sm:flex sm:flex-wrap"
    role="status">
    <div className="min-h-4">
      {wishCount} {wishCount === 1 ? 'item' : 'items'}
    </div>
    <div className="min-h-4">
      Total: <strong className="font-medium text-foreground">{total ?? '—'}</strong>
    </div>
    <div className="min-h-4">
      High priority: <strong className="font-medium text-foreground">{highPriorityCount ?? '—'}</strong>
    </div>
  </div>
);
