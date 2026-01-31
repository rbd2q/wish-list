import config from 'config';
import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decodedToken = jwt.verify(token, config.get('jwt_secret_key'));

      req.userId = decodedToken.userId;
      next();
    } catch (e) {
      return res.status(403).json({ message: 'Нет доступа' });
    }
  } else {
    return res.status(403).json({ message: 'Нет доступа' });
  }
};
