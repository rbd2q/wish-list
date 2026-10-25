import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { navigationConfig } from '@/shared/config/navigation';

interface CollectionFormHeaderProps {
  isEditing: boolean;
}

export const CollectionFormHeader = ({ isEditing }: CollectionFormHeaderProps) => (
  <header className="relative left-1/2 -mt-8 w-[100cqw] -translate-x-1/2 border-b border-border bg-surface">
    <div className="mx-auto grid min-h-18 w-full max-w-[1200px] grid-cols-[auto_minmax(0,1fr)] items-center gap-4 px-5 py-3 sm:grid-cols-[1fr_auto_1fr] md:px-8">
      <Link
        href={navigationConfig.collections}
        className="inline-flex min-h-11 items-center justify-self-start gap-2 rounded-lg px-2 text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Cancel
      </Link>
      <h1 className="min-w-0 text-center text-xl font-semibold sm:text-2xl">
        {isEditing ? 'Edit collection' : 'New collection'}
      </h1>
    </div>
  </header>
);
