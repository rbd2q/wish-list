export const ACCESS_COOKIE_NAME = 'wish_access';
export const REFRESH_COOKIE_NAME = 'wish_refresh';
export const ACCESS_DURATION_SECONDS = 2 * 60 * 60;
export const REFRESH_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
export const REFRESH_ROTATION_GRACE_MS = 10 * 1000;
export const ACCESS_TOKEN_ISSUER = 'wish-list';
export const ACCESS_TOKEN_AUDIENCE = 'wish-list-api';

export const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/api',
};

export const REFRESH_COOKIE_OPTIONS = { ...ACCESS_COOKIE_OPTIONS, path: '/api/auth' };
