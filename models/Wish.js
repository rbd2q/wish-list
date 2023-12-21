import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  isHidden: { type: Boolean, required: true },
  description: { type: String },
  url: { type: String },
  price: { type: String, required: true },
  currency: { type: String, required: true },
  imageUrl: { type: String },
  tags: [{ type: String }],
  date: { type: Date, default: Date.now() },
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Wish', schema);
