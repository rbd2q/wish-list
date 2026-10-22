import { Check, Plus } from 'lucide-react';

import { Button } from '@/shared/components/button';
import { WishListItemType } from '@/shared/types';

import { useAddToMyWishlist, useWishlistMembership } from './model';

interface Props {
  wish: WishListItemType;
}

export const AddToWishlistButton = ({ wish }: Props) => {
  const wishlist = useWishlistMembership();
  const addWish = useAddToMyWishlist();
  const isAdded = addWish.isSuccess || wishlist.data?.some((item) => item.title === wish.title);
  const isDisabled = wishlist.isPending || wishlist.isError || addWish.isPending || isAdded;
  let label = 'Add to my wishlist';

  if (addWish.isPending) {
    label = 'Adding…';
  } else if (isAdded) {
    label = 'Added to wishlist';
  } else if (wishlist.isError) {
    label = 'Wishlist unavailable';
  }

  const handleAddToWishlist = () => {
    addWish.mutate(wish.id);
  };

  return (
    <Button className="w-full" size="sm" isDisabled={Boolean(isDisabled)} onPress={handleAddToWishlist}>
      {isAdded ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
      {label}
    </Button>
  );
};
