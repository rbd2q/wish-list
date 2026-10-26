import { createHash } from 'node:crypto';
import { ipKeyGenerator, rateLimit } from 'express-rate-limit';

import {
  IMAGE_USER_RATE_LIMIT,
  LOGIN_ACCOUNT_RATE_LIMIT,
  LOGIN_IP_RATE_LIMIT,
  PARSE_USER_RATE_LIMIT,
  REGISTER_RATE_LIMIT,
  RESOURCE_IP_RATE_LIMIT,
} from '../config/rate-limits.js';

const MAX_LOGIN_EMAIL_LENGTH = 254;

const RATE_LIMIT_OPTIONS = {
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many requests. Please try again later.' },
  // Next.js forwards this header, but it is intentionally ignored while trust proxy is disabled.
  validate: { xForwardedForHeader: false },
};

const getLoginAccountKey = (req) => {
  const email =
    typeof req.body?.email === 'string' && req.body.email.length <= MAX_LOGIN_EMAIL_LENGTH
      ? req.body.email.trim().toLowerCase()
      : '';
  const accountKey = createHash('sha256').update(email).digest('hex');

  return `${ipKeyGenerator(req.ip)}:${accountKey}`;
};

export const loginIpRateLimiter = rateLimit({ ...RATE_LIMIT_OPTIONS, ...LOGIN_IP_RATE_LIMIT });
export const loginAccountRateLimiter = rateLimit({
  ...RATE_LIMIT_OPTIONS,
  ...LOGIN_ACCOUNT_RATE_LIMIT,
  keyGenerator: getLoginAccountKey,
  skipSuccessfulRequests: true,
});
export const registerRateLimiter = rateLimit({ ...RATE_LIMIT_OPTIONS, ...REGISTER_RATE_LIMIT });

const resourceIpRateLimiter = rateLimit({ ...RATE_LIMIT_OPTIONS, ...RESOURCE_IP_RATE_LIMIT });
const parseUserRateLimiter = rateLimit({
  ...RATE_LIMIT_OPTIONS,
  ...PARSE_USER_RATE_LIMIT,
  keyGenerator: (req) => req.userId,
});
const imageUserRateLimiter = rateLimit({
  ...RATE_LIMIT_OPTIONS,
  ...IMAGE_USER_RATE_LIMIT,
  keyGenerator: (req) => req.userId,
});

export const parseRateLimiters = [resourceIpRateLimiter, parseUserRateLimiter];
export const imageRateLimiters = [resourceIpRateLimiter, imageUserRateLimiter];

export const imageDownloadRateLimiter = (req, res, next) => {
  if (!Array.isArray(req.body?.imageUrls) || !req.body.imageUrls.length) return next();

  return resourceIpRateLimiter(req, res, (error) => {
    if (error) return next(error);

    return imageUserRateLimiter(req, res, next);
  });
};
