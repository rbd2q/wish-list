import { Fragment, useMemo } from 'react';

import { useCurrentUser } from '@/entities/session';
import { useGetAllItems } from '@/entities/wish';
import { CurrencyEnum } from '@/shared/lib/currency';
import { RequestError } from '@/shared/ui/request-error';

import { IdeasEmptyState } from './ideas-empty-state';
import { IdeasGrid } from './ideas-grid';
import { IdeasNoResults } from './ideas-no-results';
import { IdeasSkeleton } from './ideas-skeleton';

interface IdeasContentProps {
  search: string;
  onClearSearch: () => void;
}

export const IdeasContent = ({ search, onClearSearch }: IdeasContentProps) => {
  const { data, isLoading, isError, refetch } = useGetAllItems();
  const { data: user } = useCurrentUser();
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const items = useMemo(
    () => data?.filter((item) => item.title.toLocaleLowerCase().includes(normalizedSearch)) ?? [],
    [data, normalizedSearch],
  );
  const preferredCurrency = user?.preferredCurrency ?? CurrencyEnum.USD;

  const handleRetry = () => {
    void refetch();
  };

  if (isLoading) {
    return <IdeasSkeleton />;
  }

  if (isError) {
    return <RequestError message="Could not load ideas." onRetry={handleRetry} />;
  }

  if (!data?.length) {
    return <IdeasEmptyState />;
  }

  if (!items.length) {
    return <IdeasNoResults onClearSearch={onClearSearch} />;
  }

  return (
    <Fragment>
      <p role="status" className="sr-only">
        {items.length} {items.length === 1 ? 'wish' : 'wishes'} found
      </p>
      <IdeasGrid items={items} preferredCurrency={preferredCurrency} />
    </Fragment>
  );
};
