import { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => (
  <div className="mx-auto flex min-h-full w-full min-w-0 max-w-[1200px] flex-col items-center px-5 py-8 md:px-8">
    {children}
  </div>
);
