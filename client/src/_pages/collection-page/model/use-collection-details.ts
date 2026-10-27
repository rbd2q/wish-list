import { useCollection } from '@/entities/collection';
import { useCurrentUser } from '@/entities/session';
import { useGetMyWishlist, WishPriority } from '@/entities/wish';
import { CurrencyEnum, formatPrice } from '@/shared/lib/currency';

export const useCollectionDetails = (id: string) => {
  const { data: collection, isLoading, isError, refetch } = useCollection(id);
  const {
    data: wishes = [],
    isLoading: isWishesLoading,
    isError: isWishesError,
    refetch: refetchWishes,
  } = useGetMyWishlist();
  const { data: user } = useCurrentUser();

  const items = wishes.filter((wish) => wish.collectionIds?.includes(id));
  const currency = user?.preferredCurrency ?? CurrencyEnum.USD;
  const totalPrice = items.reduce((sum, wish) => {
    const price = wish.prices?.[currency];

    return Number.isFinite(price) ? sum + price : sum;
  }, 0);
  const total = formatPrice(totalPrice, currency);
  const highPriorityCount = items.filter((wish) => wish.priority === WishPriority.HIGH).length;
  const areWishesAvailable = !isWishesLoading && !isWishesError;

  const handleRetry = () => {
    refetch();
    refetchWishes();
  };

  return {
    collection,
    wishes,
    items,
    currency,
    total,
    highPriorityCount,
    areWishesAvailable,
    isLoading,
    isError,
    isWishesLoading,
    isWishesError,
    handleRetry,
  };
};
