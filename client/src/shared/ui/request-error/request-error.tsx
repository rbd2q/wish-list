import { Button } from '../button';

interface Props {
  message: string;
  onRetry: () => void;
}

export const RequestError = ({ message, onRetry }: Props) => (
  <div role="alert" className="rounded-xl border border-border bg-surface p-6">
    <p>{message}</p>
    <Button className="mt-4" onPress={onRetry}>
      Try again
    </Button>
  </div>
);
