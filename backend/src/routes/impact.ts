import { Router } from 'express';
import ImpactUpdate from '../models/ImpactUpdate';
import { protect, admin } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Add impact update (Admin)
router.post('/add', protect, admin, upload.single('reportFile'), async (req: any, res: any) => {
  const { donorId, reportTitle, category, notes } = req.body;
  
  // If file was uploaded successfully, Cloudinary URL will be in req.file.path
  const fileUrl = req.file ? req.file.path : req.body.fileUrl;

  try {
    const update = await ImpactUpdate.create({
      donor: donorId,
      reportTitle,
      category,
      notes,
      fileUrl
    });
    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get reports (Admin)
router.get('/', protect, admin, async (req: any, res: any) => {
  try {
    const reports = await ImpactUpdate.find().populate('donor', 'name email').sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get user's reports (Protected)
router.get('/user', protect, async (req: any, res: any) => {
  try {
    const reports = await ImpactUpdate.find({ donor: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
