import { FCWithChildren } from '../../types';

export const Container: FCWithChildren = ({ children }) => (
  <div className="max-w-4xl mx-auto w-full mt-12 px-12">{children}</div>
);
