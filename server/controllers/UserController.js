import { HttpError } from '../errors/http-error.js';
import User from '../models/User.js';
import { serializeUser } from '../serializers/user.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    throw new HttpError(404, 'Пользователь не найден');
  }

  return res.status(200).json(serializeUser(user));
};
