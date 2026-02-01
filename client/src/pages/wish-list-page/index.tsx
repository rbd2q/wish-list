import { useState } from 'react';
import { AddItemForm } from '@/entities/add-item-form';
import { useGetMyWishlist } from '@/pages/wish-list-page/model';
import { Registered } from '@/shared/components/registered-layout';
import { WishlistItems } from '@/widgets/wishlist-items';

export const WishListPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const wishlist = useGetMyWishlist();

  return (
    <Registered>
      {isFormVisible ? (
        <AddItemForm onBack={() => setIsFormVisible(false)} />
      ) : (
        <WishlistItems
          items={wishlist.data}
          isLoading={wishlist.isLoading}
          handleShowForm={() => setIsFormVisible(true)}
        />
      )}
    </Registered>
  );
};
