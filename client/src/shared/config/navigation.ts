export const navigationConfig = {
  home: '/',
  auth: '/auth',
  wishlist: '/wish-list',
  wish: (id: string) => `/wish-list/${encodeURIComponent(id)}`,
  editWish: (id: string) => `/wish-list/${encodeURIComponent(id)}/edit`,
  addWish: '/wish-list/add',
  ideas: '/ideas',
  profile: '/profile',
} as const;
