import clsx from 'clsx';
import { times } from 'lodash';
import { Package } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { COLLECTION_CONFIG } from '../config';
import type { Collection } from '../model';
import { COLLECTION_COLOR_CLASSES, COLLECTION_ICON_COMPONENTS } from './collection-appearance';

interface CollectionCardProps {
  collection: Pick<Collection, 'name' | 'description' | 'icon' | 'color' | 'wishCount' | 'previewImages'>;
  children?: ReactNode;
}

export const CollectionCard = ({ collection, children }: CollectionCardProps) => {
  const { name, description, icon, color, wishCount, previewImages } = collection;
  const Icon = COLLECTION_ICON_COMPONENTS[icon];
  const colorClassName = COLLECTION_COLOR_CLASSES[color];

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface p-2">
      <div className="grid grid-cols-3 gap-1" aria-hidden="true">
        {times(COLLECTION_CONFIG.previewCount, (index) => (
          <div
            key={index}
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-surface-secondary">
            {previewImages[index] ? (
              <Image src={previewImages[index]} alt="" fill unoptimized sizes="160px" className="object-cover" />
            ) : (
              <Package className="size-7 text-muted-foreground/40" />
            )}
          </div>
        ))}
      </div>
      <div className="space-y-3 p-3">
        <span className={clsx('inline-flex size-11 items-center justify-center rounded-xl', colorClassName)}>
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-semibold wrap-anywhere">{name}</h2>
          {description && (
            <p className="mt-1 line-clamp-3 whitespace-pre-line text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {wishCount} {wishCount === 1 ? 'item' : 'items'}
        </p>
        {children}
      </div>
    </div>
  );
};
