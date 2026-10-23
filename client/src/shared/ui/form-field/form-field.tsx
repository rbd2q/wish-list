import clsx from 'clsx';
import { ReactNode } from 'react';

import { FCWithChildren } from '@/shared/lib/react';

interface Props {
  label?: ReactNode;
  labelId?: string;
  htmlFor?: string;
  required?: boolean;
  notes?: ReactNode;
  className?: string;
}

export const FormField: FCWithChildren<Props> = ({ htmlFor, label, labelId, notes, required, className, children }) => (
  <div className={clsx('mb-4', className)}>
    {label ? (
      <label
        id={labelId ?? (htmlFor ? `${htmlFor}-label` : undefined)}
        className="font-semibold text-sm text-foreground mb-2 block"
        htmlFor={htmlFor}>
        {label}
        {required ? (
          <span
            aria-label="This field is required"
            className="inline-block align-bottom text-xl leading-4 ml-1 text-destructive">
            *
          </span>
        ) : null}
      </label>
    ) : null}
    <div>{children}</div>
    {notes ? <div className="text-xs text-muted-foreground">{notes}</div> : null}
  </div>
);
