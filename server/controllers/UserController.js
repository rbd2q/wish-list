import User from '../models/User.js';
import { serializeUser } from '../serializers/user.js';

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    return res.status(200).json(serializeUser(user));
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};
