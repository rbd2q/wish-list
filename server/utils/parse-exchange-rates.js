export const parseExchangeRates = (data) => {
  if (!Array.isArray(data)) {
    throw new Error('Exchange rate API returned an invalid response');
  }

  const rates = { BYN: 1 };
  for (const currency of ['USD', 'RUB']) {
    const entry = data.find((item) => item?.Cur_Abbreviation === currency);
    if (
      !Number.isFinite(entry?.Cur_OfficialRate) ||
      entry.Cur_OfficialRate <= 0 ||
      !Number.isFinite(entry.Cur_Scale) ||
      entry.Cur_Scale <= 0
    ) {
      throw new Error(`Exchange rate API returned an invalid rate for ${currency}`);
    }

    const rate = entry.Cur_OfficialRate / entry.Cur_Scale;
    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error(`Exchange rate API returned an invalid rate for ${currency}`);
    }
    rates[currency] = rate;
  }

  return rates;
};
