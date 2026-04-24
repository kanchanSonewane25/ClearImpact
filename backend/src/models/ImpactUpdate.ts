import mongoose from 'mongoose';

const impactUpdateSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportTitle: { type: String, required: true },
  category: { type: String, required: true },
  notes: { type: String },
  fileUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('ImpactUpdate', impactUpdateSchema);
