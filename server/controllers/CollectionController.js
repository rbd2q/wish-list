import { HttpError } from '../errors/http-error.js';
import Collection from '../models/Collection.js';
import { serializeCollection } from '../serializers/collection.js';
import { getCollections, removeCollection } from '../services/collections.js';
import { validateCollectionInput, validateId } from '../validators/collection-validator.js';

export async function getAll(req, res) {
  const collections = await getCollections(req.userId);
  return res.json(collections.map(serializeCollection));
}

export async function getOne(req, res) {
  const [collection] = await getCollections(req.userId, req.params.id);
  if (!collection) throw new HttpError(404, 'Collection not found');
  return res.json(serializeCollection(collection));
}

export async function create(req, res) {
  const data = validateCollectionInput(req.body);
  const collection = await Collection.create({ ...data, userId: req.userId });
  return res.status(201).json(serializeCollection(collection));
}

export async function update(req, res) {
  const id = validateId(req.params.id);
  const data = validateCollectionInput(req.body, { partial: true });
  const collection = await Collection.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { $set: data },
    { new: true, runValidators: true },
  );
  if (!collection) throw new HttpError(404, 'Collection not found');
  const [summary] = await getCollections(req.userId, id);
  if (!summary) throw new HttpError(404, 'Collection not found');
  return res.json(serializeCollection(summary));
}

export async function remove(req, res) {
  await removeCollection(req.userId, req.params.id);
  return res.status(204).end();
}
