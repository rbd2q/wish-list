import { useGetAllItems } from '@/_pages/ideas-page/model';
import { WishlistItems } from '@/widgets/wishlist-items';

export const IdeasPage = () => {
  const { data, isLoading } = useGetAllItems();

  return data ? (
    <div className="w-full">
      <h1 className="text-lg font-semibold">Ideas</h1>
      <WishlistItems items={data} isLoading={isLoading} isIdeasPage />
    </div>
  ) : null;
};
