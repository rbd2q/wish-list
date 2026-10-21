import config from 'config';
import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decodedToken = jwt.verify(token, config.get('jwt_secret_key'));

      if (typeof decodedToken.userId !== 'string' || !/^[a-f0-9]{24}$/i.test(decodedToken.userId)) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.userId = decodedToken.userId.toLowerCase();
      next();
    } catch {
      return res.status(403).json({ message: 'Нет доступа' });
    }
  } else {
    return res.status(403).json({ message: 'Нет доступа' });
  }
};

export const optionalAuth = (req, res, next) => {
  if (req.headers.authorization) return checkAuth(req, res, next);
  return next();
};
