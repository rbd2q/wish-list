import type { MouseEvent } from 'react';

import type { WishPhoto } from '../../model';

interface PhotoListProps {
  photos: WishPhoto[];
  onPreview: (id: string) => void;
  onRemove: (id: string) => void;
  onSetCover: (id: string) => void;
}

export const PhotoList = ({ photos, onPreview, onRemove, onSetCover }: PhotoListProps) => {
  const handlePreview = (event: MouseEvent<HTMLButtonElement>) => {
    onPreview(event.currentTarget.value);
  };

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    onRemove(event.currentTarget.value);
  };

  const handleSetCover = (event: MouseEvent<HTMLButtonElement>) => {
    onSetCover(event.currentTarget.value);
  };

  return (
    <ol className="flex min-w-0 flex-col gap-3">
      {photos.map((photo, index) => {
        return (
          <li key={photo.id} className="flex min-w-0 items-center gap-3 rounded-xl border border-border p-3">
            <button
              type="button"
              value={photo.id}
              onClick={handlePreview}
              aria-label={`Enlarge photo ${index + 1}`}
              className="shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-primary">
              <img src={photo.src} alt={`Photo ${index + 1}`} className="h-16 w-16 rounded-lg object-contain" />
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{index === 0 ? 'Cover photo' : `Photo ${index + 1}`}</p>
              {photo.file ? <p className="text-xs text-muted-foreground wrap-anywhere">{photo.file.name}</p> : null}
              <div className="mt-2 flex flex-wrap gap-3 text-xs">
                {index !== 0 ? (
                  <button
                    type="button"
                    value={photo.id}
                    onClick={handleSetCover}
                    aria-label={`Set photo ${index + 1} as cover`}
                    className="underline">
                    Set as cover
                  </button>
                ) : null}
                <button
                  type="button"
                  value={photo.id}
                  onClick={handleRemove}
                  aria-label={`Remove photo ${index + 1}`}
                  className="text-destructive underline">
                  Remove
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};
