import mongoose from 'mongoose';

import { DEFAULT_WISH_PRIORITY, WISH_PRIORITIES } from '../constants/wishes.js';

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  isHidden: { type: Boolean, required: true },
  description: { type: String },
  url: { type: String },
  prices: { type: Object, required: true },
  primaryCurrency: { type: String, required: true },
  imageUrls: { type: [String], default: [] },
  tags: [{ type: String }],
  collectionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  sourceWishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wish' },
  priority: { type: String, enum: WISH_PRIORITIES, default: DEFAULT_WISH_PRIORITY },
  isCompleted: { type: Boolean, default: false },
});

schema.index({ userId: 1, collectionIds: 1 });

export default mongoose.model('Wish', schema);
