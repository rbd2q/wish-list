import { optionalUrl } from './schema';
import type { WishPhoto } from './types';

const isInvalidPhotoFile = (file: File) => {
  return !['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type) || file.size > 10 * 1024 * 1024;
};

export const getPhotoUrlError = (src: string, photos: WishPhoto[]) => {
  if (!src || !optionalUrl.isValidSync(src)) return 'Enter a valid HTTP or HTTPS image URL.';

  if (photos.some((photo) => photo.src === src)) return 'This photo is already added.';

  if (photos.length >= 5) return 'You can add up to 5 photos.';

  return '';
};

export const getPhotoFilesError = (files: File[], photoCount: number) => {
  if (photoCount + files.length > 5) return 'You can add up to 5 photos. Choose fewer files.';

  if (files.some(isInvalidPhotoFile)) return 'Choose JPEG, PNG, WebP or AVIF images up to 10 MiB each.';

  return '';
};
