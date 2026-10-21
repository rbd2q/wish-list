export const serializeWish = (wish) => {
  if (!wish) return null;

  return {
    id: wish._id.toString(),
    title: wish.title,
    isHidden: wish.isHidden,
    description: wish.description,
    url: wish.url,
    prices: wish.prices,
    primaryCurrency: wish.primaryCurrency,
    imageUrl: wish.imageUrl,
    tags: wish.tags,
    date: wish.date,
    userId: wish.userId?.toString(),
    isCompleted: wish.isCompleted,
  };
};
