import mongoose from 'mongoose';

import { DEFAULT_WISH_PRIORITY } from '../constants/wishes.js';
import Wish from '../models/Wish.js';
import { getPrices } from '../utils/get-prices.js';
import { uploadImageByUrl } from '../utils/upload-image.js';
import { validateCollectionIds } from '../validators/collection-validator.js';
import { validateWishPriority } from '../validators/wish-validator.js';
import { lockOwnCollections, validateOwnCollections } from './collections.js';

export async function createWish({ userId, data, sourceWishId }) {
  const { title, isHidden, description, url, price, primaryCurrency, imageUrl, tags } = data;

  const priority = data.priority === undefined ? DEFAULT_WISH_PRIORITY : validateWishPriority(data.priority);
  const collectionIds = data.collectionIds === undefined ? [] : validateCollectionIds(data.collectionIds);

  await validateOwnCollections(userId, collectionIds);

  const prices = await getPrices(primaryCurrency, price);

  const storedImageUrl = imageUrl ? await uploadImageByUrl(imageUrl) : undefined;

  const wishData = {
    title,
    priority,
    isHidden,
    description,
    url,
    prices,
    primaryCurrency,
    imageUrl: storedImageUrl,
    tags,
    userId,
    sourceWishId,
    collectionIds,
  };

  if (!collectionIds.length) return Wish.create(wishData);

  return mongoose.connection.transaction(async (session) => {
    await lockOwnCollections(userId, collectionIds, session);
    const [wish] = await Wish.create([wishData], { session });
    return wish;
  });
}
