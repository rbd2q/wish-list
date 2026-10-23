import { FC } from 'react';

import { CURRENCY_SIGNS, CurrencyEnum, PriceType } from '@/shared/lib/currency';

interface Props {
  prices: PriceType;
  preferredCurrency: CurrencyEnum;
}

export const PricesBlock: FC<Props> = ({ prices, preferredCurrency }) => {
  const primaryPrice = `${prices[preferredCurrency]}${CURRENCY_SIGNS[preferredCurrency]}`;
  const secondaryPrices = Object.values(CurrencyEnum)
    .filter((currency) => currency !== preferredCurrency)
    .map((currency) => `${prices[currency]}${CURRENCY_SIGNS[currency]}`)
    .join(' / ');

  return (
    <div className="mt-8">
      <span className="font-semibold text-3xl">{primaryPrice}</span>
      <span className="flex flex-col text-md text-[#6c757d]">{`≈ ${secondaryPrices}`}</span>
    </div>
  );
};
