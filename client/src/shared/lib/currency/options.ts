import { CurrencyEnum, type CurrencySignEnum, type CurrencyType } from './types';

export const CURRENCY_SIGNS: Record<CurrencyEnum, CurrencySignEnum> = {
  [CurrencyEnum.USD]: '$',
  [CurrencyEnum.BYN]: 'BYN',
  [CurrencyEnum.RUB]: '₽',
};

export const CURRENCY_OPTIONS: CurrencyType[] = Object.values(CurrencyEnum).map((currency) => ({
  value: currency,
  name: currency === CurrencyEnum.BYN ? currency : `${CURRENCY_SIGNS[currency]}/${currency}`,
  sign: CURRENCY_SIGNS[currency],
}));
