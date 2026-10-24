import { Check, ExternalLink, Pencil, RotateCcw, Trash2 } from 'lucide-react';
import { Fragment } from 'react';

import { WishListItemType } from '@/entities/wish';
import { navigationConfig } from '@/shared/config/navigation';
import { Button } from '@/shared/ui/button';
import { ButtonLink } from '@/shared/ui/button-link';

import { useDeleteItem, useMarkAsCompleted, useRestoreWish } from '../../api';
import { getStoreUrl } from '../../lib';

interface Props {
  item: WishListItemType;
}

export const WishActions = ({ item }: Props) => {
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteItem();
  const { mutate: completeItem, isPending: isCompleting } = useMarkAsCompleted();
  const { mutate: restoreWish, isPending: isRestoring } = useRestoreWish();

  const isPending = isRestoring || isDeleting || isCompleting;
  const storeUrl = getStoreUrl(item.url);

  const handleRestore = () => {
    restoreWish(item.id);
  };

  const handleDelete = () => {
    deleteItem(item.id);
  };

  const handleComplete = () => {
    completeItem(item.id);
  };

  return (
    <Fragment>
      {storeUrl ? (
        <ButtonLink
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 whitespace-nowrap">
          <ExternalLink size={16} aria-hidden="true" />
          Visit store
        </ButtonLink>
      ) : null}
      <div className="flex shrink-0 items-center gap-2">
        <ButtonLink href={navigationConfig.editWish(item.id)} aria-label={`Edit ${item.title}`}>
          <Pencil size={16} aria-hidden="true" />
        </ButtonLink>
        {!item.isCompleted ? (
          <Button
            size="sm"
            variant="secondary"
            isIconOnly
            isDisabled={isPending}
            aria-label={`Complete ${item.title}`}
            onPress={handleComplete}>
            <Check size={18} aria-hidden="true" />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            isIconOnly
            isDisabled={isPending}
            aria-label={`Restore ${item.title}`}
            onPress={handleRestore}>
            <RotateCcw size={18} aria-hidden="true" />
          </Button>
        )}
        <Button
          size="sm"
          variant="secondary"
          isIconOnly
          isDisabled={isPending}
          aria-label={`Delete ${item.title}`}
          onPress={handleDelete}>
          <Trash2 size={16} aria-hidden="true" />
        </Button>
        {isPending ? (
          <span role="status" className="sr-only">
            Saving…
          </span>
        ) : null}
      </div>
    </Fragment>
  );
};
