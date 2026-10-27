import { Gift } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { WishGalleryControls } from './wish-gallery-controls';

interface WishGalleryProps {
  images: string[];
  title: string;
}

export const WishGallery = ({ images, title }: WishGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [failedImage, setFailedImage] = useState<string>();
  const activeIndex = Math.min(selectedIndex, Math.max(0, images.length - 1));
  const selectedImage = images[activeIndex];
  const isImageUnavailable = !selectedImage || failedImage === selectedImage;

  const handlePrevious = () => {
    setSelectedIndex((activeIndex + images.length - 1) % images.length);
  };
  const handleNext = () => {
    setSelectedIndex((activeIndex + 1) % images.length);
  };
  const handleImageError = () => setFailedImage(selectedImage);

  return (
    <div className="min-w-0">
      <div className="rounded-2xl border border-border bg-surface p-4 lg:p-5">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-secondary">
          {isImageUnavailable ? (
            <div
              role="img"
              aria-label={`Image unavailable for ${title}`}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-muted-foreground">
              <Gift size={40} aria-hidden="true" />
              <span className="text-sm">Image unavailable</span>
            </div>
          ) : (
            <Image
              unoptimized
              fill
              key={selectedImage}
              className="bg-surface object-contain"
              src={selectedImage}
              alt={title}
              onError={handleImageError}
            />
          )}
        </div>
      </div>
      {images.length > 1 ? (
        <WishGalleryControls
          images={images}
          activeIndex={activeIndex}
          onSelect={setSelectedIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      ) : null}
    </div>
  );
};
