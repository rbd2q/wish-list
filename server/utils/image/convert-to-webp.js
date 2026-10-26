import config from 'config';
import sharp from 'sharp';

import { fetchPublicUrl } from '../fetch-public-url.js';

export async function urlToWebpBuffer(imageUrl) {
  const response = await fetchPublicUrl(imageUrl);
  if (!response.ok) return null;

  const quality = config.has('webpQuality') ? config.get('webpQuality') : 82;
  return sharp(response.body).webp({ quality }).toBuffer();
}
