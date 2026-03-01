import { Readable } from 'stream';
import config from 'config';
import { v2 as cloudinary } from 'cloudinary';

export function uploadBufferToCloudinary(buffer) {
  const folder = (config.has('cloudinary') && config.get('cloudinary.folder')) || 'wish-list';
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, format: 'webp' }, (err, result) =>
      err ? reject(err) : resolve(result),
    );
    Readable.from(buffer).pipe(stream);
  });
}
