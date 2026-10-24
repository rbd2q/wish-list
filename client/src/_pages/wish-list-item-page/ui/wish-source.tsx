import { ExternalLink } from 'lucide-react';

interface WishSourceProps {
  sourceUrl?: string;
}

export const WishSource = ({ sourceUrl }: WishSourceProps) => {
  if (!sourceUrl) {
    return null;
  }

  return (
    <section aria-labelledby="wish-source">
      <h2 id="wish-source" className="mb-2 text-sm font-medium">
        Source
      </h2>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex max-w-full items-start gap-2 rounded text-sm text-muted-foreground hover:text-primary hover:underline">
        <ExternalLink size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        <span className="min-w-0 wrap-anywhere">{sourceUrl}</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </section>
  );
};
