import { useGetAllItems } from '@/_pages/ideas-page/model';
import { WishlistItems, WishlistItemsSkeleton } from '@/widgets/wishlist-items';

export const IdeasPage = () => {
  const { data, isLoading } = useGetAllItems();

  return data || isLoading ? (
    <div className="w-full">
      <h1 className="text-lg font-semibold">Ideas</h1>
      {isLoading ? <WishlistItemsSkeleton /> : data ? <WishlistItems items={data} isIdeasPage /> : null}
    </div>
  ) : null;
};
