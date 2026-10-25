export const WISHLIST_QUERY_KEYS = {
  details: ['wish-list-item'],
  detail: (id: string | null) => ['wish-list-item', id] as const,
  ideas: ['all-wishes'],
  currentUser: ['current-user-wish-list'],
} as const;
