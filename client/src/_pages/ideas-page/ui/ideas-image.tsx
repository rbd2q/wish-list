import { Gift } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface IdeasImageProps {
  src: string | undefined;
}

export const IdeasImage = ({ src }: IdeasImageProps) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  if (!src || hasError) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 text-muted-foreground">
        <Gift size={32} aria-hidden="true" />
        <span className="text-xs">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      unoptimized
      width={0}
      height={0}
      src={src}
      alt=""
      loading="lazy"
      onError={handleImageError}
      className="block h-auto w-full"
    />
  );
};
