import { Upload } from 'lucide-react';
import type { ChangeEvent } from 'react';

interface PhotoUploadProps {
  isDisabled: boolean;
  onAdd: (files: File[]) => void;
}

export const PhotoUpload = ({ isDisabled, onAdd }: PhotoUploadProps) => {
  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    onAdd(files);
  };

  return (
    <label
      className={`relative flex min-w-0 flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/30 bg-surface-secondary px-4 py-6 text-center focus-within:ring-2 focus-within:ring-primary ${isDisabled ? 'opacity-50' : 'cursor-pointer hover:border-primary'}`}>
      <input
        type="file"
        multiple
        disabled={isDisabled}
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFiles}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label="Choose photos"
        aria-describedby="photos-hint"
      />
      <Upload size={24} className="text-primary" aria-hidden="true" />
      <span className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
        Choose photos
      </span>
      <span id="photos-hint" className="text-xs text-muted-foreground">
        JPEG, PNG, WebP or AVIF · Up to 10 MiB each
      </span>
    </label>
  );
};
