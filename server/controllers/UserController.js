import { HttpError } from '../errors/http-error.js';
import Collection from '../models/Collection.js';
import User from '../models/User.js';
import Wish from '../models/Wish.js';
import { serializeUser } from '../serializers/user.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    throw new HttpError(404, 'Пользователь не найден');
  }

  return res.status(200).json(serializeUser(user));
};

export const getCurrentUserStats = async (req, res) => {
  const userCurrency = await User.findById(req.userId).select('preferredCurrency');

  if (!userCurrency) {
    throw new HttpError(404, 'Пользователь не найден');
  }

  const currency = userCurrency.preferredCurrency;
  const [wishes, collectionCount] = await Promise.all([
    Wish.find({ userId: userCurrency._id }).select('prices -_id').lean(),
    Collection.countDocuments({ userId: userCurrency._id }),
  ]);

  const wishCount = wishes.length;
  const hasCompletePrices = wishes.every((wish) => Number.isFinite(wish.prices?.[currency]));
  const sum = hasCompletePrices ? wishes.reduce((total, wish) => total + wish.prices[currency], 0) : null;
  const totalPrice = Number.isFinite(sum) ? sum : null;

  return res.json({ wishCount, collectionCount, totalPrice, currency });
};
