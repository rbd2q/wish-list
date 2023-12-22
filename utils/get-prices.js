import CC from 'currency-converter-lt';

export const getPrices = async (currency, amount) => {
  const prices = {};

  const converter = (currency, targetCurrency, amount) => {
    return new CC({ from: currency, to: targetCurrency, amount: Number(amount) });
  };

  if (currency !== 'USD') {
    prices.USD = await converter(currency, 'USD', amount).convert();
  }
  if (currency !== 'BYN') {
    prices.BYN = await converter(currency, 'BYN', amount).convert();
  }
  if (currency !== 'RUB') {
    prices.RUB = await converter(currency, 'RUB', amount).convert();
  }

  prices[currency] = Number(amount);

  return prices;
};
