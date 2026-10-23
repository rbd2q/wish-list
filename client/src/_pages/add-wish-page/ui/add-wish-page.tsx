'use client';

import { useRouter } from 'next/navigation';

import { navigationConfig } from '@/shared/config/navigation';

import { AddItemForm } from './add-item-form';

export const AddWishPage = () => {
  const router = useRouter();

  const returnToWishlist = () => {
    router.push(navigationConfig.wishlist);
  };

  return <AddItemForm onBack={returnToWishlist} />;
};
