import { FCWithChildren } from '@/shared/types';

export const Container: FCWithChildren = ({ children }) => (
  <div className="max-w-4xl mx-auto w-full h-[calc(100%-56px)] px-12">{children}</div>
);
