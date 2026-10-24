import clsx from 'clsx';
import { Check } from 'lucide-react';
import { Control, useController } from 'react-hook-form';
import { InferType } from 'yup';

import { WishPriority } from '@/entities/wish';
import { FormError } from '@/shared/ui/form-error';

import { PRIORITY_OPTIONS, wishSchema } from '../../model';

const checkedStyles: Record<WishPriority, string> = {
  [WishPriority.LOW]: 'border-slate-400 bg-slate-50 text-slate-700',
  [WishPriority.MEDIUM]: 'border-amber-400 bg-amber-50 text-amber-800',
  [WishPriority.HIGH]: 'border-rose-400 bg-rose-50 text-rose-800',
};

interface PriorityFieldProps {
  control: Control<InferType<typeof wishSchema>>;
}

export const PriorityField = ({ control }: PriorityFieldProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'priority', control });

  return (
    <fieldset className="my-5">
      <legend className="mb-2 font-medium">Priority</legend>
      <div className="grid grid-cols-3 gap-2">
        {PRIORITY_OPTIONS.map(({ value, label }) => {
          const isSelected = field.value === value;

          return (
            <label key={value} className="cursor-pointer">
              <input
                {...field}
                ref={isSelected ? field.ref : undefined}
                type="radio"
                value={value}
                checked={isSelected}
                className="peer sr-only"
                aria-describedby={error ? 'priority-error' : undefined}
              />
              <span
                className={clsx(
                  'flex h-11 items-center justify-center gap-1 rounded-full border text-sm peer-focus-visible:ring-2 peer-focus-visible:ring-primary',
                  isSelected ? checkedStyles[value] : 'border-border text-muted-foreground',
                )}>
                {isSelected ? <Check size={14} aria-hidden="true" /> : null}
                {label}
              </span>
            </label>
          );
        })}
      </div>
      {error ? <FormError id="priority-error">{error.message}</FormError> : null}
    </fieldset>
  );
};
