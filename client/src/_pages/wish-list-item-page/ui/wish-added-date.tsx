import { formatDate } from '@/shared/lib/date';

interface WishAddedDateProps {
  date: Date;
}

export const WishAddedDate = ({ date }: WishAddedDateProps) => {
  const addedDate = new Date(date);
  const isValidDate = !Number.isNaN(addedDate.getTime());

  if (!isValidDate) {
    return null;
  }

  return (
    <p className="text-xs text-muted-foreground">
      Added <time dateTime={addedDate.toISOString()}>{formatDate(addedDate)}</time>
    </p>
  );
};
