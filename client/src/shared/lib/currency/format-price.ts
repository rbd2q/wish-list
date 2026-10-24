import type { CurrencyEnum } from './types';

export const formatPrice = (price: number | null | undefined, currency: CurrencyEnum): string | undefined => {
  if (typeof price !== 'number' || !Number.isFinite(price)) {
    return undefined;
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
};
