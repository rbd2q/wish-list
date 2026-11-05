import { useCurrentUser, useCurrentUserStats } from '@/entities/session';
import { useRecentWishes } from '@/entities/wish';
import { formatPrice } from '@/shared/lib/currency';

export const useProfileDetails = () => {
  const { data: user, isLoading: isUserLoading, isError: isUserError, refetch: refetchUser } = useCurrentUser();
  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    refetch: refetchStats,
  } = useCurrentUserStats();
  const {
    data: recentWishes = [],
    isLoading: isWishesLoading,
    isError: isWishesError,
    refetch: refetchWishes,
  } = useRecentWishes();

  const total = stats ? formatPrice(stats.totalPrice, stats.currency) : undefined;
  const isLoading = isUserLoading || isStatsLoading || isWishesLoading;
  const isError = isUserError || isStatsError || isWishesError;

  const handleRetry = () => {
    refetchUser();
    refetchStats();
    refetchWishes();
  };

  return { user, stats, recentWishes, total, isLoading, isError, handleRetry };
};
