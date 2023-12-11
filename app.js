import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import AuthRoutes from './routes/auth-routes.js';
import UserRoutes from './routes/users-routes.js';

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);

const PORT = config.get('port') || 8000;

async function start() {
  try {
    await mongoose.connect(config.get('mongo_uri'), {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`APP HAS BEEN STARTED OM PORT ${PORT}`));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
