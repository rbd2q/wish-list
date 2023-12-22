import { FC, useMemo } from 'react';

import { CurrencyEnum, PriceType } from '@/shared/types';

interface Props {
  prices: PriceType;
  preferredCurrency: CurrencyEnum;
}

export const PricesBlock: FC<Props> = ({ prices, preferredCurrency }) => {
  const priceElem = useMemo(() => {
    switch (preferredCurrency) {
      case 'BYN':
        return (
          <>
            <span className="font-semibold text-3xl">{`${prices.BYN}BYN`}</span>
            <span className="flex flex-col text-md text-[#6c757d]">{`≈ ${prices.USD}$ / ${prices.RUB}₽`}</span>
          </>
        );
      case 'RUB':
        return (
          <>
            <span className="font-semibold text-3xl">{`${prices.RUB}₽`}</span>
            <span className="flex flex-col text-md text-[#6c757d]">{`≈ ${prices.USD}$ / ${prices.BYN}BYN`}</span>
          </>
        );
      case 'USD':
        return (
          <>
            <span className="font-semibold text-3xl">{`${prices.USD}$`}</span>
            <span className="flex flex-col text-md text-[#6c757d]">{`≈ ${prices.BYN}BYN / ${prices.RUB}₽`}</span>
          </>
        );
      default:
        return '';
    }
  }, [preferredCurrency]);

  return <div className="mt-8">{priceElem}</div>;
};
