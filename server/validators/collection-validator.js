import { isObjectIdOrHexString } from 'mongoose';

import { COLLECTION_COLORS, COLLECTION_ICONS } from '../constants/collections.js';
import { HttpError } from '../errors/http-error.js';

export function validateId(id) {
  if (typeof id !== 'string' || !isObjectIdOrHexString(id)) {
    throw new HttpError(400, 'Invalid ID');
  }

  return id.toLowerCase();
}

export function validateCollectionIds(value) {
  if (!Array.isArray(value)) throw new HttpError(400, 'collectionIds must be an array');

  return [...new Set(value.map(validateId))].sort();
}

export function validateCollectionInput(body, { partial = false } = {}) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new HttpError(400, 'Expected a JSON object');
  }

  const fields = ['name', 'description', 'icon', 'color'];

  if (Object.keys(body).some((key) => !fields.includes(key))) {
    throw new HttpError(400, 'Unknown collection field');
  }

  const data = {};

  for (const key of fields) {
    if (!Object.hasOwn(body, key)) continue;
    if (typeof body[key] !== 'string') throw new HttpError(400, key + ' must be a string');
    data[key] = body[key].trim();
  }

  const shouldValidateName = !partial || Object.hasOwn(data, 'name');

  if (shouldValidateName && (!data.name || data.name.length > 120)) {
    throw new HttpError(400, 'Name must contain 1 to 120 characters');
  }

  if (data.description?.length > 2000) throw new HttpError(400, 'Description is too long');

  if (data.icon !== undefined && !COLLECTION_ICONS.includes(data.icon)) {
    throw new HttpError(400, 'Unsupported collection icon');
  }
  if (data.color !== undefined && !COLLECTION_COLORS.includes(data.color)) {
    throw new HttpError(400, 'Unsupported collection color');
  }

  if (partial && !Object.keys(data).length) throw new HttpError(400, 'No fields to update');

  return data;
}
