import { Router } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Donation from '../models/Donation';
import { generate80GReceipt } from '../utils/pdfGenerator';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// Create Order
router.post('/create-order', async (req: any, res: any) => {
  try {
    const { amount, allocatedTo, guestName, guestEmail, userId } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: 'INR',
      receipt: `receipt_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);

    // Create pending donation in DB
    const year = new Date().getFullYear();
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const traceId = `CI-${year}-${randomCode}`;

    const donation = await Donation.create({
      donor: userId || undefined,
      guestName: userId ? undefined : guestName,
      guestEmail: userId ? undefined : guestEmail,
      amount,
      allocatedTo,
      traceId,
      razorpayOrderId: order.id,
      status: 'pending',
    });

    res.status(200).json({ order, donation });
  } catch (error) {
    console.error('Error creating order', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Verify Payment
router.post('/verify', async (req: any, res: any) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationId } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const donation = await Donation.findById(donationId).populate('donor');
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }

      donation.status = 'completed';
      donation.razorpayPaymentId = razorpay_payment_id;
      // In a real app, you might save the receipt to S3/Cloudinary and store the URL.
      // Here we will provide an endpoint to download it on demand.
      donation.receiptUrl = `/api/payments/receipt/${donation.traceId}`;
      await donation.save();

      res.status(200).json({ success: true, message: 'Payment verified successfully', donation });
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during verification' });
  }
});

// Download Receipt
router.get('/receipt/:traceId', async (req: any, res: any) => {
  try {
    const donation = await Donation.findOne({ traceId: req.params.traceId }).populate('donor');
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    if (donation.status !== 'completed' && donation.status !== 'deployed') {
      return res.status(400).json({ message: 'Receipt not available for this status' });
    }

    generate80GReceipt(donation, res);
  } catch (error) {
    res.status(500).json({ message: 'Server error generating receipt' });
  }
});

export default router;
