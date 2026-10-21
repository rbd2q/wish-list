import { getPrices } from '../utils/get-prices.js';
import { uploadImageByUrl } from '../utils/upload-image.js';
import Wish from '../models/Wish.js';

export async function createWish({ userId, data }) {
  const { title, isHidden, description, url, price, primaryCurrency, imageUrl, tags } = data;

  const prices = await getPrices(primaryCurrency, price);

  const storedImageUrl = imageUrl ? await uploadImageByUrl(imageUrl) : undefined;

  return Wish.create({
    title,
    isHidden,
    description,
    url,
    prices,
    primaryCurrency,
    imageUrl: storedImageUrl,
    tags,
    userId,
  });
}
