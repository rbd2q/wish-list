import { HOUR, MINUTE } from 'express-rate-limit';

export const LOGIN_IP_RATE_LIMIT = { identifier: 'login-ip', windowMs: 15 * MINUTE, limit: 100 };
export const LOGIN_ACCOUNT_RATE_LIMIT = { identifier: 'login-account', windowMs: 15 * MINUTE, limit: 10 };
export const REGISTER_RATE_LIMIT = { identifier: 'register-ip', windowMs: HOUR, limit: 5 };
export const RESOURCE_IP_RATE_LIMIT = { identifier: 'resource-ip', windowMs: 15 * MINUTE, limit: 120 };
export const PARSE_USER_RATE_LIMIT = { identifier: 'parse-user', windowMs: 5 * MINUTE, limit: 20 };
export const IMAGE_USER_RATE_LIMIT = { identifier: 'image-user', windowMs: 15 * MINUTE, limit: 30 };
