import { useState } from 'react';
import { AddItemForm } from '@/entities/add-item-form';
import { useGetMyWishlist } from '@/pages/wish-list-page/model';
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
