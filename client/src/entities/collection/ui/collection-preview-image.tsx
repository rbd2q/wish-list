'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { CollectionIcon } from '../model';
import { COLLECTION_ICON_COMPONENTS } from './collection-appearance';

interface CollectionPreviewImageProps {
  src?: string;
  icon: CollectionIcon;
}

export const CollectionPreviewImage = ({ src, icon }: CollectionPreviewImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string>();
  const Icon = COLLECTION_ICON_COMPONENTS[icon];
  const hasImage = !!src && src !== failedSrc;

  const handleError = () => {
    setFailedSrc(src);
  };

  return hasImage ? (
    <Image
      src={src}
      alt=""
      fill
      unoptimized
      sizes="(min-width: 1280px) 120px, (min-width: 640px) 160px, 120px"
      className="object-cover"
      onError={handleError}
    />
  ) : (
    <Icon className="size-7 text-muted-foreground/40" />
  );
};
