import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import authRoutes from './routes/auth';
import donationRoutes from './routes/donations';
import impactRoutes from './routes/impact';
import storyRoutes from './routes/stories';
import paymentRoutes from './routes/payments';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('ClearImpact API setup.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
