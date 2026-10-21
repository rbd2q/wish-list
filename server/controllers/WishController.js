import { isObjectIdOrHexString } from 'mongoose';
import { validationResult } from 'express-validator';
import Wish from '../models/Wish.js';
import { serializeWish } from '../serializers/wish.js';
import { getPrices } from '../utils/get-prices.js';
import { ExchangeRateError } from '../errors/exchange-rate-error.js';
import { InvalidPriceError } from '../utils/normalize-price.js';
import { parseProduct } from '../utils/parse-product.js';
import { uploadImageByUrl } from '../utils/upload-image.js';
import { createWish } from '../services/create-wish.js';
import { copyWish } from '../services/copy-wish.js';

const FETCH_OPTIONS = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
};

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

    return res.status(200).json(filteredArray.map(serializeWish));
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};

export const getAllMyWishes = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Something went wrong while getting wishlist items',
      });
    }

    const wishes = await Wish.find({ userId: req.userId });

    return res.status(200).json(wishes.map(serializeWish));
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};

export const getWishListItem = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Something went wrong while getting wishlist item',
      });
    }

    const { id } = req.params;
    const wish = await Wish.findById(id);

    if (!wish) {
      return res.status(404).json({ message: 'This item does not exist' });
    }

    return res.status(200).json(serializeWish(wish));
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};

export const create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Something went wrong while creating item',
      });
    }

    const wish = await createWish({ userId: req.userId, data: req.body });
    return res.status(201).json(serializeWish(wish));
  } catch (e) {
    if (e instanceof InvalidPriceError) {
      return res.status(400).json({ message: e.message });
    }

    console.error('Failed to create wish', e);
    if (e instanceof ExchangeRateError) {
      return res.status(503).json({ message: e.message });
    }

    return res.status(500).json({ message: 'Something went wrong. Try again' });
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

    return res.status(201).json(serializeWish(wish));
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

    const { url } = req.body;
    if (!url) {
      return res.status(400).json({
        message: 'URL is required',
      });
    }

    const response = await fetch(url, FETCH_OPTIONS);
    if (!response.ok) {
      return res.status(response.status).json({
        message: 'Failed to fetch data from the website',
      });
    }

    const parsed = await parseProduct(await response.text(), url);
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

export const update = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Something went wrong while updating item',
      });
    }

    const { id } = req.params;
    const updatedWish = await Wish.findByIdAndUpdate(id, { isCompleted: true });
    await updatedWish.save();

    return res.status(201).json(serializeWish(updatedWish));
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Something went wrong while updating item',
      });
    }

    const { id } = req.params;
    const deletedWish = await Wish.findByIdAndDelete(id);

    return res.status(201).json(serializeWish(deletedWish));
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};
