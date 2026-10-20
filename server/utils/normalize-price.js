export class InvalidPriceError extends Error {}

export const normalizePrice = (amount) => {
  let price = amount;

  if (typeof amount === 'string' && /^\d+(?:[.,]\d+)?$/.test(amount.trim())) {
    price = Number(amount.trim().replace(',', '.'));
  }

  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    throw new InvalidPriceError('Price must be a non-negative number with a dot or comma as the decimal separator');
  }

  return price;
};
