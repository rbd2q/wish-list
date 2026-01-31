import { validationResult } from 'express-validator';
import Wish from '../models/Wish.js';
import { getPrices } from '../utils/get-prices.js';
import * as cheerio from 'cheerio';

const parsers = {
  'catalog.onliner.by': async (html) => {
    const $ = cheerio.load(html);
    const title = $('.catalog-masthead__title').text().trim();
    const description = $('.offers-description__specs').text().trim();
    const priceText = $('.offers-description__price').text().trim();
    const price = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
    const imageUrl = $('.offers-description__image').attr('src');
    const images = $('.product-gallery__thumb-img')
      .map((index, image) => $(image).attr('src'))
      .get();

    return {
      title,
      description,
      price,
      imageUrl,
      images: images,
      primaryCurrency: 'BYN', // Для onliner это всегда BYN
    };
  },

  // TODO: Можно добавить другие парсеры для разных сайтов
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

    return res.status(200).json(filteredArray);
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

    return res.status(200).json(wishes);
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

    return res.status(200).json(wish);
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
    const { title, isHidden, description, url, price, prices, primaryCurrency, imageUrl, tags } = req.body;

    const pricesObject = prices ?? (await getPrices(primaryCurrency, price));

    const wish = new Wish({
      title,
      isHidden,
      description,
      url,
      prices: pricesObject,
      primaryCurrency,
      imageUrl,
      tags,
      userId: req.userId,
    });
    await wish.save();

    // console.log('WISH', wish, typeof wish, wish.title);
    // const user = await User.findByIdAndUpdate(req.userId, { $push: { wishes: wish } }, { new: true });
    // console.log('USER', user, user._doc);
    // const { password, ...data } = user._doc;
    return res.status(201).json(wish);
  } catch (e) {
    console.log('ERROR', e);
    res.status(500).json({ message: 'Something went wrong. Try again' });
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

    // Определяем, какой сайт парсим
    const hostname = new URL(url).hostname;
    const parser = Object.entries(parsers).find(([key]) => hostname.includes(key))?.[1];

    if (!parser) {
      return res.status(400).json({
        message: 'This website is not supported for parsing',
      });
    }

    // Получаем HTML страницы
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    // Проверяем успешность ответа
    if (!response.ok) {
      return res.status(response.status).json({
        message: 'Failed to fetch data from the website',
      });
    }

    // Получаем текст HTML страницы
    const html = await response.text();

    // Парсим данные используя соответствующий парсер
    const parsedData = await parser(html); // Используем html вместо response.data

    // Получаем цены в разных валютах
    const pricesObject = await getPrices(parsedData.primaryCurrency, parsedData.price);

    // Возвращаем результат
    return res.status(200).json({
      title: parsedData.title,
      description: parsedData.description,
      url,
      imageUrl: parsedData.imageUrl,
      images: parsedData.images,
      price: parsedData.price,
      prices: pricesObject,
      primaryCurrency: parsedData.primaryCurrency,
    });
  } catch (e) {
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

    return res.status(201).json(updatedWish);
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

    return res.status(201).json(deletedWish);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};
