import type { AxiosInstance } from 'axios';

import type { WishPhoto } from '../model';
import type { UploadedWishPhoto } from './types';

const resolvePhotoUrl = async (photo: WishPhoto, api: AxiosInstance, uploadedImages: WeakMap<File, string>) => {
  if (!photo.file) {
    if (photo.src.startsWith('blob:')) throw new Error('A local photo must be uploaded before saving.');

    return photo.src;
  }
  const cachedUrl = uploadedImages.get(photo.file);

  if (cachedUrl) return cachedUrl;

  const { data } = await api.post<UploadedWishPhoto>('/api/wish/image', photo.file, {
    headers: { 'Content-Type': photo.file.type },
  });
  const imageUrl = data.imageUrl;
  uploadedImages.set(photo.file, imageUrl);

  return imageUrl;
};

export const resolvePhotoUrls = async (
  photos: WishPhoto[],
  api: AxiosInstance,
  uploadedImages: WeakMap<File, string>,
) => {
  const imageUrls: string[] = [];
  for (const photo of photos) {
    imageUrls.push(await resolvePhotoUrl(photo, api, uploadedImages));
  }

  return [...new Set(imageUrls)];
};
