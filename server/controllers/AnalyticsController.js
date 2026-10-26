import User from '../models/User.js';
import Wish from '../models/Wish.js';
import Analytics from '../models/Analytics.js';

const SUPPORTED_CURRENCIES = ['USD', 'BYN', 'RUB'];
const DEFAULT_CURRENCY = 'BYN';
const PERCENTAGE_MULTIPLIER = 100;
const PERCENTAGE_DECIMAL_PLACES = 1;
const PRICE_DECIMAL_PLACES = 2;

const getPercentage = (count, total) => {
  if (!total) return 0;

  return Number(((count / total) * PERCENTAGE_MULTIPLIER).toFixed(PERCENTAGE_DECIMAL_PLACES));
};

const summarizeWishes = (wishes, currency) => {
  let sum = 0;
  let biggestWish = null;

  for (const wish of wishes) {
    const price = wish.prices?.[currency];

    if (!Number.isFinite(price) || price < 0) {
      throw new Error('Wish has an invalid price for analytics currency');
    }

    sum += price;
    if (!biggestWish || price > biggestWish.prices[currency]) biggestWish = wish;
  }

  if (!Number.isFinite(sum)) throw new Error('Analytics price total is too large');

  return {
    sum: Number(sum.toFixed(PRICE_DECIMAL_PLACES)),
    biggestWishId: biggestWish?._id ?? null,
  };
};

export const getCurrentUserAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const currency = SUPPORTED_CURRENCIES.includes(user.preferredCurrency) ? user.preferredCurrency : DEFAULT_CURRENCY;
    const wishes = await Wish.find({ userId: req.userId });
    const completedWishes = wishes.filter((wish) => wish.isCompleted);
    const uncompletedWishes = wishes.filter((wish) => !wish.isCompleted);
    const completedSummary = summarizeWishes(completedWishes, currency);
    const uncompletedSummary = summarizeWishes(uncompletedWishes, currency);

    const analytics = new Analytics({
      currency,
      totalNumber: wishes.length,
      completedNumber: completedWishes.length,
      uncompletedNumber: uncompletedWishes.length,
      percentageOfUncompletedNumber: getPercentage(uncompletedWishes.length, wishes.length),
      percentageOfCompletedNumber: getPercentage(completedWishes.length, wishes.length),
      sumOfCompleted: completedSummary.sum,
      sumOfUncompleted: uncompletedSummary.sum,
      biggestWish: uncompletedSummary.biggestWishId,
      biggestPurchase: completedSummary.biggestWishId,
    });

    return res.status(200).json(analytics);
  } catch (error) {
    console.error('Failed to get current user analytics', error);

    return res.status(500).json({
      message: 'Something went wrong. Try again',
    });
  }
};
