import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import AuthRoutes from './routes/auth-routes.js';
import UserRoutes from './routes/users-routes.js';
import WishRoutes from './routes/wish-routes.js';
import AnalyticsRoutes from './routes/analytics-routes.js';

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/wish', WishRoutes);
app.use('/api/analytics', AnalyticsRoutes);

const PORT = config.get('port') || 8000;

async function start() {
  try {
    await mongoose.connect(config.get('mongo_uri'));
    app.listen(PORT, () => console.log(`APP HAS BEEN STARTED ON PORT ${PORT}`));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
