import config from 'config';
import sharp from 'sharp';

const FETCH_OPTIONS = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
};

export async function urlToWebpBuffer(imageUrl) {
  const response = await fetch(imageUrl, FETCH_OPTIONS);
  if (!response.ok) return null;

  const arrayBuffer = await response.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);
  const quality = config.has('webpQuality') ? config.get('webpQuality') : 82;
  return sharp(inputBuffer).webp({ quality }).toBuffer();
}
