import { ReactNode } from 'react';

import { FCWithChildren } from '@/shared/types';

interface Props {
  label?: ReactNode;
  labelId?: string;
  htmlFor?: string;
  required?: boolean;
  notes?: ReactNode;
}

export const FormField: FCWithChildren<Props> = ({ htmlFor, label, labelId, notes, required, children }) => (
  <div className="mb-4">
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
