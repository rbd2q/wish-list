import type { WishPriority } from '@/entities/wish';
import type { CurrencyEnum } from '@/shared/lib/currency';

export interface SaveWishPayload {
  title: string;
  priority: WishPriority;
  isHidden: boolean;
  description?: string;
  url?: string;
  price?: string;
  primaryCurrency?: CurrencyEnum;
  collectionIds?: string[];
  isCompleted?: boolean;
  imageUrls: string[];
}

export interface UploadedWishPhoto {
  imageUrl: string;
}

export interface ParsedWishListItem {
  title: string;
  price?: string | number;
  primaryCurrency?: CurrencyEnum;
  description?: string;
  url?: string;
  imageUrl?: string;
  images?: Array<string>;
}
