import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { navigationConfig } from '@/shared/config/navigation';

export const ProfileRecentHeader = () => (
  <div className="flex items-center justify-between gap-4">
    <h2 id="recent-wishes-heading" className="text-xl font-semibold">
      Recent items
    </h2>
    <Link
      href={navigationConfig.wishlist}
      className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary">
      View all
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  </div>
);
