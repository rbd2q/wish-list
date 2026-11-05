import type { CurrencyEnum } from '@/shared/lib/currency';

export interface CurrentUserStats {
  wishCount: number;
  collectionCount: number;
  totalPrice: number | null;
  currency: CurrencyEnum;
}
