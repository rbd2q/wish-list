'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import { WishDetails } from './ui';

interface WishListItemPageProps {
  id: string;
}

export const WishListItemPage = ({ id }: WishListItemPageProps) => {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <Fragment>
      <button type="button" onClick={handleBack} className="flex gap-2 mb-2">
        <ArrowLeft size={24} aria-hidden="true" />
        Back
      </button>
      <WishDetails id={id} />
    </Fragment>
  );
};
