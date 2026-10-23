import { Check, Plus } from 'lucide-react';

import { useGetMyWishlist, WishListItemType } from '@/entities/wish';
import { Button } from '@/shared/ui/button';

import { useAddToMyWishlist } from '../model';

interface Props {
  wish: WishListItemType;
}

export const AddToWishlistButton = ({ wish }: Props) => {
  const { data: wishlist, isPending: isLoadingWishlist, isError: isWishlistError } = useGetMyWishlist();
  const { mutate: addWish, isPending: isAdding, isSuccess: isAddedSuccessfully } = useAddToMyWishlist();

  const isAdded = isAddedSuccessfully || wishlist?.some((item) => item.title === wish.title);
  const isDisabled = isLoadingWishlist || isWishlistError || isAdding || isAdded;
  let label = 'Add to my wishlist';

  if (isAdding) {
    label = 'Adding…';
  } else if (isAdded) {
    label = 'Added to wishlist';
  } else if (isWishlistError) {
    label = 'Wishlist unavailable';
  }

  const handleAddToWishlist = () => {
    addWish(wish.id);
  };

  return (
    <Button className="w-full" size="sm" isDisabled={!!isDisabled} onPress={handleAddToWishlist}>
      {isAdded ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
      {label}
    </Button>
  );
};
