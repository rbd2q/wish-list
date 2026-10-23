export enum CurrencyEnum {
  USD = 'USD',
  BYN = 'BYN',
  RUB = 'RUB',
}
export type CurrencySignEnum = '$' | 'BYN' | '₽';
export type CurrencyType = {
  value: CurrencyEnum;
  name: string;
  sign: CurrencySignEnum;
};

export type PriceType = Record<CurrencyEnum, number>;
