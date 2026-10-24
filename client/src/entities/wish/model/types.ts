import { CurrencyEnum, PriceType } from '@/shared/lib/currency';

import type { WishPriority } from './wish-priority';

export interface WishListItemType {
  id: string;
  collectionIds?: string[];
  sourceWishId?: string;
  title: string;
  priority: WishPriority;
  isHidden: boolean;
  prices: PriceType;
  primaryCurrency: CurrencyEnum;
  userId: string;
  isCompleted: boolean;
  date: Date;
  description?: string;
  url?: string;
  imageUrls: string[];
  tags?: string[];
}
