import { getExchangeRates } from './get-exchange-rates.js';
import { InvalidPriceError, normalizePrice } from './normalize-price.js';

export const getPrices = async (currency, amount) => {
  const price = normalizePrice(amount);
  const prices = { USD: 0, BYN: 0, RUB: 0 };

  if (!Object.hasOwn(prices, currency)) {
    throw new InvalidPriceError('Price currency must be USD, BYN or RUB');
  }

  if (price === 0) {
    return prices;
  }

  const rates = await getExchangeRates();
  const amountInByn = price * rates[currency];

  for (const targetCurrency of Object.keys(prices)) {
    if (targetCurrency === currency) {
      prices[targetCurrency] = price;
      continue;
    }

    const convertedPrice = amountInByn / rates[targetCurrency];
    if (!Number.isFinite(convertedPrice)) {
      throw new InvalidPriceError('Price is too large to convert');
    }
    prices[targetCurrency] = Number(convertedPrice.toFixed(2));
  }

  return prices;
};
