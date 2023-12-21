import { FCWithChildren } from '@/shared/types';

export const Container: FCWithChildren = ({ children }) => (
  <div className="w-full max-w-4xl h-[calc(100%-56px)] flex flex-col items-center mx-auto px-12 py-8">{children}</div>
);
