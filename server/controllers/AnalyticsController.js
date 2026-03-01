import User from '../models/User.js';
import Wish from '../models/Wish.js';
import Analytics from '../models/Analytics.js';

export const getCurrentUserAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const wishes = await Wish.find({ userId: req.userId });
    const completedWishes = [...wishes].filter((item) => item.isCompleted) ?? [];
    const uncompletedWishes = [...wishes].filter((item) => !item.isCompleted) ?? [];
    const percentageOfCompleted = Number(((completedWishes.length / [...wishes].length) * 100).toFixed(1));
    const percentageOfUncompleted = Number(((uncompletedWishes.length / [...wishes].length) * 100).toFixed(1));

    const sumOfCompleted = completedWishes.reduce((acc, item) => {
      return acc + Number(item.price);
    }, 0);
    const sumOfUncompleted = uncompletedWishes.reduce((acc, item) => {
      return acc + Number(item.price);
    }, 0);
    const biggestPurchase = completedWishes.reduce((prev, current) => {
      return prev && prev.price > current.price ? prev : current;
    });
    const biggestWish = uncompletedWishes.reduce((prev, current) => {
      return prev && prev.price > current.price ? prev : current;
    });

    const analytics = new Analytics({
      totalNumber: [...wishes].length ?? 0,
      completedNumber: completedWishes.length ?? 0,
      uncompletedNumber: uncompletedWishes.length ?? 0,
      percentageOfUncompletedNumber: percentageOfUncompleted ?? 0,
      percentageOfCompletedNumber: percentageOfCompleted ?? 0,
      sumOfCompleted: sumOfCompleted ?? 0,
      sumOfUncompleted: sumOfUncompleted ?? 0,
      biggestWish,
      biggestPurchase,
      userId: req.userId,
    });
    // await analytics.save();

    return res.status(200).json(analytics);
  } catch (e) {
    return res.status(500).json({
      message: 'Something went wrong. Try again',
      token: req.headers.authorization.replace(/Bearer\s?/, ''),
    });
  }
};
