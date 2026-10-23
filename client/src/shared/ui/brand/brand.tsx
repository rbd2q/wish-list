import { Heart } from 'lucide-react';
import Link from 'next/link';

import { navigationConfig } from '@/shared/config/navigation';

interface BrandProps {
  onNavigate?: () => void;
}

export const Brand = ({ onNavigate }: BrandProps) => (
  <Link
    href={navigationConfig.wishlist}
    className="inline-flex w-fit items-center gap-3 rounded-lg text-lg leading-normal font-semibold text-foreground"
    onClick={onNavigate}>
    <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
      <Heart className="size-[18px]" aria-hidden="true" fill="currentColor" />
    </span>
    <span>Wishly</span>
  </Link>
);
