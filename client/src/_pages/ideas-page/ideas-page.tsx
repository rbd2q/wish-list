import { Lightbulb, Search } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';

import { Input } from '@/shared/ui/input';

import { IdeasContent } from './ui';

export const IdeasPage = () => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <header className="-mt-8 w-[100cqw] self-center border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-[1200px] space-y-5 px-5 py-5 md:px-8">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lightbulb size={21} aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">Ideas &amp; Inspiration</h1>
              <p className="mt-1 text-sm text-muted-foreground">Browse what others are wishing for</p>
            </div>
          </div>
          <div className="max-w-xl">
            <Input
              type="search"
              aria-label="Search public wishes by title"
              placeholder="Search for inspiration…"
              value={search}
              onChange={handleSearchChange}
              startContent={<Search size={18} aria-hidden="true" />}
            />
          </div>
        </div>
      </header>
      <IdeasContent search={search} onClearSearch={handleClearSearch} />
    </div>
  );
};
