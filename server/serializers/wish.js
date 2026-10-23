export const serializeWish = (wish, viewerId) => {
  if (!wish) return null;

  const data = {
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
    sourceWishId: wish.sourceWishId?.toString(),
    isCompleted: wish.isCompleted,
  };

  if (viewerId && wish.userId?.toString() === viewerId) {
    data.collectionIds = (wish.collectionIds ?? []).map((id) => id.toString());
  }

  return data;
};
