import { FCWithChildren } from '../../types';

export const FormError: FCWithChildren = ({ children }) => (
  <div className="text-sm mt-2 text-destructive">{children}</div>
);
