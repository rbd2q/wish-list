export const navigationConfig = {
  home: '/',
  auth: '/auth',
  wishlist: '/wish-list',
  wish: (id: string) => `/wish-list/${encodeURIComponent(id)}`,
  editWish: (id: string) => `/wish-list/${encodeURIComponent(id)}/edit`,
  addWish: '/wish-list/add',
  collections: '/collections',
  newCollection: '/collections/new',
  editCollection: (id: string) => `/collections/${encodeURIComponent(id)}/edit`,
  ideas: '/ideas',
  profile: '/profile',
} as const;
