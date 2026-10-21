import mongoose from 'mongoose';

import Wish from '../models/Wish.js';
import { getPrices } from '../utils/get-prices.js';
import { uploadImageByUrl } from '../utils/upload-image.js';
import { validateCollectionIds } from '../validators/collection-validator.js';
import { lockOwnCollections, validateOwnCollections } from './collections.js';

export async function createWish({ userId, data }) {
  const { title, isHidden, description, url, price, primaryCurrency, imageUrl, tags } = data;

  const collectionIds = data.collectionIds === undefined ? [] : validateCollectionIds(data.collectionIds);

  await validateOwnCollections(userId, collectionIds);

  const prices = await getPrices(primaryCurrency, price);

  const storedImageUrl = imageUrl ? await uploadImageByUrl(imageUrl) : undefined;

  const wishData = {
    title,
    isHidden,
    description,
    url,
    prices,
    primaryCurrency,
    imageUrl: storedImageUrl,
    tags,
    userId,
    collectionIds,
  };

  if (!collectionIds.length) return Wish.create(wishData);

  return mongoose.connection.transaction(async (session) => {
    await lockOwnCollections(userId, collectionIds, session);
    const [wish] = await Wish.create([wishData], { session });
    return wish;
  });
}
