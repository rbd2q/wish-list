import mongoose from 'mongoose';

import { COLLECTION_COLORS, COLLECTION_ICONS } from '../constants/collections.js';

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, default: '', maxlength: 2000 },
    icon: {
      type: String,
      enum: COLLECTION_ICONS,
      default: 'house',
    },
    color: { type: String, enum: COLLECTION_COLORS, default: 'emerald' },
  },
  { timestamps: true },
);

schema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Collection', schema);
