import { FCWithChildren } from '../../lib/react';

export const FormError: FCWithChildren<{ id?: string }> = ({ id, children }) => (
  <div id={id} role="alert" className="text-sm mt-2 text-destructive">
    {children}
  </div>
);
