import User from '../models/User.js';

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { password, ...data } = user._doc;
    return res.status(200).json({ ...data });
  } catch (e) {
    return res.status(500).json({
      message: 'Something went wrong. Try again',
      token: req.headers.authorization.replace(/Bearer\s?/, ''),
    });
  }
};
