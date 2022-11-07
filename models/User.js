const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishes: [{ type: Types.ObjectId, ref: 'Wish' }],
});

module.exports = model('User', schema);
