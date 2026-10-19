import { useState } from 'react';

import { useGetMyWishlist } from '@/_pages/wish-list-page/model';
import { AddItemForm } from '@/entities/add-item-form';
import { WishlistItems } from '@/widgets/wishlist-items';

export const WishListPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const wishlist = useGetMyWishlist();

  return isFormVisible ? (
    <AddItemForm onBack={() => setIsFormVisible(false)} />
  ) : (
    <WishlistItems items={wishlist.data} isLoading={wishlist.isLoading} handleShowForm={() => setIsFormVisible(true)} />
  );
};
