import clsx from 'clsx';

import { WishlistSection } from '../../enums';

interface Props {
  section: WishlistSection;
  onSectionChange: (section: WishlistSection) => void;
  activeCount: number;
  completedCount: number;
  isUnavailable: boolean;
}

export const WishlistStatus = ({ section, onSectionChange, activeCount, completedCount, isUnavailable }: Props) => (
  <div className="flex w-fit gap-1 rounded-xl bg-surface-secondary p-1" aria-label="Wish status">
    {Object.values(WishlistSection).map((value) => (
      <button
        key={value}
        type="button"
        aria-pressed={section === value}
        onClick={() => onSectionChange(value)}
        className={clsx(
          'min-h-10 rounded-lg px-4 text-sm',
          section === value ? 'bg-surface font-medium shadow-sm' : 'text-muted-foreground',
        )}
      >
        {value === WishlistSection.ACTIVE ? 'Active' : 'Completed'} (
        {isUnavailable ? '…' : value === WishlistSection.ACTIVE ? activeCount : completedCount})
      </button>
    ))}
  </div>
);
