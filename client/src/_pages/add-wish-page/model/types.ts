import { CurrencyEnum } from '@/shared/lib/currency';

export interface AddItemFormResource {
  link?: string;
  title: string;
  isHidden: boolean;
  description?: string;
  url?: string;
  price?: string;
  primaryCurrency?: CurrencyEnum;
  imageUrl?: string;
  tags?: string[];
  isCompleted?: boolean;
}

export interface ParsedWishListItem {
  title: string;
  price: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  images?: Array<string>;
}
