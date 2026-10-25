import type { UseFormRegister } from 'react-hook-form';

import { COLLECTION_ICON_COMPONENTS, CollectionIcon, type CollectionValues } from '@/entities/collection';

interface CollectionIconPickerProps {
  register: UseFormRegister<CollectionValues>;
}

export const CollectionIconPicker = ({ register }: CollectionIconPickerProps) => (
  <fieldset className="min-w-0 rounded-2xl border border-border bg-surface p-5 sm:p-6">
    <legend className="float-left mb-4 w-full font-semibold">Choose icon</legend>
    <div className="clear-both grid grid-cols-[repeat(auto-fill,minmax(44px,1fr))] gap-2">
      {Object.values(CollectionIcon).map((value) => {
        const Icon = COLLECTION_ICON_COMPONENTS[value];
        const label = value.replaceAll('-', ' ');

        return (
          <label key={value} className="cursor-pointer" title={label}>
            <input type="radio" value={value} {...register('icon')} className="peer sr-only" />
            <span className="flex min-h-11 items-center justify-center rounded-xl border-2 border-transparent bg-surface-secondary text-muted-foreground peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2">
              <Icon className="size-5" aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </span>
          </label>
        );
      })}
    </div>
  </fieldset>
);
