import { SearchX } from 'lucide-react';

import { Button } from '@/shared/ui/button';

interface IdeasNoResultsProps {
  onClearSearch: () => void;
}

export const IdeasNoResults = ({ onClearSearch }: IdeasNoResultsProps) => (
  <div role="status" className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
    <SearchX className="mx-auto mb-4 text-muted-foreground" size={32} aria-hidden="true" />
    <h2 className="text-lg font-semibold">No matching wishes</h2>
    <p className="mt-2 text-sm text-muted-foreground">Try another title or clear your search.</p>
    <Button className="mt-5" variant="secondary" onPress={onClearSearch}>
      Clear search
    </Button>
  </div>
);
