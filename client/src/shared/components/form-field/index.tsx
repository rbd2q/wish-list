import { ReactNode } from 'react';
import clsx from 'clsx';

import { FCWithChildren } from '@/shared/types';

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
      <label id={labelId} className="font-semibold text-sm text-gray-700 mb-2 block" htmlFor={htmlFor}>
        {label}
        {required ? (
          <span
            aria-label="This field is required"
            className="inline-block align-bottom text-xl leading-4 ml-1 text-red-600"
          >
            *
          </span>
        ) : null}
      </label>
    ) : null}
    <div>{children}</div>
    {notes ? <div className="text-xs text-gray-400">{notes}</div> : null}
  </div>
);
