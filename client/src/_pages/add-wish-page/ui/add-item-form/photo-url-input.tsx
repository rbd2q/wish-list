import { type ChangeEvent, Fragment, type KeyboardEvent } from 'react';

import { Button } from '@/shared/ui/button';

interface PhotoUrlInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onAdd: (url: string) => void;
  isDisabled: boolean;
  errorId?: string;
}

export const PhotoUrlInput = ({ url, onUrlChange, onAdd, isDisabled, errorId }: PhotoUrlInputProps) => {
  const handleUrl = (event: ChangeEvent<HTMLInputElement>) => {
    onUrlChange(event.target.value);
  };

  const handleAddUrl = () => {
    onAdd(url);
  };

  const handleUrlKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddUrl();
    }
  };

  return (
    <Fragment>
      <label htmlFor="photo-url" className="text-sm font-medium">
        Or add an image URL
      </label>
      <div className="flex min-w-0 flex-wrap gap-2">
        <input
          id="photo-url"
          value={url}
          onChange={handleUrl}
          onKeyDown={handleUrlKeyDown}
          placeholder="https://…"
          className="min-w-0 flex-1 rounded-xl border border-border bg-surface p-3"
          aria-describedby={errorId}
        />
        <Button type="button" variant="secondary" onPress={handleAddUrl} isDisabled={isDisabled}>
          Add image
        </Button>
      </div>
    </Fragment>
  );
};
