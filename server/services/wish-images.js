import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';

import { HttpError } from '../errors/http-error.js';
import WishImage from '../models/WishImage.js';
import { getCloudinaryConfig, uploadBufferToCloudinary } from './cloudinary/index.js';

export const uploadWishImage = async (userId, buffer) => {
  if (!Buffer.isBuffer(buffer) || !buffer.length) throw new HttpError(400, 'Image file is required');
  let webp;
  try {
    const image = sharp(buffer, { limitInputPixels: 40000000, animated: false });
    const metadata = await image.metadata();
    if (
      !['jpeg', 'png', 'webp', 'avif', 'heif'].includes(metadata.format) ||
      (metadata.format === 'heif' && metadata.compression !== 'av1') ||
      (metadata.pages ?? 1) > 1
    ) {
      throw new Error('Unsupported image');
    }
    webp = await image.rotate().webp().toBuffer();
  } catch {
    throw new HttpError(400, 'Use a valid JPEG, PNG, WebP or AVIF image');
  }
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  if (!cloudName || !apiKey || !apiSecret) throw new HttpError(503, 'Image uploads are unavailable');

  const result = await uploadBufferToCloudinary(webp);
  try {
    await WishImage.create({ userId, imageUrl: result.secure_url, publicId: result.public_id });
  } catch (error) {
    await cloudinary.uploader.destroy(result.public_id);
    throw error;
  }

  return result.secure_url;
};

export const claimWishImage = async (userId, imageUrl, session) => {
  if (!imageUrl) return;
  const image = await WishImage.findOne({ imageUrl }).session(session);
  if (!image) {
    const { cloudName } = getCloudinaryConfig();
    const url = new URL(imageUrl);
    if (url.hostname === 'res.cloudinary.com' && url.pathname.startsWith('/' + cloudName + '/')) {
      throw new HttpError(400, 'Unknown image upload; upload it again');
    }

    return;
  }
  if (image.deleting) throw new HttpError(400, 'Image upload expired; upload it again');
  if (image.userId.toString() !== userId) throw new HttpError(403, 'This image belongs to another user');
  // A write also serializes claiming against pending-image cleanup.
  await WishImage.updateOne({ _id: image._id }, { $set: { claimed: true }, $inc: { __v: 1 } }, { session });
};

export const cleanPendingWishImages = async () => {
  const images = await WishImage.find({ claimed: false, createdAt: { $lt: new Date(Date.now() - 86400000) } }).limit(
    100,
  );
  for (const image of images) {
    // Atomically reserve cleanup; a concurrent transaction claiming this record conflicts.
    const pending = await WishImage.findOneAndUpdate(
      { _id: image._id, claimed: false },
      { $set: { deleting: true } },
      { new: true },
    );
    if (!pending) continue;
    const result = await cloudinary.uploader.destroy(pending.publicId);
    if (['ok', 'not found'].includes(result.result)) await WishImage.deleteOne({ _id: pending._id, deleting: true });
  }
};

export const startPendingWishImageCleanup = () => {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  if (!cloudName || !apiKey || !apiSecret) return;

  const cleanImages = async () => {
    try {
      await cleanPendingWishImages();
    } catch (error) {
      console.error('Pending image cleanup failed', error);
    } finally {
      setTimeout(cleanImages, 3600000).unref();
    }
  };

  void cleanImages();
};
