export const COLLECTION_QUERY_KEYS = {
  all: ['collections'],
  detail: (id?: string) => ['collections', 'detail', id],
} as const;
