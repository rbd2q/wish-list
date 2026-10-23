export const navigationConfig = {
  home: '/',
  auth: '/auth',
  wishlist: '/wish-list',
  wish: (id: string) => `/wish-list/${encodeURIComponent(id)}`,
  addWish: '/wish-list/add',
  ideas: '/ideas',
  profile: '/profile',
} as const;
