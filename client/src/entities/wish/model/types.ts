import { CurrencyEnum, PriceType } from '@/shared/lib/currency';

export interface WishListItemType {
  id: string;
  sourceWishId?: string;
  title: string;
  isHidden: boolean;
  prices: PriceType;
  primaryCurrency: CurrencyEnum;
  userId: string;
  isCompleted: boolean;
  date: Date;
  description?: string;
  url?: string;
  imageUrl?: string;
  tags?: string[];
}
