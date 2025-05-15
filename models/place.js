import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  title: String,
  desc: String,
  img: String,
  category: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Place', placeSchema);
