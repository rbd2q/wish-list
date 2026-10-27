import type { WishListItemType } from '@/entities/wish';
import { Button } from '@/shared/ui/button';

interface ExistingWishOptionProps {
  wish: WishListItemType;
  onAdd: (wishId: string) => void;
  isPending: boolean;
}

export const ExistingWishOption = ({ wish, onAdd, isPending }: ExistingWishOptionProps) => {
  const handleAdd = () => onAdd(wish.id);

  return (
    <li className="flex items-center justify-between gap-3 border-b border-border py-3">
      <span className="min-w-0 wrap-anywhere">
        {wish.title}
        {wish.isCompleted ? <span className="block text-xs text-muted-foreground">Completed</span> : null}
      </span>
      <Button
        onPress={handleAdd}
        isPending={isPending}
        isDisabled={isPending}
        aria-label={`Add ${wish.title} to collection`}>
        Add
      </Button>
    </li>
  );
};
