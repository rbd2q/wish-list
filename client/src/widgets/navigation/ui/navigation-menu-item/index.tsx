import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationConfig } from '@/shared/config/navigation';

interface NavigationMenuItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  className: string;
}

export const NavigationMenuItem = ({ href, label, icon: Icon, onClick, className }: NavigationMenuItemProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || pathname.startsWith(href + '/') || (pathname === '/' && href === navigationConfig.wishlist);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        className,
        isActive
          ? 'bg-secondary text-primary hover:text-primary-hover'
          : 'text-muted-foreground hover:bg-surface-secondary hover:text-foreground',
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      {label}
    </Link>
  );
};
