import clsx from 'clsx';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import Image from 'next/image';
import type { MouseEvent, SyntheticEvent } from 'react';

interface WishGalleryControlsProps {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const WishGalleryControls = ({
  images,
  activeIndex,
  onSelect,
  onPrevious,
  onNext,
}: WishGalleryControlsProps) => {
  const handleSelect = (event: MouseEvent<HTMLButtonElement>) => {
    onSelect(Number(event.currentTarget.value));
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.visibility = 'hidden';
  };

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        {images.map((src, index) => {
          return (
            <button
              key={src}
              type="button"
              value={index}
              onClick={handleSelect}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={clsx('relative rounded-lg border-2 p-1', {
                'border-primary': index === activeIndex,
                'border-transparent': index !== activeIndex,
              })}>
              <ImageOff size={20} className="absolute inset-0 m-auto text-muted-foreground" aria-hidden="true" />
              <Image
                unoptimized
                width={48}
                height={48}
                src={src}
                alt=""
                onError={handleImageError}
                className="relative h-12 w-12 bg-surface object-contain"
              />
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous photo"
          className="min-h-11 min-w-11 rounded-lg border border-border p-3">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span role="status" className="text-sm">
          {activeIndex + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className="min-h-11 min-w-11 rounded-lg border border-border p-3">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
