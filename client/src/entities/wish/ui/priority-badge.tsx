import { WishPriority } from '../model';

interface PriorityBadgeProps {
  priority: WishPriority;
}

const priorityBadges: Record<WishPriority, { label: string; className: string }> = {
  [WishPriority.LOW]: { label: 'Low', className: 'bg-slate-100 text-slate-700' },
  [WishPriority.MEDIUM]: { label: 'Medium', className: 'bg-amber-100 text-amber-800' },
  [WishPriority.HIGH]: { label: 'High', className: 'bg-rose-100 text-rose-800' },
};

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const { label, className } = priorityBadges[priority];

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${className}`}>{label} priority</span>
  );
};
