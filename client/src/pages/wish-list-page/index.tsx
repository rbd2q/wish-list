import { EmptyBlock } from '@/shared/components/empty-block';
import { Registered } from '@/shared/components/registered-layout';
import { useCurrentUser } from '@/shared/hooks/use-get-current-user';

export const WishListPage = () => {
  const currentUser = useCurrentUser();

  return (
    <Registered>
      {currentUser.data?.wishes.length ? (
        <div>
          {currentUser.data.wishes.map((item) => (
            <div key={item.id}>123</div>
          ))}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <EmptyBlock />
        </div>
      )}
    </Registered>
  );
};
