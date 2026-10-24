import mongoose from 'mongoose';

import { DEFAULT_WISH_PRIORITY } from '../constants/wishes.js';
import Wish from '../models/Wish.js';
import { getPrices } from '../utils/get-prices.js';
import { uploadImageByUrl } from '../utils/upload-image.js';
import { validateCollectionIds } from '../validators/collection-validator.js';
import { validateWishPriority } from '../validators/wish-validator.js';
import { claimWishImage } from './wish-images.js';
import { lockOwnCollections, validateOwnCollections } from './collections.js';

export async function createWish({ userId, data, sourceWishId }) {
  const { title, isHidden, description, url, price, primaryCurrency, tags } = data;

  const priority = data.priority === undefined ? DEFAULT_WISH_PRIORITY : validateWishPriority(data.priority);
  const collectionIds = data.collectionIds === undefined ? [] : validateCollectionIds(data.collectionIds);

  await validateOwnCollections(userId, collectionIds);

  const prices = await getPrices(primaryCurrency, price);

  const imageUrls = data.imageUrls ?? [];
  const storedImageUrls = sourceWishId ? imageUrls : await Promise.all(imageUrls.map(uploadImageByUrl));

  const wishData = {
    title,
    priority,
    isHidden,
    description,
    url,
    prices,
    primaryCurrency,
    imageUrls: storedImageUrls,
    tags,
    userId,
    sourceWishId,
    collectionIds,
  };

  return mongoose.connection.transaction(async (session) => {
    if (!sourceWishId) {
      for (const imageUrl of imageUrls) await claimWishImage(userId, imageUrl, session);
    }
    await lockOwnCollections(userId, collectionIds, session);
    const [wish] = await Wish.create([wishData], { session });
    return wish;
  });
}
