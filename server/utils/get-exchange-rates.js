import { CACHE_DURATION_MS, RATES_URL, REQUEST_TIMEOUT_MS } from '../config/exchange-rates.js';
import { ExchangeRateError } from '../errors/exchange-rate-error.js';
import { parseExchangeRates } from './parse-exchange-rates.js';

let cachedRates;
let cacheExpiresAt = 0;
let pendingRequest;

const fetchExchangeRates = async () => {
  try {
    const response = await fetch(RATES_URL, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
    if (!response.ok) {
      throw new Error(`Exchange rate API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const rates = parseExchangeRates(data);

    cachedRates = rates;
    cacheExpiresAt = Date.now() + CACHE_DURATION_MS;
    return rates;
  } catch (error) {
    throw new ExchangeRateError('Exchange rates are temporarily unavailable. Please try again later.', {
      cause: error,
    });
  }
};

export const getExchangeRates = async () => {
  if (cachedRates && Date.now() < cacheExpiresAt) {
    return cachedRates;
  }

  if (!pendingRequest) {
    pendingRequest = fetchExchangeRates().finally(() => {
      pendingRequest = undefined;
    });
  }

  return pendingRequest;
};
