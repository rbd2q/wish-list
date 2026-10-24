import { useState } from 'react';

import { WishGalleryControls } from './wish-gallery-controls';

interface WishGalleryProps {
  images: string[];
  title: string;
}

export const WishGallery = ({ images, title }: WishGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeIndex = Math.min(selectedIndex, Math.max(0, images.length - 1));
  const selectedImage = images[activeIndex];

  const handlePrevious = () => {
    setSelectedIndex((activeIndex + images.length - 1) % images.length);
  };
  const handleNext = () => {
    setSelectedIndex((activeIndex + 1) % images.length);
  };

  return (
    <div className="mb-6 min-w-0">
      <img
        className="aspect-square w-full rounded-xl bg-surface-secondary object-contain p-3"
        src={selectedImage || '/images/product-image-fallback.svg'}
        alt={title}
      />
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
