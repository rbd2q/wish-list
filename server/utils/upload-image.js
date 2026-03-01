import { getCloudinaryConfig, isCloudinaryUrl, uploadBufferToCloudinary } from '../services/cloudinary/index.js';
import { urlToWebpBuffer } from './image/index.js';

export async function uploadImageByUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return null;
  if (isCloudinaryUrl(imageUrl)) return imageUrl;
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  if (!cloudName || !apiKey || !apiSecret) return imageUrl;

  try {
    const webpBuffer = await urlToWebpBuffer(imageUrl);
    if (!webpBuffer) return imageUrl;
    const result = await uploadBufferToCloudinary(webpBuffer);
    return result?.secure_url ?? imageUrl;
  } catch {
    return imageUrl;
  }
}
