import { CurrencyEnum, formatPrice, type PriceType } from '@/shared/lib/currency';

interface PricesBlockProps {
  prices: PriceType;
  preferredCurrency: CurrencyEnum;
}

export const PricesBlock = ({ prices, preferredCurrency }: PricesBlockProps) => {
  const primaryPrice = formatPrice(prices?.[preferredCurrency], preferredCurrency) ?? 'Price not specified';
  const secondaryPrices = Object.values(CurrencyEnum)
    .filter((currency) => currency !== preferredCurrency)
    .map((currency) => formatPrice(prices?.[currency], currency))
    .filter((price) => price !== undefined)
    .join(' / ');

  return (
    <div className="mt-3 space-y-1 wrap-anywhere">
      <p className="text-3xl font-semibold">{primaryPrice}</p>
      {secondaryPrices ? <p className="text-sm text-muted-foreground">≈ {secondaryPrices}</p> : null}
    </div>
  );
};
