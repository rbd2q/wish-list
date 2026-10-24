import { useEffect, useRef, useState } from 'react';
import { type Control, useController } from 'react-hook-form';
import type { InferType } from 'yup';

import type { wishSchema } from './schema';
import { getPhotoFilesError, getPhotoUrlError } from './wish-photo-validation';

export const useWishPhotos = (control: Control<InferType<typeof wishSchema>>) => {
  const {
    field: { value: photos, onChange },
    fieldState: { error },
  } = useController({ control, name: 'photos' });
  const [url, setUrl] = useState('');
  const [photoError, setPhotoError] = useState('');
  const blobUrls = useRef(new Set<string>());

  const isFull = photos.length >= 5;
  const message = photoError || error?.message;

  useEffect(() => {
    const urls = blobUrls.current;

    return () => {
      urls.forEach((src) => {
        URL.revokeObjectURL(src);
      });
    };
  }, []);

  const addUrl = (source: string) => {
    const src = source.trim();

    const validationError = getPhotoUrlError(src, photos);
    setPhotoError(validationError);

    if (validationError) return;

    onChange([...photos, { id: crypto.randomUUID(), src }]);
    setUrl('');
  };

  const addFiles = (files: File[]) => {
    if (!files.length) return;

    const validationError = getPhotoFilesError(files, photos.length);
    setPhotoError(validationError);

    if (validationError) return;

    const added = files.map((file) => {
      const src = URL.createObjectURL(file);
      blobUrls.current.add(src);

      return { id: crypto.randomUUID(), src, file };
    });
    onChange([...photos, ...added]);
  };

  const removePhoto = (id: string) => {
    const removed = photos.find((photo) => photo.id === id);

    if (removed && blobUrls.current.delete(removed.src)) URL.revokeObjectURL(removed.src);
    onChange(photos.filter((photo) => photo.id !== id));
    setPhotoError('');
  };

  const setCover = (id: string) => {
    const cover = photos.find((photo) => photo.id === id);

    if (cover) onChange([cover, ...photos.filter((photo) => photo.id !== id)]);
  };

  return { photos, url, setUrl, isFull, message, addUrl, addFiles, removePhoto, setCover };
};
