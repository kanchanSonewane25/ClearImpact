import { Router } from 'express';
import Story from '../models/Story';
import { protect, admin } from '../middleware/auth';

const router = Router();

// Get all stories (Public)
router.get('/', async (req: any, res: any) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add story (Admin)
router.post('/create', protect, admin, async (req: any, res: any) => {
  try {
    const story = await Story.create(req.body);
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
