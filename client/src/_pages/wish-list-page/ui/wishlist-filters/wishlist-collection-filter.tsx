import { CollectionOptions, useMyCollections } from '@/entities/collection';
import { RequestError } from '@/shared/ui/request-error';

interface WishlistCollectionFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const WishlistCollectionFilter = ({ value, onChange }: WishlistCollectionFilterProps) => {
  const { data: collections = [], isLoading, isError, refetch } = useMyCollections();

  if (isLoading) {
    return <p role="status">Loading collections…</p>;
  }

  if (isError) {
    return <RequestError message="Could not load collections." onRetry={refetch} />;
  }

  return <CollectionOptions collections={collections} value={value} onChange={onChange} />;
};
