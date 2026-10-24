import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MouseEvent } from 'react';

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
              className={`rounded-lg border-2 p-1 ${index === activeIndex ? 'border-primary' : 'border-transparent'}`}>
              <img src={src} alt="" className="h-12 w-12 object-contain" />
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous photo"
          className="rounded-lg border border-border px-3 py-2">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span role="status" className="text-sm">
          {activeIndex + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className="rounded-lg border border-border px-3 py-2">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
