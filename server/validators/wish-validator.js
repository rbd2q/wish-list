import { WISH_PRIORITIES } from '../constants/wishes.js';
import { HttpError } from '../errors/http-error.js';
import { normalizePrice } from '../utils/normalize-price.js';

const UPDATE_FIELDS = [
  'title',
  'description',
  'url',
  'imageUrl',
  'price',
  'primaryCurrency',
  'isHidden',
  'isCompleted',
  'priority',
];

export const validateWishPriority = (priority) => {
  if (!WISH_PRIORITIES.includes(priority)) {
    throw new HttpError(400, 'Priority must be low, medium or high');
  }

  return priority;
};

export const validateWishUpdate = (body) => {
  // Preserve the original bodyless completion endpoint.
  if (body === undefined) return { isCompleted: true };
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new HttpError(400, 'Expected a JSON object');
  }
  if (Object.keys(body).some((key) => !UPDATE_FIELDS.includes(key))) {
    throw new HttpError(400, 'Unknown wish field');
  }
  if (!Object.keys(body).length) throw new HttpError(400, 'No fields to update');

  const data = {};

  for (const key of ['title', 'description', 'url', 'imageUrl']) {
    if (!Object.hasOwn(body, key)) continue;
    if (key !== 'title' && body[key] === null) {
      data[key] = '';
      continue;
    }
    if (typeof body[key] !== 'string') throw new HttpError(400, key + ' must be a string');
    data[key] = body[key].trim();
  }
  if (Object.hasOwn(data, 'title') && (!data.title || data.title.length > 500)) {
    throw new HttpError(400, 'Title must contain 1 to 500 characters');
  }
  if (data.description?.length > 10000) throw new HttpError(400, 'Description is too long');

  for (const key of ['url', 'imageUrl']) {
    if (!data[key]) continue;
    let parsed;
    try {
      parsed = new URL(data[key]);
    } catch {
      throw new HttpError(400, key + ' must be an HTTP or HTTPS URL');
    }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password || data[key].length > 4096) {
      throw new HttpError(400, key + ' must be an HTTP or HTTPS URL without credentials');
    }
  }

  for (const key of ['isHidden', 'isCompleted']) {
    if (!Object.hasOwn(body, key)) continue;
    if (typeof body[key] !== 'boolean') throw new HttpError(400, key + ' must be a boolean');
    data[key] = body[key];
  }
  if (Object.hasOwn(body, 'priority')) data.priority = validateWishPriority(body.priority);
  if (Object.hasOwn(body, 'price')) data.price = normalizePrice(body.price);
  if (Object.hasOwn(body, 'primaryCurrency')) {
    if (typeof body.primaryCurrency !== 'string') throw new HttpError(400, 'Invalid price currency');
    data.primaryCurrency = body.primaryCurrency.trim().toUpperCase();
    if (!['USD', 'BYN', 'RUB'].includes(data.primaryCurrency)) {
      throw new HttpError(400, 'Price currency must be USD, BYN or RUB');
    }
  }

  return data;
};
