import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  isHidden: { type: Boolean, required: true },
  description: { type: String },
  url: { type: String },
  prices: { type: Object, required: true },
  primaryCurrency: { type: String, required: true },
  imageUrl: { type: String },
  tags: [{ type: String }],
  date: { type: Date, default: Date.now() },
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  isCompleted: { type: Boolean, default: false },
});

export default mongoose.model('Wish', schema);
