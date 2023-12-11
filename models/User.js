import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  wishes: [{ type: mongoose.Types.ObjectId, ref: 'Wish' }],
});

export default mongoose.model('User', schema);
