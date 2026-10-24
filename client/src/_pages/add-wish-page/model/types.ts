import type { WishPriority } from '@/entities/wish';
import { CurrencyEnum } from '@/shared/lib/currency';

export interface WishPhoto {
  id: string;
  src: string;
  file?: File;
}

export interface AddItemFormResource {
  collectionIds?: string[];
  photos: WishPhoto[];
  title: string;
  priority: WishPriority;
  isHidden: boolean;
  description?: string;
  url?: string;
  price?: string;
  primaryCurrency?: CurrencyEnum;
  tags?: string[];
  isCompleted?: boolean;
}
