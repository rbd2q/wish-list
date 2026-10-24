export const getStoreUrl = (url?: string): string | undefined => {
  return url && /^https?:\/\//i.test(url) ? url : undefined;
};
