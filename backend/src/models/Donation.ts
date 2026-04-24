import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestName: { type: String },
  guestEmail: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  traceId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'deployed', 'completed', 'cancelled'], default: 'pending' },
  allocatedTo: { type: String, default: 'General' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  receiptUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Donation', donationSchema);
