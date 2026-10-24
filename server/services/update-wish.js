import mongoose from 'mongoose';

import { HttpError } from '../errors/http-error.js';
import Wish from '../models/Wish.js';
import { getPrices } from '../utils/get-prices.js';
import { uploadImageByUrl } from '../utils/upload-image.js';
import { validateId } from '../validators/collection-validator.js';
import { lockOwnCollections } from './collections.js';
import { claimWishImage } from './wish-images.js';

export const updateWish = async ({ userId, wishId, data }) => {
  const filter = { _id: validateId(wishId), userId };
  const existingWish = await Wish.findOne(filter);
  if (!existingWish) throw new HttpError(404, 'Wish not found');

  const { price, ...updates } = data;
  const existingImageUrls = existingWish.imageUrls ?? [];
  const newImageUrls = data.imageUrls?.filter((url) => !existingImageUrls.includes(url)) ?? [];
  const hasCollectionIds = Object.hasOwn(data, 'collectionIds');

  if (Object.hasOwn(data, 'price') || Object.hasOwn(data, 'primaryCurrency')) {
    const primaryCurrency = data.primaryCurrency ?? existingWish.primaryCurrency;
    const amount = price ?? existingWish.prices?.[primaryCurrency];
    updates.prices = await getPrices(primaryCurrency, amount);
    updates.primaryCurrency = primaryCurrency;
  }
  if (Object.hasOwn(data, 'imageUrls')) {
    updates.imageUrls = await Promise.all(
      data.imageUrls.map((url) => (existingImageUrls.includes(url) ? url : uploadImageByUrl(url))),
    );
  }

  const saveWish = async (session) => {
    if (hasCollectionIds) await lockOwnCollections(userId, updates.collectionIds, session);
    for (const imageUrl of newImageUrls) await claimWishImage(userId, imageUrl, session);
    const wish = await Wish.findOneAndUpdate(filter, { $set: updates }, { new: true, runValidators: true, session });
    if (!wish) throw new HttpError(404, 'Wish not found');

    return wish;
  };

  if (hasCollectionIds || newImageUrls.length) return mongoose.connection.transaction(saveWish);

  return saveWish();
};
