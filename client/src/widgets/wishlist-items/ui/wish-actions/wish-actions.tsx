import { Check, ExternalLink, Trash2 } from 'lucide-react';
import { Fragment } from 'react';

import { WishListItemType } from '@/entities/wish';
import { Button } from '@/shared/ui/button';
import { ButtonLink } from '@/shared/ui/button-link';

import { useDeleteItem, useMarkAsCompleted } from '../../model';

interface Props {
  item: WishListItemType;
}

export const WishActions = ({ item }: Props) => {
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteItem();
  const { mutate: completeItem, isPending: isCompleting } = useMarkAsCompleted();

  const isPending = isDeleting || isCompleting;
  const storeUrl = item.url && /^https?:\/\//i.test(item.url) ? item.url : undefined;

  const handleDelete = () => deleteItem(item.id);
  const handleComplete = () => completeItem(item.id);

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
          <span className="flex h-10 w-12 items-center justify-center text-primary" title="Completed">
            <Check size={18} aria-hidden="true" />
            <span className="sr-only">Completed</span>
          </span>
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
