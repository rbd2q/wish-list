import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  imageUrl: { type: String, required: true, unique: true },
  publicId: { type: String, required: true },
  deleting: { type: Boolean, default: false },
  claimed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

schema.index({ claimed: 1, createdAt: 1 });

export default mongoose.model('WishImage', schema);
