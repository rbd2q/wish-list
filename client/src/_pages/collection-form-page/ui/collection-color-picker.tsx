import clsx from 'clsx';
import type { UseFormRegister } from 'react-hook-form';

import { COLLECTION_COLOR_CLASSES, CollectionColor, type CollectionValues } from '@/entities/collection';

interface CollectionColorPickerProps {
  register: UseFormRegister<CollectionValues>;
}

export const CollectionColorPicker = ({ register }: CollectionColorPickerProps) => (
  <fieldset className="min-w-0 rounded-2xl border border-border bg-surface p-5 sm:p-6">
    <legend className="float-left mb-4 w-full font-semibold">Choose color</legend>
    <div className="clear-both grid grid-cols-[repeat(auto-fill,minmax(44px,1fr))] gap-2">
      {Object.values(CollectionColor).map((value) => (
        <label key={value} className="cursor-pointer" title={value}>
          <input type="radio" value={value} {...register('color')} className="peer sr-only" />
          <span
            className={clsx(
              'flex min-h-11 items-center justify-center rounded-xl border-2 border-transparent peer-checked:border-primary peer-checked:[&>span:last-child]:visible peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2',
              COLLECTION_COLOR_CLASSES[value],
            )}>
            <span className="sr-only">{value}</span>
            <span aria-hidden="true" className="invisible font-semibold">
              ✓
            </span>
          </span>
        </label>
      ))}
    </div>
  </fieldset>
);
