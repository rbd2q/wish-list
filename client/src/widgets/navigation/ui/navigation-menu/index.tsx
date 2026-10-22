'use client';

import clsx from 'clsx';
import { Heart, Lightbulb, LogOut, Plus, UserRound } from 'lucide-react';

import { ButtonLink } from '@/shared/components/button-link';
import { navigationConfig } from '@/shared/config/navigation';

import { NavigationMenuItem } from '../navigation-menu-item';

const navigationItems = [
  { href: navigationConfig.wishlist, label: 'My Wishlist', icon: Heart },
  { href: navigationConfig.ideas, label: 'Ideas', icon: Lightbulb },
  { href: navigationConfig.profile, label: 'Profile', icon: UserRound },
];

const navigationLinkClassName =
  'flex min-h-12 items-center gap-3 rounded-xl p-3 text-sm leading-normal font-medium transition-colors';

interface NavigationMenuProps {
  onNavigate?: () => void;
  onLogout: () => void;
}

export const NavigationMenu = ({ onNavigate, onLogout }: NavigationMenuProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5 pt-5">
      <ButtonLink href={navigationConfig.addWish} onClick={onNavigate} className="mx-4 w-[calc(100%-32px)]">
        <Plus className="size-5 shrink-0" aria-hidden="true" />
        Add item
      </ButtonLink>
      <nav aria-label="Main navigation" className="flex flex-col gap-1 px-3">
        {navigationItems.map(({ href, label, icon: Icon }) => (
          <NavigationMenuItem
            key={href}
            href={href}
            label={label}
            icon={Icon}
            onClick={onNavigate}
            className={navigationLinkClassName}
          />
        ))}
      </nav>
      <div className="mt-auto border-t border-border px-3 py-4">
        <button
          type="button"
          onClick={onLogout}
          className={clsx(
            navigationLinkClassName,
            'w-full text-left text-muted-foreground hover:bg-danger-soft hover:text-destructive',
          )}
        >
          <LogOut className="size-5 shrink-0" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );
};
