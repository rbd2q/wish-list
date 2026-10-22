import { useGetMyWishlist } from '@/_pages/wish-list-page/model';
import { WishlistItems } from '@/widgets/wishlist-items';

export const WishListPage = () => {
  const wishlist = useGetMyWishlist();

  return <WishlistItems items={wishlist.data} isLoading={wishlist.isLoading} />;
};
