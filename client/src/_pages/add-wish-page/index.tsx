'use client';

import { useRouter } from 'next/navigation';

import { AddItemForm } from '@/entities/add-item-form';
import { navigationConfig } from '@/shared/config/navigation';

export const AddWishPage = () => {
  const router = useRouter();

  const returnToWishlist = () => {
    router.push(navigationConfig.wishlist);
  };

  return <AddItemForm onBack={returnToWishlist} />;
};
