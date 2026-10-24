import Wish from '../models/Wish.js';
import { createWish } from './create-wish.js';

export async function copyWish({ userId, wishId }) {
  const source = await Wish.findOne({
    _id: wishId,
    $or: [{ userId }, { isHidden: false }],
  });

  if (!source) return null;

  const price = source.prices?.[source.primaryCurrency];
  if (!Number.isFinite(price) || price < 0) {
    throw new Error('Source wish has an invalid price');
  }

  return createWish({
    userId,
    sourceWishId: source.sourceWishId ?? source._id,
    data: {
      title: source.title,
      description: source.description,
      isHidden: source.isHidden,
      url: source.url,
      imageUrls: source.imageUrls ?? [],
      tags: source.tags,
      primaryCurrency: source.primaryCurrency,
      price,
    },
  });
}
