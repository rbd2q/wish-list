import { validationResult } from 'express-validator';
import Wish from '../models/Wish.js';

export const getAllMyWishes = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Something went wrong while creating user',
      });
    }

    const wishes = await Wish.find({ userId: req.userId });
    console.log('WISHES', wishes);

    return res.status(200).json(wishes);
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
        message: 'Something went wrong while creating user',
      });
    }
    const { title, isHidden, description, url, price, currency, imageUrl, tags } = req.body;

    const wish = new Wish({ title, isHidden, description, url, price, currency, imageUrl, tags, userId: req.userId });
    await wish.save();

    // console.log('WISH', wish, typeof wish, wish.title);
    // const user = await User.findByIdAndUpdate(req.userId, { $push: { wishes: wish } }, { new: true });
    // console.log('USER', user, user._doc);
    // const { password, ...data } = user._doc;
    return res.status(201).json(wish);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};
