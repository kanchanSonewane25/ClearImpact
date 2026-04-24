import { Router } from 'express';
import Donation from '../models/Donation';
import { protect, admin } from '../middleware/auth';
import ImpactUpdate from '../models/ImpactUpdate';

const router = Router();

// Track a donation by trace ID (Public)
router.get('/track/:traceId', async (req: any, res: any) => {
  try {
    const donation = await Donation.findOne({ traceId: req.params.traceId }).populate('donor', 'name');
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    
    // Also fetch associated impact updates
    let updates: any[] = [];
    if (donation.donor) {
      updates = await ImpactUpdate.find({ donor: donation.donor._id });
    }
    res.json({ donation, updates });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create new donation (Logged in or Guest)
router.post('/create', async (req: any, res: any) => {
  const { amount, allocatedTo, guestName, guestEmail, userId } = req.body;
  try {
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
    });
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get user's donations (Protected)
router.get('/user', protect, async (req: any, res: any) => {
  try {
    const donations = await Donation.find({ donor: req.user.id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all donations (Admin)
router.get('/', protect, admin, async (req: any, res: any) => {
  try {
    const donations = await Donation.find().populate('donor', 'name email').sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update status (Admin)
router.put('/:id/status', protect, admin, async (req: any, res: any) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    
    donation.status = req.body.status || donation.status;
    const updated = await donation.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
