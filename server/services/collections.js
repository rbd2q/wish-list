import mongoose from 'mongoose';

import { HttpError } from '../errors/http-error.js';
import Collection from '../models/Collection.js';
import Wish from '../models/Wish.js';
import { validateId } from '../validators/collection-validator.js';

export async function requireOwnCollection(userId, id) {
  const collection = await Collection.findOne({ _id: validateId(id), userId });
  if (!collection) throw new HttpError(404, 'Collection not found');
  return collection;
}

export async function validateOwnCollections(userId, collectionIds) {
  if (!collectionIds.length) return;
  const count = await Collection.countDocuments({ _id: { $in: collectionIds }, userId });
  if (count !== collectionIds.length) throw new HttpError(404, 'Collection not found');
}

export async function lockOwnCollections(userId, collectionIds, session) {
  if (!collectionIds.length) return;
  // A real write conflicts with concurrent deletion, including a newly created wish.
  const result = await Collection.updateMany(
    { _id: { $in: collectionIds }, userId },
    { $inc: { __v: 1 } },
    { session, timestamps: false },
  );
  if (result.matchedCount !== collectionIds.length) {
    throw new HttpError(404, 'Collection not found');
  }
}

export async function getCollections(userId, id) {
  const filter = { userId };
  if (id) filter._id = validateId(id);

  const collections = await Collection.find(filter).sort({ createdAt: -1, _id: -1 }).lean();
  if (!collections.length) return [];

  const collectionsById = new Map();

  for (const collection of collections) {
    collection.wishCount = 0;
    collection.previewImages = [];
    collectionsById.set(collection._id.toString(), collection);
  }

  const wishes = await Wish.find({
    userId,
    collectionIds: { $in: collections.map((collection) => collection._id) },
  })
    .select('collectionIds imageUrl')
    .sort({ date: -1, _id: -1 })
    .lean();

  for (const wish of wishes) {
    const collectionIds = new Set(wish.collectionIds.map((id) => id.toString()));

    for (const collectionId of collectionIds) {
      const collection = collectionsById.get(collectionId);
      if (!collection) continue;

      collection.wishCount += 1;
      if (typeof wish.imageUrl === 'string' && wish.imageUrl.length > 0 && collection.previewImages.length < 3) {
        collection.previewImages.push(wish.imageUrl);
      }
    }
  }

  return collections;
}

export async function removeCollection(userId, id) {
  validateId(id);
  await mongoose.connection.transaction(async (session) => {
    const collection = await Collection.findOneAndDelete({ _id: id, userId }, { session });
    if (!collection) throw new HttpError(404, 'Collection not found');
    await Wish.updateMany(
      { userId, collectionIds: collection._id },
      { $pull: { collectionIds: collection._id } },
      { session },
    );
  });
}

export async function setWishCollections(userId, wishId, collectionIds) {
  validateId(wishId);
  return mongoose.connection.transaction(async (session) => {
    const wish = await Wish.findOne({ _id: wishId, userId }).session(session);
    if (!wish) throw new HttpError(404, 'Wish not found');
    await lockOwnCollections(userId, collectionIds, session);
    wish.collectionIds = collectionIds;
    await wish.save({ session });
    return wish;
  });
}
