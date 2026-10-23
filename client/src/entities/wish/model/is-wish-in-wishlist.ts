import type { WishListItemType } from './types';

export const isWishInWishlist = (wish: WishListItemType, wishlist: WishListItemType[]): boolean => {
  const sourceWishId = wish.sourceWishId ?? wish.id;

  return wishlist.some((item) => (item.sourceWishId ?? item.id) === sourceWishId);
};
