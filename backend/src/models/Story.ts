import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  residentName: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Story', storySchema);
