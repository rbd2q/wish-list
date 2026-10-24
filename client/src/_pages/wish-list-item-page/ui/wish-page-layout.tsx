import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

interface WishPageLayoutProps {
  children: ReactNode;
}

export const WishPageLayout = ({ children }: WishPageLayoutProps) => {
  const { back } = useRouter();

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={back}
        className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft size={18} aria-hidden="true" />
        Back
      </button>
      {children}
    </div>
  );
};
