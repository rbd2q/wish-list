import { validationResult } from 'express-validator';
import { isObjectIdOrHexString } from 'mongoose';

import { ExchangeRateError } from '../errors/exchange-rate-error.js';
import { HttpError } from '../errors/http-error.js';
import Wish from '../models/Wish.js';
import { serializeWish } from '../serializers/wish.js';
import { requireOwnCollection, setWishCollections } from '../services/collections.js';
import { copyWish } from '../services/copy-wish.js';
import { createWish } from '../services/create-wish.js';
import { uploadWishImage } from '../services/wish-images.js';
import { updateWish } from '../services/update-wish.js';
import { fetchPublicUrl } from '../utils/fetch-public-url.js';
import { getPrices } from '../utils/get-prices.js';
import { InvalidPriceError } from '../utils/normalize-price.js';
import { parseProduct } from '../utils/parse-product.js';
import { validateCollectionIds, validateId } from '../validators/collection-validator.js';
import { validateWishCreate, validateWishUpdate } from '../validators/wish-validator.js';

export const getFullWishesList = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Something went wrong while getting wishlist items',
      });
    }

    const wishes = await Wish.find({ isHidden: false });
    //TODO find out if there is a better way for filtering array
    const filteredArray = wishes.filter((item) => item.userId && item.userId.toString() !== req.userId);

    return res.status(200).json(filteredArray.map((wish) => serializeWish(wish)));
  } catch {
    res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};

export const getAllMyWishes = async (req, res) => {
  const filter = { userId: req.userId };
  const { collectionId, withoutCollection } = req.query;

  if (collectionId !== undefined && withoutCollection !== undefined) {
    throw new HttpError(400, 'Use either collectionId or withoutCollection');
  }
  if (collectionId !== undefined) {
    const collection = await requireOwnCollection(req.userId, collectionId);
    filter.collectionIds = collection._id;
  }
  if (withoutCollection !== undefined) {
    if (withoutCollection !== 'true') throw new HttpError(400, 'withoutCollection must be true');
    filter['collectionIds.0'] = { $exists: false };
  }

  const wishes = await Wish.find(filter);
  return res.json(wishes.map((wish) => serializeWish(wish, req.userId)));
};

export const getWishListItem = async (req, res) => {
  const wish = await Wish.findById(validateId(req.params.id));
  if (!wish) throw new HttpError(404, 'This item does not exist');

  const isOwner = req.userId && wish.userId?.toString() === req.userId;
  if (wish.isHidden !== false && !isOwner) {
    throw new HttpError(404, 'This item does not exist');
  }

  return res.json(serializeWish(wish, req.userId));
};

export const create = async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      throw new HttpError(400, 'Expected a JSON object');
    }
    const wish = await createWish({ userId: req.userId, data: validateWishCreate(req.body) });
    return res.status(201).json(serializeWish(wish, req.userId));
  } catch (e) {
    if (e instanceof HttpError) return next(e);
    if (e instanceof InvalidPriceError) {
      return res.status(400).json({ message: e.message });
    }

    if (e instanceof ExchangeRateError) {
      return res.status(503).json({ message: e.message });
    }

    return next(e);
  }
};

export const copy = async (req, res) => {
  if (!isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ message: 'Invalid wish ID' });
  }

  try {
    const wish = await copyWish({ userId: req.userId, wishId: req.params.id });
    if (!wish) {
      return res.status(404).json({ message: 'This item does not exist' });
    }

    return res.status(201).json(serializeWish(wish, req.userId));
  } catch (error) {
    console.error('Failed to copy wish', error);
    if (error instanceof ExchangeRateError) {
      return res.status(503).json({ message: error.message });
    }
    if (error instanceof InvalidPriceError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};

export const parse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid request data',
      });
    }

    const url = req.body?.url;
    if (!url) {
      return res.status(400).json({
        message: 'URL is required',
      });
    }

    const response = await fetchPublicUrl(url);
    if (!response.ok) {
      return res.status(response.status).json({
        message: 'Failed to fetch data from the website',
      });
    }

    const parsed = await parseProduct(response.body.toString('utf8'), response.url);
    if (!parsed.title) {
      return res.status(400).json({
        message: 'Could not extract product data from this page',
      });
    }

    const primaryCurrency = parsed.primaryCurrency ?? 'USD';
    const pricesObject =
      parsed.price != null && Number.isFinite(parsed.price) ? await getPrices(primaryCurrency, parsed.price) : {};

    return res.status(200).json({
      title: parsed.title,
      description: parsed.description ?? undefined,
      url,
      imageUrl: parsed.imageUrl ?? undefined,
      images: parsed.images ?? [],
      price: parsed.price ?? undefined,
      prices: pricesObject,
      primaryCurrency,
    });
  } catch (e) {
    if (e instanceof HttpError) return res.status(e.status).json({ message: e.message });
    if (e instanceof ExchangeRateError) {
      return res.status(503).json({ message: e.message });
    }
    if (e instanceof InvalidPriceError) {
      return res.status(400).json({ message: e.message });
    }

    return res.status(500).json({
      message: 'Something went wrong while parsing the website',
    });
  }
};

export const update = async (req, res, next) => {
  try {
    const body = req.headers['content-length'] === '0' ? undefined : req.body;
    const data = validateWishUpdate(body);
    const wish = await updateWish({ userId: req.userId, wishId: req.params.id, data });

    return res.status(201).json(serializeWish(wish, req.userId));
  } catch (error) {
    if (error instanceof InvalidPriceError) return res.status(400).json({ message: error.message });
    if (error instanceof ExchangeRateError) return res.status(503).json({ message: error.message });

    return next(error);
  }
};

export const updateCollections = async (req, res) => {
  if (!req.body || Object.keys(req.body).length !== 1 || !Object.hasOwn(req.body, 'collectionIds')) {
    throw new HttpError(400, 'Expected collectionIds only');
  }
  const collectionIds = validateCollectionIds(req.body.collectionIds);
  const wish = await setWishCollections(req.userId, req.params.id, collectionIds);
  return res.json(serializeWish(wish, req.userId));
};

export const deleteItem = async (req, res) => {
  const wish = await Wish.findOneAndDelete({
    _id: validateId(req.params.id),
    userId: req.userId,
  });
  if (!wish) throw new HttpError(404, 'Wish not found');
  return res.status(201).json(serializeWish(wish, req.userId));
};

export const uploadImage = async (req, res) => {
  const imageUrl = await uploadWishImage(req.userId, req.body);

  return res.status(201).json({ imageUrl });
};
