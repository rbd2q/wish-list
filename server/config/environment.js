import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)), quiet: true });

for (const name of ['MONGO_URI', 'JWT_SECRET_KEY']) {
  if (!process.env[name]?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}
