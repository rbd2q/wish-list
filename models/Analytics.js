import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  totalNumber: { type: Number, required: true },
  completedNumber: { type: Number, required: true },
  uncompletedNumber: { type: Number, required: true },
  percentageOfUncompletedNumber: { type: Number, required: true },
  percentageOfCompletedNumber: { type: Number, required: true },
  sumOfCompleted: { type: Number, required: true },
  sumOfUncompleted: { type: Number, required: true },
  biggestWish: { type: mongoose.Types.ObjectId, ref: 'Wish' },
  biggestPurchase: { type: mongoose.Types.ObjectId, ref: 'Wish' },
});

export default mongoose.model('Analytics', schema);
