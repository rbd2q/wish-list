export function serializeCollection(collection) {
  return {
    id: collection._id.toString(),
    name: collection.name,
    description: collection.description,
    icon: collection.icon,
    color: collection.color,
    createdAt: collection.createdAt,
    updatedAt: collection.updatedAt,
    wishCount: collection.wishCount ?? 0,
    previewImages: collection.previewImages ?? [],
  };
}
