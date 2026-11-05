import { Heart, Layers, TrendingUp } from 'lucide-react';

import type { UserResource } from '@/entities/session';

import { getUserInitials } from '../lib';

interface ProfileHeaderProps {
  user: UserResource;
  wishCount: number;
  collectionCount: number;
  total?: string;
}

export const ProfileHeader = ({ user, wishCount, collectionCount, total }: ProfileHeaderProps) => {
  const name = user.name?.trim();
  const displayName = name || user.email;
  const initials = getUserInitials(user);

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-8 md:px-8">
        <h1 className="sr-only">Profile</h1>
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-semibold text-primary sm:size-24 sm:text-3xl"
            aria-hidden="true">
            {initials}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold wrap-anywhere sm:text-2xl">{displayName}</h2>
            {name ? <p className="mt-1 text-sm text-muted-foreground wrap-anywhere">{user.email}</p> : null}
          </div>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="relative rounded-2xl bg-primary/5 p-4 pl-12">
            <dt className="text-xs text-muted-foreground">
              <Heart className="absolute left-4 top-5 size-5 text-primary" aria-hidden="true" />
              Wishlist items
            </dt>
            <dd className="mt-1 text-xl font-semibold">{wishCount}</dd>
          </div>
          <div className="relative rounded-2xl bg-sky-50 p-4 pl-12">
            <dt className="text-xs text-muted-foreground">
              <Layers className="absolute left-4 top-5 size-5 text-sky-600" aria-hidden="true" />
              Collections
            </dt>
            <dd className="mt-1 text-xl font-semibold">{collectionCount}</dd>
          </div>
          <div className="relative col-span-2 min-w-0 rounded-2xl bg-amber-50 p-4 pl-12 sm:col-span-1">
            <dt className="text-xs text-muted-foreground">
              <TrendingUp className="absolute left-4 top-5 size-5 text-amber-600" aria-hidden="true" />
              Total value
            </dt>
            <dd className="mt-1 text-xl font-semibold wrap-anywhere">{total ?? '—'}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
};
