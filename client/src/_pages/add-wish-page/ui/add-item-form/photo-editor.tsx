import { type MouseEvent, useState } from 'react';
import type { Control } from 'react-hook-form';
import type { InferType } from 'yup';

import { FormError } from '@/shared/ui/form-error';

import { useWishPhotos, wishSchema } from '../../model';
import { PhotoList } from './photo-list';
import { PhotoPreview } from './photo-preview';
import { PhotoUpload } from './photo-upload';
import { PhotoUrlInput } from './photo-url-input';

interface PhotoEditorProps {
  control: Control<InferType<typeof wishSchema>>;
  candidates: string[];
  isDisabled: boolean;
}

export const PhotoEditor = ({ control, candidates, isDisabled }: PhotoEditorProps) => {
  const { photos, url, setUrl, isFull, message, addUrl, addFiles, removePhoto, setCover } = useWishPhotos(control);
  const [previewId, setPreviewId] = useState<string>();
  const previewPhoto = photos.find((photo) => photo.id === previewId);
  const errorId = message ? 'photos-error' : undefined;

  const handleCandidate = (event: MouseEvent<HTMLButtonElement>) => {
    addUrl(event.currentTarget.value);
  };

  const handleClosePreview = () => {
    setPreviewId(undefined);
  };

  return (
    <fieldset disabled={isDisabled} className="my-5 flex min-w-0 flex-col gap-3" aria-describedby={errorId}>
      <legend className="mb-2 font-medium">Photos ({photos.length}/5)</legend>
      <p className="text-sm text-muted-foreground">Add up to 5 photos. The first photo is the cover.</p>
      <PhotoUpload isDisabled={isFull} onAdd={addFiles} />
      {photos.length ? (
        <PhotoList photos={photos} onPreview={setPreviewId} onRemove={removePhoto} onSetCover={setCover} />
      ) : null}
      <PhotoUrlInput url={url} onUrlChange={setUrl} onAdd={addUrl} isDisabled={isFull} errorId={errorId} />
      {message ? <FormError id="photos-error">{message}</FormError> : null}
      {candidates.length ? (
        <div>
          <p className="mb-2 text-sm">Photos from the product page</p>
          <div className="flex flex-wrap gap-2">
            {candidates.map((src, index) => {
              return (
                <button
                  type="button"
                  key={src}
                  value={src}
                  onClick={handleCandidate}
                  disabled={isFull || photos.some((photo) => photo.src === src)}
                  aria-label={`Add product photo ${index + 1}`}
                  className="rounded-lg border border-border p-1 disabled:opacity-40">
                  <img src={src} alt="Product option" className="h-16 w-16 object-contain" />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      {previewPhoto ? (
        <PhotoPreview
          src={previewPhoto.src}
          title={previewPhoto.file?.name ?? 'Photo preview'}
          onClose={handleClosePreview}
        />
      ) : null}
    </fieldset>
  );
};
