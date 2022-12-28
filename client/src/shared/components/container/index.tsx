import { FCWithChildren } from '../../types';

export const Container: FCWithChildren = ({ children }) => {
  return <div className="max-w-6xl mx-auto w-full mt-12">{children}</div>;
};
