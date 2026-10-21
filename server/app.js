import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import config from 'config';
import express from 'express';
import mongoose from 'mongoose';

import { handleApiError } from './errors/http-error.js';
import AnalyticsRoutes from './routes/analytics-routes.js';
import AuthRoutes from './routes/auth-routes.js';
import CollectionRoutes from './routes/collection-routes.js';
import UserRoutes from './routes/users-routes.js';
import WishRoutes from './routes/wish-routes.js';

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/wish', WishRoutes);
app.use('/api/analytics', AnalyticsRoutes);
app.use('/api/collections', CollectionRoutes);
app.use(handleApiError);

const PORT = config.get('port') || 8000;

async function start() {
  try {
    await mongoose.connect(config.get('mongo_uri'), {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });
    app.listen(PORT, () => console.log(`APP HAS BEEN STARTED ON PORT ${PORT}`));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
