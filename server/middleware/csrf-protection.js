import { HttpError } from '../errors/http-error.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export const csrfProtection = (req, res, next) => {
  if (SAFE_METHODS.has(req.method)) return next();

  // A custom header requires a CORS preflight. This API grants no cross-origin access.
  if (req.get('X-CSRF-Protection') !== '1' || req.get('Sec-Fetch-Site') === 'cross-site') {
    throw new HttpError(403, 'Invalid request origin');
  }

  return next();
};
