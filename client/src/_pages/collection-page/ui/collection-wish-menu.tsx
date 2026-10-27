import { Dropdown } from '@heroui/react';
import { Check, MoreHorizontal, RotateCcw, Trash2, Unlink } from 'lucide-react';

import type { WishListItemType } from '@/entities/wish';
import { useDeleteItem, useMarkAsCompleted, useRestoreWish } from '@/features/manage-wish';

interface CollectionWishMenuProps {
  wish: WishListItemType;
  onRemove: (wishId: string) => void;
  isRemoving: boolean;
}

export const CollectionWishMenu = ({ wish, onRemove, isRemoving }: CollectionWishMenuProps) => {
  const { mutate: deleteWish, isPending: isDeleting } = useDeleteItem();
  const { mutate: completeWish, isPending: isCompleting } = useMarkAsCompleted();
  const { mutate: restoreWish, isPending: isRestoring } = useRestoreWish();

  const isPending = isRemoving || isDeleting || isCompleting || isRestoring;
  const completionLabel = wish.isCompleted ? 'Restore wish' : 'Mark as completed';

  const handleRemove = () => {
    onRemove(wish.id);
  };

  const handleDelete = () => {
    deleteWish(wish.id);
  };

  const handleCompletionChange = () => {
    return wish.isCompleted ? restoreWish(wish.id) : completeWish(wish.id);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger
        isDisabled={isPending}
        aria-label={`More actions for ${wish.title}`}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-muted-foreground hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary">
        <MoreHorizontal size={18} aria-hidden="true" />
      </Dropdown.Trigger>
      <Dropdown.Popover placement="bottom end">
        <Dropdown.Menu aria-label={`Actions for ${wish.title}`}>
          <Dropdown.Item id="completion" onAction={handleCompletionChange} textValue={completionLabel}>
            {wish.isCompleted ? <RotateCcw size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
            {completionLabel}
          </Dropdown.Item>
          <Dropdown.Item id="remove" onAction={handleRemove} textValue="Remove from collection">
            <Unlink size={16} aria-hidden="true" />
            Remove from collection
          </Dropdown.Item>
          <Dropdown.Item id="delete" onAction={handleDelete} textValue="Delete wish" className="text-destructive">
            <Trash2 size={16} aria-hidden="true" />
            Delete wish
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
