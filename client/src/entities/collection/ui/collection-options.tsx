'use client';

import { Checkbox, CheckboxGroup } from '@heroui/react';
import clsx from 'clsx';
import type { ComponentProps } from 'react';

import type { Collection } from '../model';
import { COLLECTION_COLOR_CLASSES } from './collection-appearance';

interface CollectionOptionsProps {
  collections: Collection[];
  value: string[];
  onChange: (value: string[]) => void;
  name?: string;
  onBlur?: () => void;
  isInvalid?: boolean;
  'aria-describedby'?: string;
  inputRef?: ComponentProps<typeof Checkbox.Content>['ref'];
}

export const CollectionOptions = ({
  collections,
  value,
  onChange,
  name,
  onBlur,
  isInvalid,
  'aria-describedby': describedBy,
  inputRef,
}: CollectionOptionsProps) => (
  <CheckboxGroup
    aria-label="Collections"
    aria-describedby={describedBy}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    isInvalid={isInvalid}
    className="flex-row flex-wrap gap-x-2 [&_[data-slot=checkbox]]:mt-0">
    {collections.map((collection, index) => {
      const isSelected = value.includes(collection.id);

      return (
        <Checkbox key={collection.id} value={collection.id} className="max-w-full">
          <Checkbox.Content
            ref={index === 0 ? inputRef : undefined}
            aria-label={collection.name}
            className="group/option min-h-11 max-w-full rounded-xl data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-primary">
            <span
              className={clsx(
                'inline-flex min-h-7 max-w-full items-center rounded-xl px-3 py-1 text-xs font-normal wrap-anywhere transition-colors',
                isSelected
                  ? COLLECTION_COLOR_CLASSES[collection.color]
                  : 'bg-surface-secondary text-muted-foreground group-data-[hovered=true]/option:bg-secondary',
              )}>
              {collection.name}
            </span>
          </Checkbox.Content>
        </Checkbox>
      );
    })}
  </CheckboxGroup>
);
