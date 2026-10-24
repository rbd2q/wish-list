import clsx from 'clsx';
import { Check, Pencil, RotateCcw, Trash2 } from 'lucide-react';

import type { WishListItemType } from '@/entities/wish';
import { navigationConfig } from '@/shared/config/navigation';
import { Button } from '@/shared/ui/button';
import { ButtonLink } from '@/shared/ui/button-link';

import { useDeleteItem, useMarkAsCompleted, useRestoreWish } from '../api';

export enum WishOwnerActionsVariant {
  DEFAULT = 'default',
  COMPACT = 'compact',
}

interface WishOwnerActionsProps {
  wish: WishListItemType;
  variant?: WishOwnerActionsVariant;
  onDeleted?: () => void;
}

export const WishOwnerActions = ({
  wish,
  variant = WishOwnerActionsVariant.DEFAULT,
  onDeleted,
}: WishOwnerActionsProps) => {
  const { mutate: deleteWish, isPending: isDeleting } = useDeleteItem();
  const { mutate: completeWish, isPending: isCompleting } = useMarkAsCompleted();
  const { mutate: restoreWish, isPending: isRestoring } = useRestoreWish();

  const isPending = isDeleting || isCompleting || isRestoring;
  const isCompact = variant === WishOwnerActionsVariant.COMPACT;
  const completionLabel = wish.isCompleted ? 'Restore wish' : 'Mark as completed';
  const completionAccessibleLabel = `${wish.isCompleted ? 'Restore' : 'Complete'} ${wish.title}`;

  const handleDelete = () => {
    deleteWish(wish.id, { onSuccess: onDeleted });
  };
  const handleComplete = () => completeWish(wish.id);
  const handleRestore = () => restoreWish(wish.id);

  return (
    <div className={clsx('flex', isCompact ? 'shrink-0 items-center gap-2' : 'flex-wrap gap-3')}>
      <ButtonLink href={navigationConfig.editWish(wish.id)} aria-label={isCompact ? `Edit ${wish.title}` : undefined}>
        <Pencil size={18} aria-hidden="true" />
        {isCompact ? null : 'Edit wish'}
      </ButtonLink>
      <Button
        variant="secondary"
        size={isCompact ? 'sm' : 'md'}
        className={clsx(!isCompact && 'flex-1')}
        isIconOnly={isCompact}
        isDisabled={isPending}
        aria-label={isCompact ? completionAccessibleLabel : undefined}
        onPress={wish.isCompleted ? handleRestore : handleComplete}>
        {wish.isCompleted ? <RotateCcw size={18} aria-hidden="true" /> : <Check size={18} aria-hidden="true" />}
        {isCompact ? null : completionLabel}
      </Button>
      <Button
        variant="secondary"
        size={isCompact ? 'sm' : 'md'}
        isIconOnly={isCompact}
        isDisabled={isPending}
        aria-label={isCompact ? `Delete ${wish.title}` : undefined}
        onPress={handleDelete}>
        <Trash2 size={18} aria-hidden="true" />
        {isCompact ? null : 'Delete'}
      </Button>
      {isPending ? (
        <span role="status" className="sr-only">
          Saving…
        </span>
      ) : null}
    </div>
  );
};
