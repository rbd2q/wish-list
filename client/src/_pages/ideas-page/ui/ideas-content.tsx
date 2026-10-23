import { useGetAllItems } from '@/entities/wish';
import { EmptyBlock } from '@/shared/ui/empty-block';
import { RequestError } from '@/shared/ui/request-error';
import { WishlistItems, WishlistItemsSkeleton } from '@/widgets/wishlist-items';

export const IdeasContent = () => {
  const { data, isLoading, isError, refetch } = useGetAllItems();

  const handleRetry = () => {
    void refetch();
  };

  if (isLoading) {
    return <WishlistItemsSkeleton />;
  }

  if (isError) {
    return <RequestError message="Could not load ideas." onRetry={handleRetry} />;
  }

  if (!data?.length) {
    return <EmptyBlock />;
  }

  return <WishlistItems items={data} isIdeasPage />;
};
