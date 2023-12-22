import { validationResult } from 'express-validator';
import Wish from '../models/Wish.js';
import { getPrices } from '../utils/get-prices.js';

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

    return res.status(200).json(wishes);
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
    const { title, isHidden, description, url, price, primaryCurrency, imageUrl, tags } = req.body;

    const prices = await getPrices(primaryCurrency, price);

    const wish = new Wish({
      title,
      isHidden,
      description,
      url,
      prices,
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
