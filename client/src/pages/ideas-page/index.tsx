import { useGetAllItems } from '@/pages/ideas-page/model';
import { Registered } from '@/shared/components/registered-layout';
import { WishlistItems } from '@/widgets/wishlist-items';

export const IdeasPage = () => {
  const { data, isLoading } = useGetAllItems();
  console.log('data', data);

  return (
    <Registered>
      {data ? (
        <div className="w-full">
          <h1 className="text-lg font-semibold">Ideas</h1>
          <WishlistItems items={data} isLoading={isLoading} isIdeasPage />
        </div>
      ) : null}
    </Registered>
  );
};
